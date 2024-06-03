""" This file manages routes for bio """
import json
import uuid
from datetime import datetime
from flask import Blueprint, Response, request
import requests
from utils import get_connection
from model import Bio

bio_api = Blueprint('bio_api', __name__)
conn = get_connection()
TABLE = "Bio"
URL = "http://localhost:5011/"


@bio_api.route("/health", methods=["GET"])
def test():
    """ Test """
    _t = str(datetime.now())
    msg = {
        "name": "Sauron-Bio-Service",
        "health": "Excellent",
        "at time": _t
    }
    result = Response(json.dumps(msg), status=200,
                      content_type="application/json")
    return result


@bio_api.route("/get", methods=["GET"])
def get_bio():
    """ Get bio info """
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM {}".format(TABLE))
    query_result = cursor.fetchall()

    if len(query_result) == 0:
        return "No bio exists", 404

    return {"data": Bio(*query_result[0].values()).__dict__}


@bio_api.route("/add", methods=["POST"])
def add_bio():
    """ Add bio """
    data = request.json
    msg = requests.get(URL + "/sauron/backend/bio/get", timeout=5)
    if msg.status_code == 200:
        return "Bio already exists", 400
    try:
        id_ = str(uuid.uuid4())
        query = "INSERT INTO {} VALUES ('{}', '{}')".format(
            TABLE, id_, data['data'])
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
    except Exception:
        conn.rollback()
        return "Failed to add bio", 500
    return "Added bio", 200


@bio_api.route("/update", methods=["PUT"])
def update_bio():
    """ Update bio """
    data = request.json
    msg = requests.get(URL + "/sauron/backend/bio/get", timeout=5)
    if msg.status_code == 400:
        return "Bio does not exist", 400
    id_ = msg.json()['data']['id']
    try:
        query = "UPDATE {} SET bio = '{}' where id = '{}'".format(
            TABLE, data['data'], id_)
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
    except Exception:
        conn.rollback()
        return "Failed to update bio", 500

    return "Updated bio", 200


@bio_api.route("/delete", methods=["DELETE"])
def remove_bio():
    """ Remove bio """
    cursor = conn.cursor()
    cursor.execute("DELETE FROM {}".format(TABLE))
    query_result = cursor.fetchall()

    if len(query_result) == 0:
        return "Deleted", 200

    return None
