import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("resumebuilder-ebcb9-firebase-adminsdk-fbsvc-96202943df.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
