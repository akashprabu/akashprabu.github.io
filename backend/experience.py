""" This file manages routes for experience """
import json
from datetime import datetime
import requests
from flask import Blueprint, Response
from utils import get_connection
from model import Experience


experience_api = Blueprint('experience_api', __name__)
conn = get_connection()
URL = "http://localhost:5011"
TABLE = "Experience"


@experience_api.route("/health", methods=["GET"])
def test():
    """ Test """
    _t = str(datetime.now())
    msg = {
        "name": "Sauron-Experience-Service",
        "health": "Excellent",
        "at time": _t
    }
    result = Response(json.dumps(msg), status=200,
                      content_type="application/json")
    return result


@experience_api.route("/get/all", methods=["GET"])
def get_all_experiences():
    """ Get all experiences """
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM {}".format(TABLE))
    query_result = cursor.fetchall()

    if query_result is None:
        return "No experience exists", 404
    data = []

    for exp in query_result:
        data.append({"data": Experience(*exp.values()).__dict__})
    return data


@experience_api.route("/get/<id>", methods=["GET"])
def get_experience_by_id(id_):
    """ Get experience by ID """
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM {} where id='{}'".format(TABLE, id_))
    query_result = cursor.fetchone()

    if query_result is None:
        return "Experience does not exist", 404
    return {"data": Experience(*query_result.values()).__dict__}


# TODO: ADD and UPDATE
@experience_api.route("/add", methods=["POST"])
def add_experience():
    """ Add experience """
    pass


@experience_api.route("/update", methods=["PUT"])
def update_experience():
    """ Update experience  by ID """
    pass


@experience_api.route("/delete/all", methods=["DELETE"])
def remove_all_experiences():
    """ Remove all experiences """
    cursor = conn.cursor()
    cursor.execute("DELETE FROM {}".format(TABLE))
    query_result = cursor.fetchall()

    if len(query_result) == 0:
        return "Deleted", 200

    return None


@experience_api.route("/delete/<id>", methods=["DELETE"])
def remove_experience_by_id(id_):
    """ Remove experience by ID """
    cursor = conn.cursor()
    msg = requests.get(
        "{}/sauron/backend/exp/get/{}".format(URL, id_), timeout=5)
    if msg.status_code == 404:
        return msg.text, 404
    cursor.execute("DELETE FROM {} where id='{}'".format(TABLE, id_))
    query_result = cursor.fetchone()

    if query_result is None:
        return id_, 200

    return None
