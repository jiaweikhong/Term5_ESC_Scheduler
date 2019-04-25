from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()

def clickOn(id):
    clickElem = driver.find_element_by_id(id)
    clickElem.click()

def fillField(field, textinput):
    fieldElem = driver.find_element_by_id(field)
    fieldElem.clear()
    fieldElem.send_keys(textinput)

def assertElementByID(id, text):
    element = driver.find_element_by_id(id)
    # print (element.text)
    assert element.text == text
    print("Text Assertion Success: " + text)

def clickOffNotif(idOfNext):
    action = webdriver.common.action_chains.ActionChains(driver)
    clickElem = driver.find_element_by_id(idOfNext)
    action.move_to_element_with_offset(clickElem, 5, 5) #move 150 pixels to the right to access Help link
    action.click()
    action.perform()

def testInstructor():
    clickOn("instructorlogin")
    fillField("email", "Sudipta")
    fillField("password", "password")
    clickOn("submit")
    # driver.find_element_by_xpath("//body").click()
    clickOffNotif("myinfo")
    # assertElementByID("scheduleMeeting", "SCHEDULE MEETING")
    clickOn("myinfo")
    assertElementByID("instructions", "Please fill in the following details for the courses you teach. Note that each submission will be a new submission. If you wish to make changes to previous submissions, you are required to re-fill all fields. Thank you.")
    clickOn("courseinfo")
    assertElementByID("instructions", "You may make subsequent submissions for course information on other courses.")
    clickOn("events")
    clickOn("mysched")
    clickOffNotif("logout")
    clickOn("logout")

def testAdmin():
    clickOn("adminlogin")
    fillField("email", "ISTDadmin")
    fillField("password", "password")
    clickOn("submit")
    clickOffNotif("coursedet")
    assertElementByID("course1", "50.001")
    # clickOn("course1")
    # clickOn("course2")
    # clickOn("course3")
    clickOn("coursedet")
    # assertElementByID("tabtitle", "Course Details")
    clickOn("cohortclasses")
    # assertElementByID("tabtitle", "Cohort Class Details")
    clickOn("events")
    clickOn("pillarsched")
    clickOffNotif("logout")
    clickOn("logout")

def testPlanner():
    clickOn("plannerlogin")
    fillField("email", "John")
    fillField("password", "password")
    clickOn("submit")
    assertElementByID("freshmore", "FRESHMORE")
    # clickOn("istd")
    # clickOn("course1")
    # clickOn("course2")
    # clickOn("course3")
    clickOn("createsched")
    assertElementByID("submit", "CLICK HERE TO GENERATE SCHEDULE")
    clickOn("eventsched")
    # assertElementByID("tabtitle", "Events")
    clickOn("home")
    # assertElementByID("tabtitle", "My Schedules")
    clickOn("logout")

driver.get("http://127.0.0.1:5000/")
assert "SUTD Timetable Scheduler" in driver.title

driver.fullscreen_window()
testInstructor()
testAdmin()
testPlanner()
print("Test run successful :)")
driver.close()


