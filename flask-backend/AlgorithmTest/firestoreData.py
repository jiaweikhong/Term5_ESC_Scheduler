# Use the following imports if calling from Flask's main.py
from .Timetable import Timetable
from .Instructor import Instructor
from .Cohort import Cohort
from .Course import Course
from .Room import Room
from .Algorithm import Algorithm
# Use the following imports if using this file on its own
# from Timetable import Timetable
# from Instructor import Instructor
# from Cohort import Cohort
# from Course import Course
# from Room import Room
# from Algorithm import Algorithm

import random
import itertools
import unittest
import firebase_admin
from firebase_admin import credentials, firestore
import json
# from .Algorithm import Algorithm

#TODO make functions
class firestoreData:
    def __init__(self, cred, default_app, dbfs):
        self.cred = cred
        self.default_app = default_app
        self.dbfs = dbfs

        self.cohortArray = []
        self.rooms = {"Cohort": [], "Lab": [], "Lecture": []}
        self.courseArray = []
        self.instructorArray = []

        self.pullClasses()
        self.pullCourses()
        self.pullInstructors()
        self.pullRooms()

        self.algo = Algorithm(self.instructorArray, self.cohortArray, self.rooms, self.courseArray)
        # cred = credentials.Certificate('term-5-esc-scheduler-firebase-adminsdk-cfadg-cd4c469d4d.json')
        # default_app = firebase_admin.initialize_app(cred)
        # dbfs = firestore.client()

    def hihi(self):
        print("hello from firestoreData")

    #insert classes
    def pullClasses(self):
        cohortCollection = self.dbfs.collection('CohortClassInfo').get()
        #cohortArray = []
        for cohortDoc in cohortCollection:
            cohortDict = cohortDoc.to_dict()
            newCohort = Cohort(cohortDoc.id)
            self.cohortArray.append(newCohort)

    def pullRooms(self):
    #insert rooms here
        roomCollection = self.dbfs.collection('rooms').get()
        for roomDoc in roomCollection:
            roomDict = roomDoc.to_dict()
            #print(roomDict)
            newRoom = Room(roomDoc.id, roomDict['roomName'], roomDict['roomType'])
            if roomDict['roomType'] == "Cohort Classroom":
                roomType = "Cohort"
            elif roomDict['roomType'] == "Laboratory":
                roomType = "Lab"
            elif roomDict['roomType'] == "Lecture Theatre":
                roomType = "Lecture"
            self.rooms[roomType].append(newRoom)

    #initialise courses
    def pullCourses(self):
        courseCollection = self.dbfs.collection('courses').get()
        for courseDoc in courseCollection:
            courseDict = courseDoc.to_dict()
            newCourse = Course(courseDoc.id, courseDict['CourseTitle'], self.rooms, 
            courseDict['Pillar'], courseDict['CohortClasses'])

            if courseDict['Components']['Lecture']['LectSession1'] != '':
                if courseDict['Components']['Lecture']['shared']:
                    newCourse.setComponentsAndDuration("Lecture", 
                    float(courseDict['Components']['Lecture']['LectSession1']), 
                    courseDict['Components']['Lecture']['shared'], 
                    courseDict['CohortClasses'])
                else:
                    for cohort in courseDict['CohortClasses']:
                        newCourse.setComponentsAndDuration("Lecture", 
                        float(courseDict['Components']['Lecture']['LectSession1']), 
                        courseDict['Components']['Lecture']['shared'], 
                        cohort)
                
            if courseDict['Components']['Lecture']['LectSession2'] != '':
                if courseDict['Components']['Lecture']['shared']:
                    newCourse.setComponentsAndDuration("Lecture", 
                    float(courseDict['Components']['Lecture']['LectSession2']), 
                    courseDict['Components']['Lecture']['shared'], 
                    courseDict['CohortClasses'])
                else:
                    for cohort in courseDict['CohortClasses']:
                        newCourse.setComponentsAndDuration("Lecture", 
                        float(courseDict['Components']['Lecture']['LectSession2']), 
                        courseDict['Components']['Lecture']['shared'], 
                        cohort)

            if courseDict['Components']['Lecture']['LectSession3'] != '':
                if courseDict['Components']['Lecture']['shared']:
                    newCourse.setComponentsAndDuration("Lecture", 
                    float(courseDict['Components']['Lecture']['LectSession3']), 
                    courseDict['Components']['Lecture']['shared'], 
                    courseDict['CohortClasses'])
                else:
                    for cohort in courseDict['CohortClasses']:
                        newCourse.setComponentsAndDuration("Lecture", 
                        float(courseDict['Components']['Lecture']['LectSession3']), 
                        courseDict['Components']['Lecture']['shared'], 
                        cohort)

            if courseDict['Components']['Lab Session']['LabSession1'] != '':
                if courseDict['Components']['Lab Session']['shared']:
                    newCourse.setComponentsAndDuration("Lab", 
                    float(courseDict['Components']['Lab Session']['LabSession1']), 
                    courseDict['Components']['Lab Session']['shared'], 
                    courseDict['CohortClasses'])
                else:
                    for cohort in courseDict['CohortClasses']:
                        newCourse.setComponentsAndDuration("Lab", 
                        float(courseDict['Components']['Lab Session']['LabSession1']), 
                        courseDict['Components']['Lab Session']['shared'], 
                        cohort)
                
            if courseDict['Components']['Lab Session']['LabSession2'] != '':
                if courseDict['Components']['Lab Session']['shared']:
                    newCourse.setComponentsAndDuration("Lab", 
                    float(courseDict['Components']['Lab Session']['LabSession2']), 
                    courseDict['Components']['Lab Session']['shared'], 
                    courseDict['CohortClasses'])
                else:
                    for cohort in courseDict['CohortClasses']:
                        newCourse.setComponentsAndDuration("Lab", 
                        float(courseDict['Components']['Lab Session']['LabSession2']), 
                        courseDict['Components']['Lab Session']['shared'], 
                        cohort)
                
            if courseDict['Components']['Lab Session']['LabSession3'] != '':
                if courseDict['Components']['Lab Session']['shared']:
                    newCourse.setComponentsAndDuration("Lab", 
                    float(courseDict['Components']['Lab Session']['LabSession3']), 
                    courseDict['Components']['Lab Session']['shared'], 
                    courseDict['CohortClasses'])
                else:
                    for cohort in courseDict['CohortClasses']:
                        newCourse.setComponentsAndDuration("Lab", 
                        float(courseDict['Components']['Lab Session']['LabSession3']), 
                        courseDict['Components']['Lab Session']['shared'], 
                        cohort)

            if courseDict['Components']['Cohort Session']['CohortSession1'] != '':
                if courseDict['Components']['Cohort Session']['shared']:
                    newCourse.setComponentsAndDuration("Cohort", 
                    float(courseDict['Components']['Cohort Session']['CohortSession1']), 
                    courseDict['Components']['Cohort Session']['shared'], 
                    courseDict['CohortClasses'])
                else:
                    for cohort in courseDict['CohortClasses']:
                        newCourse.setComponentsAndDuration("Cohort", 
                        float(courseDict['Components']['Cohort Session']['CohortSession1']), 
                        courseDict['Components']['Cohort Session']['shared'], 
                        cohort)
                
            if courseDict['Components']['Cohort Session']['CohortSession2'] != '':
                if courseDict['Components']['Cohort Session']['shared']:
                    newCourse.setComponentsAndDuration("Cohort", 
                    float(courseDict['Components']['Cohort Session']['CohortSession2']), 
                    courseDict['Components']['Cohort Session']['shared'], 
                    courseDict['CohortClasses'])
                else:
                    for cohort in courseDict['CohortClasses']:
                        newCourse.setComponentsAndDuration("Cohort", 
                        float(courseDict['Components']['Cohort Session']['CohortSession2']), 
                        courseDict['Components']['Cohort Session']['shared'], 
                        cohort)

            if courseDict['Components']['Cohort Session']['CohortSession3'] != '':
                if courseDict['Components']['Cohort Session']['shared']:
                    newCourse.setComponentsAndDuration("Cohort", 
                    float(courseDict['Components']['Cohort Session']['CohortSession3']), 
                    courseDict['Components']['Cohort Session']['shared'], 
                    courseDict['CohortClasses'])
                else:
                    for cohort in courseDict['CohortClasses']:
                        newCourse.setComponentsAndDuration("Cohort", 
                        float(courseDict['Components']['Cohort Session']['CohortSession3']), 
                        courseDict['Components']['Cohort Session']['shared'], 
                        cohort)
            #print(newCourse.components)
            self.courseArray.append(newCourse)

    def pullInstructors(self):
        instructorCollection = self.dbfs.collection("RawInput").get()
        for instructorDoc in instructorCollection:
            instructorDict = instructorDoc.to_dict()
            coursesTeaching = []
            for course in self.courseArray:
                if course.courseID in instructorDict['Courses'].values():
                    coursesTeaching.append(course)
            newInstructor = Instructor(instructorDict['ID'], instructorDict['Name'], 
            coursesTeaching)

            for priority, details in instructorDict['SoftConstraints'].items():
                if details == {}:
                    continue
                if (not details['0'] is "") and (not details['1'] is "") and (not details['2'] is "") and (not details['3'] is ""):
                    newInstructor.addSoftConstraints(priority, details['0'],  details['1'], details['2'], 
                    details['3'])
                
            self.instructorArray.append(newInstructor)

    def replaceStringWithObject(self):
        for course in self.courseArray:
            for instructor in self.instructorArray:
                if course in instructor.getCourses():
                    course.addInstructors(instructor)

        for course in self.courseArray:
            for cohort in self.cohortArray:
                if cohort.name in course.cohorts:
                    cohort.addCourses(course)
                    course.cohorts.remove(cohort.name)
                    course.cohorts.append(cohort)

    def generateAndPushTimetable(self):
        print("Generating and pushing timetable")
        possible = self.algo.generate_schedule()
        if possible:
            #push timetable after generating it
            for course in self.courseArray:
                coursesdocument = self.dbfs.collection('courseTimetable').document(str(course.courseID))
                courseSchedule = {"Week": {}}
                for dayindex in range(5):
                    dayDict = {}
                    day = course.getTimetable().week[dayindex]
                    for time in range(len(day)):
                        elementArray = []
                        for j in day[time]:
                            for elements in j:
                                #print(elements)
                                if type(elements) == list:
                                    for i in elements:
                                        elementArray.append(i.name)
                                else:
                                    elementArray.append(str(elements))
                        dayDict[str(time)] = ", ".join(elementArray)

                    if dayindex == 0:
                        dayName = "Monday"
                    elif dayindex == 1:
                        dayName = "Tuesday"
                    elif dayindex == 2:
                        dayName = "Wednesday"
                    elif dayindex == 3:
                        dayName = "Thursday"
                    elif dayindex == 4:
                        dayName = "Friday"
                    courseSchedule["Week"][dayName] = dayDict
                    #print(courseSchedule)
                coursesdocument.set(courseSchedule)

            instructorSchedule = {}
            for instructor in self.instructorArray:
                instructorSchedule[instructor.instructorName] = {"Week": {}}

            #print(instructorSchedule)
            for instructor in self.instructorArray:
                instructorsdocument = self.dbfs.collection('instructorTimetable').document(instructor.instructorName)
                for dayindex in range(5):
                    dayDict = {}
                    day = instructor.getTimetable().week[dayindex]
                    for time in range(len(day)):
                        elementArray = []
                        for j in day[time]:
                            for elements in j:
                                #print(elements)
                                if type(elements) == list:
                                    for i in elements:
                                        elementArray.append(i.name)
                                else:
                                    elementArray.append(str(elements))
                        dayDict[str(time)] = ", ".join(elementArray)

                    if dayindex == 0:
                        dayName = "Monday"
                    elif dayindex == 1:
                        dayName = "Tuesday"
                    elif dayindex == 2:
                        dayName = "Wednesday"
                    elif dayindex == 3:
                        dayName = "Thursday"
                    elif dayindex == 4:
                        dayName = "Friday"
                    instructorSchedule[instructor.instructorName]["Week"][dayName] = dayDict
                    #instructorSchedule[instructor.instructorName]["password"] = instructor.instructorName

            instructorsdocument.set(instructorSchedule)

            for roomType in self.rooms:
                for room in self.rooms[roomType]:
                    roomsdocument = self.dbfs.collection('roomTimetable').document(room.roomID)
                    roomSchedule = {"Week": {}}
                    for dayindex in range(5):
                        dayDict = {}
                        day = room.getTimetable().week[dayindex]
                        for time in range(len(day)):
                            elementArray = []
                            for j in day[time]:
                                for elements in j:
                                    #print(elements)
                                    if type(elements) == list:
                                        for i in elements:
                                            elementArray.append(i.name)
                                    else:
                                        elementArray.append(str(elements))
                            dayDict[str(time)] = ", ".join(elementArray)
                            #print(dayDict)

                        if dayindex == 0:
                            dayName = "Monday"
                        elif dayindex == 1:
                            dayName = "Tuesday"
                        elif dayindex == 2:
                            dayName = "Wednesday"
                        elif dayindex == 3:
                            dayName = "Thursday"
                        elif dayindex == 4:
                            dayName = "Friday"
                        roomSchedule["Week"][dayName] = dayDict
                    roomsdocument.set(roomSchedule)

            for cohort in self.cohortArray:
                cohortsdocument = self.dbfs.collection('cohortTimetable').document(cohort.name)
                cohortSchedule = {"Week": {}}
                for dayindex in range(5):
                    dayDict = {}
                    day = cohort.getTimetable().week[dayindex]
                    for time in range(len(day)):
                        elementArray = []
                        for j in day[time]:
                            for elements in j:
                                #print(elements)
                                if type(elements) == list:
                                    for i in elements:
                                        elementArray.append(i.name)
                                else:
                                    elementArray.append(str(elements))
                        dayDict[str(time)] = ", ".join(elementArray)

                    if dayindex == 0:
                        dayName = "Monday"
                    elif dayindex == 1:
                        dayName = "Tuesday"
                    elif dayindex == 2:
                        dayName = "Wednesday"
                    elif dayindex == 3:
                        dayName = "Thursday"
                    elif dayindex == 4:
                        dayName = "Friday"
                    cohortSchedule["Week"][dayName] = dayDict
                cohortsdocument.set(cohortSchedule)
        print("Timetable pushed to Firestore!")

# for instructor in instructorArray:
#     print(instructor.instructorName)
#     instructor.printTimetable()
# for cohort in cohortArray:
#     print(cohort.name)
#     cohort.printTimetable()
# for key, value in rooms.items():
#     for room in value:
#         print(room.roomName)
#         room.printTimetable()