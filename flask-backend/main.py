from flask import Flask, render_template, redirect, url_for, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import json

cred = credentials.Certificate('term-5-esc-scheduler-firebase-adminsdk-cfadg-cd4c469d4d.json')
default_app = firebase_admin.initialize_app(cred)
dbfs = firestore.client()

adminsdocument = dbfs.collection('admins').document('LlE9Gj5E1ySq6VcIUkM0').get().to_dict()
instructorsdocument = dbfs.collection('instructors').document('JBXLfE3480F9TYQMqd4j').get().to_dict()
plannersdocument = dbfs.collection('planners').document('WnUTmtoFR8eLh6zM8Of1').get().to_dict()

app = Flask("__main__")

class Data():
    loggedUser = ""
    pillar = ""

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
    error = ""
    # print("helloasdf" + user)
    if request.method == 'POST':
        # Check if username match password
        check_username = request.form['email']
        check_password = request.form['password']
        # will raise error if username does not match password
        login_pass = check_instructor_login(check_username, check_password)
        # print("hello0" + user)
        if login_pass == 1:
            # print("hello" + user)
            Data.loggedUser = check_username
            return redirect(url_for('instructorwelcome'))
        error = "Invalid credentials, please try again."
    return render_template('index.html', error=error)

def retrieveInstructorCourses(loggedUser):
    coursesdocument = dbfs.collection('instructors').document('JBXLfE3480F9TYQMqd4j').get().to_dict()
    week = coursesdocument[loggedUser]['Week']
    return week #dictionary

@app.route("/instructorwelcome", methods=['GET', 'POST'])
def instructorwelcome():
    loggedUser = Data.loggedUser
    weeklysched = retrieveInstructorCourses(loggedUser)
    jsonify(weeklysched)
    return render_template("index.html", user=loggedUser, token=weeklysched)

def check_admin_login(check_username, check_password):
    for admin in adminsdocument:
        if admin == check_username:
            admininfo = adminsdocument[check_username]
            fspassword = admininfo['password']
            if (check_password == fspassword):
                # print ("valid login")
                adminpillar = admininfo['pillar']
                Data.pillar = adminpillar
                return 1
    # print ("invalid login")
    return 0

@app.route("/adminlogin", methods=['GET', 'POST'])
def adminlogin():
    error = ""
    if request.method == 'POST':
        # Check if username match password
        check_username = request.form['email']
        check_password = request.form['password']
        # will raise error if user does not match password
        login_pass = check_admin_login(check_username, check_password)
        if login_pass == 1:
            Data.loggedUser = check_username
            return redirect(url_for('adminwelcome'))
        error = "Invalid credentials, please try again."
    return render_template('index.html', error=error)

@app.route("/adminwelcome", methods=['GET', 'POST'])
def adminwelcome():
    loggedUser = Data.loggedUser
    weeklysched = retrieveCourse("EmptyCourse")
    if request.method == 'POST':
        if '50.003' in request.form:
            weeklysched = retrieveCourse("50.003")
        elif '50.005' in request.form:
            weeklysched = retrieveCourse("50.005")
        elif '50.034' in request.form:
            weeklysched = retrieveCourse("50.034")
    jsonify(weeklysched)
    adminPillar = Data.pillar
    return render_template('index.html', token=weeklysched, user=loggedUser, pillar=adminPillar)

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
    error = ""
    if request.method == 'POST':
        # Check if username match password
        check_username = request.form['email']
        check_password = request.form['password']
        login_pass = check_planner_login(check_username, check_password)
        # will raise error if user does not match password
        if login_pass == 1:
            return redirect(url_for('plannerwelcome'))
        error = "Invalid credentials, please try again."
    return render_template('index.html', error=error)

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
    return week #dictionary

@app.route("/istdschedule", methods=['GET', 'POST'])
def istdschedule():
    # this is where we obtain data from firebase
    weeklysched = retrieveCourse("EmptyCourse")
    if request.method == 'POST':
        if '50.003' in request.form:
            weeklysched = retrieveCourse("50.003")
        elif '50.005' in request.form:
            weeklysched = retrieveCourse("50.005")
        elif '50.034' in request.form:
            weeklysched = retrieveCourse("50.034")
    jsonify(weeklysched)
    return render_template('index.html', token=weeklysched)
    
@app.route("/esdschedule", methods=['GET', 'POST'])
def esdschedule():
    return render_template('index.html', token="this is from main.py (esd)")

@app.route("/asdschedule", methods=['GET', 'POST'])
def asdschedule():
    return render_template('index.html', token="this is from main.py (asd)")

app.run(debug="True")
