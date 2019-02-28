import React from 'react';
import {NavLink} from 'react-router-dom';


const Home = () => {

	return (
        <html>

            <head>
                <title>Home</title>
            </head>

            <body>

                <h1>Login</h1>
                <p><a href="adminlogin">Login as administrator</a></p>
                <p><a href="instructorlogin">Login as instructor</a></p>
                <p><a href="plannerlogin">Login as planner</a></p>

            </body>

        </html>
	);
};


export default Home;