import unittest
from Timetable import Timetable
from Instructor import Instructor
from Cohort import Cohort
from Course import Course
from Room import Room
from Algorithm import Algorithm

class AlgorithmTest(unittest.TestCase):
    def testSureFail(self):
        istd1 = Cohort(1, "ISTD")
        istd2 = Cohort(2, "ISTD")
        istd3 = Cohort(3, "ISTD")

        rooms = {"Cohort": [Room("2.513", "Cohort Classroom 13", "Cohort Classroom"),
                            Room("2.514", "Cohort Classroom 14", "Cohort Classroom")],
                 "Lab": [Room("2.403", "Digital Systems Lab", "Laboratory")],
                 "Lecture": [Room("1.203", "Lecture Theatre 2", "Lecture Theatre")]}

        comp_struct = Course(1, "Comp Struct", rooms)
        dw = Course(2, "Digital World", rooms)
        cv = Course(3, "Computer Vision", rooms)
        cse = Course(4, "Computer Systems Engineering", rooms)

        oka = Instructor(100, "Oka", [comp_struct, dw, cv, cse])
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
        comp_struct.setComponentsAndDuration("Cohort", 4, False, "ISTD1")
        comp_struct.setComponentsAndDuration("Cohort", 4, False, "ISTD2")
        comp_struct.setComponentsAndDuration("Cohort", 4, False, "ISTD3")
        comp_struct.setComponentsAndDuration("Lab", 1, False, "ISTD1")
        comp_struct.setComponentsAndDuration("Lab", 1, False, "ISTD2")
        comp_struct.setComponentsAndDuration("Lab", 1, False, "ISTD3")

        dw.setComponentsAndDuration("Cohort", 4, False, "ISTD1")
        dw.setComponentsAndDuration("Cohort", 4, False, "ISTD2")
        dw.setComponentsAndDuration("Cohort", 4, False, "ISTD3")

        cv.setComponentsAndDuration("Cohort", 4, False, "ISTD1")
        cv.setComponentsAndDuration("Cohort", 4, False, "ISTD2")
        cv.setComponentsAndDuration("Cohort", 4, False, "ISTD3")

        cse.setComponentsAndDuration("Cohort", 1.5, False, "ISTD1")
        cse.setComponentsAndDuration("Cohort", 1.5, False, "ISTD2")
        cse.setComponentsAndDuration("Cohort", 1.5, False, "ISTD3")
        cse.setComponentsAndDuration("Lab", 1, False, "ISTD1")
        cse.setComponentsAndDuration("Lab", 1, False, "ISTD2")
        cse.setComponentsAndDuration("Lab", 1, False, "ISTD3")

        algo = Algorithm(instructorArray, cohorts, rooms)
        self.assertEqual(algo.generate_schedule(), False)

    def testInsertSoftConstraints(self):
        istd1 = Cohort(1, "ISTD")
        istd2 = Cohort(2, "ISTD")
        istd3 = Cohort(3, "ISTD")

        rooms = {"Cohort": [Room("2.513", "Cohort Classroom 13", "Cohort Classroom"),
                            Room("2.514", "Cohort Classroom 14", "Cohort Classroom")],
                 "Lab": [Room("2.403", "Digital Systems Lab", "Laboratory")],
                 "Lecture": [Room("1.203", "Lecture Theatre 2", "Lecture Theatre")]}

        comp_struct = Course(1, "Comp Struct", rooms)
        dw = Course(2, "Digital World", rooms)
        cv = Course(3, "Computer Vision", rooms)
        cse = Course(4, "Computer Systems Engineering", rooms)

        oka = Instructor(100, "Oka", [comp_struct, dw, cv, cse])
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
        oka.addSoftConstraints(1, 1, 9.5, 11.5, "Meeting")
        algo.generate_schedule()
        self.assertEqual(oka.softConstraints[1] == "Meeting", True)

    def testConfirmPossible(self):
        istd1 = Cohort(1, "ISTD")
        istd2 = Cohort(2, "ISTD")
        istd3 = Cohort(3, "ISTD")

        rooms = {"Cohort": [Room("2.513", "Cohort Classroom 13", "Cohort Classroom"),
                            Room("2.514", "Cohort Classroom 14", "Cohort Classroom")],
                 "Lab": [Room("2.403", "Digital Systems Lab", "Laboratory")],
                 "Lecture": [Room("1.203", "Lecture Theatre 2", "Lecture Theatre")]}

        comp_struct = Course(1, "Comp Struct", rooms)
        dw = Course(2, "Digital World", rooms)
        cv = Course(3, "Computer Vision", rooms)
        cse = Course(4, "Computer Systems Engineering", rooms)

        oka = Instructor(100, "Oka", [comp_struct, dw, cv, cse])
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
        self.assertEqual(algo.generate_schedule(), True)

    def testRemoveSoftConstraints(self):
        istd1 = Cohort(1, "ISTD")
        istd2 = Cohort(2, "ISTD")
        istd3 = Cohort(3, "ISTD")

        rooms = {"Cohort": [Room("2.513", "Cohort Classroom 13", "Cohort Classroom"),
                            Room("2.514", "Cohort Classroom 14", "Cohort Classroom")],
                 "Lab": [Room("2.403", "Digital Systems Lab", "Laboratory")],
                 "Lecture": [Room("1.203", "Lecture Theatre 2", "Lecture Theatre")]}

        comp_struct = Course(1, "Comp Struct", rooms)
        dw = Course(2, "Digital World", rooms)
        cv = Course(3, "Computer Vision", rooms)
        cse = Course(4, "Computer Systems Engineering", rooms)

        oka = Instructor(100, "Oka", [comp_struct, dw, cv, cse])
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
        oka.addSoftConstraints(1, 1, 9.5, 11.5, "Meeting")
        algo.generate_schedule()
        oka.removeSoftConstraints("Meeting")
        self.assertEqual(oka.softConstraints.__contains__(1), False)

    def testMeeting(self):
        def testInsertSoftConstraints(self):
            istd1 = Cohort(1, "ISTD")
            istd2 = Cohort(2, "ISTD")
            istd3 = Cohort(3, "ISTD")

            rooms = {"Cohort": [Room("2.513", "Cohort Classroom 13", "Cohort Classroom"),
                                Room("2.514", "Cohort Classroom 14", "Cohort Classroom")],
                     "Lab": [Room("2.403", "Digital Systems Lab", "Laboratory")],
                     "Lecture": [Room("1.203", "Lecture Theatre 2", "Lecture Theatre")]}

            comp_struct = Course(1, "Comp Struct", rooms)
            dw = Course(2, "Digital World", rooms)
            cv = Course(3, "Computer Vision", rooms)
            cse = Course(4, "Computer Systems Engineering", rooms)

            oka = Instructor(100, "Oka", [comp_struct, dw, cv, cse])
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
            self.assertEqual(algo.compareScheduleForMeeting(instructorArray, 3), True)


if __name__ == '__main__':
    unittest.main()
