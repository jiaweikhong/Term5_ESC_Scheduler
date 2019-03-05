import React from 'react';
import { NavLink } from 'react-router-dom'; 


const AdminWelcome = () => {

	return (

        <html>

            <head>
                <title>Welcome Administrator</title>
            </head>

            <body>
                <h1>Welcome</h1>

                <p><a href="adminnotifications">View Notifications</a></p>

                <table class="center">
                    <tr>
                    <td><form><input type="button" class="button button1" value="Edit Soft Constraints" onclick="window.location.href='createSchedule.html'" /></form></td>
				    <td><input type="button" class="button button1" value="View/Edit Course Material" onclick="window.location.href='deleteSchedule.html'" /></td>
                    </tr>
                </table>
            </body>

        <p><NavLink to="/">Logout</NavLink></p>
		




        </html>

    );
};

export default AdminWelcome;
