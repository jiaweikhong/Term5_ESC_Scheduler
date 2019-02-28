import React from 'react';


const InstructorWelcome = () => {

	return (

		<html>
            <head>
                <title>Welcome Instructor</title>
            </head>

            <body>
                <h1>Welcome</h1>

                <p><a href="instructornotifications">View Notifications</a></p>

                <table>
                    <tr>
                    <td><form><input type="button" class="button button1" value="View Event Schedule" onclick="window.location.href='eventSchedule.html'" /></form></td>
				    <td><input type="button" class="button button1" value="View Course Schedule" onclick="window.location.href='courseSchedule.html'" /></td>

                    </tr>
                </table>

                <p><a href="home">Logout</a></p>
            </body>



        </html>
	);
};


export default InstructorWelcome;
