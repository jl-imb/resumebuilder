from firebase_admin import firestore
from flask import Blueprint, request, render_template
from .user_profile import create_resume
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from config import db
auth_bp = Blueprint('auth', __name__)
current_user = None  # should eventually come from session or token

@auth_bp.route('/make_acc', methods=['POST'])
def make_acc():
    global current_user
    email = request.form.get('email')
    password = request.form.get('password')
    fname = request.form.get('fname')
    lname = request.form.get('lname')
    if not email or not password:
        return "Missing email or password", 400
    db.collection('users').document(email).set({
        'fname': fname,
        'lname': lname,
        'email': email,
        'password': password,
        'created': firestore.SERVER_TIMESTAMP
    })
    current_user = email
    return create_resume(current_user)

@auth_bp.route('/login')
def loginpage():
    return render_template("testlogin.html")
