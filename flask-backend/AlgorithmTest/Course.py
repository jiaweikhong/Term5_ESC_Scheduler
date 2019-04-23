# Use the following imports if calling from Flask's main.py
# from .Timetable import Timetable
# from .Instructor import Instructor
# from .Room import Room
# Use the following imports if using this file on its own
from Timetable import Timetable
from Instructor import Instructor
from Room import Room
import random

class Course:
    def __init__(self, id, name, venues, pillar = None, cohorts = []):
        self.courseID = id
        self.courseName = name
        self.courseInstructors = []
        self.pillar = pillar
        self.cohorts = cohorts
        #self.numComponents = {"Lecture": 0, "Cohort": 0, "Lab": 0}  # dictionary containing numLectures, numTutorials and numLabs as keys and the number as values
        #self.componentsDuration = {"Lecture": 0, "Cohort":0, "Lab": 0}  # dictionary containing lectureDuration, tutorialDuration and labDuration as keys and the number as values
        self.components = []
        self.timetable = Timetable()
        self.venue = venues #{"Cohort": None, "Lecture": None, "Lab": None}

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
            print("\n")

    def addCohorts(self, cohort):
        self.cohorts.append(cohort)

    def addInstructors(self, instructor):
        self.courseInstructors.append(instructor)

    def setComponentsAndDuration(self, componentname, duration, isShared, cohorts):
        component = (componentname, duration, isShared, cohorts)
        self.components.append(component)

    def getComponents(self):
        return self.components









