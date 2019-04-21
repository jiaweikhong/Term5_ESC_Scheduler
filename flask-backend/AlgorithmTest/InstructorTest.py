import unittest
# Use the following imports if calling from Flask's main.py
# from .Timetable import Timetable
# from .Instructor import Instructor
# Use the following imports if using this file on its own
from Timetable import Timetable
from Instructor import Instructor

class InstructorTest(unittest.TestCase):

    def testAddSoftConstraints(self):
        testInstructor = Instructor(100, "Natalie Agus", [])
        testInstructor.addSoftConstraints(1, 1, 9, 10.5, "Date with Kai")
        self.assertEqual({1: "Date with Kai"}, testInstructor.softConstraints)

    def testRemoveSoftConstraints(self):
        testInstructor = Instructor(100, "Natalie Agus", [])
        testInstructor.addSoftConstraints(1, 1, 9, 10.5, "Date with Kai")
        testInstructor.removeSoftConstraints("Date with Kai")
        self.assertEqual({}, testInstructor.softConstraints)


if __name__ == '__main__':
    unittest.main()
