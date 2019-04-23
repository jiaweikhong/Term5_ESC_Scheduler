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
// import {secondaryListItems} from '../lists/Adminmenu';
import {Link} from 'react-router-dom';
import {Button, CardContent} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';



const drawerWidth = 240;



const styles = theme => ({

    card: {
        minWidth: 275,
        padding:30
            
        },
    text:{
        textAlign: 'left'
        },
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
  timetable:{
    height:400
  },
  space:{
    height:20
  },
  toolbar: theme.mixins.toolbar,
  
});

function AdminInstructPage (props) {

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

          {/* <Divider />
          <List>{secondaryListItems}</List>  */}

        </Drawer>
        <main className={classes.content}>
          <Card className={classes.card}>
            <CardContent>
            <div className={classes.text}>
            <Typography gutterBottom variant="h4" component="h4">
            Timetable</Typography>
            </div>
            <div className={classes.timetable}/>
            </CardContent>
          </Card>

          <div className={classes.space}/>
          <Card className={classes.card}>
            <CardContent>
            <div className={classes.text}>
            <Typography gutterBottom variant="h4" component="h4">
            Registered Courses</Typography>
            </div>
            
            </CardContent>
          </Card>

          <div className={classes.space}/>
          <Card className={classes.card}>
            <CardContent>
            <div className={classes.text}>
            <Typography gutterBottom variant="h4" component="h4">
            Soft Constraints</Typography>
            </div>
            
            </CardContent>
          </Card>
          
        </main>
      </div>
    );
  }


AdminInstructPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminInstructPage);