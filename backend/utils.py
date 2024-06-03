""" This file manages utility functions """
from datetime import timedelta
import os
import json
import pymysql
from werkzeug.utils import secure_filename
import boto3

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv('AWS_ACCESS_ID_KEY'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def config_app(app, path):
    """ Populates environment variables """
    try:
        # with open(path, encoding='utf-8') as config_file:
        #     data = json.load(config_file)
        #     for keys in data.keys():
        #         os.environ[keys] = data[keys]
        app.secret_key = os.environ.get("SECRET") or os.urandom(24)
        app.config["SESSION_TYPE"] = os.environ.get("SESSION_TYPE", None)
        app.config["SESSION_PERMANENT"] = True if os.environ.get(
            "SESSION_PERMANENT", None) == "True" else False
        app.config["SESSION_USE_SIGNER"] = True if os.environ.get(
            "SESSION_USE_SIGNER", None) == "True" else False
        app.permanent_session_lifetime = timedelta(days=10)
    except FileNotFoundError:
        print("\nxx Config doesnt exist\n")
        exit(1)
    return app


def get_connection():
    """ Establish a connection with DB """
    usr = os.environ.get("DBUSER")
    _pw = os.environ.get("DBPW")
    _h = os.environ.get("DBHOST")
    _db = "sauron"
    conn = pymysql.connect(
        user=usr,
        password=_pw,
        host=_h,
        db=_db,
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True
    )
    return conn


def allowed_file(filename):
    """ Check for allowed file types """
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_file_to_s3(file):
    """ Utility function to upload files to s3 """
    filename = secure_filename(file.filename)
    try:
        s3.upload_fileobj(
            file,
            os.getenv("AWS_BUCKET_NAME"),
            "photography/" + filename
        )

    except Exception as _e:
        print("Error uploading image/logo: ", _e)
        return _e

    return filename

# TODO: Implement image compressor
# def image_compressor(image_file, filename):

#     image = Image.open(image_file)
#     image.save(filename,
#                  "png",
#                  optimize = True,
#                  quality = 65)
#     return
