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
        ## pull from firestore
        CourseDetailsDict = dbfs.collection('RawInput').document('CourseInfo').get().to_dict()

        # first course input from course lead. assumption: intructor fills in course1 before course2
        if('courseInfo1' in request.form):
            
            # first time course info is 'POST'ed. create all the fields required
            # if( Data.course==0):
            #     course = {}
            #     #creating fields for course1
            #     course['course1'] ={}
            #     course['course1']['Components']={}
            #     course['course1']['Components']['Lecture']={}
            #     course['course1']['Components']['Lecture']['CohortClasses']={}
            #     course['course1']['Components']['Lecture']['NumberSessions']={}
            #     course['course1']['Components']['Lecture']['LectSession1']={}
            #     course['course1']['Components']['Lecture']['LectSession2']={}
            #     course['course1']['Components']['Lecture']['LectSession3']={}
            #     # creating fields for course2
            #     course['course2'] ={}
            #     course['course2']['Components']={}
            #     course['course2']['Components']['Lecture']={}
            #     course['course2']['Components']['Lecture']['CohortClasses']={}
            #     course['course2']['Components']['Lecture']['NumberSessions']={}
            #     course['course2']['Components']['Lecture']['LectSession1']={}
            #     course['course2']['Components']['Lecture']['LectSession2']={}
            #     course['course2']['Components']['Lecture']['LectSession3']={}
            #     # set course to 1 so that fields are not overwritten everytime smth is posted
            #     Data.course=1


            course = {}
            course['course1'] ={}
            course['course1']['Pillar']=request.form['pillar1']
            course['course1']['CourseCode']=request.form['courseCode1']
            course['course1']['CourseTitle']=request.form['courseTitle1']
            course['course1']['Instructors']=request.form['instructors1']
            course['course1']['Course Lead']=request.form['lead1']
            course['course1']['Cohort Classes']={}

            ####### COMPONENTS
            # Lecture
            course['course1']['Components']={}
            course['course1']['Components']['Lecture']={}
            course['course1']['Components']['Lecture']['CohortClasses']={}
            course['course1']['Components']['Lecture']['NumberSessions']={}  
            course['course1']['Components']['Lecture']['LectSession1']=request.form['lect_1']
            course['course1']['Components']['Lecture']['LectSession2']=request.form['lect_2']
            course['course1']['Components']['Lecture']['LectSession3']=request.form['lect_3']
            course['course1']['Components']['Lecture']['shared']={}

            #Cohort session
            course['course1']['Components']['Cohort Session']={}
            course['course1']['Components']['Cohort Session']['Cohort Classes']={}
            course['course1']['Components']['Cohort Session']['NumberSessions']={}
            course['course1']['Components']['Cohort Session']['CohortSession1']=request.form['co_1']
            course['course1']['Components']['Cohort Session']['CohortSession2']=request.form['co_2']
            course['course1']['Components']['Cohort Session']['CohortSession3']=request.form['co_3']
            #Lab session
            course['course1']['Components']['Lab Session']={}
            course['course1']['Components']['Lab Session']['Cohort Classes']={}
            course['course1']['Components']['Lab Session']['NumberSessions']={}
            course['course1']['Components']['Lab Session']['LabSession1']=request.form['lab1']
            course['course1']['Components']['Lab Session']['LabSession2']=request.form['lab2']
            course['course1']['Components']['Lab Session']['LabSession3']=request.form['lab3']
            #course['course1']['Components']['Lab Session']['Venue']={}

            ####### soft constraints
            course['course1']['Soft Constraints']={}
            course['course1']['Soft Constraints']['0']={}
            course['course1']['Soft Constraints']['1']={}
            course['course1']['Soft Constraints']['2']={}
            course['course1']['Soft Constraints']['3']={}
            course['course1']['Soft Constraints']['4']={}
            course['course1']['Soft Constraints']['0']['0']=request.form['day1']
            course['course1']['Soft Constraints']['0']['1']=request.form['from1']
            course['course1']['Soft Constraints']['0']['2']=request.form['to1']
            course['course1']['Soft Constraints']['0']['3']=request.form['reason1']
            course['course1']['Soft Constraints']['1']['0']=request.form['day2']
            course['course1']['Soft Constraints']['1']['1']=request.form['from2']
            course['course1']['Soft Constraints']['1']['2']=request.form['to2']
            course['course1']['Soft Constraints']['1']['3']=request.form['reason2']
            course['course1']['Soft Constraints']['2']['0']=request.form['day3']
            course['course1']['Soft Constraints']['2']['1']=request.form['from3']
            course['course1']['Soft Constraints']['2']['2']=request.form['to3']
            course['course1']['Soft Constraints']['2']['3']=request.form['reason3']
            course['course1']['Soft Constraints']['3']['0']=request.form['day4']
            course['course1']['Soft Constraints']['3']['1']=request.form['from4']
            course['course1']['Soft Constraints']['3']['2']=request.form['to4']
            course['course1']['Soft Constraints']['3']['3']=request.form['reason4']
            course['course1']['Soft Constraints']['4']['0']=request.form['day5']
            course['course1']['Soft Constraints']['4']['1']=request.form['from5']
            course['course1']['Soft Constraints']['4']['2']=request.form['to5']
            course['course1']['Soft Constraints']['4']['3']=request.form['reason5']

            NewCourseDetailsDict = course 

            # paste back to firestore. this will delete the whole dict and set it from scratch.
            dbfs.collection('RawInput').document('CourseInfo').update(NewCourseDetailsDict)

        if('courseInfo2' in request.form):
            # empty course 2
            course = {}
            course['course2'] ={}
            course['course2']['Pillar']=request.form['pillar2']
            course['course2']['Course Lead']={}
            course['course2']['Cohort Classes']={}
            course['course2']['Components']={}
            course['course2']['Components']['Lecture']={}
            course['course2']['Components']['Lecture']['CohortClasses']={}
            course['course2']['Components']['Lecture']['NumberSessions']={}
            course['course2']['Components']['Lecture']['LectSession1']={}
            course['course2']['Components']['Lecture']['LectSession2']={}
            course['course2']['Components']['Lecture']['LectSession3']={}

            # course['course2']['Pillar']=request.form['pillar2']
            course['course2']['CourseCode']=request.form['courseCode2']
            course['course2']['CourseTitle']=request.form['courseTitle2']
            course['course2']['Instructors']=request.form['instructors2']
            course['course2']['Course Lead']=request.form['lead2']
            # # course['course2']['Cohort Classes']=request.form['']

            ####### COMPONENTS
            # Lecture
            course['course2']['Components']={}
            course['course2']['Components']['Lecture']={}
            course['course2']['Components']['Lecture']['CohortClasses']={}
            course['course2']['Components']['Lecture']['NumberSessions']={} 
            course['course2']['Components']['Lecture']['LectSession1']=request.form['lect_12']
            course['course2']['Components']['Lecture']['LectSession2']=request.form['lect_22']
            course['course2']['Components']['Lecture']['LectSession3']=request.form['lect_32']
            course['course2']['Components']['Lecture']['shared']={}

            # Cohort session
            course['course2']['Components']['Cohort Session']={}
            course['course2']['Components']['Cohort Session']['Cohort Classes']={}
            course['course2']['Components']['Cohort Session']['NumberSessions']={}
            course['course2']['Components']['Cohort Session']['CohortSession1']=request.form['co_12']
            course['course2']['Components']['Cohort Session']['CohortSession2']=request.form['co_22']
            course['course2']['Components']['Cohort Session']['CohortSession3']=request.form['co_32']

            # Lab session
            course['course2']['Components']['Lab Session']={}
            course['course2']['Components']['Lab Session']['Cohort Classes']={}
            course['course2']['Components']['Lab Session']['NumberSessions']={}
            course['course2']['Components']['Lab Session']['LabSession1']=request.form['lab12']
            course['course2']['Components']['Lab Session']['LabSession2']=request.form['lab22']
            course['course2']['Components']['Lab Session']['LabSession3']=request.form['lab32']
            course['course2']['Components']['Lab Session']['Venue']={}

            # course soft constraints
            course['course2']['Soft Constraints']={}
            course['course2']['Soft Constraints']['0']={}
            course['course2']['Soft Constraints']['1']={}
            course['course2']['Soft Constraints']['2']={}
            course['course2']['Soft Constraints']['3']={}
            course['course2']['Soft Constraints']['4']={}
            course['course2']['Soft Constraints']['0']['0']=request.form['day12']
            course['course2']['Soft Constraints']['0']['1']=request.form['from12']
            course['course2']['Soft Constraints']['0']['2']=request.form['to12']
            course['course2']['Soft Constraints']['0']['3']=request.form['reason12']
            course['course2']['Soft Constraints']['1']['0']=request.form['day22']
            course['course2']['Soft Constraints']['1']['1']=request.form['from22']
            course['course2']['Soft Constraints']['1']['2']=request.form['to22']
            course['course2']['Soft Constraints']['1']['3']=request.form['reason22']
            course['course2']['Soft Constraints']['2']['0']=request.form['day32']
            course['course2']['Soft Constraints']['2']['1']=request.form['from32']
            course['course2']['Soft Constraints']['2']['2']=request.form['to32']
            course['course2']['Soft Constraints']['2']['3']=request.form['reason32']
            course['course2']['Soft Constraints']['3']['0']=request.form['day42']
            course['course2']['Soft Constraints']['3']['1']=request.form['from42']
            course['course2']['Soft Constraints']['3']['2']=request.form['to42']
            course['course2']['Soft Constraints']['3']['3']=request.form['reason42']
            course['course2']['Soft Constraints']['4']['0']=request.form['day52']
            course['course2']['Soft Constraints']['4']['1']=request.form['from52']
            course['course2']['Soft Constraints']['4']['2']=request.form['to52']
            course['course2']['Soft Constraints']['4']['3']=request.form['reason52']

            NewCourseDetailsDict = course 

            # paste back to firestore. this will delete the whole dict and set it from scratch.
            dbfs.collection('RawInput').document('CourseInfo').update(NewCourseDetailsDict)



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
            return redirect(url_for('adminwelcome'))
        else:
            error = "Invalid credentials, please try again. Incorrect tries = " + str(Data.incorrectTries)
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
    coursesdocument = dbfs.collection('courses').document(courseID).get().to_dict()
    week = coursesdocument['Week']
    # print(week)
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
            # print (weeklysched)
    jsonify(weeklysched)
    return render_template('index.html', token=weeklysched)
    
@app.route("/esdschedule", methods=['GET', 'POST'])
def esdschedule():
    return render_template('index.html', token="this is from main.py (esd)")

@app.route("/asdschedule", methods=['GET', 'POST'])
def asdschedule():
    return render_template('index.html', token="this is from main.py (asd)")

app.run(debug="True")
