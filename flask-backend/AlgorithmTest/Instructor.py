# Use the following imports if calling from Flask's main.py
# from .Timetable import Timetable
# Use the following imports if using this file on its own
from Timetable import Timetable

import unittest

class Instructor:
    def __init__(self, id, name, courses):
        self.instructorID = id
        self.instructorName = name
        self.coursesTeaching = courses
        self.softConstraints = {}
        self.timetable = Timetable()

    def getCourses(self):
        return self.coursesTeaching

    def addIntoTimeTable(self, course, courseID, day, timeslot, numslots, component, cohortName, roomID = ""):
        for i in range(numslots):
            self.timetable.setTimeslot(course, courseID, day, timeslot, component, cohortName, roomID)
            timeslot += 1

    def getTimetable(self):
        return self.timetable

    def printTimetable(self):
        for i in range(len(self.timetable.week)):
            day = self.timetable.week[i]
            print(i)
            for j in range(len(day)):
                #print(day[j])
                if day[j] == []:
                    print(day[j])
                else:
                    for name in range(len(day[j])):
                        #print(day[j][name][0].courseName + ", " + day[j][name][1])
                        print(day[j][name])
            print("\n")

    def getTimeslot(self, day, timeslot):
        return self.timetable.week[day][timeslot]

    def addSoftConstraints(self, priority, day, startTime, endTime, softConstraint):
        self.softConstraints[priority] = [softConstraint, day, startTime, endTime]

    def removeSoftConstraints(self, softConstraint):
        for key, value in self.softConstraints.items():
            if value[0] == softConstraint:
                self.softConstraints.pop(key)
                break
        for i in range(len(self.timetable.week)):
            day = self.timetable.week[i]
            for j in range(len(day)):
                if day[j].__contains__(softConstraint):
                    day[j] = []



