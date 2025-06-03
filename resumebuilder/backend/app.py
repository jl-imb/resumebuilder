from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.user_profile import profile_bp
from routes.pages import pages_bp


app = Flask(__name__)
CORS(app)

# Register route groups
app.register_blueprint(auth_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(pages_bp)

if __name__ == '__main__':
    app.run(debug=True)
