""" This file manages routes for links """
import json
import uuid
from datetime import datetime
from flask import Blueprint, Response, request, jsonify
import requests
from utils import get_connection
from model import Links

link_api = Blueprint('link_api', __name__)
conn = get_connection()
table = "Links"
URL = "http://localhost:5011/"


@link_api.route("/health", methods=["GET"])
def test():
    """
    Test
    """
    _t = str(datetime.now())
    msg = {
        "name": "Sauron-Link-Service",
        "health": "Excellent",
        "at time": _t
    }
    result = Response(json.dumps(msg), status=200,
                      content_type="application/json")
    return result


@link_api.route("/get/all", methods=["GET"])
def get_all_links():
    """
    get all links
    """
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM {}".format(table))
    query_result = cursor.fetchall()

    if query_result is None:
        return "No link exists", 404

    data = []

    for exp in query_result:
        data.append({"data": Links(*exp.values()).__dict__})
    return data


@link_api.route("/get/<id>", methods=["GET"])
def get_link_by_id(id_):
    """
    get link by id
    """
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM {} where id='{}'".format(table, id_))
    query_result = cursor.fetchone()

    if query_result is None:
        return "Link does not exist", 404

    return {"data": Links(*query_result.values()).__dict__}


@link_api.route("/add", methods=["POST"])
def add_link():
    """
    add a link
    """
    data = request.json
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM {} where name='{}'".format(table, data['name']))
    query_result = cursor.fetchone()
    if query_result is not None:
        return "Link already exists", 400
    try:
        id_ = str(uuid.uuid4())
        query = "INSERT INTO {} VALUES ('{}', '{}', '{}')".format(
            table, id_, data['name'], data['link']
        )
        cursor.execute(query)
        conn.commit()
    except Exception:
        conn.rollback()
        return "Failed to add link ", 500
    return jsonify({
        "id": id,
        "name": data['name'],
        "link": data['link']
    }), 200


@link_api.route("/update", methods=["PUT"])
def update_link():
    """
    update link
    """
    data = request.json
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM {} where name='{}'".format(table, data['name']))
    query_result = cursor.fetchone()
    if query_result is None:
        return "Link does not exist", 400
    query_data = Links(*query_result.values()).__dict__
    try:
        query = "UPDATE {} SET link = '{}', name='{}' where id = '{}'".format(
            table, data['link'], data['name'], query_data['id'])
        cursor.execute(query)
        conn.commit()
    except Exception:
        conn.rollback()
        return "Failed to update link", 500

    return "Updated link", 200


@link_api.route("/delete/all", methods=["DELETE"])
def remove_all_links():
    """
    remove all links
    """
    cursor = conn.cursor()
    cursor.execute("DELETE FROM {}".format(table))
    query_result = cursor.fetchall()

    if len(query_result) == 0:
        return "Deleted", 200

    return None


@link_api.route("/delete/<id>", methods=["DELETE"])
def remove_link_by_id(id_):
    """
    remove link by id
    """
    cursor = conn.cursor()
    msg = requests.get(
        URL + "/sauron/backend/links/get/{}".format(id_), timeout=5)

    if msg.status_code == 404:
        return msg.text, 404

    try:
        query = "DELETE from {} where id='{}'".format(
            table, msg.json()['data']['id'])
        cursor.execute(query)
        conn.commit()
    except Exception:
        conn.rollback()
        return "Failed to delete link", 500
    return id, 200
