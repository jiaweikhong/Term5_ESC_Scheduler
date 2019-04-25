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
import PlannerAppbar from './PlannerAppbar';

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

  submit: {
    marginTop: theme.spacing.unit * 3,
  },

});

function PlannerWelcome(props) {

  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <PlannerAppbar />
      


      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography id="tabtitle" variant="h4" gutterBottom component="h2">
          My Schedules
        </Typography>

        <form method="POST">
          <Button id="freshmore" type="submit" name="Freshmore" variant="outlined" className={classes.submit}>Freshmore</Button>
        </form>

        <form method="POST">
          <Button id="epd" type="submit" color='inherit' name="EPD" variant="outlined" className={classes.submit}>EPD</Button>
        </form>

        <form method="POST">
          <Button id="istd" type='submit'color='inherit'name='ISTD' variant="outlined" className={classes.submit}>ISTD</Button>
        </form>

        <form method="POST">
          <Button id="esd" type="submit" color='inherit' name="ESD" variant="outlined" className={classes.submit}>ESD</Button>
        </form>

        <form method="POST">
          <Button id="asd" type="submit" color='#inherit' name="ASD" variant="outlined" className={classes.submit}>ASD</Button>
        </form>

      </main>
    </div>
  );
}

PlannerWelcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlannerWelcome);
