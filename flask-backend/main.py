from flask import Flask, render_template, redirect, url_for, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import json
# from AlgorithmTest.Algorithm import *

cred = credentials.Certificate('term-5-esc-scheduler-firebase-adminsdk-cfadg-cd4c469d4d.json')
default_app = firebase_admin.initialize_app(cred)
dbfs = firestore.client()

adminsdocument = dbfs.collection('admins').document('LlE9Gj5E1ySq6VcIUkM0').get().to_dict()
instructorsdocument = dbfs.collection('instructors').document('JBXLfE3480F9TYQMqd4j').get().to_dict()
plannersdocument = dbfs.collection('planners').document('WnUTmtoFR8eLh6zM8Of1').get().to_dict()
bannedaccountsdocument = dbfs.collection('bannedaccounts').document('SkLtTnXzztUdQ66QKZsA')
bannedaccountsdict = bannedaccountsdocument.get().to_dict()
bannedaccountsarray = bannedaccountsdict['banned']

app = Flask("__main__")

createInstructor = 0
class Data():
    loggedUser = ""
    pillar = ""
    incorrectLoginUser = ""
    incorrectTries = 0
    createInstructor = 0
    create=0
    course =0
    

@app.route("/", methods=['GET', 'POST'])
def my_index():
    # print("hello1")
    return render_template("index.html")##, token="hi start")

def check_instructor_login(check_username, check_password):
    bannedaccountsarray = bannedaccountsdict['banned']
    for bannedacc in bannedaccountsarray:
        if bannedacc == check_username:
            return 2
    for instructor in instructorsdocument:
        if instructor == check_username:
            instructorinfo = instructorsdocument[check_username]
            fspassword = instructorinfo['password']
            if (check_password == fspassword):      # valid login
                Data.incorrectLoginUser = ""
                Data.incorrectTries = 0
                return 1
    if (Data.incorrectLoginUser == check_username or Data.incorrectLoginUser == ""):
        Data.incorrectTries += 1
        if (Data.incorrectTries >= 3):
            bannedaccountsarray = bannedaccountsdict['banned']
            bannedaccountsarray.append(check_username)
            data = {'banned': bannedaccountsarray}
            dbfs.collection('bannedaccounts').document('SkLtTnXzztUdQ66QKZsA').set(data)
            return 2
    else:
        Data.incorrectTries = 1
    Data.incorrectLoginUser = check_username
    return 0

@app.route("/instructorlogin", methods=['GET', 'POST'])
def instructorlogin():
    error = ""
    if request.method == 'POST':
        # Check if username match password
        check_username = request.form['email']
        check_password = request.form['password']
        # will raise error if username does not match password
        login_pass = check_instructor_login(check_username, check_password)
        if login_pass == 2:
            error = "You are locked out due to consecutive login failures. Please contact your admin."
        elif login_pass == 1:
            Data.loggedUser = check_username
            return redirect(url_for('instructorwelcome'))
        else:
            error = "Invalid credentials, please try again. Incorrect tries = " + str(Data.incorrectTries)
    return render_template('index.html', error=error)

def retrieveInstructorCourses(loggedUser):
    coursesdocument = dbfs.collection('instructors').document('JBXLfE3480F9TYQMqd4j').get().to_dict()
    week = coursesdocument[loggedUser]['Week']
    # print (week)
    return week #dictionary

@app.route("/instructorwelcome", methods=['GET', 'POST'])
def instructorwelcome():
    loggedUser = Data.loggedUser
    weeklysched = retrieveInstructorCourses(loggedUser)
    jsonify(weeklysched)
    return render_template("index.html", user=loggedUser, token=weeklysched)

@app.route("/uploadcourse", methods=['GET','POST'])
def uploadcourse():
    if request.method == 'POST':
        ## submission for registered courses of instructor
        if('course' in request.form ):
         #the first time 'course' is clicked, create all the fields.
            if((Data.create ==0)):    
                InstructorDetailsDict = dbfs.collection('RawInput').document('InstructorDetails').get().to_dict()
                natalie = {}
                natalie['Natalie']={}
                natalie['Natalie']['Courses']={}
                natalie['Natalie']['Name']={}
                natalie['Natalie']['ID']={}
                natalie['Natalie']['Soft Constraints']={}
                natalie['Natalie']['Soft Constraints']['0']={}
                natalie['Natalie']['Soft Constraints']['1']={}
                natalie['Natalie']['Soft Constraints']['2']={}
                natalie['Natalie']['Soft Constraints']['3']={}
                natalie['Natalie']['Soft Constraints']['4']={}
                natalie['Natalie']['Name']=request.form['name']
                natalie['Natalie']['ID']=request.form['ID']
                natalie['Natalie']['Courses']['0']= request.form['coursecode1']
                natalie['Natalie']['Courses']['1']= request.form['coursecode2']
                natalie['Natalie']['Courses']['2']= request.form['coursecode3']
                #Data.create = 1 prevents the next "POST" from emptying all the fields again
                Data.create=1
                NewInstructorDetailsDict = natalie 
                dbfs.collection('RawInput').document('InstructorDetails').set(NewInstructorDetailsDict)
            
            #for subsequent submissions. each submission clears only courses,name,id. 
            else: 
                natalie = dbfs.collection('RawInput').document('InstructorDetails').get().to_dict()
                natalie['Natalie']['Courses']={}
                natalie['Natalie']['Name']={}
                natalie['Natalie']['ID']={}
                natalie['Natalie']['Name']=request.form['name']
                natalie['Natalie']['ID']=request.form['ID']
                natalie['Natalie']['Courses']['0']= request.form['coursecode1']
                natalie['Natalie']['Courses']['1']= request.form['coursecode2']
                natalie['Natalie']['Courses']['2']= request.form['coursecode3']
                
                dbfs.collection('RawInput').document('InstructorDetails').update(natalie)
        
        if('constraints' in request.form ):
            # soft constraint fields will be already created when instructor presses submit under courses
            natalie = dbfs.collection('RawInput').document('InstructorDetails').get().to_dict()

            natalie['Natalie']['Soft Constraints']['0']={}
            natalie['Natalie']['Soft Constraints']['1']={}
            natalie['Natalie']['Soft Constraints']['2']={}
            natalie['Natalie']['Soft Constraints']['3']={}
            natalie['Natalie']['Soft Constraints']['4']={}

            natalie['Natalie']['Soft Constraints']['0']['0']=request.form['day1']
            natalie['Natalie']['Soft Constraints']['0']['1']=request.form['from1']
            natalie['Natalie']['Soft Constraints']['0']['2']=request.form['to1']
            natalie['Natalie']['Soft Constraints']['0']['3']=request.form['reason1']
            natalie['Natalie']['Soft Constraints']['1']['0']=request.form['day2']
            natalie['Natalie']['Soft Constraints']['1']['1']=request.form['from2']
            natalie['Natalie']['Soft Constraints']['1']['2']=request.form['to2']
            natalie['Natalie']['Soft Constraints']['1']['3']=request.form['reason2']
            natalie['Natalie']['Soft Constraints']['2']['0']=request.form['day3']
            natalie['Natalie']['Soft Constraints']['2']['1']=request.form['from3']
            natalie['Natalie']['Soft Constraints']['2']['2']=request.form['to3']
            natalie['Natalie']['Soft Constraints']['2']['3']=request.form['reason3']
            natalie['Natalie']['Soft Constraints']['3']['0']=request.form['day4']
            natalie['Natalie']['Soft Constraints']['3']['1']=request.form['from4']
            natalie['Natalie']['Soft Constraints']['3']['2']=request.form['to4']
            natalie['Natalie']['Soft Constraints']['3']['3']=request.form['reason4']
            natalie['Natalie']['Soft Constraints']['4']['0']=request.form['day5']
            natalie['Natalie']['Soft Constraints']['4']['1']=request.form['from5']
            natalie['Natalie']['Soft Constraints']['4']['2']=request.form['to5']
            natalie['Natalie']['Soft Constraints']['4']['3']=request.form['reason5']

            NewInstructorDetailsDict = natalie  

            # paste back to firestore. this will delete the whole dict and set it from scratch.
            dbfs.collection('RawInput').document('InstructorDetails').update(NewInstructorDetailsDict)

    return render_template('index.html')

@app.route("/softconstraints", methods=['GET','POST'])
def CourseMaterial():
    if request.method == 'POST':
        courseCollection = dbfs.collection('courses').get()
        courseCode = request.form['courseCode1']

        # first course input from course lead. assumption: intructor fills in course1 before course2
        # if('courseInfo1' in request.form):
        instrut = request.form['instructors1']
        instructors1 = instrut.split(",")


        course = {}
        course['Pillar']=request.form['pillar1']
        course['CourseCode']=request.form['courseCode1']
        course['CourseTitle']=request.form['courseTitle1']
        course['Instructors']=instructors1
        course['CourseLead']=request.form['lead1']
        course['CohortClasses']={}
        # Instructor can search for 'Pending'  when checking which courses need to be updated
        course['Status']='Pending'

        ####### COMPONENTS
        # Lecture
        course['Components']={}
        course['Components']['Lecture']={}
        course['Components']['Lecture']['CohortClasses']={}
        course['Components']['Lecture']['NumberSessions']=request.form['lecture']
        course['Components']['Lecture']['LectSession1']=request.form['lect_1']
        course['Components']['Lecture']['LectSession2']=request.form['lect_2']
        course['Components']['Lecture']['LectSession3']=request.form['lect_3']
        course['Components']['Lecture']['shared']=bool(True)

        #Cohort session
        course['Components']['Cohort Session']={}
        course['Components']['Cohort Session']['Cohort Classes']={}
        course['Components']['Cohort Session']['NumberSessions']=request.form['cohort']
        course['Components']['Cohort Session']['CohortSession1']=request.form['co_1']
        course['Components']['Cohort Session']['CohortSession2']=request.form['co_2']
        course['Components']['Cohort Session']['CohortSession3']=request.form['co_3']
        course['Components']['Cohort Session']['shared']=bool(False)
        #Lab session
        course['Components']['Lab Session']={}
        course['Components']['Lab Session']['Cohort Classes']={}
        course['Components']['Lab Session']['NumberSessions']=request.form['lab']
        course['Components']['Lab Session']['LabSession1']=request.form['lab1']
        course['Components']['Lab Session']['LabSession2']=request.form['lab2']
        course['Components']['Lab Session']['LabSession3']=request.form['lab3']
        course['Components']['Lab Session']['Venue']={}
        course['Components']['Lab Session']['shared']=bool(False)

        ####### soft constraints
        course['SoftConstraints']={}
        course['SoftConstraints']['0']={}
        course['SoftConstraints']['1']={}
        course['SoftConstraints']['2']={}
        course['SoftConstraints']['3']={}
        course['SoftConstraints']['4']={}
        course['SoftConstraints']['0']['0']=request.form['day1']
        course['SoftConstraints']['0']['1']=request.form['from1']
        course['SoftConstraints']['0']['2']=request.form['to1']
        course['SoftConstraints']['0']['3']=request.form['reason1']
        course['SoftConstraints']['1']['0']=request.form['day2']
        course['SoftConstraints']['1']['1']=request.form['from2']
        course['SoftConstraints']['1']['2']=request.form['to2']
        course['SoftConstraints']['1']['3']=request.form['reason2']
        course['SoftConstraints']['2']['0']=request.form['day3']
        course['SoftConstraints']['2']['1']=request.form['from3']
        course['SoftConstraints']['2']['2']=request.form['to3']
        course['SoftConstraints']['2']['3']=request.form['reason3']
        course['SoftConstraints']['3']['0']=request.form['day4']
        course['SoftConstraints']['3']['1']=request.form['from4']
        course['SoftConstraints']['3']['2']=request.form['to4']
        course['SoftConstraints']['3']['3']=request.form['reason4']
        course['SoftConstraints']['4']['0']=request.form['day5']
        course['SoftConstraints']['4']['1']=request.form['from5']
        course['SoftConstraints']['4']['2']=request.form['to5']
        course['SoftConstraints']['4']['3']=request.form['reason5']


        # paste back to firestore. this will delete the whole dict and set it from scratch.
        dbfs.collection('courses').document(courseCode).set(course)



    return render_template('index.html')


@app.route("/cohortclass", methods=['GET','POST'])
def CohortInformation():
    if request.method == 'POST':

        if(request.form['ClassID']):
            ClassInfo = dbfs.collection('CohortClassInfo').get()
            classID = request.form['ClassID']
            CohortDetailsDict = {}
            
            CohortDetailsDict['pillar'] = request.form['cohortPillar']
            CohortDetailsDict['num'] = request.form['studentNo']


            dbfs.collection('CohortClassInfo').document(classID).set(CohortDetailsDict)

    return render_template('index.html')

@app.route("/editschedule", methods=['GET','POST'])
def EditSchedule():
    if request.method == 'POST':

        #course fields need to be created by instructor first. else, submission will give error
        if(request.form['courseCode']):
            courseCode = request.form['courseCode']
            CourseDetailsDict = dbfs.collection('courses').document(courseCode).get().to_dict()
            classes = request.form['cohortclass']
            classList = classes.split(",")
            
            CourseDetailsDict['CohortClasses'] = classList
            CourseDetailsDict['Components']['Lab Session']['Venue'] = request.form['venue']
            CourseDetailsDict['Components']['Lab Session']['Cohort Classes'] = classList
            CourseDetailsDict['Components']['Lecture']['Cohort Classes'] = classList
            CourseDetailsDict['Components']['Cohort Session']['Cohort Classes'] = classList
            CourseDetailsDict['Status'] = "Updated"

            dbfs.collection('courses').document(courseCode).update(CourseDetailsDict)

    return render_template('index.html')


def check_admin_login(check_username, check_password):
    bannedaccountsarray = bannedaccountsdict['banned']
    for bannedacc in bannedaccountsarray:
        if bannedacc == check_username:
            return 2
    for admin in adminsdocument:
        if admin == check_username:
            admininfo = adminsdocument[check_username]
            fspassword = admininfo['password']
            if (check_password == fspassword):      # valid login
                adminpillar = admininfo['pillar']
                Data.pillar = adminpillar
                Data.incorrectLoginUser = ""
                Data.incorrectTries = 0
                return 1
    if (Data.incorrectLoginUser == check_username or Data.incorrectLoginUser == ""):
        Data.incorrectTries += 1
        if (Data.incorrectTries >= 3):
            bannedaccountsarray = bannedaccountsdict['banned']
            bannedaccountsarray.append(check_username)
            data = {'banned': bannedaccountsarray}
            dbfs.collection('bannedaccounts').document('SkLtTnXzztUdQ66QKZsA').set(data)
            return 2
    else:
        Data.incorrectTries = 1
    Data.incorrectLoginUser = check_username
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
        if login_pass == 2:
            error = "You are locked out due to consecutive login failures. Please contact your admin."
        elif login_pass == 1:
            Data.loggedUser = check_username
            # print ("login loggeduser name : " + Data.loggedUser)
            return redirect(url_for('adminwelcome'))
        else:
            error = "Invalid credentials, please try again. Incorrect tries = " + str(Data.incorrectTries)
    return render_template('index.html', error=error)

@app.route("/adminwelcome", methods=['GET', 'POST'])
def adminwelcome():
    loggedUser = Data.loggedUser
    weeklysched = retrieveCourse("EmptyCourse")
    if request.method == 'POST':
        if '50.002' in request.form:
            weeklysched = retrieveCourse("50.002")
        elif '50.005' in request.form:
            weeklysched = retrieveCourse("50.005")
        elif '50.034' in request.form:
            weeklysched = retrieveCourse("50.034")
    jsonify(weeklysched)
    adminPillar = Data.pillar
    # print ("pillar: " + adminPillar)
    # print ("user: " + loggedUser)
    return render_template('index.html', token=weeklysched, user=loggedUser, pillar=adminPillar)

def check_planner_login(check_username, check_password):
    bannedaccountsarray = bannedaccountsdict['banned']
    for bannedacc in bannedaccountsarray:
        if bannedacc == check_username:
            return 2
    for planner in plannersdocument:
        if planner == check_username:
            plannerinfo = plannersdocument[check_username]
            fspassword = plannerinfo['password']
            if (check_password == fspassword):      # valid login
                Data.incorrectLoginUser = ""
                Data.incorrectTries = 0
                return 1
    if (Data.incorrectLoginUser == check_username or Data.incorrectLoginUser == ""):
        Data.incorrectTries += 1
        if (Data.incorrectTries >= 3):
            bannedaccountsarray = bannedaccountsdict['banned']
            bannedaccountsarray.append(check_username)
            data = {'banned': bannedaccountsarray}
            dbfs.collection('bannedaccounts').document('SkLtTnXzztUdQ66QKZsA').set(data)
            return 2
    else:
        Data.incorrectTries = 1
    Data.incorrectLoginUser = check_username
    return 0

@app.route("/plannerlogin", methods=['GET', 'POST'])
def plannerlogin():
    error = ""
    if request.method == 'POST':
        # Check if username match password
        check_username = request.form['email']
        check_password = request.form['password']
        # will raise error if user does not match password
        login_pass = check_planner_login(check_username, check_password)
        if login_pass == 2:
            error = "You are locked out due to consecutive login failures. Please contact your admin."
        elif login_pass == 1:
            Data.loggedUser = check_username
            return redirect(url_for('plannerwelcome'))
        else:
            error = "Invalid credentials, please try again. Incorrect tries = " + str(Data.incorrectTries)
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

@app.route("/createschedule", methods=['GET', 'POST'])
def createschedule():
    if request.method == 'POST':
        # run algo here
        print ("Calling algo function now...")
        # Algorithm.printHello()        # test function
    return render_template("index.html")

@app.route("/freshmoreschedule", methods=['GET', 'POST'])
def freshmoreschedule():
    return render_template('index.html', token="this is from main.py (freshmore)")

@app.route("/epdschedule", methods=['GET', 'POST'])
def epdschedule():
    return render_template('index.html', token="this is from main.py (epd)")

def retrieveCourse(courseID):
    coursesdocument = dbfs.collection('courseTimetable').document(courseID).get().to_dict()
    week = coursesdocument['Week']
    # print(week)
    return week #dictionary

@app.route("/istdschedule", methods=['GET', 'POST'])
def istdschedule():
    # this is where we obtain data from firebase
    weeklysched = retrieveCourse("EmptyCourse")
    if request.method == 'POST':
        if '50.002' in request.form:
            weeklysched = retrieveCourse("50.002")
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
