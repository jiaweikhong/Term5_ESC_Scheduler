import unittest  # standard library for testing
import main  # import main.py
import time

class TestMain(unittest.TestCase):
    def test_admin_login(self):
        self.assertEqual(main.check_admin_login("ISTDadmin", "haha"), 0) # correct username, wrong pw, should fail.
        self.assertEqual(main.check_admin_login("Sudipta", "sudipta"), 0)   # instructor credentials should fail.
        self.assertEqual(main.check_admin_login("john", "john"), 0) # planner credentials should fail.
        self.assertEqual(main.check_admin_login("ISTDadmin", "pw"), 1)   # correct username & pw, should pass.

    def test_instructor_login(self):
        self.assertEqual(main.check_instructor_login("karen", "wrongpw"), 0)    # correct username, wrong pw, should fail.
        self.assertEqual(main.check_instructor_login("tom", "tom"), 0)   # admin credentials should fail.
        self.assertEqual(main.check_instructor_login("john", "john"), 0) # planner credentials should fail.
        self.assertEqual(main.check_instructor_login("Oka", "Oka"), 1)  # correct username & pw, should pass.

    def test_planner_login(self):
        self.assertEqual(main.check_planner_login("john", "lala"), 0)   # correct username, wrong pw, should fail.
        self.assertEqual(main.check_planner_login("tom", "tom"), 0)   # admin credentials should fail.
        self.assertEqual(main.check_planner_login("karen", "karen"), 0)  # instructor credentials should fail.
        self.assertEqual(main.check_planner_login("john", "john"), 1) # correct username & pw, should pass

    def test_instructor_course(self):
        retrievedCourses = main.retrieveInstructorCourses("Natalie")
        natCourses = {'Monday': {'10': 'Computer Systems Engineering, Lab, ISTD1, 2.403', '11': 'Computer Systems Engineering, Lab, ISTD1, 2.403', '12': 'Computer Systems Engineering, Lab, ISTD2, 2.403', '13': 'Computer Systems Engineering, Lab, ISTD2, 2.403', '14': 'Computer Systems Engineering, Lab, ISTD2, 2.403', '15': 'Computer Systems Engineering, Lab, ISTD3, 2.403', '16': 'Computer Systems Engineering, Lab, ISTD3, 2.403', '17': 'Computer Systems Engineering, Lab, ISTD3, 2.403', '18': '', '19': '', '0': 'Computer Systems Engineering, Cohort, ISTD1, 2.513', '1': 'Computer Systems Engineering, Cohort, ISTD1, 2.513', '2': 'Computer Systems Engineering, Cohort, ISTD1, 2.513', '3': 'Computer Systems Engineering, Cohort, ISTD2, 2.514', '4': 'Computer Systems Engineering, Cohort, ISTD2, 2.514', '5': 'Computer Systems Engineering, Cohort, ISTD2, 2.514', '6': 'Computer Systems Engineering, Cohort, ISTD3, 2.513', '7': 'Computer Systems Engineering, Cohort, ISTD3, 2.513', '8': 'Computer Systems Engineering, Cohort, ISTD3, 2.513', '9': 'Computer Systems Engineering, Lab, ISTD1, 2.403'}, 'Wednesday': {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': ''}, 'Thursday': {'10': '', '11': '', '12': '', '13': '', '14': '', '15': '', '16': '', '17': '', '18': '', '19': '', '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': ''}, 'Tuesday': {'10': 'Computer Vision, Cohort, ISTD3, 2.514', '11': 'Computer Vision, Cohort, ISTD3, 2.514', '12': '', '13': '', '14': '', '15': '', '16': '', '17': '', '18': '', '19': '', '0': '', '1': '', '2': '', '3': 'Computer Vision, Cohort, ISTD1, 2.513', '4': 'Computer Vision, Cohort, ISTD1, 2.513', '5': 'Computer Vision, Cohort, ISTD1, 2.513', '6': 'Computer Vision, Cohort, ISTD2, 2.513', '7': 'Computer Vision, Cohort, ISTD2, 2.513', '8': 'Computer Vision, Cohort, ISTD2, 2.513', '9': 'Computer Vision, Cohort, ISTD3, 2.514'}, 'Friday': {'0': 'Meeting, None, None, None', '1': 'Meeting, None, None, None', '2': 'Meeting, None, None, None', '3': 'Meeting, None, None, None', '4': 'Meeting, None, None, None', '5': 'Meeting, None, None, None', '6': '', '7': '', '8': '', '9': ''}}
        self.assertEqual(retrievedCourses,natCourses)

    def test_course(self):
        retrievedCourse = main.retrieveCourse("50.034")
        course = {'Monday': ['50.034, Lecture, all, 2.505', '50.034, Lecture, all, 2.505', '50.034, Lecture, all, 2.505'], 'Wednesday': ['', '', ''], 'Thursday': ['50.034, Cohort, CI01, 2.506', '50.034, Cohort, CI01, 2.506', '50.034, Cohort, CI01, 2.506', '', ' ', ' ', ' ', ' ', '50.034, Cohort, CI03, 2.506', '50.034, Cohort, CI03, 2.506', '50.034, Cohort, CI03, 2.506'], 'Tuesday': ['', '','', '', '', '', '50.034, Lecture, all, 2.505', '50.034, Lecture, all, 2.505', '50.034, Lecture, all, 2.505'], 'Friday': ['', '', '']}
        self.assertEqual(retrievedCourse, course)

    def test_lockout(self):
        main.check_planner_login("bob", "wrongpw")
        main.check_planner_login("bob", "wrongpw")
        main.check_planner_login("bob", "wrongpw")
        fbData = main.dbfs.collection('bannedaccounts').document('SkLtTnXzztUdQ66QKZsA').get().to_dict()
        if ("bob" in fbData['banned']):
            banUpdate = 1
        else:
            banUpdate = 0
        self.assertEqual(banUpdate, 1)
        bannedUser = main.check_planner_login("bob", "bob")
        self.assertEqual(bannedUser, 2)

if __name__ == '__main__':      # allows you to run using "python test_main.py" in terminal, or inside code editor
    unittest.main(exit=False)