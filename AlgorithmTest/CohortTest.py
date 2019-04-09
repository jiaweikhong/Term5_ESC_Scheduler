import unittest
from Cohort import Cohort
from Timetable import Timetable

class CohortTest(unittest.TestCase):

    def testAddCohortProperly(self):
        testCohort = Cohort(1, "ISTD")
        testCohort.addIntoTimeTable("Comp Struct", 1, 4, 3, "Cohort", "ISTD1", 2.507)
        self.assertEqual(testCohort.getTimetable().week[1][4], [("Comp Struct", "Cohort", "ISTD1", 2.507)])

    def testCoursesAppended(self):
        testCohort = Cohort(1, "ISTD")
        testCohort.addCourses("Comp Struct")
        self.assertEqual(testCohort.courses, ["Comp Struct"])

    def testGetTimeslot(self):
        testCohort = Cohort(1, "ISTD")
        testCohort.addIntoTimeTable("Comp Struct", 1, 4, 3, "Cohort", "ISTD1", 2.507)
        self.assertEqual(testCohort.getTimeslot(1, 4), [("Comp Struct", "Cohort", "ISTD1", 2.507)])


if __name__ == '__main__':
    unittest.main()
