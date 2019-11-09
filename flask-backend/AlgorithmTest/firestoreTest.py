from .Timetable import Timetable
from .Instructor import Instructor
from .Cohort import Cohort
from .Course import Course
from .Room import Room
from .Algorithm import Algorithm
from .firestoreData import firestoreData

import random
import itertools
import unittest
import firebase_admin
from firebase_admin import credentials, firestore
import json

class AlgorithmTest(unittest.TestCase):
    def testPullSuccess(self):
        cred = credentials.Certificate('term-5-esc-scheduler-firebase-adminsdk-cfadg-cd4c469d4d.json')
        default_app = firebase_admin.initialize_app(cred)
        dbfs = firestore.client()
        firestoreTest = firestoreData(cred, default_app, dbfs)
        firestoreTest.generateAndPushTimetable()
        self.assertNotEquals(firestoreTest.instructorArray, [])
        self.assertNotEquals(firestoreTest.courseArray, [])
        self.assertNotEquals(firestoreTest.cohortArray, [])
        self.assertNotEquals(firestoreTest.rooms, {"Cohort": [], "Lab": [], "Lecture": []})
        self.assertEqual(firestoreTest.generateAndPushTimetable(), "Pushed successfully")

if __name__ == '__main__':
    unittest.main()








