# Use the following imports if calling from Flask's main.py
# from .Timetable import Timetable
# Use the following imports if using this file on its own
from Timetable import Timetable
import unittest

class Cohort:
    def __init__(self, name):
        self.name = name
        self.courses = []
        self.timetable = Timetable()

    def addIntoTimeTable(self, course, day, timeslot, numslots, component, cohortName, roomID = ""):
        for i in range(numslots):
            self.timetable.setTimeslot(course, day, timeslot, component, cohortName, roomID)
            timeslot += 1

    def getTimetable(self):
        return self.timetable

    def printTimetable(self):
        for i in range(len(self.timetable.week)):
            day = self.timetable.week[i]
            print(i)
            for j in range(len(day)):
                # print(day[j])
                if day[j] == []:
                    print(day[j])
                else:
                    for name in range(len(day[j])):
                        print(day[j][name])
                        #print(day[j][name][0].courseName + ", " + day[j][name][1])
            print("\n")

    def addCourses(self, course):
        self.courses.append(course)

    def getTimeslot(self, day, timeslot):
        return self.timetable.week[day][timeslot]









