from flask import render_template, Flask

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/create_account', methods=['POST'])
def home():
    return render_template('home.html')

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)