""" This file manages routes for projects """
import json
from datetime import datetime
from flask import Blueprint, Response
import requests
from utils import get_connection
from model import Projects

projects_api = Blueprint('projects_api', __name__)
conn = get_connection()
TABLE = "Projects"
URL = "http://localhost:5011"


@projects_api.route("/health", methods=["GET"])
def test():
    """ Test """
    _t = str(datetime.now())
    msg = {
        "name": "Sauron-Projects-Service",
        "health": "Excellent",
        "at time": _t
    }
    result = Response(json.dumps(msg), status=200,
                      content_type="application/json")
    return result


@projects_api.route("/get/all", methods=["GET"])
def get_all_projects():
    """ Get all projects """
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM {}".format(TABLE))
    query_result = cursor.fetchall()

    if query_result is None:
        return "No project exists", 404
    data = []

    for exp in query_result:
        data.append({"data": Projects(*exp.values()).__dict__})
    return data


@projects_api.route("/get/<id>", methods=["GET"])
def get_project_by_id(_id):
    """ Get project by id """
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM {} where id='{}'".format(TABLE, _id))
    query_result = cursor.fetchone()

    if query_result is None:
        return "Project does not exist", 404

    return {"data": Projects(*query_result.values()).__dict__}


# TODO: ADD and UPDATE
@projects_api.route("/add", methods=["POST"])
def add_experience():
    """ Add project """
    pass


@projects_api.route("/update/<id>", methods=["PUT"])
def update_experience(_id):
    """ Update project by id """
    pass


@projects_api.route("/delete/all", methods=["DELETE"])
def remove_all_experiences():
    """ Remove all projects """
    cursor = conn.cursor()
    cursor.execute("DELETE FROM {}".format(TABLE))
    query_result = cursor.fetchall()

    if len(query_result) == 0:
        return "Deleted", 200
    return None


@projects_api.route("/delete/<id>", methods=["DELETE"])
def remove_experience_by_id(_id):
    """ Remove project by id """
    cursor = conn.cursor()
    msg = requests.get(
        URL + "/sauron/backend/proj/get/{}".format(_id), timeout=5)
    if msg.status_code == 404:
        return msg.text, 404
    cursor.execute("DELETE FROM {} where id='{}'".format(TABLE, _id))
    query_result = cursor.fetchone()

    if query_result is None:
        return id, 200

    return None
