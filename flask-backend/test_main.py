import unittest  # standard library for testing
import main  # import main.py
import time

class TestMain(unittest.TestCase):

    # test logging in as admin
    def test_admin_login(self):
        self.assertEqual(main.check_admin_login("ISTDadmin", "haha"), 0) # correct username, wrong pw, should fail.
        self.assertEqual(main.check_admin_login("Sudipta", "sudipta"), 0)   # instructor credentials should fail.
        self.assertEqual(main.check_admin_login("john", "john"), 0) # planner credentials should fail.
        self.assertEqual(main.check_admin_login("ISTDadmin", "password"), 1)   # correct username & pw, should pass.

    # test logging in as instructor
    def test_instructor_login(self):
        self.assertEqual(main.check_instructor_login("karen", "wrongpw"), 0)    # correct username, wrong pw, should fail.
        self.assertEqual(main.check_instructor_login("tom", "tom"), 0)   # admin credentials should fail.
        self.assertEqual(main.check_instructor_login("john", "john"), 0) # planner credentials should fail.
        self.assertEqual(main.check_instructor_login("Sun Jun", "password"), 1)  # correct username & pw, should pass.

    # test logging in as planner
    def test_planner_login(self):
        self.assertEqual(main.check_planner_login("john", "lala"), 0)   # correct username, wrong pw, should fail.
        self.assertEqual(main.check_planner_login("tom", "tom"), 0)   # admin credentials should fail.
        self.assertEqual(main.check_planner_login("karen", "karen"), 0)  # instructor credentials should fail.
        self.assertEqual(main.check_planner_login("John", "password"), 1) # correct username & pw, should pass

    # # test retrieving an instructor's course
    # def test_instructor_course(self):
    #     retrievedCourses = main.retrieveInstructorCourses("Natalie")
    #     natCourses = {'Monday': {'10': 'Computer Systems Engineering, Lab, ISTD1, 2.403', '11': 'Computer Systems Engineering, Lab, ISTD1, 2.403', '12': 'Computer Systems Engineering, Lab, ISTD2, 2.403', '13': 'Computer Systems Engineering, Lab, ISTD2, 2.403', '14': 'Computer Systems Engineering, Lab, ISTD2, 2.403', '15': 'Computer Systems Engineering, Lab, ISTD3, 2.403', '16': 'Computer Systems Engineering, Lab, ISTD3, 2.403', '17': 'Computer Systems Engineering, Lab, ISTD3, 2.403', '18': '', '19': '', '0': 'Computer Systems Engineering, Cohort, ISTD1, 2.513', '1': 'Computer Systems Engineering, Cohort, ISTD1, 2.513', '2': 'Computer Systems Engineering, Cohort, ISTD1, 2.513', '3': 'Computer Systems Engineering, Cohort, ISTD2, 2.514', '4': 'Computer Systems Engineering, Cohort, ISTD2, 2.514', '5': 'Computer Systems Engineering, Cohort, ISTD2, 2.514', '6': 'Computer Systems Engineering, Cohort, ISTD3, 2.513', '7': 'Computer Systems Engineering, Cohort, ISTD3, 2.513', '8': 'Computer Systems Engineering, Cohort, ISTD3, 2.513', '9': 'Computer Systems Engineering, Lab, ISTD1, 2.403'}, 'Wednesday': {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': ''}, 'Thursday': {'10': '', '11': '', '12': '', '13': '', '14': '', '15': '', '16': '', '17': '', '18': '', '19': '', '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': ''}, 'Tuesday': {'10': 'Computer Vision, Cohort, ISTD3, 2.514', '11': 'Computer Vision, Cohort, ISTD3, 2.514', '12': '', '13': '', '14': '', '15': '', '16': '', '17': '', '18': '', '19': '', '0': '', '1': '', '2': '', '3': 'Computer Vision, Cohort, ISTD1, 2.513', '4': 'Computer Vision, Cohort, ISTD1, 2.513', '5': 'Computer Vision, Cohort, ISTD1, 2.513', '6': 'Computer Vision, Cohort, ISTD2, 2.513', '7': 'Computer Vision, Cohort, ISTD2, 2.513', '8': 'Computer Vision, Cohort, ISTD2, 2.513', '9': 'Computer Vision, Cohort, ISTD3, 2.514'}, 'Friday': {'0': 'Meeting, None, None, None', '1': 'Meeting, None, None, None', '2': 'Meeting, None, None, None', '3': 'Meeting, None, None, None', '4': 'Meeting, None, None, None', '5': 'Meeting, None, None, None', '6': '', '7': '', '8': '', '9': ''}}
    #     self.assertEqual(retrievedCourses,natCourses)

    # # test obtaining information on cohorts
    # def test_obtainCohorts(self):
    #     cohortsInfo = main.obtainCohorts()
    #     FScohortsInfo = {'ESD2': {'pillar': 'ESD', 'num': '30'}, 'F01': {'pillar': 'Freshmore', 'num': '50'}, 'F02': {'pillar': 'Freshmore', 'num': '48'}, 'ISTD1': {'pillar': 'ISTD', 'num': '1'}, 'ISTD2': {'pillar': 'ISTD', 'num': '2'}, 'ISTD3': {'pillar': 'ISTD', 'num': '3'}, 'ISTD4': {'Week': {}}, 'ISTD5': {'Week': {}}, 'ISTD6': {'Week': {}}, 'hehehehe': {'pillar': 'EPD', 'num': '45'}, 'testing': {'pillar': 'ISTD', 'num': '12'}}
    #     # print (cohortsInfo)
    #     self.assertEqual(cohortsInfo, FScohortsInfo)

    # # test obtaining information on all courses
    # def test_obtainCourses(self):
    #     coursesInfo = main.obtainCourses()
    #     FScoursesInfo = {'1.112': {'Instructors': ['Sudipta', 'Tony Quek'], 'CohortClasses': ['ISTD5', 'ISTD6'], 'Components': {'Lecture': {'shared': False, 'LectSession1': '', 'LectSession2': '', 'LectSession3': ''}, 'Lab Session': {'shared': False, 'LabSession1': '', 'LabSession2': '', 'LabSession3': ''}, 'Cohort Session': {'shared': False, 'CohortSession1': '1.5', 'CohortSession2': '', 'CohortSession3': ''}}, 'CourseTitle': 'Machine Learning', 'Pillar': 'ISTD', 'CourseCode': '1.112'}, '50.001': {'Instructors': ['Ngai Man', 'Norman Lee'], 'CohortClasses': ['ISTD1', 'ISTD2', 'ISTD3', 'ISTD4'], 'Components': {'Lecture': {'shared': False, 'LectSession1': '', 'LectSession2': '', 'LectSession3': ''}, 'Lab Session': {'shared': False, 'LabSession1': '', 'LabSession2': '', 'LabSession3': ''}, 'Cohort Session': {'shared': False, 'CohortSession1': '1.5', 'CohortSession2': '1.5', 'CohortSession3': '2'}}, 'CourseTitle': 'Introduction to Information Systems', 'CourseLead': 'Ngai Man', 'Pillar': 'ISTD', 'CourseCode': '50.001'}, '50.002': {'Instructors': ['Natalie Agus', 'Oka Kurniawan'], 'CohortClasses': ['ISTD1', 'ISTD2', 'ISTD3', 'ISTD4'], 'Components': {'Lecture': {'shared': True, 'LectSession1': '', 'LectSession2': '', 'LectSession3': ''}, 'Lab Session': {'shared': False, 'LabSession1': '2', 'LabSession2': '', 'LabSession3': ''}, 'Cohort Session': {'shared': False, 'CohortSession1': '1.5', 'CohortSession2': '1.5', 'CohortSession3': ''}}, 'CourseTitle': 'Computation Structures', 'Pillar': 'ISTD', 'CourseCode': '50.002'}, '50.003': {'Status': 'Updated', 'SoftConstraints': {'0': {'0': '2', '1': '10.5', '2': '12.5', '3': 'Pillar meeting'}, '1': {'0': '3', '1': '12.5', '2': '14', '3': 'Natalie Unavailable'}, '2': {'0': '4', '1': '12.5', '2': '13.5', '3': 'External client meeting'}, '3': {'0': '5', '1': '12', '2': '13.5', '3': 'CSE CLIQUE LUNCH BREAK YAYYY'}, '4': {'0': '', '1': '', '2': '', '3': ''}}, 'Instructors': ['Natalie Agus', 'David Yau'], 'CohortClasses': ['ISTD1', ' ISTD2', ' ISTD3'], 'Components': {'Lecture': {'Cohort Classes': ['ISTD1', ' ISTD2', ' ISTD3'], 'shared': True, 'CohortClasses': {}, 'LectSession1': '', 'LectSession2': '', 'LectSession3': '', 'NumberSessions': ''}, 'Lab Session': {'Cohort Classes': ['ISTD1', ' ISTD2', ' ISTD3'], 'Venue': 'Digital Systems Lab', 'shared': False, 'LabSession1': '2', 'NumberSessions': '1', 'LabSession2': '', 'LabSession3': ''}, 'Cohort Session': {'Cohort Classes': ['ISTD1', ' ISTD2', ' ISTD3'], 'shared': False, 'CohortSession1': '1.5', 'CohortSession2': '1.5', 'CohortSession3': '', 'NumberSessions': '2'}}, 'CourseTitle': 'Computer System Engineering', 'CourseLead': 'David Yau', 'Pillar': 'ISTD', 'CourseCode': '50.003'}, '50.005': {'Instructors': ['Sun Jun'], 'CohortClasses': ['ISTD1', 'ISTD2', 'ISTD3', 'ISTD4'], 'Components': {'Lecture': {'shared': True, 'LectSession1': '', 'LectSession2': '', 'LectSession3': ''}, 'Cohort Session': {'shared': False, 'CohortSession1': '1.5', 'CohortSession2': '1.5', 'CohortSession3': ''}, 'Lab Session': {'shared': False, 'LabSession1': '1.5', 'LabSession2': '', 'LabSession3': ''}}, 'CourseTitle': 'Computer Systems Engineering', 'Pillar': 'ISTD', 'Week': {'Monday': ['', ' ', ' ', ' 50.005, Cohort, CI01, 2.506', ' 50.005, Cohort, CI01, 2.506', ' 50.005, Cohort, CI01, 2.506', ' 50.005, Cohort, CI03, 2.507', ' 50.005, Cohort, CI03, 2.507', ' 50.005, Cohort, CI03, 2.507'], 'Wednesday': ['', ' 50.005, Cohort, CI01, 2.506', ' 50.005, Cohort, CI01, 2.506', ' 50.005, Cohort, CI01, 2.506', ' ', ' ', ' 50.005, Cohort, CI03, 2.507', ' 50.005, Cohort, CI03, 2.507', ' 50.005, Cohort, CI03, 2.507'], 'Thursday': ['', ' ', ' ', ' ', ' 50.005, Lecture, all, 2.505', ' 50.005, Lecture, all, 2.505', ' 50.005, Lecture, all, 2.505'], 'Tuesday': [''], 'Friday': ['']}, 'CourseCode': '50.005'}, '50.012': {'Instructors': ['Dude'], 'CohortClasses': ['ISTD5', 'ISTD6'], 'Components': {'Lecture': {'shared': True, 'LectSession1': '2', 'LectSession2': '', 'LectSession3': ''}, 'Lab Session': {'shared': False, 'LabSession1': '', 'LabSession2': '', 'LabSession3': ''}, 'Cohort Session': {'shared': False, 'CohortSession1': '1.5', 'CohortSession2': '', 'CohortSession3': ''}}, 'CourseTitle': 'Networks', 'Pillar': 'ISTD', 'CourseCode': '50.012'}, '50.034': {'Instructors': ['Tony Quek'], 'CohortClasses': ['ISTD5', 'ISTD6'], 'Components': {'Lecture': {'shared': True, 'LectSession1': '1.5', 'LectSession2': '1.5', 'LectSession3': ''}, 'Lab Session': {'shared': False, 'LabSession1': '', 'LabSession2': '', 'LabSession3': ''}, 'Cohort Session': {'shared': False, 'CohortSession1': '2', 'CohortSession2': '', 'CohortSession3': ''}}, 'CourseTitle': 'Introduction to Probability and Statistics', 'Pillar': 'ISTD', 'CourseCode': '50.034'}, 'test': {'Instructors': ['test']}}
    #     # print (coursesInfo)
    #     self.assertEqual(coursesInfo, FScoursesInfo)

    # # test obtaining information on one course
    # def test_course(self):
    #     retrievedCourse = main.retrieveCourse("50.034")
    #     # print (retrievedCourse)
    #     course = {'Wednesday': {'0': 'Introduction to Probability and Statistics, Cohort, ISTD6, 2.516', '1': 'Introduction to Probability and Statistics, Cohort, ISTD6, 2.516', '2': 'Introduction to Probability and Statistics, Cohort, ISTD6, 2.516', '3': 'Introduction to Probability and Statistics, Cohort, ISTD6, 2.516', '4': '', '5': '', '6': '', '7': '', '8': '', '9': ''}, 'Thursday': {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': '', '10': '', '11': '', '12': '', '13': '', '14': '', '15': '', '16': '', '17': '', '18': '', '19': ''}, 'Monday': {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': '', '10': '', '11': '', '12': '', '13': '', '14': '', '15': '', '16': '', '17': '', '18': '', '19': ''}, 'Tuesday': {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': 'Introduction to Probability and Statistics, Lecture, ISTD5, ISTD6, 1.203', '7': 'Introduction to Probability and Statistics, Lecture, ISTD5, ISTD6, 1.203', '8': 'Introduction to Probability and Statistics, Lecture, ISTD5, ISTD6, 1.203', '9': 'Introduction to Probability and Statistics, Lecture, ISTD5, ISTD6, 1.203', '10': 'Introduction to Probability and Statistics, Lecture, ISTD5, ISTD6, 1.203', '11': 'Introduction to Probability and Statistics, Lecture, ISTD5, ISTD6, 1.203', '12': 'Introduction to Probability and Statistics, Cohort, ISTD5, 2.515', '13': 'Introduction to Probability and Statistics, Cohort, ISTD5, 2.515', '14': 'Introduction to Probability and Statistics, Cohort, ISTD5, 2.515', '15': 'Introduction to Probability and Statistics, Cohort, ISTD5, 2.515', '16': '', '17': '', '18': '', '19': ''}, 'Friday': {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': ''}}
    #     self.assertEqual(retrievedCourse, course)

    # test locking out a user for logging in 3 times incorrectly in a row
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
        bannedUser = main.check_planner_login("bob", "password")
        self.assertEqual(bannedUser, 2)

if __name__ == '__main__':      # allows you to run using "python test_main.py" in terminal, or inside code editor
    unittest.main(exit=False)