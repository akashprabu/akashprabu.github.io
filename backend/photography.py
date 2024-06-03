import json
from flask import Blueprint, Response, request, jsonify
import requests
from datetime import datetime
from utils import get_connection, upload_file_to_s3, allowed_file, s3
from model import Photo
import os
import uuid
#TODO: Add try-except blocks

photo_api = Blueprint('photo_api', __name__)
conn = get_connection()
table = "Photo"
URL = "http://localhost:5011/"



@photo_api.route("/health", methods = ["GET"])
def test():
    t = str(datetime.now())
    msg = {
        "name": "Sauron-Photo-Service",
        "health": "Excellent",
        "at time": t
    }
    result = Response(json.dumps(msg), status=200, content_type="application/json")
    return result



@photo_api.route("/get/all", methods = ["GET"])
def get_all_photos():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM {}".format(table))
    query_result = cursor.fetchall()

    if query_result is None:
        return "No photo exists", 404
    
    data = []

    for exp in query_result:
        data.append({"data": Photo(*exp.values()).__dict__})
    return data

@photo_api.route("/get/<id>", methods = ["GET"])
def get_photo_by_id(id):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM {} where id='{}'".format(table, id))
    query_result = cursor.fetchone()

    if query_result is None:
        return "Photo does not exist", 404
    
    return {"data": Photo(*query_result.values()).__dict__}



@photo_api.route("/add", methods = ["POST"])
def add_photo():
    if 'photo_file' not in request.files:
        return "No photo_file in request body", 400
    
    file = request.files['photo_file']
    if file.filename == '':
        return "No photo file exists", 400
    
    if file and allowed_file(file.filename):
        
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM {} where photo_url = '{}'".format(table, file.filename))
        query_result = cursor.fetchall()
        if len(query_result): 
            return "Photo already exists", 400
         
        output = upload_file_to_s3(file)
        if output:
            try:
                id = str(uuid.uuid4())
                query = "INSERT INTO {} VALUES('{}', '{}', '{}')".format(table, id, output.split('.')[0], output)
                cursor.execute(query)
                conn.commit()
                # return "Successful upload: " + id, 200
                return jsonify({
                    "id": id,
                    "image_name": output.split('.')[0],
                    "image_url": output
                })
            except:
                conn.rollback()
                s3.delete_object(Bucket=os.getenv("AWS_BUCKET_NAME"), Key = "photography/" + output)
                return "Upload Failed, try again!", 500    
        else:
            return "Upload Failed, try again!", 500
    else:
        return 'Filetype error', 400



@photo_api.route("/delete/all", methods = ["DELETE"])
def remove_all_photos():
    cursor = conn.cursor()
    msg = requests.get(URL + "/sauron/backend/photo/get/all")

    for photo in msg.json():
        image_url = photo['data']['photo_url']
        s3.delete_object(Bucket=os.getenv("AWS_BUCKET_NAME"), Key = "photography/" + image_url)

    try:    
        cursor.execute("DELETE FROM {}".format(table))
        query_result = cursor.fetchall()

        if len(query_result) == 0:
            return "Deleted", 200
    except:
        conn.rollback()

    return None


@photo_api.route("/delete/<id>", methods = ["DELETE"])
def remove_photo_by_id(id):
    cursor = conn.cursor()
    msg = requests.get(URL + "/sauron/backend/photo/get/{}".format(id))
    if msg.status_code == 404: 
        return msg.text, 404

    filename = msg.json()['data']['photo_url']
    cursor.execute("DELETE FROM {} where id='{}'".format(table, id))
    query_result = cursor.fetchone()
    if query_result is None:
        s3.delete_object(Bucket=os.getenv("AWS_BUCKET_NAME"), Key = "photography/" + filename)
        return id, 200
    
    return None

