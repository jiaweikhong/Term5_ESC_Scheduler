// import React from 'react';


// const EventSchedule = () => {

// 	return (


//         <html>
//             <head>
//                 <title>Event Scheduling</title>
//             </head>
//             <body>
//                 <h1>Update Event</h1>

//                 <p><button>Choose time slot</button></p>
//                 <p><a href="plannerwelcome">back</a></p>
//             </body>
//         </html>
// 	);
// };


// export default EventSchedule;

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

function EventSchedule(props) {

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
          Event Schedule
          </Typography>

        <p><button>Choose time slot</button></p>
        <p><a href="plannerwelcome">back</a></p>

      </main>
    </div>
  );
}

EventSchedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventSchedule);