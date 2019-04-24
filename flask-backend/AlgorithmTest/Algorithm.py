# Use the following imports if calling from Flask's main.py
# from .Timetable import Timetable
# from .Instructor import Instructor
# from .Cohort import Cohort
# from .Course import Course
# from .Room import Room
# Use the following imports if using this file on its own
from Timetable import Timetable
from Instructor import Instructor
from Cohort import Cohort
from Course import Course
from Room import Room

import random
import itertools
import copy

class Algorithm:

    def __init__(self, instructors, cohorts, rooms, courses):
        self.totalCourses = []
        self.instructors = instructors
        self.cohorts = cohorts
        self.rooms = rooms
        self.softConstraints = {}

        self.totalCourses = courses#[constraint for instructor in instructors for constraint in instructor.getHardConstraints()]
        self.courseComponents = {course.courseName: course.getComponents() for course in self.totalCourses}

    def generate_schedule(self):
        isPossible = True

        # Randomise the courses
        permutedCourses = itertools.permutations(self.totalCourses, len(self.totalCourses))

        #random.shuffle(self.totalCourses)

        for permutation in permutedCourses:
            for course in permutation:
                coursesAdded = []
                course_timetable = course.getTimetable()

                for dayindex in range(len(course_timetable.week)):
                    if self.courseComponents[course.courseName] != []:
                        courseComponent = self.courseComponents[course.courseName][0]
                    else:
                        break

                    day = course_timetable.week[dayindex]

                    for time in range(0, len(day)):
                        day = course_timetable.week[dayindex]
                        duration = int(courseComponent[1] / 0.5)

                        # ensure that the duration doesn't exceed the ending time
                        if duration > len(day) - 1 - time:
                            break

                        if self.courseComponents[course.courseName] != []:
                            courseComponent = self.courseComponents[course.courseName][0]
                            componentName = courseComponent[0]
                        else:
                            break

                        # if self.isCourseOnSameDay(course.courseName, self.cohorts, courseComponent[3], dayindex):
                        #     continue
                        chosenRoom = None
                        #Need to assign room by availability, rather than random
                        rooms = self.rooms[courseComponent[0]]
                        for room in rooms:
                            if self.checkRoomAvailability(room, dayindex, time, duration):
                                chosenRoom = room
                                break
                            else:
                                continue
                        
                        # if chosenRoom == None:
                        #     print("No possible room for " + course.courseName)
                        #     print(courseComponent)
                        #     self.wipeTimetable(False)
                        #     return False

                        conditions = (day[time] == [],
                                      self.checkInstructorSchedule(course.courseInstructors, dayindex, time, duration),
                                      self.checkClassSchedule(course.cohorts, courseComponent[2], courseComponent[3], dayindex, time, duration), 
                                      self.checkRoomAvailability(chosenRoom, dayindex, time, duration))
                        if all(conditions):  # all is for and, any is for or
                            course.addIntoTimeTable(course.courseName, course.courseID, dayindex, time, duration, componentName, courseComponent[3], chosenRoom.roomID)
                            for instructor in course.courseInstructors:
                                instructor.addIntoTimeTable(course.courseName, course.courseID, dayindex, time, duration, componentName, courseComponent[3], chosenRoom.roomID)
                            for cohort in course.cohorts:
                                #REMEMBER TO CHECK IF YOU PASS IN THE COHORT OBJECT OR THE COHORT NAME!
                                if courseComponent[2] is False and courseComponent[3] == cohort.name:
                                    cohort.addIntoTimeTable(course.courseName, course.courseID, dayindex, time, duration, componentName, courseComponent[3], chosenRoom.roomID)
                                elif courseComponent[2] is True:
                                    cohort.addIntoTimeTable(course.courseName, course.courseID, dayindex, time, duration, componentName, courseComponent[3], chosenRoom.roomID)
                            chosenRoom.addIntoTimeTable(course.courseName, course.courseID, dayindex, time, duration, componentName, courseComponent[3], chosenRoom.roomID)
                            coursesAdded.append(course)
                            self.courseComponents[course.courseName].remove(courseComponent)

            for course in self.totalCourses:
                for component in self.courseComponents[course.courseName]:
                    if component != []:
                        isPossible = False
            if isPossible:
                break
            self.wipeTimetable(isPossible)
        return isPossible

    def generateTimetableWithSoftConstraints(self):
        #for each priority, add in all the instructors' soft constraints and then generate the schedule
        #If can, move on to the next priority level
        #If cannot, randomly remove one from that priority level and try again
        for priority in range(1, 6):
            array = []
            for instructor in self.instructors:
                #print(instructor.softConstraints)
                if priority in instructor.softConstraints.keys():
                    softConstraint = instructor.softConstraints[priority]
                    instructorSoftConstraint = softConstraint[0]
                    startTime = softConstraint[2]
                    endTime = softConstraint[3]
                    day = softConstraint[1]
                    startTimeIndex = startTime - 8.5
                    if startTimeIndex < 0:
                        return "No such time"
                    array.append((instructor, instructorSoftConstraint, day, startTime, endTime))
                    instructor.addIntoTimeTable(instructorSoftConstraint, day, int(startTimeIndex), int((endTime - startTime) / 0.5), None, None, None)

            self.softConstraints[priority] = array

        if self.generate_schedule():
            for priority in range(5, 0, -1):
                combinations = []
                if self.softConstraints[priority] == []:
                    continue
                else:
                    for i in range(1, len(self.softConstraints[priority]) + 1):
                        combinations.extend(itertools.combinations(self.softConstraints[priority], i))
                    for possibility in combinations:
                        for element in possibility:
                            element[0].removeSoftConstraints(element[1])
                        possible = self.generate_schedule()
                        if possible:
                            return True
                        else:
                            if len(possibility) == len(self.softConstraints[priority]):
                                continue
                            for element in possibility:
                                element[0].addIntoTimeTable(element[1], element[2], element[3], element[4])
        else:
            return False


    def checkInstructorSchedule(self, instructors, day, time, duration):
        for i in range(duration):
            for instructor in instructors:
                if instructor.getTimeslot(day, time) != []:
                    return False
            time += 1
        return True


    def checkClassSchedule(self, classes, isShared, className, day, time, duration):
        for i in range(duration):
            for cohort in classes:
                if not isShared:
                    if cohort.name == className:
                        if cohort.getTimeslot(day, time) != []:
                            return False
                else:
                    if cohort.getTimeslot(day, time) != []:
                        return False
            time += 1
        return True

    def checkRoomAvailability(self, room, day, time, duration):
        if room == None:
            return True
        for i in range(duration):
            if room.getTimeslot(day, time) != []:
                return False
            time += 1
        return True

    #TODO Check this function
    def isCourseOnSameDay(self, courseName, cohorts, className, dayindex):
        for cohort in cohorts:
            if cohort.name in className or cohort.name == className:
                day = cohort.timetable.week[dayindex]
                for time in day:
                    if time == []:
                        continue
                    for j in time:
                        if j[0] is courseName:
                            return True
        return False

    def compareScheduleForMeeting(self, instructors, duration, meetingRoom = None, meetingName = "Meeting"):
        duration = int(duration / 0.5)
        for dayindex in range(5):
            day = instructors[0].getTimetable().week[dayindex]
            for time in range(0, len(day)):
                if duration > len(day) - 1 - time:
                    break
                if self.checkInstructorSchedule(instructors, dayindex, time, duration):
                    for instructor in instructors:
                        instructor.addIntoTimeTable(meetingName, dayindex, time, duration, None, None, meetingRoom)
                    return True

        return False

    def wipeTimetable(self, isPossible):
        if not isPossible:
            for cohort in self.cohorts:
                cohort.timetable = Timetable()
            for roomType in self.rooms:
                for room in self.rooms[roomType]:
                    room.timetable = Timetable()
            for instructor in self.instructors:
                instructor.timetable = Timetable()
            for course in self.totalCourses:
                course.timetable = Timetable()
        
# istd1 = Cohort(1, "ISTD")
# istd2 = Cohort(2, "ISTD")
# istd3 = Cohort(3, "ISTD")
#
# rooms = {"Cohort":[Room("2.513", "Cohort Classroom 13", "Cohort Classroom"), Room("2.514", "Cohort Classroom 14", "Cohort Classroom")],
#          "Lab":[Room("2.403", "Digital Systems Lab", "Laboratory")],
#          "Lecture":[Room("1.203", "Lecture Theatre 2", "Lecture Theatre")]}
#
# comp_struct = Course(1, "Comp Struct", rooms)
# dw = Course(2, "Digital World", rooms)
# cv = Course(3, "Computer Vision", rooms)
# cse = Course(4, "Computer Systems Engineering", rooms)
#
# # Can initialise instructors first, then loop through them and create and add in the courses and cohorts
# oka = Instructor(100, "Oka", [comp_struct, dw])
# oka.addSoftConstraints(1, 1, 8.5, 10, "Consulting slot")
# oka.addSoftConstraints(2, 3, 16.5, 18.5, "Family")
# nat = Instructor(101, "Natalie", [cv, cse])
# nat.addSoftConstraints(1, 2, 8.5, 10.5, "Date")
# nat.addSoftConstraints(2, 3, 16, 18, "Club")
#
# instructorArray = [oka, nat]
# courses = [comp_struct, dw, cv, cse]
# for course in courses:
#     for instructor in instructorArray:
#         if course in instructor.getCourses():
#             course.addInstructors(instructor)
# cohorts = [istd1, istd2, istd3]
# for cohort in cohorts:
#     for course in courses:
#         cohort.addCourses(course)
# for course in courses:
#     for cohort in cohorts:
#         course.addCohorts(cohort)
#
# comp_struct.setComponentsAndDuration("Lecture", 1.5, True, [cohort.name for cohort in cohorts])
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
# comp_struct.setComponentsAndDuration("Lab", 1, False, "ISTD1")
# comp_struct.setComponentsAndDuration("Lab", 1, False, "ISTD2")
# comp_struct.setComponentsAndDuration("Lab", 1, False, "ISTD3")
#
# dw.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# dw.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# dw.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
#
# cv.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# cv.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# cv.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
#
# cse.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# cse.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# cse.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
# cse.setComponentsAndDuration("Lab", 1, False, "ISTD1")
# cse.setComponentsAndDuration("Lab", 1, False, "ISTD2")
# cse.setComponentsAndDuration("Lab", 1, False, "ISTD3")
#
# algo = Algorithm(instructorArray, cohorts, rooms)
# algo.generateTimetableWithSoftConstraints()
# for instructor in instructorArray:
#     print(instructor.instructorName)
#     instructor.printTimetable()
# for cohort in cohorts:
#     print(cohort.name)
#     cohort.printTimetable()
# for course in courses:
#     print(course.courseName)
#     course.printTimetable()

#Instantiate classes
# cohorts = []
# istd1 = Cohort("ISTD1")
# cohorts.append(istd1)
# istd2 = Cohort("ISTD2")
# cohorts.append(istd2)
# istd3 = Cohort("ISTD3")
# cohorts.append(istd3)
# istd4 = Cohort("ISTD4")
# cohorts.append(istd4)
# istd5 = Cohort("ISTD5")
# cohorts.append(istd5)
# istd6 = Cohort("ISTD6")
# cohorts.append(istd6)
# # istd7 = Cohort("ISTD7")
# # cohorts.append(istd7)
# # istd8 = Cohort("ISTD8")
# # cohorts.append(istd8)

# rooms = {"Cohort": [Room("2.513", "Cohort Classroom 13", "Cohort Classroom"),
#                     Room("2.514", "Cohort Classroom 14", "Cohort Classroom"),
#                     Room("2.515", "Cohort Classroom 15", "Cohort Classroom"),
#                     Room("2.516", "Cohort Classroom 16", "Cohort Classroom"),
#                     Room("2.517", "Cohort Classroom 17", "Cohort Classroom"),
#                     Room("2.518", "Cohort Classroom 18", "Cohort Classroom"),
#                     Room("2.519", "Cohort Classroom 19", "Cohort Classroom"),
#                     Room("2.520", "Cohort Classroom 20", "Cohort Classroom")],
#          "Lab": [Room("2.412", "Digital Systems Lab", "Laboratory")],
#          "Lecture": [Room("1.203", "Lecture Theatre 2", "Lecture Theatre"),
#                      Room("2.403", "Lecture Theatre 4", "Lecture Theatre"),
#                      Room("2.503", "Lecture Theatre 5", "Lecture Theatre"),
#                      Room("2.303", "Lecture Theatre 3", "Lecture Theatre")]}

# # #Instantiate courses
# courses = []
# info_sys = Course("50.001", "Introduction to Information Systems", rooms, "ISTD", ["ISTD1", "ISTD2", "ISTD3","ISTD4"])
# info_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# info_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# info_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
# info_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD4")
# info_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# info_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# info_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
# info_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD4")
# info_sys.setComponentsAndDuration("Cohort", 2, False, "ISTD1")
# info_sys.setComponentsAndDuration("Cohort", 2, False, "ISTD2")
# info_sys.setComponentsAndDuration("Cohort", 2, False, "ISTD3")
# info_sys.setComponentsAndDuration("Cohort", 2, False, "ISTD4")
# courses.append(info_sys)

# comp_struct = Course("50.002", "Computation Structures", rooms, "ISTD", ["ISTD1", "ISTD2", "ISTD3", "ISTD4"])
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD4")
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
# comp_struct.setComponentsAndDuration("Cohort", 1.5, False, "ISTD4")
# comp_struct.setComponentsAndDuration("Lab", 2, False, "ISTD1")
# comp_struct.setComponentsAndDuration("Lab", 2, False, "ISTD2")
# comp_struct.setComponentsAndDuration("Lab", 2, False, "ISTD3")
# comp_struct.setComponentsAndDuration("Lab", 2, False, "ISTD4")
# courses.append(comp_struct)

# intro_algo = Course("50.004", "Introduction to Algorithms", rooms, "ISTD", ["ISTD1", "ISTD2", "ISTD3", "ISTD4"])
# intro_algo.setComponentsAndDuration("Lecture", 3, True, ["ISTD1", "ISTD2", "ISTD3","ISTD4"])
# intro_algo.setComponentsAndDuration("Cohort", 2, False, "ISTD1")
# intro_algo.setComponentsAndDuration("Cohort", 2, False, "ISTD2")
# intro_algo.setComponentsAndDuration("Cohort", 2, False, "ISTD3")
# intro_algo.setComponentsAndDuration("Cohort", 2, False, "ISTD4")
# courses.append(intro_algo)

# ml = Course("1.112", "Machine Learning", rooms, "ISTD", ["ISTD5", "ISTD6"])
# ml.setComponentsAndDuration("Cohort", 1.5, False, "ISTD5")
# ml.setComponentsAndDuration("Cohort", 1.5, False, "ISTD6")
# ml.setComponentsAndDuration("Cohort", 1.5, False, "ISTD5")
# ml.setComponentsAndDuration("Cohort", 1.5, False, "ISTD6")
# # ml.setComponentsAndDuration("Lab", 2, False, "ISTD5")
# # ml.setComponentsAndDuration("Lab", 2, False, "ISTD6")
# courses.append(ml)

# networks = Course("50.012", "Networks", rooms, "ISTD", ["ISTD5", "ISTD6"])
# networks.setComponentsAndDuration("Cohort", 1.5, False, "ISTD5")
# networks.setComponentsAndDuration("Cohort", 1.5, False, "ISTD6")
# networks.setComponentsAndDuration("Cohort", 1.5, False, "ISTD5")
# networks.setComponentsAndDuration("Cohort", 1.5, False, "ISTD6")
# networks.setComponentsAndDuration("Lecture", 2, True, ["ISTD5", "ISTD6"])
# courses.append(networks)

# # data_science = Course("50.038", "Computational Data Science", rooms, "ISTD", ["ISTD5", "ISTD6"])
# # data_science.setComponentsAndDuration("Cohort", 1.5, False, "ISTD5")
# # data_science.setComponentsAndDuration("Cohort", 1.5, False, "ISTD6")
# # data_science.setComponentsAndDuration("Cohort", 1.5, False, "ISTD5")
# # data_science.setComponentsAndDuration("Cohort", 1.5, False, "ISTD6")
# # data_science.setComponentsAndDuration("Lecture", 2, True, ["ISTD5", "ISTD6"])
# # courses.append(data_science)

# comp_sys = Course("50.005", "Computer System Engineering", rooms, "ISTD", ["ISTD1", "ISTD2", "ISTD3", "ISTD4"])
# comp_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# comp_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# comp_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
# comp_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD4")
# comp_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
# comp_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
# comp_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
# comp_sys.setComponentsAndDuration("Cohort", 1.5, False, "ISTD4")
# comp_sys.setComponentsAndDuration("Lab", 2, False, "ISTD1")
# comp_sys.setComponentsAndDuration("Lab", 2, False, "ISTD2")
# comp_sys.setComponentsAndDuration("Lab", 2, False, "ISTD3")
# comp_sys.setComponentsAndDuration("Lab", 2, False, "ISTD4")
# courses.append(comp_sys)

# probs_stats = Course("50.034", "Introduction to Probability and Statistics", rooms, "ISTD", ["ISTD5", "ISTD6"])
# probs_stats.setComponentsAndDuration("Lecture", 1.5, True, ["ISTD5", "ISTD6"])
# probs_stats.setComponentsAndDuration("Lecture", 1.5, True, ["ISTD5", "ISTD6"])
# probs_stats.setComponentsAndDuration("Cohort", 2, False, "ISTD5")
# probs_stats.setComponentsAndDuration("Cohort", 2, False, "ISTD6")
# courses.append(probs_stats)

# esc = Course("50.003", "Elements of Software Construction", rooms, "ISTD", ["ISTD5", "ISTD6"])
# esc.setComponentsAndDuration("Cohort", 1.5, False, "ISTD5")
# esc.setComponentsAndDuration("Cohort", 1.5, False, "ISTD6")
# esc.setComponentsAndDuration("Cohort", 1.5, False, "ISTD5")
# esc.setComponentsAndDuration("Cohort", 1.5, False, "ISTD6")
# esc.setComponentsAndDuration("Cohort", 2, False, "ISTD5")
# esc.setComponentsAndDuration("Cohort", 2, False, "ISTD6")
# courses.append(esc)

# # cv = Course("50.035", "Computer Vision", rooms, "ISTD", ["ISTD5", "ISTD6"])
# # cv.setComponentsAndDuration("Cohort", 1.5, False, "ISTD5")
# # cv.setComponentsAndDuration("Cohort", 1.5, False, "ISTD6")
# # cv.setComponentsAndDuration("Cohort", 1.5, False, "ISTD5")
# # cv.setComponentsAndDuration("Cohort", 1.5, False, "ISTD6")
# # cv.setComponentsAndDuration("Cohort", 2, False, "ISTD5")
# # cv.setComponentsAndDuration("Cohort", 2, False, "ISTD6")
# # courses.append(cv)


# instructors = []
# oka = Instructor(100, "Oka", [comp_struct])
# #oka.addSoftConstraints(1, 1, 8.5, 10, "Consulting slot")
# instructors.append(oka)
# #oka.addSoftConstraints(2, 3, 16.5, 18.5, "Family")
# nat = Instructor(101, "Natalie", [comp_struct])
# #nat.addSoftConstraints(1, 2, 8.5, 10.5, "Date")
# instructors.append(nat)
# #nat.addSoftConstraints(2, 3, 16, 18, "Club")
# ngai = Instructor(102, "Ngai Man", [info_sys])
# instructors.append(ngai)
# norman = Instructor(103, "Norman Lee", [info_sys])
# instructors.append(norman)
# sudipta = Instructor(104, "Sudipta", [esc, ml])
# instructors.append(sudipta)
# sunjun = Instructor(105, "Sun Jun", [esc, comp_sys])
# instructors.append(sunjun)
# # gemma = Instructor(106, "Gemma Roig", [intro_algo])
# # instructors.append(gemma)
# tony = Instructor(107, "Tony Quek", [probs_stats, ml])
# instructors.append(tony)
# dude = Instructor(108, "Dude", [networks])
# instructors.append(dude)

# for course in courses:
#     for instructor in instructors:
#         if course in instructor.getCourses():
#             course.addInstructors(instructor)
# for course in courses:
#     for cohort in cohorts:
#         if cohort.name in course.cohorts:
#             cohort.addCourses(course)
#             course.cohorts.remove(cohort.name)
#             course.cohorts.append(cohort)

# algo = Algorithm(instructors, cohorts, rooms, courses)
# #print(algo.generate_schedule())
# print(algo.generateTimetableWithSoftConstraints())
# for instructor in instructors:
#     print(instructor.instructorName)
#     instructor.printTimetable()
# for cohort in cohorts:
#     print(cohort.name)
#     cohort.printTimetable()
# for key, value in rooms.items():
#     for room in value:
#         print(room.roomName)
#         room.printTimetable()
