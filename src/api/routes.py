from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

api = Blueprint('api', __name__)

CORS(api)

@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message from the backend."
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_signup():
    try:
        request_body_user = request.get_json()
        if not request_body_user or not request_body_user.get('email') or not request_body_user.get('password'):
            return jsonify({"message": "Email and password are required"}), 400
        
        email = request_body_user["email"]
        password = request_body_user["password"]

        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({"message": "Email already exists"}), 409

        new_user = User(email=email, password=password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "New user added"}), 201

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Internal Server Error"}), 500

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or user.password != password:
        return jsonify({"message": "Email or password incorrect"}), 401

    token = create_access_token(identity=user.id)
    return jsonify({"token": token, "user_id": user.id}), 200

@api.route('/private', methods=['POST'])
@jwt_required()
def validate_token():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    if user is None:
        raise APIException("User not found", status_code=404)
    return jsonify("User authenticated"), 200


