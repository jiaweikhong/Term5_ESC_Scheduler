// import React from 'react';
// import { NavLink } from 'react-router-dom';
// const InstructorWelcome = () => {

//     return (

//         <html>
//             {/* <head>
//                 <title>Welcome Instructor</title>
//             </head> */}

//             <body>
//                 <h1>Welcome</h1>

//                 <img src={timetableplaceholder} /> <br /><br />
//                 <table class="center">
//                     <tr><td><form method="post"><input type="button" class="button button1" name="toInstructorNotif" value="View Notifications" /></form></td></tr>
//                     <tr><td><form method="post"><input type="button" class="button button1" name="toUploadCourse" value="Upload a Course" /></form></td></tr>
//                     <tr><td><form method="post"><input type="button" class="button button1" name="toSubmitPersonalConstraints" value="Submit Personal Constraints" /></form></td></tr>
//                     <tr><td><form method="post"><input type="button" class="button button1" name="toInstructorEventSchedule" value="View Event Schedule" /></form></td></tr>
//                 </table>

//                 <p><NavLink to="/">Logout</NavLink></p>
//             </body>


//         </html>
//     );
// };




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
import { mainListItems } from '../lists/instructormenu';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core'
import timetableplaceholder from "./images/timetableplaceholder.png";

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

  icons:{
    position: 'absolute',
    right: 15
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  

  
});

function InstructorWelcome (props) {

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
            Welcome
          </Typography>
          <div className={classes.icons}>
          <IconButton 
          color="inherit"
          component = {Link} to = "/instructornotifications">    
              <NotificationsIcon />    
          </IconButton>
          <Button 
          color='inherit' 
          component = {Link} to = "/">   
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
        <Typography variant="h4" gutterBottom component="h2">
          My Timetable
        </Typography>
        
        <img src={timetableplaceholder} alt="timetable" />
      </main>
    </div>
  );
}

InstructorWelcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InstructorWelcome);
