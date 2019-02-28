import React from 'react';

const AdminLogin = () => {
    return (
        <html>
            <head>
                <title>Admin Login</title>
            </head>

            <body>
                <form action="">

                    <label for="username">Username:</label>
                    <input type="text" name="username" required="required"></input> <br />

                    <label for="password">Password:	</label>
                    <input type="password" name="password" required="required"></input> <br />

                    <input type="submit" value="Submit"></input>

                    <p><a href="adminwelcome">bypass</a></p>

                </form>
            </body>
        </html>
    );
};

export default AdminLogin;