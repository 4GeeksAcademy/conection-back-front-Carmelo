"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user_exist = User.query.filter_by(email=email).first()
    if email == "" or password == "":
        return jsonify({"msg": "El email y password son obligatorios"}), 400
    
    if user_exist is None:
        new_user = User(
            email=email,
            password=password,
        )
        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 201
    else:
        return jsonify({"msg": "El usuario ya existe"}), 409
    
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_exist = User.query.filter_by(email=email).first()
    if email == "" or password == "":
        return jsonify({"msg": "Todos los campos son obligatorios"}), 400
    if email != user_exist.email or password != user_exist.password:
        return jsonify({"msg": "El email o password no son correctos"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token),200