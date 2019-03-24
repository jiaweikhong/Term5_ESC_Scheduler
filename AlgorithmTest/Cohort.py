from Timetable import Timetable

class Cohort:
    def __init__(self, num, pillar):
        self.num = num
        self.pillar = pillar
        self.name = pillar + str(num)
        self.courses = []
        self.timetable = Timetable()

    def addIntoTimeTable(self, course, day, timeslot):
        self.timetable.setTimeslot(course, day, timeslot)

    def getTimetable(self):
        return self.timetable

    def printTimetable(self):
        for i in range(len(self.timetable.week)):
            day = self.timetable.week[i]
            print(str(i) + "\n")
            for j in range(len(day)):
                print(day[j])
            print("\n")

    def addCourses(self, course):
        self.courses.append(course)

    def getTimeslot(self, day, timeslot):
        return self.timetable.week[day][timeslot]




