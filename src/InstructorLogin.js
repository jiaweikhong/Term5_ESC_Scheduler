import React from 'react';


const InstructorLogin = () => {

	return (

		<html>
			<head>
				<title>Instructor Login</title>
			</head>

			<body>
				<form action="">

					<label for="username">Username:</label>
					<input type="text" name="username" required="required"></input> <br />

					
					<label for="password">Password:	</label>
					<input type="password" name="password" required="required"></input> <br />

					<input type="submit" value="Submit"></input>

                    <p><a href="instructorwelcome">bypass</a></p>
					
	

					

					

				</form>
			</body>
		</html>
	);
};


export default InstructorLogin;
