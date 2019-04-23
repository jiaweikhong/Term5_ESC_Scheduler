// import React from 'react';
// import { NavLink } from 'react-router-dom'; 

// const PlannerWelcome = () => {

// 	return (

//         <html>

//             <head>
//                 <title>Welcome Planner</title>
//             </head>

//             <body>
//                 <h1>Welcome</h1>


//                 <table class="center">
//                     <tr>
//                     <td><form><input type="button" class="button button1" value="Create Schedule" onclick="window.location.href='createschedule'" /></form></td>
// 				    <td><input type="button" class="button button1" value="Delete Schedule" onclick="window.location.href='deleteSchedule.html'" /></td>
//                     </tr>

//                     <tr>

//                     <td><form><input type="button" class="button button1" value="View/Edit Event Schedule" onclick="window.location.href='eventScheduleCoord.html'" /></form></td>
// 				    <td><input type="button" class="button button1" value="View/Edit Course Schedule" onclick="window.location.href='courseScheduleCoord.html'" /></td>
//                     </tr>
//                 </table>
//             </body>

// 		<p><NavLink to="/">Logout</NavLink></p>

//         </html>
// 	);
// };


// export default PlannerWelcome;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from '../lists/PlannerMenu';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core'


// TODO
// try to stay in welcome page and only change the content when clicking on the list icons
//change icons for list
//

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

  icons: {
    position: 'absolute',
    right: 15

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,



});

function PlannerWelcome(props) {

  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classNames(classes.appBar)}>

        <Toolbar >
          <Typography
            variant="h6"
            color="inherit"
            noWrap
          // className ={classes.welcome}
          >
            Welcome {window.user}
          </Typography>
          <div className={classes.icons}>
            <IconButton
              color="inherit"
              component={Link} to="/plannernotification">
              <NotificationsIcon />
            </IconButton>
            <Button
              id="logout"
              color='inherit'
              component={Link} to="/">
              LOGOUT
        </Button>
          </div>
        </Toolbar>
      </AppBar>


      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper),
        }}
      >
        <div className={classes.toolbar} />

        <List>{mainListItems}</List>
      </Drawer>


      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography id="tabtitle" variant="h4" gutterBottom component="h2">
          My Schedules
        </Typography>

        <form method="POST">
          <Button id="freshmore" type="submit" color='inherit' name="Freshmore">Freshmore</Button>
        </form>

        <form method="POST">
          <Button id="epd" type="submit" color='inherit' name="EPD">EPD</Button>
        </form>

        <form method="POST">
          <Button id="istd" type='submit'color='inherit'name='ISTD'>ISTD</Button>
        </form>

        <form method="POST">
          <Button id="esd" type="submit" color='inherit' name="ESD">ESD</Button>
        </form>

        <form method="POST">
          <Button id="asd" type="submit" color='inherit' name="ASD">ASD</Button>
        </form>

      </main>
    </div>
  );
}

PlannerWelcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlannerWelcome);
