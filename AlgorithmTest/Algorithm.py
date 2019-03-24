from Timetable import Timetable
from Instructor import Instructor
from Cohort import Cohort
from Course import Course
import unittest

class Algorithm:

    def __init__(self, instructors, cohorts):
        self.totalCourses = []
        self.constraints = []
        self.instructors = instructors
        self.cohorts = cohorts
        self.timetable = Timetable()

        #print(len(self.timetable.week))
        #print(len(self.timetable.getTimeTable()))

        self.constraints = [[constraint for constraint in instructor.getHardConstraints()] for instructor in instructors]
        self.totalCourses = [constraint for instructor in instructors for constraint in instructor.getHardConstraints()]
        #print(self.constraints)

    def generate_schedule(self):
        coursesAdded = []
        for course in self.totalCourses:
            #randomise courses or days to start from
            course_timetable = course.getTimetable()
            #print(course_timetable.week[0][0] == [])
            for dayindex in range(len(course_timetable.week)):
                day = course_timetable.week[dayindex]
                for time in range(len(day)):
                    if course in coursesAdded:
                        break
                    conditions = (day[time] == [],
                                  self.checkInstructorSchedule(course, self.instructors, dayindex, time),
                                  self.checkClassSchedule(course, self.cohorts, dayindex, time))
                    if all(conditions): #all is for and, any is for or
                        course.addIntoTimeTable(course, dayindex, time)
                        for instructor in course.courseInstructors:
                            instructor.addIntoTimeTable(course, dayindex, time)
                        for cohort in course.cohorts:
                            cohort.addIntoTimeTable(course, dayindex, time)
                        coursesAdded.append(course)

    def checkInstructorSchedule(self, course, instructors, day, time):
        for instructor in instructors:
            if instructor.getTimeslot(day, time) != []:
                return False
        return True


    def checkClassSchedule(self, course, classes, day, time):
        for cohort in classes:
            if cohort.getTimeslot(day, time) != []:
                return False
        return True


    # def add_into_timetable(self):
    #     for dayindex in range(len(self.timetable.week)):
    #         day = self.timetable.week[dayindex]
    #         for i in range(len(day)):
    #             if day[i] == []:
    #                 day[i] =
    #             else


    #     coursesToAdd = copy.deepcopy(self.totalCourses)
    #     print(coursesToAdd)
    #     for dayindex in range(len(self.timetable.week)):
    #         day = self.timetable.week[dayindex]
    #         for i in range(len(day)):
    #             if coursesToAdd is [] or i >= len(self.totalCourses):
    #                 break
    #             if day[i] == []:
    #                 day[i] = copy.deepcopy(self.noClashCourses(coursesToAdd[i]))
    #
    #
    # def in_hard_constraints(self, course1, course2):
    #     for constraint in self.constraints:
    #         if course1 in constraint and course2 in constraint:
    #             return True
    #
    # def print_timetable(self):
    #     #print(len(self.timetable.week))
    #     for i in range(len(self.timetable.week)):
    #         day = self.timetable.week[i]
    #         print(str(i) + "\n")
    #         for j in range(len(day)):
    #             print(day[i])
    #         print("\n")
    #
    # def noClashCourses(self, courseChecked):
    #     no_clash = [courseChecked]
    #     for course in self.totalCourses:
    #         if not self.in_hard_constraints(courseChecked, course):
    #             no_clash.append(course)
    #     return no_clash



istd1 = Cohort(1, "ISTD")
istd2 = Cohort(2, "ISTD")
istd3 = Cohort(3, "ISTD")

comp_struct = Course(1, "Comp Struct")
dw = Course(2, "Digital World")
cv = Course(3, "Computer Vision")
cse = Course(4, "Computer Systems Engineering")

#Can initialise instructors first, then loop through them and create and add in the courses and cohorts
oka = Instructor(100, "Oka", [comp_struct, dw])
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

algo = Algorithm(instructorArray, cohorts)
algo.generate_schedule()
for instructor in instructorArray:
    print(instructor.instructorName)
    # for day in instructor.getTimetable().week:
    #     print("Day")
    #     for time in day:
    #         print(time)
    instructor.printTimetable()

for course in courses:
    print(course.courseName)
    course.printTimetable()

for cohort in cohorts:
    print(cohort.name)
    cohort.printTimetable()

