from flask import Blueprint, request, render_template, jsonify
from config import db, firestore
from .account import account_home

current_user = None
profile_bp = Blueprint('profile', __name__)
resumedata = {}
exist = False
@profile_bp.route('/create_profile', methods=['POST'])
def enter_resume():
    resumejson = request.form.get('resumejson')
    user_ref = db.collection('users').document(str(current_user))
    db.collection('profile').document(current_user).set({
        'profile': resumejson,
        'user': user_ref,
        'created': firestore.SERVER_TIMESTAMP
    })
    return account_home(current_user)

@profile_bp.route('/submit', methods=['POST'])
def get_resumedata():
    global resumedata, exist
    resumedata = request.json
    exist = True
    print(jsonify(resumedata))
    return display(jsonify(resumedata))

def display(data):
    return data

@profile_bp.route('/resume', methods=['GET'])
def show_resume():
    if not exist:
        return "<h3>No resume submitted yet.</h3>"
    return jsonify(resumedata)

def create_resume(user):
    global current_user
    current_user = user
    return render_template("createprofile.html")
