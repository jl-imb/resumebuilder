from flask import Blueprint, request, render_template, jsonify
from config import db, firestore

account_bp = Blueprint('account', __name__)

@account_bp.route('/account')
def account_home(user):
    data = db.collection('profile').document(user).get()
    if data.exists:
        data = str(data)
    else:
        data = "no info"
    return render_template("account.html", data = data)