from Timetable import Timetable
from Instructor import Instructor

class Course:
    def __init__(self, id, name):
        self.courseID = id
        self.courseName = name
        self.courseInstructors = []
        self.cohorts = []
        self.components = []
        self.numComponents = {}  # dictionary containing numLectures, numTutorials and numLabs as keys and the number as values
        self.componentsDuration = {}  # dictionary containing lectureDuration, tutorialDuration and labDuration as keys and the number as values
        self.termConducted = None  # is it a term 4 or term 5 or what mod
        self.timetable = Timetable()

    def addIntoTimeTable(self, course, day, timeslot):
        self.timetable.setTimeslot(course, day, timeslot)

    def getTimetable(self):
        return self.timetable

    def printTimetable(self):
        for i in range(len(self.timetable.week)):
            day = self.timetable.week[i]
            print(i)
            for i in range(len(day)):
                print(day[i])
            print("\n")

    def addCohorts(self, cohort):
        self.cohorts.append(cohort)

    def addInstructors(self, instructor):
        self.courseInstructors.append(instructor)







