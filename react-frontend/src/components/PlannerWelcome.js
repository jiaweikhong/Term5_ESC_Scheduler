import React from 'react';
import { NavLink } from 'react-router-dom'; 

const PlannerWelcome = () => {

	return (

        <html>

            <head>
                <title>Welcome Planner</title>
            </head>

            <body>
                <h1>Welcome</h1>


                <table>
                    <tr>
                    <td><form><input type="button" class="button button1" value="Create Schedule" onclick="window.location.href='createschedule'" /></form></td>
				    <td><input type="button" class="button button1" value="Delete Schedule" onclick="window.location.href='deleteSchedule.html'" /></td>
                    </tr>

                    <tr>

                    <td><form><input type="button" class="button button1" value="View/Edit Event Schedule" onclick="window.location.href='eventScheduleCoord.html'" /></form></td>
				    <td><input type="button" class="button button1" value="View/Edit Course Schedule" onclick="window.location.href='courseScheduleCoord.html'" /></td>
                    </tr>
                </table>
            </body>


		<p><NavLink to="/">Logout</NavLink></p>




        </html>
	);
};


export default PlannerWelcome;
