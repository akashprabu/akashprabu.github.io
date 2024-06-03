""" Main server file """
import json
from datetime import datetime
from flask_cors import CORS
from flask import Flask, session, Response
from flask_session import Session
from utils import get_connection, config_app


sauron = Flask(__name__)
PATH = "config.example.json"
sauron = config_app(sauron, path=PATH)
CORS(sauron)
conn = get_connection()
Session(sauron)

#pylint: disable=wrong-import-position
from experience import experience_api
from bio import bio_api
from projects import projects_api
from photography import photo_api
from links import link_api
from skill import skill_api
from associations import association_api

sauron.register_blueprint(experience_api, url_prefix='/sauron/backend/exp')
sauron.register_blueprint(bio_api, url_prefix='/sauron/backend/bio')
sauron.register_blueprint(projects_api, url_prefix='/sauron/backend/project')
sauron.register_blueprint(photo_api, url_prefix='/sauron/backend/photo')
sauron.register_blueprint(link_api, url_prefix='/sauron/backend/link')
sauron.register_blueprint(skill_api, url_prefix='/sauron/backend/skill')
sauron.register_blueprint(association_api, url_prefix='/sauron/backend/association')


@sauron.route("/sauron/health", methods = ["GET"])
def health():
    """ Server health """
    _t = str(datetime.now())
    msg = {
        "name": "Sauron-Service",
        "health": "Excellent",
        "at time": _t
    }
    session.clear()
    result = Response(json.dumps(msg), status=200, content_type="application/json")
    return result


@sauron.route("/sauron/login", methods = ["POST"])
def login():
    """ Manage Login """
    pass

sauron.route("/sauron/logout", methods = ["GET"])
def logout():
    """ Manage Logout """
    pass


# if __name__ == "__main__":
#     sauron.run('0.0.0.0', port = 5011, debug=True)
    
