from Timetable import Timetable

class Room:
    def __init__(self, roomID, roomName, roomType):
        self.roomID = roomID
        self.roomName = roomName
        self.roomType = roomType
        self.timetable = Timetable()

    def getTimeslot(self, day, timeslot):
        return self.timetable.week[day][timeslot]

    def addIntoTimeTable(self, course, day, timeslot, numslots, component, cohortName, roomID):
        for i in range(numslots):
            self.timetable.setTimeslot(course, day, timeslot, component, cohortName, roomID)
            timeslot += 1

    def getRoomType(self):
        return self.roomType

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

