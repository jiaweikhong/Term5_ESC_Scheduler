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

courseDict = dbfs.collection("RawInput").document("CourseInfo").get().to_dict()
instructorDict = dbfs.collection("RawInput").document("InstructorDetails").get().to_dict()

print(courseDict)
print(instructorDict)

# istd1 = Cohort(1, "ISTD")
# istd2 = Cohort(2, "ISTD")
# istd3 = Cohort(3, "ISTD")

# rooms = {"Cohort":[Room("2.513", "Cohort Classroom 13", "Cohort Classroom"), Room("2.514", "Cohort Classroom 14", "Cohort Classroom")],
#          "Lab":[Room("2.403", "Digital Systems Lab", "Laboratory")],
#          "Lecture":[Room("1.203", "Lecture Theatre 2", "Lecture Theatre")]}

# comp_struct = Course(1, "Comp Struct", rooms)
# dw = Course(2, "Digital World", rooms)
# cv = Course(3, "Computer Vision", rooms)
# cse = Course(4, "Computer Systems Engineering", rooms)

# # Can initialise instructors first, then loop through them and create and add in the courses and cohorts
# oka = Instructor(100, "Oka", [comp_struct, dw])
# oka.addSoftConstraints(0, 1, 8.5, 10, "Consulting slot")
# nat = Instructor(101, "Natalie", [cv, cse])

# instructorArray = [oka, nat]
# courses = [comp_struct, dw, cv, cse]
# for course in courses:
#     for instructor in instructorArray:
#         if course in instructor.getCourses():
#             course.addInstructors(instructor)
# cohorts = [istd1, istd2, istd3]
# for cohort in cohorts:
#     for course in courses:
#         cohort.addCourses(course)
# for course in courses:
#     for cohort in cohorts:
#         course.addCohorts(cohort)

# comp_struct.setComponentsAndDuration("Lecture", 1.5, True, [cohort.name for cohort in cohorts])
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
# comp_struct.setComponentsAndDuration("Lab", 1, False, "ISTD1")
# comp_struct.setComponentsAndDuration("Lab", 1, False, "ISTD2")
# comp_struct.setComponentsAndDuration("Lab", 1, False, "ISTD3")

# dw.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# dw.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# dw.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")

# cv.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# cv.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# cv.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")

# cse.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# cse.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# cse.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
# cse.setComponentsAndDuration("Lab", 1, False, "ISTD1")
# cse.setComponentsAndDuration("Lab", 1, False, "ISTD2")
# cse.setComponentsAndDuration("Lab", 1, False, "ISTD3")

# algo = Algorithm(instructorArray, cohorts, rooms)
# algo.generate_schedule()
# algo.compareScheduleForMeeting(instructorArray, 3)
# for instructor in instructorArray:
#     print(instructor.instructorName)
#     instructor.printTimetable()

# for course in courses:
#     print(course.courseName)
#     course.printTimetable()

# for cohort in cohorts:
#     print(cohort.name)
#     cohort.printTimetable()

# print(rooms['Cohort'][0].roomName)
# rooms['Cohort'][0].printTimetable()

#oka.removeSoftConstraints(("Consulting slot", None))
#oka.printTimetable()
#print(len(algo.getPossibleTimetables()))

#
# for course in courses:
#     coursesdocument = dbfs.collection('courses').document(str(course.courseID))
#     courseSchedule = {"Week": {}}
#     for dayindex in range(5):
#         dayDict = {}
#         day = course.getTimetable().week[dayindex]
#         for time in range(len(day)):
#             elementArray = []
#             for j in day[time]:
#                 for elements in j:
#                     #print(elements)
#                     if type(elements) == list:
#                         for i in elements:
#                             elementArray.append(i)
#                     else:
#                         elementArray.append(str(elements))
#             dayDict[str(time)] = ", ".join(elementArray)
#
#         if dayindex == 0:
#             dayName = "Monday"
#         elif dayindex == 1:
#             dayName = "Tuesday"
#         elif dayindex == 2:
#             dayName = "Wednesday"
#         elif dayindex == 3:
#             dayName = "Thursday"
#         elif dayindex == 4:
#             dayName = "Friday"
#         courseSchedule["Week"][dayName] = dayDict
#         #print(courseSchedule)
#     coursesdocument.set(courseSchedule)
#
# instructorSchedule = {}
# for instructor in instructorArray:
#     instructorSchedule[instructor.instructorName] = {"Week": {}, "password": ""}
#
# #print(instructorSchedule)
# instructorsdocument = dbfs.collection('instructors').document('JBXLfE3480F9TYQMqd4j')
#
# for instructor in instructorArray:
#     for dayindex in range(5):
#         dayDict = {}
#         day = instructor.getTimetable().week[dayindex]
#         for time in range(len(day)):
#             elementArray = []
#             for j in day[time]:
#                 for elements in j:
#                     #print(elements)
#                     if type(elements) == list:
#                         for i in elements:
#                             elementArray.append(i)
#                     else:
#                         elementArray.append(str(elements))
#             dayDict[str(time)] = ", ".join(elementArray)
#
#         if dayindex == 0:
#             dayName = "Monday"
#         elif dayindex == 1:
#             dayName = "Tuesday"
#         elif dayindex == 2:
#             dayName = "Wednesday"
#         elif dayindex == 3:
#             dayName = "Thursday"
#         elif dayindex == 4:
#             dayName = "Friday"
#         instructorSchedule[instructor.instructorName]["Week"][dayName] = dayDict
#         instructorSchedule[instructor.instructorName]["password"] = instructor.instructorName
#
# instructorsdocument.set(instructorSchedule)
#
# for roomType in rooms:
#     for room in rooms[roomType]:
#         roomsdocument = dbfs.collection('rooms').document(room.roomID)
#         roomSchedule = {"Week": {}}
#         for dayindex in range(5):
#             dayDict = {}
#             day = room.getTimetable().week[dayindex]
#             for time in range(len(day)):
#                 elementArray = []
#                 for j in day[time]:
#                     for elements in j:
#                         #print(elements)
#                         if type(elements) == list:
#                             for i in elements:
#                                 elementArray.append(i)
#                         else:
#                             elementArray.append(str(elements))
#                 dayDict[str(time)] = ", ".join(elementArray)
#                 #print(dayDict)
#
#             if dayindex == 0:
#                 dayName = "Monday"
#             elif dayindex == 1:
#                 dayName = "Tuesday"
#             elif dayindex == 2:
#                 dayName = "Wednesday"
#             elif dayindex == 3:
#                 dayName = "Thursday"
#             elif dayindex == 4:
#                 dayName = "Friday"
#             roomSchedule["Week"][dayName] = dayDict
#         roomsdocument.set(roomSchedule)
#
# for cohort in cohorts:
#     cohortsdocument = dbfs.collection('cohorts').document(cohort.name)
#     cohortSchedule = {"Week": {}}
#     for dayindex in range(5):
#         dayDict = {}
#         day = cohort.getTimetable().week[dayindex]
#         for time in range(len(day)):
#             elementArray = []
#             for j in day[time]:
#                 for elements in j:
#                     #print(elements)
#                     if type(elements) == list:
#                         for i in elements:
#                             elementArray.append(i)
#                     else:
#                         elementArray.append(str(elements))
#             dayDict[str(time)] = ", ".join(elementArray)
#
#         if dayindex == 0:
#             dayName = "Monday"
#         elif dayindex == 1:
#             dayName = "Tuesday"
#         elif dayindex == 2:
#             dayName = "Wednesday"
#         elif dayindex == 3:
#             dayName = "Thursday"
#         elif dayindex == 4:
#             dayName = "Friday"
#         cohortSchedule["Week"][dayName] = dayDict
#     cohortsdocument.set(cohortSchedule)