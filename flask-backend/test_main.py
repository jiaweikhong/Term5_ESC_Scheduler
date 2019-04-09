import unittest  # standard library for testing
import main  # import main.py

class TestMain(unittest.TestCase):
    def test_admin_login(self):
        self.assertEqual(main.check_admin_login("ISTDadmin", "haha"), 0) # correct username, wrong pw, should fail.
        self.assertEqual(main.check_admin_login("Sudipta", "sudipta"), 0)   # instructor credentials should fail.
        self.assertEqual(main.check_admin_login("bob", "bob"), 0) # planner credentials should fail.
        self.assertEqual(main.check_admin_login("ISTDadmin", "pw"), 1)   # correct username & pw, should pass.

    def test_instructor_login(self):
        self.assertEqual(main.check_instructor_login("karen", "wrongpw"), 0)    # correct username, wrong pw, should fail.
        self.assertEqual(main.check_instructor_login("tom", "tom"), 0)   # admin credentials should fail.
        self.assertEqual(main.check_instructor_login("bob", "bob"), 0) # planner credentials should fail.
        self.assertEqual(main.check_instructor_login("Sudipta", "sudipta"), 1)  # correct username & pw, should pass.

    def test_planner_login(self):
        self.assertEqual(main.check_planner_login("bob", "lala"), 0)   # correct username, wrong pw, should fail.
        self.assertEqual(main.check_planner_login("tom", "tom"), 0)   # admin credentials should fail.
        self.assertEqual(main.check_planner_login("karen", "karen"), 0)  # instructor credentials should fail.
        self.assertEqual(main.check_planner_login("bob", "bob"), 1) # correct username & pw, should pass

if __name__ == '__main__':      # allows you to run using "python test_main.py" in terminal, or inside code editor
    unittest.main(exit=False)