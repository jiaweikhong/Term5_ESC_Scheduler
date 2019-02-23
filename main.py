from flask import Flask, render_template, redirect, url_for, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

app = Flask(__name__)

# Fetch the service account key JSON file contents
cred = credentials.Certificate('term-5-esc-scheduler-firebase-adminsdk-cfadg-3d9e06988a.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://term-5-esc-scheduler.firebaseio.com/'
})
# Set firebase database reference
ref = db.reference('users')

# Route for handling the login page logic
@app.route("/", methods=['GET', 'POST'])
def index():
    error = None
    if request.method == 'POST':
        # Check if username match password
        check_username = request.form['username']
        check_password = request.form['password']

        if (ref.child(check_username).get() != check_password):
            error = 'Invalid Credentials. Please try again.'

        else:
            return redirect(url_for('dashboard'))
    return render_template('index.html', error=error)

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

if __name__ == "__main__":
    app.run(debug=True)