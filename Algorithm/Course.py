class Course:
    courseID = None
    courseName = ""
    courseInstructors = []
    hoursPerWeek = None
    numComponents = {} #dictionary containing numLectures, numTutorials and numLabs as keys and the number as values
    """ numLectures = None
    numTutorials = None
    numLabs = None """
    componentsDuration = {} #dictionary containing lectureDuration, tutorialDuration and labDuration as keys and the number as values
    """lectureDuration = None
    tutorialDuration = None
    labDuration = None"""
    termConducted = None #is it a term 4 or term 5 or what mod
    isCore = None #boolean value about whether the course is a core mod or not
    courseSize = None
    roomReq = {} #dictionary containing the type of lesson (lecture, cohort) and then the type of room as value
    extraReq = []
