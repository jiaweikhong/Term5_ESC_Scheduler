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
import OutlinedTextFields from "./OutlinedTextFields";
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';



// TODO
// try to stay in welcome page and only change the content when clicking on the list icons
//change icons for list
//

const drawerWidth = 240;



const styles = theme => ({
  // paper: {
  //   ...theme.mixins.gutters(),
  //   paddingTop: theme.spacing.unit * 2,
  //   paddingBottom: theme.spacing.unit * 2,
  //   paddingLeft: 50
  // },
  card:{
    minWidth: 800
  },
  root: {
    display: 'flex',
  },
  text:{
    textAlign: 'left'
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

function SoftConstraints (props) {

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
            <div className={classes.icons}>
            <IconButton 
            color="inherit"
            component = {Link} to = "/adminnotifications">    
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

          <Divider />
          <List>{secondaryListItems}</List> 

        </Drawer>
        
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.text}>
            <Typography variant="h4" gutterBottom component="h2">
              Soft Constraints
            </Typography>

            <Typography gutterBottom component="p">
              Please rank your soft constraints. They will be taken into consideration when creating your timetable. Thank you.
            </Typography>
            </div>
            <Divider/>
          </CardContent>

      <CardActions>
        <OutlinedTextFields/>
      </CardActions>
    </Card>
          {/* <Paper className={classes.root} elevation={3}>
          <div className={classes.text}>
          <Typography variant="h4" gutterBottom component="h2">
            Soft Constraints
          </Typography>
          <Typography gutterBottom component="p">
            Please rank your soft constraints. They will be taken into consideration when creating your timetable. Thank you.
          </Typography>
          </div>
          
          <Divider/>
          <OutlinedTextFields/>
          </Paper> */}
        </main>
        
      </div>
    );
  }


SoftConstraints.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SoftConstraints);