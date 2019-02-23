import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Fetch the service account key JSON file contents
cred = credentials.Certificate('term-5-esc-scheduler-firebase-adminsdk-cfadg-3d9e06988a.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://term-5-esc-scheduler.firebaseio.com/'
})

ref = db.reference('users')

#create a new user
new_username = 'noo'
new_password = 'woof'

ref.update({
    new_username: new_password
})

#pull out a user's password
checking_user_pw = 'lala'
print(ref.child(checking_user_pw).get())