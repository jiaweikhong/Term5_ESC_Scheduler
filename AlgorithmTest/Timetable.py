class Timetable:
    def __init__(self, startTime = 8.5, endTime = 12.5):
        self.week = []
        for i in range(0, 5):
            day = []

            numTimeSlots = (endTime - startTime) / 0.5
            for time in range(int(numTimeSlots)):
                #print(numTimeSlots)
                #print(time)
                day.append([])

            self.week.append(day)


    def getTimetable(self):
        return self.week

    def setTimeslot(self, course, day, timeslot):
        self.week[day][timeslot].append(course)

#table = Timetable()
#print(table.getTimeTable())
#print(len(table.getTimeTable()))
