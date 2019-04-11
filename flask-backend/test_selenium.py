from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()
driver.get("http://127.0.0.1:5000/")
assert "SUTD Timetable Scheduler" in driver.title

driver.fullscreen_window()

# test instructor login
time.sleep(1) # seconds
instructorLoginElem = driver.find_element_by_id("instructorlogin")
instructorLoginElem.click()

emailElem = driver.find_element_by_id("email")
emailElem.clear()
emailElem.send_keys("Natalie")

passwordElem = driver.find_element_by_id("password")
passwordElem.clear()
passwordElem.send_keys("Natalie")

time.sleep(1) # seconds
loginElem = driver.find_element_by_id("submit")
loginElem.click()

# assert "instructorwelcome" in driver.url

time.sleep(1)
logoutElem = driver.find_element_by_id("logout")
logoutElem.click()

# admin login
time.sleep(1) # seconds
adminLoginElem = driver.find_element_by_id("adminlogin")
adminLoginElem.click()

emailElem = driver.find_element_by_id("email")
emailElem.clear()
emailElem.send_keys("ISTDadmin")

passwordElem = driver.find_element_by_id("password")
passwordElem.clear()
passwordElem.send_keys("pw")

time.sleep(1) # seconds
loginElem = driver.find_element_by_id("submit")
loginElem.click()

time.sleep(1) # seconds
course1Elem = driver.find_element_by_id("course1")
course1Elem.click()

time.sleep(1) # seconds
course2Elem = driver.find_element_by_id("course2")
course2Elem.click()

time.sleep(1) # seconds
course3Elem = driver.find_element_by_id("course3")
course3Elem.click()

time.sleep(1)
logoutElem = driver.find_element_by_id("logout")
logoutElem.click()

# planner login
time.sleep(1) # seconds
plannerLoginElem = driver.find_element_by_id("plannerlogin")
plannerLoginElem.click()

emailElem = driver.find_element_by_id("email")
emailElem.clear()
emailElem.send_keys("john")

passwordElem = driver.find_element_by_id("password")
passwordElem.clear()
passwordElem.send_keys("john")

time.sleep(1) # seconds
loginElem = driver.find_element_by_id("submit")
loginElem.click()

time.sleep(1)
istdElem = driver.find_element_by_id("istd")
istdElem.click()

time.sleep(1) # seconds
course1Elem = driver.find_element_by_id("course1")
course1Elem.click()

time.sleep(1) # seconds
course2Elem = driver.find_element_by_id("course2")
course2Elem.click()

time.sleep(1) # seconds
course3Elem = driver.find_element_by_id("course3")
course3Elem.click()

time.sleep(1)
logoutElem = driver.find_element_by_id("logout")
logoutElem.click()

time.sleep(1)
driver.close()