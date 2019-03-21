from flask import Flask, render_template, redirect, url_for, request
import pyrebase

app = Flask("__main__")

config = {
    "apiKey": "AIzaSyDBG8zzWCimpkUeuVjWQgYUcdOBI65KXUg",
    "authDomain": "term-5-esc-scheduler.firebaseapp.com",
    "databaseURL": "https://term-5-esc-scheduler.firebaseio.com",
    "projectId": "term-5-esc-scheduler",
    "storageBucket": "term-5-esc-scheduler.appspot.com",
    "messagingSenderId": "212971464322"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

@app.route("/", methods=['GET', 'POST'])
def my_index():
    #print("hello1")
    return render_template("index.html")

@app.route("/about", methods=['GET', 'POST'])
def about():
    if request.method == 'POST':
        print("clickered")
        if "click" in request.form:
            print("clicked!")

    return render_template("index.html")


def check_instructor_login(check_username, check_password):
    fire_password = db.child("instructors").child(
        check_username).child("password").get().val()
    if (fire_password != check_password):
        raise ValueError('Invalid Credentials!')
    else:
        return


@app.route("/instructorlogin", methods=['GET', 'POST'])
def instructorlogin():
    error = None
    if request.method == 'POST':
        if "instructorsubmit" in request.form:
            # Check if username match password
            check_username = request.form['username']
            check_password = request.form['password']
            # will raise error if username does not match password
            check_admin_login(check_username, check_password)
            return redirect(url_for('instructorwelcome'))
    return render_template('index.html', error=error)


@app.route("/instructorwelcome", methods=['GET', 'POST'])
def instructorwelcome():
    return render_template("index.html")


@app.route("/uploadcourse", methods=['GET', 'POST'])
def uploadcourse():
    return render_template("index.html")


@app.route("/softconstraints", methods=['GET', 'POST'])
def softconstraints():
    return render_template("index.html")


@app.route("/instructornotifications", methods=['GET', 'POST'])
def instructornotifications():
    return render_template("index.html")


def check_admin_login(check_username, check_password):
    fire_password = db.child("admins").child(check_username).child(
        "password").get().val()  # retrieve password from given username
    if (fire_password != check_password):
        raise ValueError('Invalid Credentials!')
    else:
        return


@app.route("/adminlogin", methods=['GET', 'POST'])
def adminlogin():
    error = None
    if request.method == 'POST':
        if "adminsubmit" in request.form:
            # Check if username match password
            check_username = request.form['username']
            check_password = request.form['password']
            # will raise error if user does not match password
            check_admin_login(check_username, check_password)
            return redirect(url_for('adminwelcome'))
    return render_template('index.html', error=error)


@app.route("/adminwelcome", methods=['GET', 'POST'])
def adminwelcome():
    return render_template("index.html")


@app.route("/editschedule", methods=['GET', 'POST'])
def editschedule():
    return render_template("index.html")


@app.route("/adminnotifications", methods=['GET', 'POST'])
def adminnotifications():
    return render_template("index.html")


def check_planner_login(check_username, check_password):
    fire_password = db.child("planners").child(
        check_username).child("password").get().val()
    if (fire_password != check_password):
        raise ValueError('Invalid Credentials!')
    else:
        return

@app.route("/plannerlogin", methods=['GET', 'POST'])
def plannerlogin():
    error = None
    if request.method == 'POST':
        if "plannersubmit" in request.form:
            # Check if username match password
            check_username = request.form['username']
            check_password = request.form['password']
            check_planner_login(check_username, check_password)
            # will raise error if user does not match password
            return redirect(url_for('plannerwelcome'))
    return render_template('index.html', error=error)

@app.route("/plannerwelcome", methods=['GET', 'POST'])
def plannerwelcome():
    return render_template("index.html")


@app.route("/createschedule", methods=['GET', 'POST'])
def createschedule():
    return render_template("index.html")


@app.route("/plannereditschedule", methods=['GET', 'POST'])
def plannereditschedule():
    return render_template("index.html")


@app.route("/deleteschedule", methods=['GET', 'POST'])
def deleteschedule():
    return render_template("index.html")


@app.route("/eventscheduling", methods=['GET', 'POST'])
def eventscheduling():
    return render_template("index.html")


app.run(debug="True")
