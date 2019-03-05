import React from 'react';
import { NavLink } from 'react-router-dom'; 

const InstructorLogin = () => {
	return (
		<html>
			<body>
				<h1>Login as Instructor</h1>

				<form action="" method="post">
					<label for="username">Username: </label>
					<input type="text" name="username" required="required"></input><br />
					<label for="password">Password:	</label>
					<input type="password" name="password" required="required"></input><br />
					<input type="submit" name="instructorsubmit" value="Submit"></input>
					<p><NavLink to="/instructorwelcome">bypass</NavLink></p>
				</form>
			</body>
		</html>
	);
};

export default InstructorLogin;
