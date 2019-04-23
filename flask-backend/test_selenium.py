from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

def clickOn(id):
    clickElem = driver.find_element_by_id(id)
    clickElem.click()

def fillField(field, textinput):
    fieldElem = driver.find_element_by_id(field)
    fieldElem.clear()
    fieldElem.send_keys(textinput)

def assertElementByID(id, text):
    element = driver.find_element_by_id(id)
    assert element.text == text
    # print("assert success")

def testInstructor():
    clickOn("instructorlogin")
    fillField("email", "Natalie")
    fillField("password", "Natalie")
    clickOn("submit")
    assertElementByID("tabtitle", "My Timetable")
    clickOn("myinfo")
    assertElementByID("tabtitle", "My Courses")
    clickOn("courseinfo")
    assertElementByID("tabtitle", "Course Details - ONLY for course leads")
    clickOn("mysched")
    clickOn("logout")

def testAdmin():
    clickOn("adminlogin")
    fillField("email", "ISTDadmin")
    fillField("password", "pw")
    clickOn("submit")
    assertElementByID("tabtitle", "ISTD Pillar Timetable")
    clickOn("course1")
    clickOn("course2")
    clickOn("course3")
    clickOn("coursedet")
    assertElementByID("tabtitle", "Course Details")
    clickOn("cohortclasses")
    assertElementByID("tabtitle", "Cohort Class Details")
    clickOn("pillarsched")
    clickOn("logout")

def testPlanner():
    clickOn("plannerlogin")
    fillField("email", "john")
    fillField("password", "john")
    clickOn("submit")
    assertElementByID("tabtitle", "My Schedules")
    clickOn("istd")
    clickOn("course1")
    clickOn("course2")
    clickOn("course3")
    clickOn("createsched")
    assertElementByID("tabtitle", "Create Timetable")
    clickOn("home")
    clickOn("editsched")
    assertElementByID("tabtitle", "Edit Schedule")
    clickOn("eventsched")
    assertElementByID("tabtitle", "Events")
    clickOn("logout")

driver = webdriver.Chrome()
driver.get("http://127.0.0.1:5000/")
assert "SUTD Timetable Scheduler" in driver.title

driver.fullscreen_window()
# testInstructor()
# testAdmin()
testPlanner()
print("Test run successful :)")
driver.close()


