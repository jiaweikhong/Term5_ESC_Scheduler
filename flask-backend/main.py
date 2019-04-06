from flask import Flask, render_template, redirect, url_for, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('term-5-esc-scheduler-firebase-adminsdk-cfadg-cd4c469d4d.json')
default_app = firebase_admin.initialize_app(cred)
dbfs = firestore.client()

adminsdocument = dbfs.collection('admins').document('LlE9Gj5E1ySq6VcIUkM0').get().to_dict()
instructorsdocument = dbfs.collection('instructors').document('JBXLfE3480F9TYQMqd4j').get().to_dict()
plannersdocument = dbfs.collection('planners').document('WnUTmtoFR8eLh6zM8Of1').get().to_dict()

app = Flask("__main__")

@app.route("/", methods=['GET', 'POST'])
def my_index():
    # print("hello1")
    return render_template("index.html", token="hi start")

def check_instructor_login(check_username, check_password):
    for instructor in instructorsdocument:
        if instructor == check_username:
            instructorinfo = instructorsdocument[check_username]
            fspassword = instructorinfo['password']
            if (check_password == fspassword):
                # print ("valid login")
                return 1
    # print ("invalid login")
    return 0

@app.route("/instructorlogin", methods=['GET', 'POST'])
def instructorlogin():
    error = None
    if request.method == 'POST':
        # Check if username match password
        check_username = request.form['email']
        check_password = request.form['password']
        # will raise error if username does not match password
        login_pass = check_instructor_login(check_username, check_password)
        if login_pass == 1:
            return redirect(url_for('instructorwelcome'))
    return render_template('index.html', error=error)


# @app.route("/instructorwelcome", methods=['GET', 'POST'])
# def instructorwelcome():
#     return render_template("index.html")


# @app.route("/uploadcourse", methods=['GET', 'POST'])
# def uploadcourse():
#     return render_template("index.html")


# @app.route("/softconstraints", methods=['GET', 'POST'])
# def softconstraints():
#     return render_template("index.html")


# @app.route("/instructornotifications", methods=['GET', 'POST'])
# def instructornotifications():
#     return render_template("index.html")


def check_admin_login(check_username, check_password):
    for admin in adminsdocument:
        if admin == check_username:
            admininfo = adminsdocument[check_username]
            fspassword = admininfo['password']
            if (check_password == fspassword):
                # print ("valid login")
                return 1
    # print ("invalid login")
    return 0


@app.route("/adminlogin", methods=['GET', 'POST'])
def adminlogin():
    error = None
    if request.method == 'POST':
        # Check if username match password
        check_username = request.form['email']
        check_password = request.form['password']
        # will raise error if user does not match password
        login_pass = check_admin_login(check_username, check_password)
        if login_pass == 1:
            return redirect(url_for('adminwelcome'))
    return render_template('index.html', token="Hello admin")


# @app.route("/adminwelcome", methods=['GET', 'POST'])
# def adminwelcome():
#     return render_template("index.html")

# @app.route("/editschedule", methods=['GET', 'POST'])
# def editschedule():
#     return render_template("index.html")

# @app.route("/adminnotifications", methods=['GET', 'POST'])
# def adminnotifications():
#     return render_template("index.html")

def check_planner_login(check_username, check_password):
    for planner in plannersdocument:
        if planner == check_username:
            plannerinfo = plannersdocument[check_username]
            fspassword = plannerinfo['password']
            if (check_password == fspassword):
                # print ("valid login")
                return 1
    # print ("invalid login")
    return 0

@app.route("/plannerlogin", methods=['GET', 'POST'])
def plannerlogin():
    if request.method == 'POST':
        # Check if username match password
        check_username = request.form['email']
        check_password = request.form['password']
        login_pass = check_planner_login(check_username, check_password)
        # will raise error if user does not match password
        if login_pass == 1:
            return redirect(url_for('plannerwelcome'))
    return render_template('index.html')

@app.route("/plannerwelcome", methods=['GET', 'POST'])
def plannerwelcome():
    if request.method == 'POST':
        if 'Freshmore' in request.form:
            return redirect(url_for('freshmoreschedule'))
        elif 'EPD' in request.form:
            return redirect(url_for('epdschedule'))
        elif 'ISTD' in request.form:
            return redirect(url_for('istdschedule'))
        elif 'ESD' in request.form:
            return redirect(url_for('esdschedule'))
        elif 'ASD' in request.form:
            return redirect(url_for('asdschedule'))
    return render_template("index.html")

@app.route("/freshmoreschedule", methods=['GET', 'POST'])
def freshmoreschedule():
    return render_template('index.html', token="this is from main.py (freshmore)")

@app.route("/epdschedule", methods=['GET', 'POST'])
def epdschedule():
    return render_template('index.html', token="this is from main.py (epd)")

def retrieveCourse(courseID):
    coursesdocument = dbfs.collection('courses').document(courseID).get().to_dict()
    week = coursesdocument['Week']
    monday = week['Monday']     # dictionary
    print (monday)
    first = monday['0']     # list
    print (first[0])
    # for i in monday:
    #     print (i, monday[i])
    return jsonify({"helloword" : "heloo" })

@app.route("/istdschedule", methods=['GET', 'POST'])
def istdschedule():
    # this is where we obtain data from firebase
    myString = retrieveCourse("50.034")
    # return template
    return render_template('index.html', token=myString)
    
@app.route("/esdschedule", methods=['GET', 'POST'])
def esdschedule():
    return render_template('index.html', token="this is from main.py (esd)")

@app.route("/asdschedule", methods=['GET', 'POST'])
def asdschedule():
    return render_template('index.html', token="this is from main.py (asd)")

# @app.route("/createschedule", methods=['GET', 'POST'])
# def createschedule():
#     return render_template("index.html")


# @app.route("/plannereditschedule", methods=['GET', 'POST'])
# def plannereditschedule():
#     return render_template("index.html")


# @app.route("/deleteschedule", methods=['GET', 'POST'])
# def deleteschedule():
#     return render_template("index.html")


# @app.route("/eventscheduling", methods=['GET', 'POST'])
# def eventscheduling():
#     return render_template("index.html")


app.run(debug="True")
