from flask import Flask, render_template, redirect, url_for, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

app = Flask(__name__)

# Fetch the service account key JSON file contents
cred = credentials.Certificate(
    'term-5-esc-scheduler-firebase-adminsdk-cfadg-3d9e06988a.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://term-5-esc-scheduler.firebaseio.com/'
})
# Set firebase database reference
ref = db.reference('users')     # used for testing
adminRef = db.reference('admins')
instructorRef = db.reference('instructors')

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

# Combining with Si Wei


@app.route("/home")
def home():
    return render_template('home.html')

# Instructor:


@app.route("/instructorhome", methods=['GET', 'POST'])
def instructorhome():
    error = None
    if request.method == 'POST':
        # Check if username match password
        check_username = request.form['username']
        check_password = request.form['password']

        if (instructorRef.child(check_username).get() != check_password):
            error = 'Invalid Credentials. Please try again.'

        else:
            return redirect(url_for('instructorwelcome'))
    return render_template('instructorhome.html', error=error)

@app.route("/instructorwelcome")
def instructorwelcome():
    return render_template('instructorwelcome.html')

# Admin:

@app.route("/adminhome", methods=['GET', 'POST'])
def adminhome():
    error = None
    if request.method == 'POST':
        # Check if username match password
        check_username = request.form['username']
        check_password = request.form['password']

        if (adminRef.child(check_username).get() != check_password):
            error = 'Invalid Credentials. Please try again.'

        else:
            return redirect(url_for('adminwelcome'))
    return render_template('adminhome.html', error=error)


@app.route("/adminwelcome", methods=['GET', 'POST'])
def adminwelcome():
    if request.method == 'POST':
        if "createSchedule" in request.form:
            return redirect(url_for('courseSchedule'))
        if "viewEditSchedule" in request.form:
            return redirect(url_for('courseScheduleedit'))
    return render_template('adminwelcome.html')


@app.route("/schedulecreation")
def schedulecreation():
    return render_template('schedulecreation.html')

@app.route("/courseSchedule")
def courseSchedule():
    return render_template('courseSchedule.html')

@app.route("/courseScheduleedit")
def courseScheduleedit():
    return render_template('courseScheduleedit.html')

if __name__ == "__main__":
    app.run(debug=True)
