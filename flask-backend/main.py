from flask import Flask, render_template, redirect, url_for, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import json
from AlgorithmTest.firestoreData import *
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
    # courses = ['50.001', '50.002', '50.003', '50.005', '50.034']
    incorrectLoginUser = ""
    incorrectTries = 0
    createInstructor = 0
    course =0
    longDays = ["Monday","Tuesday","Thursday"]
    shortDays = ["Wednesday","Friday"]

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
    # coursesdocument = dbfs.collection('instructors').document('JBXLfE3480F9TYQMqd4j').get().to_dict()
    # week = coursesdocument[loggedUser]['Week']
    # # print (week)
    # return week #dictionary
    print (loggedUser)
    week = {'Monday':'error'}
    instructorTimetableCollection =  dbfs.collection('instructorTimetable').stream()
    # if (loggedUser in dbfs.collection('instructorTimetable').stream()):
    for person in instructorTimetableCollection:
        if loggedUser == person.id:
            instructordocument = dbfs.collection('instructorTimetable').document(loggedUser).get().to_dict()
            week = instructordocument['Week']
            break
    # else:
        week = {'Monday': {'0':''}, 'Tuesday': {'0':''},'Wednesday': {'0':''},'Thursday': {'0':''},'Friday': {'0':''}}
    print(week)
    return week

@app.route("/instructorwelcome", methods=['GET', 'POST'])
def instructorwelcome():
    events = obtainEvents()
    loggedUser = Data.loggedUser
    instructarray = instructorsdocument[loggedUser]
    notifbool = instructorsdocument[loggedUser]['NotifReceived']
    meeting = ''
    if request.method == 'POST':
        if 'instructorpressed' in request.form:
            if notifbool == True:
                instructorsdocument[loggedUser]['NotifReceived'] = False
                dbfs.collection('instructors').document('JBXLfE3480F9TYQMqd4j').set(instructorsdocument)
    if notifbool == True:
        notif = 'There is a new timetable since your last login. Please click outside of the box to close this notification.'
    elif notifbool == False:
        notif = 'There is no new timetable since your last login. Please click outside of the box to close this notification'
    weeklysched = retrieveInstructorCourses(loggedUser)
    jsonify(weeklysched)

    if request.method == 'POST':
        List = []
        if 'meeting' in request.form:
            instructors = request.form['instructorMeeting']
            duration = request.form['duratonMeeting']
            meetingID = request.form['meetingID']

            result = checkMeeting(meetingID)
            print(result)

            if result == False:
                meeting = 'This is an existing meeting ID'
                print("exists")

            else:
                instructorList = instructors.split(', ')
                for instructor in instructorList:
                    # print(instructor)
                    # new = instructor.strip()
                    List.append(instructor)
                print(List)
                algoRunner = firestoreData(cred, default_app, dbfs)
                algoRunner.scheduleMeeting(List,duration, meetingID)
                weeklysched = retrieveInstructorCourses(loggedUser)
                jsonify(weeklysched)

        if 'meetingdel' in request.form:
            List = Data.loggedUser
            meetingID = request.form['delmeetingID']
            algoRunner = firestoreData(cred, default_app, dbfs)
            algoRunner.deleteMeeting(List, meetingID)
            weeklysched = retrieveInstructorCourses(loggedUser)
            jsonify(weeklysched)
    

    return render_template("index.html", events=events, user=loggedUser, instructorTimetable=weeklysched, notif=notif, meeting = meeting)

def checkMeeting(meetingID):
    dummy={}
    meetingCollection = dbfs.collection('meetingID').stream()
    for ID in meetingCollection:
        if ID.id == meetingID:
            return False

    dbfs.collection('meetingID').document(meetingID).set(dummy)
    return True



@app.route("/uploadcourse", methods=['GET','POST'])
def uploadcourse():
    events = obtainEvents()
    loggedUser = Data.loggedUser
    weeklysched = retrieveInstructorCourses(loggedUser)
    if request.method == 'POST':
        ## submission for registered courses of instructor
        name = Data.loggedUser
        if('course' in request.form ):

            if(dbfs.collection('RawInput').document(name).get().exists):
                natalie = dbfs.collection('RawInput').document(name).get().to_dict()
                natalie['Courses']={}
                natalie['Name']={}
                natalie['ID']={}
                natalie['Name']=request.form['name']
                natalie['ID']=request.form['ID']
                natalie['Courses']['0']= request.form['coursecode1']
                natalie['Courses']['1']= request.form['coursecode2']
                natalie['Courses']['2']= request.form['coursecode3']

                dbfs.collection('RawInput').document(name).update(natalie)

            #the first time 'course' is clicked, create all the fields.
            else:
                InstructorDetailsDict = dbfs.collection('RawInput').get()
                natalie = {}
                natalie['Courses']={}
                natalie['Name']={}
                natalie['ID']={}
                natalie['SoftConstraints']={}
                natalie['SoftConstraints']['0']=[]
                natalie['SoftConstraints']['1']=[]
                natalie['SoftConstraints']['2']=[]
                natalie['SoftConstraints']['3']=[]
                natalie['SoftConstraints']['4']=[]
                # natalie['SoftConstraints']['0']['0']=""
                # natalie['SoftConstraints']['0']['1']=""
                # natalie['SoftConstraints']['0']['2']=""
                # natalie['SoftConstraints']['0']['3']=""
                # natalie['SoftConstraints']['1']['0']=""
                # natalie['SoftConstraints']['1']['1']=""
                # natalie['SoftConstraints']['1']['2']=""
                # natalie['SoftConstraints']['1']['3']=""
                # natalie['SoftConstraints']['2']['0']=""
                # natalie['SoftConstraints']['2']['1']=""
                # natalie['SoftConstraints']['2']['2']=""
                # natalie['SoftConstraints']['2']['3']=""
                # natalie['SoftConstraints']['3']['0']=""
                # natalie['SoftConstraints']['3']['1']=""
                # natalie['SoftConstraints']['3']['2']=""
                # natalie['SoftConstraints']['3']['3']=""
                # natalie['SoftConstraints']['4']['0']=""
                # natalie['SoftConstraints']['4']['1']=""
                # natalie['SoftConstraints']['4']['2']=""
                # natalie['SoftConstraints']['4']['3']=""
                natalie['Name']=request.form['name']
                natalie['ID']=request.form['ID']
                natalie['Courses']['0']= request.form['coursecode1']
                natalie['Courses']['1']= request.form['coursecode2']
                natalie['Courses']['2']= request.form['coursecode3']
                NewInstructorDetailsDict = natalie
                dbfs.collection('RawInput').document(name).set(NewInstructorDetailsDict)

        if('constraints' in request.form ):
            # soft constraint fields will be already created when instructor presses submit under courses
            natalie = dbfs.collection('RawInput').document(name).get().to_dict()
            natalie['SoftConstraints']={}
            natalie['SoftConstraints']['0']=[]
            natalie['SoftConstraints']['1']=[]
            natalie['SoftConstraints']['2']=[]
            natalie['SoftConstraints']['3']=[]
            natalie['SoftConstraints']['4']=[]

            natalie['SoftConstraints']['0'].append(request.form['day1'])
            natalie['SoftConstraints']['0'].append(request.form['from1'])
            natalie['SoftConstraints']['0'].append(request.form['to1'])
            natalie['SoftConstraints']['0'].append(request.form['reason1'])
            natalie['SoftConstraints']['1'].append(request.form['day2'])
            natalie['SoftConstraints']['1'].append(request.form['from2'])
            natalie['SoftConstraints']['1'].append(request.form['to2'])
            natalie['SoftConstraints']['1'].append(request.form['reason2'])
            natalie['SoftConstraints']['2'].append(request.form['day3'])
            natalie['SoftConstraints']['2'].append(request.form['from3'])
            natalie['SoftConstraints']['2'].append(request.form['to3'])
            natalie['SoftConstraints']['2'].append(request.form['reason3'])
            natalie['SoftConstraints']['3'].append(request.form['day4'])
            natalie['SoftConstraints']['3'].append(request.form['from4'])
            natalie['SoftConstraints']['3'].append(request.form['to4'])
            natalie['SoftConstraints']['3'].append(request.form['reason4'])
            natalie['SoftConstraints']['4'].append(request.form['day5'])
            natalie['SoftConstraints']['4'].append(request.form['from5'])
            natalie['SoftConstraints']['4'].append(request.form['to5'])
            natalie['SoftConstraints']['4'].append(request.form['reason5'])

            # paste back to firestore. this will delete the whole dict and set it from scratch.
            dbfs.collection('RawInput').document(name).update(natalie)

    return render_template('index.html', events=events, user=loggedUser, token=weeklysched)

@app.route("/softconstraints", methods=['GET','POST'])
def CourseMaterial():
    events = obtainEvents()
    loggedUser = Data.loggedUser
    weeklysched = retrieveInstructorCourses(loggedUser)
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
        course['Components']['Lab Session']['Venue']=""
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

    return render_template('index.html', events=events, user=loggedUser, token=weeklysched)


@app.route("/cohortclass", methods=['GET','POST'])
def CohortInformation():
    loggedUser = Data.loggedUser
    adminPillar = Data.pillar
    weeklysched = retrieveCourse('EmptyCourse')
    adminCoursesDetail = obtainCourses()
    cohortClassDetails = obtainCohorts()
    check = True
    error=""
    events = obtainEvents()

    if request.method == 'POST':

        # if(request.form['ClassID']):
        if('cohortInfo' in request.form):
            ClassInfo = dbfs.collection('CohortClassInfo').get()
            classID = request.form['ClassID']
            CohortDetailsDict = {}
            CohortDetailsDict['pillar'] = request.form['cohortPillar']
            CohortDetailsDict['num'] = request.form['studentNo']
            dbfs.collection('CohortClassInfo').document(classID).set(CohortDetailsDict)
            # cohortClassDetails = obtainCohorts()

        if('DelButton' in request.form):
            classID = request.form['delClass']
            if(dbfs.collection('CohortClassInfo').document(classID).get().exists):
                print("exist")
                dbfs.collection('CohortClassInfo').document(classID).get
                dbfs.collection('CohortClassInfo').document(classID).delete()
        cohortClassDetails = obtainCohorts()
    return render_template('index.html', events=events, user=loggedUser, pillar=adminPillar, token=weeklysched, adminCoursesDetail=adminCoursesDetail, cohortClassDetails=cohortClassDetails)

@app.route("/editschedule", methods=['GET','POST'])
def EditSchedule():
    events = obtainEvents()
    loggedUser = Data.loggedUser
    adminPillar = Data.pillar
    weeklysched = retrieveCourse('EmptyCourse')
    adminCoursesDetail = obtainCourses()
    cohortClassDetails = obtainCohorts()

    if request.method == 'POST':
        # print (weeklysched)
        #course fields need to be created by instructor first. else, submission will give error
        # if(request.form['courseCode']):
        if('please' in request.form):
            courseCode = request.form['courseCode']
            CourseDetailsDict = dbfs.collection('courses').document(courseCode).get().to_dict()
            classes = request.form['cohortclass']
            classList = classes.split(",")
            print (CourseDetailsDict)
            print (classList)

            CourseDetailsDict['CohortClasses'] = classList
            CourseDetailsDict['Components']['Lab Session']['Venue'] = request.form['venue']
            CourseDetailsDict['Components']['Lab Session']['Cohort Classes'] = classList
            CourseDetailsDict['Components']['Lecture']['Cohort Classes'] = classList
            CourseDetailsDict['Components']['Cohort Session']['Cohort Classes'] = classList
            CourseDetailsDict['Status'] = "Updated"

            dbfs.collection('courses').document(courseCode).update(CourseDetailsDict)
            adminCoursesDetail = obtainCourses()

    return render_template('index.html', events=events, user=loggedUser, pillar=adminPillar, token=weeklysched, adminCoursesDetail=adminCoursesDetail, cohortClassDetails=cohortClassDetails)




@app.route("/eventscheduling", methods=['GET','POST'])
def EventScheduling():
    unavailable = ""
    loggedUser = Data.loggedUser
    coursesInfo = obtainCourses()
    if request.method == 'POST':

        boolean = True
        if 'AddEvent' in request.form:
            dbfs.collection('Events').get
            eventTitle = request.form['titleAdd']
            event = {}
            event['EventTitle'] = request.form['titleAdd']
            event['Date'] = request.form['DateAdd']
            event['Day'] = request.form['day']
            event['Venue'] = request.form['venue']

            venue = request.form['venue']
            day = request.form['day']
            start = request.form['StartAdd']
            end = request.form['EndAdd']
            i = int(start)
            roomDocument = dbfs.collection('roomTimetable').document(venue).get().to_dict()

            if day == 'Wednesday' or day == 'Friday':
                print('short Day')
                for i in range(int(start),10):
                    if(roomDocument['Week'][day][str(i)]):
                        print('venue being used')
                        venue = "The venue is being used during this time slot"
                        boolean == False
                        break

            else:
                print("long day")
                for i in range (int(start),int(end)):
                    if(roomDocument['Week'][day][str(i)]):
                        print(roomDocument['Week'][day][str(i)])
                        unavailable = "The venue is being used during this time slot"
                        boolean = False
                        print(boolean)
                        break
            print(boolean)
            if boolean == True:
                start = convertTime(boolean, start)
                end = convertTime(boolean, end)

                event['StartTime']= start
                event['EndTime'] = end
                dbfs.collection('Events').document(eventTitle).set(event)

        if 'DelEvent' in request.form:
            eventTitle = request.form['titleDel']
            dbfs.collection('Events').document(eventTitle).get
            dbfs.collection('Events').document(eventTitle).delete()

    events = obtainEvents()
    
    return render_template('index.html', events=events, unavailable=unavailable, user=loggedUser, coursesInfo=coursesInfo)



def convertTime(boolean, time):
    if(boolean == True):
        start = 8.5
        for i in range(0,20) :
            if str(i) == time:
                return str(start)
            else:
                start += 0.5
    return str(time)


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
    events = obtainEvents()
    loggedUser = Data.loggedUser
    weeklysched = retrieveCourse("EmptyCourse")
    adminarray = adminsdocument[loggedUser]
    notifbool = adminsdocument[loggedUser]['NotifReceived']
    adminCoursesDetail = obtainCourses()
    cohortClassDetails = obtainCohorts()
    if request.method == 'POST':
        if '50.001' in request.form:
            weeklysched = retrieveCourse("50.001")
        elif '50.002' in request.form:
            weeklysched = retrieveCourse("50.002")
        elif '50.005' in request.form:
            weeklysched = retrieveCourse("50.005")
        elif '50.012' in request.form:
            weeklysched = retrieveCourse("50.012")
        elif '50.034' in request.form:
            weeklysched = retrieveCourse("50.034")
        elif 'adminpressed' in request.form:
            if notifbool == True:
                adminsdocument[loggedUser]['NotifReceived'] = False
                dbfs.collection('admins').document('LlE9Gj5E1ySq6VcIUkM0').set(adminsdocument)
    if notifbool == True:
        notif = 'Welcome, there is a new timetable since your last login. Please click outside of the box to close this notification.'
    elif notifbool == False:
        notif = 'Welcome, there is no new timetable since your last login. Please click outside of the box to close this notification'
    jsonify(weeklysched)
    adminPillar = Data.pillar
    # print ("pillar: " + adminPillar)
    # print ("user: " + loggedUser)
    print (adminCoursesDetail)
    return render_template('index.html', events=events, token=weeklysched, user=loggedUser, pillar=adminPillar, adminCoursesDetail=adminCoursesDetail, cohortClassDetails=cohortClassDetails, notif=notif)

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
    events=obtainEvents()
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
    return render_template('index.html', error=error, events=events)

def obtainCohorts():
    cohortsInfo = {}
    document = dbfs.collection('CohortClassInfo').stream()
    for cohortID in document:
        cohortInfo = dbfs.collection('CohortClassInfo').document(cohortID.id).get().to_dict()
        cohortsInfo[cohortID.id] = cohortInfo
    # print (cohortInfo)
    return cohortsInfo

def obtainCourses():
    coursesInfo = {}
    document = dbfs.collection('courses').stream()
    # coursesInfo = document.getData()
    for courseID in document:
        # print(courseID.id)
        courseInfo = dbfs.collection('courses').document(courseID.id).get().to_dict()
        coursesInfo[courseID.id] = courseInfo
    # print (coursesInfo)
    return coursesInfo

def obtainEvents():
    eventsCollection = dbfs.collection("Events").stream()
    events = {}
    for event in eventsCollection:
        eventInfo = dbfs.collection("Events").document(event.id).get().to_dict()
        events[event.id] = eventInfo
    return events


@app.route("/plannerwelcome", methods=['GET', 'POST'])
def plannerwelcome():
    events = obtainEvents()
    coursesInfo = obtainCourses()
    user = Data.loggedUser
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

    # print (coursesInfo)
    return render_template("index.html", events=events, coursesInfo = coursesInfo, user=user)

def duration(start,end):
    time = []
    for i in range (int(start),int(end)+1):
        time.append(i)
        i+=1
    return time



def obtainInstructors(instructors):
    InstructorInfo = {}
    for prof in instructors:
        if prof:
            profInfo = dbfs.collection('instructorTimetable').document(prof).get().to_dict()
            InstructorInfo[prof] = profInfo
            print(profInfo)
    return InstructorInfo

@app.route("/createschedule", methods=['GET', 'POST'])
def createschedule():
    coursesInfo = obtainCourses()
    user = Data.loggedUser
    events = obtainEvents()
    noclass=""
    message = ""
    events = obtainEvents()
    errorCourse = ""
    errorInstructor =""
    errorRoom=""
    errorCohort = ""
    classAdd=""
    added =""
    deleted = ""
    if request.method == 'POST':
        # run algo here
        print ("Calling algo function now...")
        if 'changebool' in request.form:
            print(instructorsdocument)
            instructorsdocument['Sudipta']['NotifReceived'] = True
            instructorsdocument['Natalie Agus']['NotifReceived'] = True
            adminsdocument['ASDadmin']['NotifReceived'] = True
            adminsdocument['ESDadmin']['NotifReceived'] = True
            adminsdocument['EPDadmin']['NotifReceived'] = True
            adminsdocument['ISTDadmin']['NotifReceived'] = True
            dbfs.collection('instructors').document('JBXLfE3480F9TYQMqd4j').set(instructorsdocument)
            dbfs.collection('admins').document('LlE9Gj5E1ySq6VcIUkM0').set(adminsdocument)
        if 'delCourse' in request.form:
            courseCode = request.form['courseCodedel']
            start = request.form['delStart']
            end = request.form['delEnd']
            day = request.form['daydel']
            timeslot = duration(start,end)
            venue = request.form['venueDel']
            session = request.form['typeDel']
            cohort = request.form['cohortDel']
            title = request.form['titleDel']
            instructors = {}

            courseInfo = dbfs.collection('courses').document(courseCode).get().to_dict()
            instrucInfo = courseInfo['Instructors']


            if (day == 'Wednesday' or day == 'Friday') and (int(start) > 9 or int(end) > 9):
                noclass = " There are no classes after 1pm on  "+day

            else:

                CourseDoc = dbfs.collection('courseTimetable').document(courseCode).get().to_dict()
                cohortDocument = dbfs.collection('cohortTimetable').document(cohort).get().to_dict()
                # instructorDocument = dbfs.collection('instructorTimetable').get()
                roomDocument = dbfs.collection('roomTimetable').document(venue).get().to_dict()
                InstructorDoc = obtainInstructors(instrucInfo)
                # print(InstructorDoc)


                for i in timeslot:
                    #COURSES
                    if(CourseDoc['Week'][day][str(i)]):
                        courseList = CourseDoc['Week'][day][str(i)].split(',')
                        code1 = courseList[1].strip()
                        if code1 == courseCode:
                            CourseDoc['Week'][day][str(i)] = ""

                    #COHORTS
                    if(cohortDocument['Week'][day][str(i)]):
                        cohortList = cohortDocument['Week'][day][str(i)].split(',')
                        code2 = cohortList[1].strip()
                        if code2 == courseCode:
                            cohortDocument['Week'][day][str(i)] = ""

                    #ROOMS
                    if(roomDocument['Week'][day][str(i)]):
                        roomList = roomDocument['Week'][day][str(i)].split(',')
                        code3 = roomList[1].strip()
                        print(code3)
                        if code3 == courseCode:
                            print('passed3')
                            roomDocument['Week'][day][str(i)] = ""

                    #INSTRUCTORS
                    for instructor in instrucInfo:
                        if InstructorDoc[instructor]['Week'][day][str(i)]:
                            List = InstructorDoc[instructor]['Week'][day][str(i)].split(',')
                            code4 = List[1].strip()
                            print(code4)
                            if code4 == courseCode:
                                InstructorDoc[instructor]['Week'][day][str(i)] = ""

                dbfs.collection('courseTimetable').document(courseCode).set(CourseDoc)
                dbfs.collection('cohortTimetable').document(cohort).set(cohortDocument)
                dbfs.collection('roomTimetable').document(venue).set(roomDocument)
                for instructor in instrucInfo:
                    dbfs.collection('instructorTimetable').document(instructor).set(InstructorDoc[instructor])
                deleted = "Course has been successfully deleted"

        if 'addCourse' in request.form:
            print('addCourse')

            courseCode = request.form['courseCode']
            start = request.form['StartAdd']
            end = request.form['EndAdd']
            day = request.form['day']
            venue = request.form['venue']
            session = request.form['type']
            cohort = request.form['cohort']
            timeslot = duration(start,end)
            check = False
            courseTitle = request.form['courseTitle']
            errorCourse = ""
            errorInstructor =""
            errorRoom=""
            errorCohort = ""

            courseInfo = dbfs.collection('courses').document(courseCode).get().to_dict()
            instrucInfo = courseInfo['Instructors']

            if (day == 'Wednesday' or day == 'Friday') and (int(start) > 9 or int(end) > 9):
                classAdd = "This timeslot is blocked out for events/activities"

            else:

                CourseDoc = dbfs.collection('courseTimetable').document(courseCode).get().to_dict()
                cohortDocument = dbfs.collection('cohortTimetable').document(cohort).get().to_dict()
                roomDocument = dbfs.collection('roomTimetable').document(venue).get().to_dict()
                InstructorDoc = obtainInstructors(instrucInfo)
                # print(InstructorDoc)

                # check courseTimetable availability
                for i in timeslot:
                    if CourseDoc['Week'][day][str(i)]:
                        check = True
                        errorCourse = courseCode + " is having a session during this timeslot"
                        break

                for i in timeslot:
                    if cohortDocument['Week'][day][str(i)]:
                        check = True
                        errorCohort = cohort + " is having a another class during this timeslot"
                        break


                for instructor in instrucInfo:
                    print(instructor)
                    for i in timeslot:
                        if InstructorDoc[instructor]['Week'][day][str(i)]:
                            check = True
                            errorInstructor = instructor + " is having another class during this timeslot"
                            break

                for i in timeslot:
                    if roomDocument['Week'][day][str(i)]:
                        check = True
                        errorRoom = venue + " is occupied during this timeslot"
                        break


                #ADDING NEW COURSE TO ALL TIMETABLES
                if check == False:
                    for i in timeslot:
                        CourseDoc['Week'][day][str(i)] = courseTitle + ","+courseCode+","+session +","+ cohort +","+ venue

                        cohortDocument['Week'][day][str(i)] = courseTitle + ","+courseCode+","+session +","+ cohort +","+ venue

                        roomDocument['Week'][day][str(i)] = courseTitle + ","+courseCode+","+session +","+ cohort +","+ venue

                        for instructor in instrucInfo:
                            InstructorDoc[instructor]['Week'][day][str(i)] = courseTitle + ","+courseCode+","+session +","+ cohort +","+ venue


                    dbfs.collection('courseTimetable').document(courseCode).update(CourseDoc)
                    dbfs.collection('cohortTimetable').document(cohort).update(cohortDocument)
                    dbfs.collection('roomTimetable').document(venue).update(roomDocument)
                    for instructor in InstructorDoc:
                        dbfs.collection('instructorTimetable').document(instructor).update(InstructorDoc[instructor])
                    added = "Course has been successfully added."

        if 'generateButton' in request.form:
            # # run algo here
            print ("Calling algo function now...")
            algoRunner = firestoreData(cred, default_app, dbfs)
            # # algoRunner.hihi()
            timetableGenerated = algoRunner.generateAndPushTimetable()
            if timetableGenerated == True:
                message = "Timetable generated!"
            else:
                message = "Timetable cannot be generated :("
    return render_template("index.html", events=events, coursesInfo = coursesInfo, user=user, message=message,errorCohort=errorCohort,errorCourse=errorCourse,errorInstructor=errorInstructor,errorRoom=errorRoom,noclass=noclass,classAdd=classAdd,added = added, deleted = deleted)

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
    user = Data.loggedUser
    coursesInfo = obtainCourses()
    events = obtainEvents()
    # this is where we obtain data from firebase
    weeklysched = retrieveCourse("EmptyCourse")
    if request.method == 'POST':
        if '50.001' in request.form:
            weeklysched = retrieveCourse("50.001")
        elif '50.002' in request.form:
            weeklysched = retrieveCourse("50.002")
        elif '50.003' in request.form:
            weeklysched = retrieveCourse("50.003")
        elif '50.005' in request.form:
            weeklysched = retrieveCourse("50.005")
        elif '50.034' in request.form:
            weeklysched = retrieveCourse("50.034")
    jsonify(weeklysched)
    return render_template('index.html', token=weeklysched, coursesInfo=coursesInfo, user=user, events=events)

@app.route("/esdschedule", methods=['GET', 'POST'])
def esdschedule():
    return render_template('index.html', token="this is from main.py (esd)")

@app.route("/asdschedule", methods=['GET', 'POST'])
def asdschedule():
    return render_template('index.html', token="this is from main.py (asd)")

if __name__ == "__main__":
    app.run(debug="True")
