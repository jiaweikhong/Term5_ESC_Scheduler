from Timetable import Timetable
from Instructor import Instructor
from Cohort import Cohort
from Course import Course
from Room import Room
import random
import itertools
import unittest
import firebase_admin
from firebase_admin import credentials, firestore
import json
from Algorithm import Algorithm

cred = credentials.Certificate('term-5-esc-scheduler-firebase-adminsdk-cfadg-cd4c469d4d.json')
default_app = firebase_admin.initialize_app(cred)
dbfs = firestore.client()

#insert classes
cohortArray = []

#insert rooms here
rooms = {}

#initialise courses
courseCollection = dbfs.collection('courses').get()
courseArray = []
for courseDoc in courseCollection:
    courseDict = courseDoc.to_dict()
    for key, value in courseDict.items():
        newCourse = Course(courseDoc.getId(), courseDict[key]['CourseTitle'], rooms, 
        courseDict[key]['Pillar'], courseDict[key]['Cohort Classes'])

        if courseDict[key]['Components']['Lecture']['LectSession1'] != '':
            newCourse.setComponentsAndDuration(courseDict[key]['Components']['Lecture'], 
            int(courseDict[key]['Components']['Lecture']['LectSession1']), 
            bool(courseDict[key]['Components']['Lecture']['shared']), 
            courseDict[key]['Components']['Lecture']['CohortClasses'])
        
        if courseDict[key]['Components']['Lecture']['LectSession2'] != '':
            newCourse.setComponentsAndDuration(courseDict[key]['Components']['Lecture'], 
            int(courseDict[key]['Components']['Lecture']['LectSession2']), 
            bool(courseDict[key]['Components']['Lecture']['shared']), 
            courseDict[key]['Components']['Lecture']['CohortClasses'])

        if courseDict[key]['Components']['Lecture']['LectSession3'] != '':
            newCourse.setComponentsAndDuration(courseDict[key]['Components']['Lecture'], 
            int(courseDict[key]['Components']['Lecture']['LectSession3']), 
            bool(courseDict[key]['Components']['Lecture']['shared']), 
            courseDict[key]['Components']['Lecture']['CohortClasses'])

        if courseDict[key]['Components']['Lecture']['LabSession1'] != '':
            newCourse.setComponentsAndDuration(courseDict[key]['Components']['Lab Session'], 
            int(courseDict[key]['Components']['Lecture']['LabSession1']), 
            bool(courseDict[key]['Components']['Lecture']['shared']), 
            courseDict[key]['Components']['Lecture']['CohortClasses'])
        
        if courseDict[key]['Components']['Lecture']['LabSession2'] != '':
            newCourse.setComponentsAndDuration(courseDict[key]['Components']['Lab Session'], 
            int(courseDict[key]['Components']['Lecture']['LabSession2']), 
            bool(courseDict[key]['Components']['Lecture']['shared']), 
            courseDict[key]['Components']['Lecture']['CohortClasses'])
        
        if courseDict[key]['Components']['Lecture']['LabSession3'] != '':
            newCourse.setComponentsAndDuration(courseDict[key]['Components']['Lab Session'], 
            int(courseDict[key]['Components']['Lecture']['LabSession3']), 
            bool(courseDict[key]['Components']['Lecture']['shared']), 
            courseDict[key]['Components']['Lecture']['CohortClasses'])

        if courseDict[key]['Components']['Lecture']['CohortSession1'] != '':
            newCourse.setComponentsAndDuration(courseDict[key]['Components']['Cohort Session'], 
            int(courseDict[key]['Components']['Lecture']['CohortSession1']), 
            bool(courseDict[key]['Components']['Lecture']['shared']), 
            courseDict[key]['Components']['Lecture']['CohortClasses'])
        
        if courseDict[key]['Components']['Lecture']['CohortSession2'] != '':
            newCourse.setComponentsAndDuration(courseDict[key]['Components']['Cohort Session'], 
            int(courseDict[key]['Components']['Lecture']['CohortSession2']), 
            bool(courseDict[key]['Components']['Lecture']['shared']), 
            courseDict[key]['Components']['Lecture']['CohortClasses'])

        if courseDict[key]['Components']['Lecture']['CohortSession3'] != '':
            newCourse.setComponentsAndDuration(courseDict[key]['Components']['Cohort Session'], 
            int(courseDict[key]['Components']['Lecture']['CohortSession3']), 
            bool(courseDict[key]['Components']['Lecture']['shared']), 
            courseDict[key]['Components']['Lecture']['CohortClasses'])

        courseArray.append(newCourse)

#initialise instructors
instructorDict = dbfs.collection("RawInput").document("InstructorDetails").get().to_dict()
instructorArray = []
for key, value in instructorDict.items():
    coursesTeaching = []
    for course in courseArray:
        if course.courseID in instructorDict[key]['Courses'].values():
            coursesTeaching.append(course)
    newInstructor = Instructor(instructorDict[key]['ID'], instructorDict[key]['Name'], 
    coursesTeaching)

    for priority, details in instructorDict[key]['Soft Constraints'].items():
        newInstructor.addSoftConstraints(priority, details['0'],  details['1'], details['2'], 
        details['3'])
    
    instructorArray.append(newInstructor)

for course in courseArray:
    for instructor in instructorArray:
        if course in instructor.getCourses():
            course.addInstructors(instructor)

for course in courseArray:
    for cohort in cohortArray:
        if cohort.name in course.cohorts:
            cohort.addCourses(course)
            course.cohorts.remove(cohort.name)
            course.cohorts.append(cohort)

# algo = Algorithm(instructorArray, cohortArray, rooms, courseArray)
# print(algo.generateTimetableWithSoftConstraints())


#push timetable after generating it
for course in courses:
    coursesdocument = dbfs.collection('courses').document(str(course.courseID))
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
                            elementArray.append(i)
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
    coursesdocument.set(courseSchedule, merge=True)

instructorSchedule = {}
for instructor in instructorArray:
    instructorSchedule[instructor.instructorName] = {"Week": {}, "password": ""}

#print(instructorSchedule)
instructorsdocument = dbfs.collection('instructors').document('JBXLfE3480F9TYQMqd4j')

for instructor in instructorArray:
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
                            elementArray.append(i)
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
        instructorSchedule[instructor.instructorName]["password"] = instructor.instructorName

instructorsdocument.set(instructorSchedule, merge=True)

for roomType in rooms:
    for room in rooms[roomType]:
        roomsdocument = dbfs.collection('rooms').document(room.roomID)
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
                                elementArray.append(i)
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
        roomsdocument.set(roomSchedule, merge=True)

for cohort in cohorts:
    cohortsdocument = dbfs.collection('cohorts').document(cohort.name)
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
                            elementArray.append(i)
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
    cohortsdocument.set(cohortSchedule, merge=True)