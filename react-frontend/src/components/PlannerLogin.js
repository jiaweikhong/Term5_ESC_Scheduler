import React from 'react';


const PlannerLogin = () => {

	return (

		<html>
			<head>
				<title>Planner Login</title>
			</head>

			<body>
				<form action="" method="post">

					<label for="username">Username:</label>
					<input type="text" name="username" required="required"></input> <br />

					<label for="password">Password:	</label>
					<input type="password" name="password" required="required"></input> <br />

					<input type="submit" name="plannersubmit" value="Submit"></input>

                    <p><a href="plannerwelcome">bypass</a></p>
					

					

					

				</form>
			</body>
		</html>
	);
};


export default PlannerLogin;
