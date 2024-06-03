import json
from flask import Blueprint, Response, request, jsonify
import requests
from datetime import datetime
from utils import get_connection, upload_file_to_s3, allowed_file, s3
from model import Association, Photo
import os
import uuid
#TODO: Add try-except blocks

association_api = Blueprint('association_api', __name__)
conn = get_connection()
table = "Associations"
URL = "http://localhost:5011/"



@association_api.route("/health", methods = ["GET"])
def test():
    t = str(datetime.now())
    msg = {
        "name": "Sauron-Association-Service",
        "health": "Excellent",
        "at time": t
    }
    result = Response(json.dumps(msg), status=200, content_type="application/json")
    return result



@association_api.route("/get/all", methods = ["GET"])
def get_all_associations():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM {}".format(table))
    query_result = cursor.fetchall()

    if query_result is None:
        return "No association exists", 404
    
    data = []

    for exp in query_result:
        data.append({"data": Association(*exp.values()).__dict__})
    return data

@association_api.route("/get/<id>", methods = ["GET"])
def get_association_by_id(id):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM {} where id='{}'".format(table, id))
    query_result = cursor.fetchone()

    if query_result is None:
        return "Association does not exist", 404
    
    return {"data": Association(*query_result.values()).__dict__}



@association_api.route("/add", methods = ["POST"])
def add_association():
    if 'photo_file' not in request.files:
        return "No photo_file in request body", 400
    
    file = request.files['photo_file']
    if file.filename == '':
        return "No photo file exists", 400
    
    if file and allowed_file(file.filename):
        
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM {} where url = '{}'".format(table, file.filename))
        query_result = cursor.fetchall()
        if len(query_result): 
            return "Association already exists", 400
         
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
                s3.delete_object(Bucket=os.getenv("AWS_BUCKET_NAME"), Key = "associations/" + output)
                return "Upload Failed, try again!", 500    
        else:
            return "Upload Failed, try again!", 500
    else:
        return 'Filetype error', 400



@association_api.route("/delete/all", methods = ["DELETE"])
def remove_all_associations():
    cursor = conn.cursor()
    msg = requests.get(URL + "/sauron/backend/association/get/all")

    for photo in msg.json():
        image_url = photo['data']['url']
        s3.delete_object(Bucket=os.getenv("AWS_BUCKET_NAME"), Key = "associations/" + image_url)

    try:    
        cursor.execute("DELETE FROM {}".format(table))
        query_result = cursor.fetchall()

        if len(query_result) == 0:
            return "Deleted", 200
    except:
        conn.rollback()

    return None


@association_api.route("/delete/<id>", methods = ["DELETE"])
def remove_association_by_id(id):
    cursor = conn.cursor()
    msg = requests.get(URL + "/sauron/backend/association/get/{}".format(id))
    if msg.status_code == 404: 
        return msg.text, 404

    filename = msg.json()['data']['url']
    cursor.execute("DELETE FROM {} where id='{}'".format(table, id))
    query_result = cursor.fetchone()
    if query_result is None:
        s3.delete_object(Bucket=os.getenv("AWS_BUCKET_NAME"), Key = "associations/" + filename)
        return id, 200
    
    return None

