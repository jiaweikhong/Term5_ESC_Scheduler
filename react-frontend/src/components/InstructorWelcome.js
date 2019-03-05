import React from 'react';
import { NavLink } from 'react-router-dom';
import timetableplaceholder from "./images/timetableplaceholder.png";


const InstructorWelcome = () => {

    return (

        <html>
            {/* <head>
                <title>Welcome Instructor</title>
            </head> */}

            <body>
                <h1>Welcome</h1>

                <img src={timetableplaceholder} /> <br /><br />
                <table class="center">
                    <tr><td><form method="post"><input type="button" class="button button1" name="toInstructorNotif" value="View Notifications" /></form></td></tr>
                    <tr><td><form method="post"><input type="button" class="button button1" name="toUploadCourse" value="Upload a Course" /></form></td></tr>
                    <tr><td><form method="post"><input type="button" class="button button1" name="toSubmitPersonalConstraints" value="Submit Personal Constraints" /></form></td></tr>
                    <tr><td><form method="post"><input type="button" class="button button1" name="toInstructorEventSchedule" value="View Event Schedule" /></form></td></tr>
                </table>

                <p><NavLink to="/">Logout</NavLink></p>
            </body>


        </html>
    );
};


export default InstructorWelcome;
