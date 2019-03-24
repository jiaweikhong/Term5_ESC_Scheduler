from Timetable import Timetable

class Instructor:
    def __init__(self, id, name, courses):
        self.instructorID = id
        self.instructorName = name
        self.coursesTeaching = courses
        self.hardConstraints = []
        for course in self.coursesTeaching:
            self.hardConstraints.append(course)
        self.softConstraints = {}
        self.timetable = Timetable()

    def getHardConstraints(self):
        return self.hardConstraints

    def getCourses(self):
        return self.coursesTeaching

    def addIntoTimeTable(self, course, day, timeslot):
        self.timetable.setTimeslot(course, day, timeslot)

    def getTimetable(self):
        return self.timetable

    def printTimetable(self):
        for i in range(len(self.timetable.week)):
            day = self.timetable.week[i]
            print(i)
            for j in range(len(day)):
                print(day[j])
            print("\n")

    def getTimeslot(self, day, timeslot):
        #print(self.timetable.week[day][timeslot])
        #print(self.timetable.week[day][timeslot] != [])
        return self.timetable.week[day][timeslot]


# oka = Instructor(100, "Oka", ["Digital World", "Comp Struct"])
# nat = Instructor(101, "Natalie", ["Digital World", "CSE"])
# instructorArray = [oka, nat]
# print(instructorArray[0].getHardConstraints())
# print(instructorArray[1].getHardConstraints())
