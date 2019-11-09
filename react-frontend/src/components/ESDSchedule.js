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
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core'
import PlannerAppbar from './PlannerAppbar'


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

function ESDSchedule (props) {

  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <PlannerAppbar />


      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h4" gutterBottom component="h2">
          ESD Schedule
        </Typography>

        {/* TODO: insert timetable here */}
        <p>This is part of ESDSchedule.js. token: {window.token} </p>


      </main>
    </div>
  );
}

ESDSchedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ESDSchedule);