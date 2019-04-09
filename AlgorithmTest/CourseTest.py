import unittest
from Course import Course

class CohortTest(unittest.TestCase):

    def testAddCourseProperly(self):
        testCourse = Course(1, "Comp Struct")
        testCourse.addIntoTimeTable("Comp Struct", 1, 4, 3, "Cohort", "ISTD1", 2.507)
        self.assertEqual(testCourse.getTimetable().week[1][4], [("Comp Struct", "Cohort", "ISTD1", 2.507)])

    def testCohortsAppended(self):
        testCourse = Course(1, "Comp Struct")
        testCourse.addCohorts("ISTD1")
        self.assertEqual(testCourse.cohorts, ["ISTD1"])

    def testInstructorsAppended(self):
        testCourse = Course(1, "Comp Struct")
        testCourse.addCohorts("Natalie Agus")
        self.assertEqual(testCourse.cohorts, ["Natalie Agus"])

    def testAddComponents(self):
        testCourse = Course(1, "Comp Struct")
        testCourse.setComponentsAndDuration("Cohort", 3, ["ISTD1", "ISTD2"], True)
        self.assertEqual(testCourse.getComponents(), [("Cohort", 3, ["ISTD1", "ISTD2"], True)])

    def testVenues(self):
        testCourse = Course(1, "Comp Struct")



if __name__ == '__main__':
    unittest.main()