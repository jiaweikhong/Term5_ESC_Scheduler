class Timetable:
    def __init__(self, startTime = 8.5, endTime = 18.5):
        self.week = []
        for i in range(0, 5):
            day = []

            if i == 2 or i == 4:
                endTime = 13.5
            else:
                endTime = 18.5

            numTimeSlots = (endTime - startTime) / 0.5
            for time in range(int(numTimeSlots)):
                #print(numTimeSlots)
                #print(time)
                day.append([])

            self.week.append(day)

    #One timeslot is (course, component, cohortName, roomID)
    def getTimetable(self):
        return self.week

    def setTimeslot(self, course, courseID, day, timeslot, component, cohortName, roomID):
        self.week[day][timeslot].append((course, courseID, component, cohortName, roomID))

    #def setHoliday(self, days):
        # #days must be in [dayindex, dayindex]
        # for i in range(5):
        #     if i in days:
        #         day = self.getTimetable()
        #         for


