import React from 'react';

const AdminLogin = () => {
    return (
        <html>
            {/* <head>
                <title>Admin Login</title>
            </head> */}

            <body>

                <h1>Login as Admnistrator</h1>
                <form action="" method="post">

                    <label for="username">Username: </label>
                    <input type="text" name="username" required="required"></input> <br />

                    <label for="password">Password:	</label>
                    <input type="password" name="password" required="required"></input> <br />

                    <input type="submit" name="adminsubmit" value="Submit"></input>

                    <p><a href="adminwelcome">bypass</a></p>

                </form>
            </body>
        </html>
    );
};

export default AdminLogin;