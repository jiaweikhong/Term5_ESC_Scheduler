from Timetable import Timetable
from Instructor import Instructor
from Cohort import Cohort
from Course import Course
from Room import Room
import random
import itertools
import unittest

# TODO assign venues (algorithm)
# TODO instructors who take different cohorts
# TODO how to realise if schedule not possible -> check if there are course components left over! Then return None and print something
# TODO generate multiple timetables for every possible permutation of courses
# TODO function for holidays
# TODO initialising the objects from website data

class Algorithm:

    def __init__(self, instructors, cohorts, rooms):
        self.totalCourses = []
        self.instructors = instructors
        self.cohorts = cohorts
        #self.possibleTimetables = []
        self.rooms = rooms

        self.totalCourses = [constraint for instructor in instructors for constraint in instructor.getHardConstraints()]
        self.courseComponents = {course.courseName: course.getComponents() for course in self.totalCourses}

    def generate_schedule(self):

        # Randomise the courses
        permutedCourses = itertools.permutations(self.totalCourses)

        random.shuffle(self.totalCourses)

        for course in self.totalCourses:
            coursesAdded = []
            course_timetable = course.getTimetable()

            for dayindex in range(len(course_timetable.week)):
                #coursesAdded = []
                if self.courseComponents[course.courseName] != []:
                    courseComponent = self.courseComponents[course.courseName][0]
                else:
                    break

                day = course_timetable.week[dayindex]
                duration = int(courseComponent[1] / 0.5)
                #componentName = courseComponent[0]

                for time in range(0, len(day), duration):
                    # ensure that the duration doesn't exceed the ending time
                    if duration > len(day) - 1 - time:
                        break

                    if self.courseComponents[course.courseName] != []:
                        courseComponent = self.courseComponents[course.courseName][0]
                        componentName = courseComponent[0]
                    else:
                        break

                    chosenRoom = self.rooms[courseComponent[0]][random.randint(0, len(self.rooms[courseComponent[0]]) - 1)]

                    conditions = (day[time] == [],
                                  self.checkInstructorSchedule(self.instructors, dayindex, time),
                                  self.checkClassSchedule(self.cohorts, dayindex, time),
                                  self.isCourseOnSameDay(course.courseName, self.cohorts, courseComponent[3], dayindex),
                                  self.checkRoomAvailability(chosenRoom, dayindex, time))
                    if all(conditions):  # all is for and, any is for or
                        course.addIntoTimeTable(course, dayindex, time, duration, componentName, courseComponent[3], chosenRoom.roomID)
                        for instructor in course.courseInstructors:
                            instructor.addIntoTimeTable(course, dayindex, time, duration, componentName, courseComponent[3], chosenRoom.roomID)
                        for cohort in course.cohorts:
                            if courseComponent[2] is False and courseComponent[3] == cohort.name:
                                cohort.addIntoTimeTable(course, dayindex, time, duration, componentName, courseComponent[3], chosenRoom.roomID)
                            elif courseComponent[2] is True:
                                cohort.addIntoTimeTable(course, dayindex, time, duration, componentName, courseComponent[3], chosenRoom.roomID)
                        chosenRoom.addIntoTimeTable(course, dayindex, time, duration, componentName, courseComponent[3], chosenRoom.roomID)
                        coursesAdded.append(course)
                        self.courseComponents[course.courseName].remove(courseComponent)

        for course in self.totalCourses:
            for component in self.courseComponents[course.courseName]:
                if component != []:
                    for cohort in self.cohorts:
                        cohort.timetable = Timetable()
                    for roomType in self.rooms:
                        for room in self.rooms[roomType]:
                            room.timetable = Timetable()
                    for instructor in self.instructors:
                        instructor.timetable = Timetable()
                    for course in self.totalCourses:
                        course.timetable = Timetable()
                    return False

        return True

    #def generate_holiday_timetable(self):

    def checkInstructorSchedule(self, instructors, day, time):
        for instructor in instructors:
            if instructor.getTimeslot(day, time) != []:
                return False
        return True


    def checkClassSchedule(self, classes, day, time):
        for cohort in classes:
            if cohort.getTimeslot(day, time) != []:
                return False
        return True

    def checkRoomAvailability(self, room, day, time):
        if room == None:
            return True
        if room.getTimeslot(day, time) != []:
            return False
        return True

    def isCourseOnSameDay(self, courseName, cohorts, className, dayindex):
        for cohort in cohorts:
            if className == cohort.name:
                day = cohort.timetable.week[dayindex]
                for time in day:
                    for j in time:
                        if j == []:
                            continue
                        elif j[0].courseName == courseName:
                            return False
        return True

    def compareScheduleForMeeting(self, instructors, duration, meetingRoom = None, meetingName = "Meeting"):
        duration = int(duration / 0.5)
        for dayindex in range(5):
            day = instructors[0].getTimetable().week[dayindex]
            for time in range(0, len(day), duration):
                if duration > len(day) - 1 - time:
                    break
                if self.checkInstructorSchedule(instructors, dayindex, time):
                    for instructor in instructors:
                        instructor.addIntoTimeTable(meetingName, dayindex, time, duration, None, None, meetingRoom)
                    return

# Have a function that generates multiple possible timetables and store them in an array

istd1 = Cohort(1, "ISTD")
istd2 = Cohort(2, "ISTD")
istd3 = Cohort(3, "ISTD")

rooms = {"Cohort":[Room("2.513", "Cohort Classroom 13", "Cohort Classroom"), Room("2.514", "Cohort Classroom 14", "Cohort Classroom")],
         "Lab":[Room("2.403", "Digital Systems Lab", "Laboratory")],
         "Lecture":[Room("1.203", "Lecture Theatre 2", "Lecture Theatre")]}

comp_struct = Course(1, "Comp Struct", rooms)
dw = Course(2, "Digital World", rooms)
cv = Course(3, "Computer Vision", rooms)
cse = Course(4, "Computer Systems Engineering", rooms)

# Can initialise instructors first, then loop through them and create and add in the courses and cohorts
oka = Instructor(100, "Oka", [comp_struct, dw])
oka.addSoftConstraints(0, 1, 8.5, 10, "Consulting slot")
nat = Instructor(101, "Natalie", [cv, cse])

instructorArray = [oka, nat]
courses = [comp_struct, dw, cv, cse]
for course in courses:
    for instructor in instructorArray:
        if course in instructor.getCourses():
            course.addInstructors(instructor)
cohorts = [istd1, istd2, istd3]
for cohort in cohorts:
    for course in courses:
        cohort.addCourses(course)
for course in courses:
    for cohort in cohorts:
        course.addCohorts(cohort)

comp_struct.setComponentsAndDuration("Lecture", 1.5, True, [cohort.name for cohort in cohorts])
comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
comp_struct.setComponentsAndDuration("Lab", 1, False, "ISTD1")
comp_struct.setComponentsAndDuration("Lab", 1, False, "ISTD2")
comp_struct.setComponentsAndDuration("Lab", 1, False, "ISTD3")

dw.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
dw.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
dw.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")

cv.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
cv.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
cv.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")

cse.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
cse.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
cse.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
cse.setComponentsAndDuration("Lab", 1, False, "ISTD1")
cse.setComponentsAndDuration("Lab", 1, False, "ISTD2")
cse.setComponentsAndDuration("Lab", 1, False, "ISTD3")

algo = Algorithm(instructorArray, cohorts, rooms)
algo.generate_schedule()
algo.compareScheduleForMeeting(instructorArray, 3)
for instructor in instructorArray:
    print(instructor.instructorName)
    instructor.printTimetable()

for course in courses:
    print(course.courseName)
    course.printTimetable()

for cohort in cohorts:
    print(cohort.name)
    cohort.printTimetable()

print(rooms['Cohort'][0].roomName)
rooms['Cohort'][0].printTimetable()

#oka.removeSoftConstraints(("Consulting slot", None))
#oka.printTimetable()
#print(len(algo.getPossibleTimetables()))
