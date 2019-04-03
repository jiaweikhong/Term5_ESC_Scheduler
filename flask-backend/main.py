from flask import Flask, render_template, redirect, url_for, request, flash
import pyrebase
import time

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
    # print("hello1")
    return render_template("index.html", token="hi start")


# @app.route("/about", methods=['GET', 'POST'])
# def about():
#     if request.method == 'POST':
#         print("clickered")
#         if "click" in request.form:
#             print("clicked!")

#     return render_template("index.html")


def check_instructor_login(check_username, check_password):
    fire_password = db.child("instructors").child(
        check_username).child("password").get().val()
    if (fire_password != check_password):
        return 0
    else:
        return 1


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
    fire_password = db.child("admins").child(check_username).child(
        "password").get().val()  # retrieve password from given username
    if (fire_password != check_password):
        return 0
    else:
        return 1


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
    fire_password = db.child("planners").child(check_username).child("password").get().val()
    if (fire_password != check_password):
        return 0
    else:
        return 1

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
    # print (db.child("Courses").child(courseID).child("Monday").child("0").get().val())
    # print ( db.child("planners").child("bob").child("password").get().val())

    course = db.child("Courses").child(courseID)
    monday = course.child("Monday")
    # print (monday.child("0").get().val())
    tuesday = course.child("Tuesday")
    wednesday = course.child("Wednesday")
    thursday = course.child("Thursday")
    friday = course.child("Friday")
    print (db.child("Courses").child(courseID).child("Monday").child(0).get().val())
    print ("for loop here:dsf")
    print (db.child("Courses").child(courseID).child("Monday").child(0).get().val())


    for i in range(4):
        retstring = (db.child("Courses").child(courseID).child("Monday").child(str(i)).get().val())
        print (retstring)

    # week = [monday, tuesday, wednesday, thursday, friday]
    # for day in week:
    #     print (monday.child("0").get().val())
        # for i in range(3):
        #     print (day.child(i).get().val())
        #     if day.child(i).get().val() != None:
        #         print (day.child(i).get().val())

    # print (tuesday.child(0).get().val())
    return None

@app.route("/istdschedule", methods=['GET', 'POST'])
def istdschedule():
    # this is where we obtain data from firebase
    myString = retrieveCourse("50_034")
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
