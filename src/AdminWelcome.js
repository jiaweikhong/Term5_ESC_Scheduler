import React from 'react';


const AdminWelcome = () => {

	return (

        <html>

            <head>
                <title>Welcome Administrator</title>
            </head>

            <body>
                <h1>Welcome</h1>

                <p><a href="adminnotifications">View Notifications</a></p>

                <table>
                    <tr>
                    <td><form><input type="button" class="button button1" value="Edit Soft Constraints" onclick="window.location.href='createSchedule.html'" /></form></td>
				    <td><input type="button" class="button button1" value="View/Edit Course Material" onclick="window.location.href='deleteSchedule.html'" /></td>
                    </tr>

                </table>
            </body>


		<p><a href="home">Logout</a></p>




        </html>

    );
};

export default AdminWelcome;
