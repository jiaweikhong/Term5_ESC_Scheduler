// import React from 'react';
// import { NavLink } from 'react-router-dom'; 


// const AdminWelcome = () => {

// 	return (

//         <html>

//             <head>
//                 <title>Welcome Administrator</title>
//             </head>

//             <body>
//                 <h1>Welcome</h1>

//                 <p><a href="adminnotifications">View Notifications</a></p>

//                 <table class="center">
//                     <tr>
//                     <td><form><input type="button" class="button button1" value="Edit Soft Constraints" onclick="window.location.href='createSchedule.html'" /></form></td>
// 				    <td><input type="button" class="button button1" value="View/Edit Course Material" onclick="window.location.href='deleteSchedule.html'" /></td>
//                     </tr>
//                 </table>
//             </body>

//         <p><NavLink to="/">Logout</NavLink></p>
		




//         </html>

//     );
// };

// export default AdminWelcome;

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
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from '../lists/Adminmenu';
import {secondaryListItems} from '../lists/Adminmenu';
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
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

function AdminWelcome (props) {

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
            >
              Welcome
            </Typography>
            <IconButton 
            color="inherit"
            component = {Link} to = "/instructornotifications">    
                <NotificationsIcon />    
            </IconButton>
            <Button 
            color="primary" 
            variant="outlined"
            component = {Link} to = "/">   
            LOGOUT
          </Button>
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

          <Divider />
          <List>{secondaryListItems}</List> 

        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography variant="h4" gutterBottom component="h2">
            Pillar Timetable
          </Typography>
          
          <img src={timetableplaceholder} alt="timetable" />
        </main>
      </div>
    );
  }


AdminWelcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminWelcome);