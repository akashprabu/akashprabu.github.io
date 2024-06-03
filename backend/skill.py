""" This file manages routes for skills """
import json
import uuid
from datetime import datetime
from flask import Blueprint, Response, request, jsonify
import requests
from utils import get_connection
from model import Links, Skills

skill_api = Blueprint('_api', __name__)
conn = get_connection()
table = "Skills"
URL = "http://localhost:5011/"


@skill_api.route("/health", methods=["GET"])
def test():
    """
    Test
    """
    _t = str(datetime.now())
    msg = {
        "name": "Sauron-Skill-Service",
        "health": "Excellent",
        "at time": _t
    }
    result = Response(json.dumps(msg), status=200,
                      content_type="application/json")
    return result


@skill_api.route("/get/all", methods=["GET"])
def get_all_links():
    """
    get all links
    """
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM {}".format(table))
    query_result = cursor.fetchall()

    if query_result is None:
        return "No skill exists", 404

    data = []

    for exp in query_result:
        data.append({"data": Skills(*exp.values()).__dict__})
    return data


@skill_api.route("/get/<id>", methods=["GET"])
def get_skill_by_id(id_):
    """
    get skill by id
    """
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM {} where id='{}'".format(table, id_))
    query_result = cursor.fetchone()

    if query_result is None:
        return "Skill does not exist", 404

    return {"data": Skills(*query_result.values()).__dict__}


@skill_api.route("/add", methods=["POST"])
def add_skill():
    """
    add a skill
    """
    data = request.json
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM {} where name='{}'".format(table, data['name']))
    query_result = cursor.fetchone()
    if query_result is not None:
        return "Skill already exists", 400
    try:
        id_ = str(uuid.uuid4())
        query = "INSERT INTO {} VALUES ('{}', '{}')".format(
            table, id_, data['name'] )
        cursor.execute(query)
        conn.commit()
    except Exception:
        conn.rollback()
        return "Failed to add skill ", 500
    return jsonify({
        "id": id,
        "name": data['name'],
    }), 200


@skill_api.route("/update", methods=["PUT"])
def update_skill():
    """
    update skill
    """
    data = request.json
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM {} where name='{}'".format(table, data['name']))
    query_result = cursor.fetchone()
    if query_result is None:
        return "Skill does not exist", 400
    query_data = Skills(*query_result.values()).__dict__
    try:
        query = "UPDATE {} SET name = '{}' where id = '{}'".format(
            table, data['link'], query_data['id'])
        cursor.execute(query)
        conn.commit()
    except Exception:
        conn.rollback()
        return "Failed to update skill", 500

    return "Updated skill", 200


@skill_api.route("/delete/all", methods=["DELETE"])
def remove_all_skills():
    """
    remove all skillw
    """
    cursor = conn.cursor()
    cursor.execute("DELETE FROM {}".format(table))
    query_result = cursor.fetchall()

    if len(query_result) == 0:
        return "Deleted", 200

    return None


@skill_api.route("/delete/<id>", methods=["DELETE"])
def remove_skill_by_id(id_):
    """
    remove skill by id
    """
    cursor = conn.cursor()
    msg = requests.get(
        URL + "/sauron/backend/skill/get/{}".format(id_), timeout=5)

    if msg.status_code == 404:
        return msg.text, 404

    try:
        query = "DELETE from {} where id='{}'".format(
            table, msg.json()['data']['id'])
        cursor.execute(query)
        conn.commit()
    except Exception:
        conn.rollback()
        return "Failed to delete skill", 500
    return id, 200
