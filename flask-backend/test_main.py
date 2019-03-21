import unittest  # standard library for testing
import main  # import main.py

class TestMain(unittest.TestCase):
    def test_admin_login(self):
        with self.assertRaises(ValueError):
            main.check_admin_login("tom", "tommy")
        self.assertEqual(main.check_admin_login("tom", "tom"), None)

    def test_instructor_login(self):
        with self.assertRaises(ValueError):
            main.check_instructor_login("karen", "wrongpw")
        self.assertEqual(main.check_instructor_login("karen", "karen"), None)

    def test_planner_login(self):
        with self.assertRaises(ValueError):
            main.check_planner_login("lolo", "lala")
        self.assertEqual(main.check_planner_login("bob", "bob"), None)

if __name__ == '__main__':      # allows you to run using "python test_main.py" in terminal, or inside code editor
    unittest.main(exit=False)