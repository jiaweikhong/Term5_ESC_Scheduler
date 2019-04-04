

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
import {Button, Divider, TextField, FormControl} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CourseMaterial from './CourseMaterial';







// TODO
// try to stay in welcome page and only change the content when clicking on the list icons
//change icons for list
//

const drawerWidth = 240;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 70

  },
  coursecode: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:150

  },
  coursetitle:{
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:400
  },
  card: {
    minWidth: 275,
    padding:50
    
  },
  space:{
    height:20
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



  textfields:{
    display: 'flex',
    flexWrap: 'wrap'
  }
  

  
});


function UploadCourse (props) {

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

        <Card className={classes.card}>
          <CardContent>
        <div className={classes.text}>
        <Typography gutterBottom variant="h4" component="h4">
        My Courses</Typography>
        <Typography gutterBottom component ="h6">
        Please fill in the course code and course title of the courses you are teaching. Thank you</Typography>
        </div>
        <Divider/>

        <CardActions>
        <div className={classes.text}>
        <FormControl fullWidth>
        <div>
        <TextField
          id="instructor-input"
          className={classes.coursecode}
          margin="normal"
          variant='outlined'
          placeholder= "Course Code"
          
        />

        <TextField
          id="instructor-input"
          className={classes.coursetitle}
          margin="normal"
          variant='outlined'
          placeholder= "Course Title"
        />
        </div>
        
        </FormControl>
        <FormControl fullWidth>
        <div>
        <TextField
          id="instructor-input"
          className={classes.coursecode}
          margin="normal"
          variant='outlined'
          placeholder= "Course Code"
          
        />

        <TextField
          id="instructor-input"
          className={classes.coursetitle}
          margin="normal"
          variant='outlined'
          placeholder= "Course Title"
        />
        </div>
        </FormControl>
        <FormControl fullWidth>
        <div>
        <TextField
          id="instructor-input"
          className={classes.coursecode}
          margin="normal"
          variant='outlined'
          placeholder= "Course Code"
          
        />

        <TextField
          id="instructor-input"
          className={classes.coursetitle}
          margin="normal"
          variant='outlined'
          placeholder= "Course Title"
        />
        </div>
        <Button variant="contained" color="primary" className={classes.button}>
        Submit
      </Button>
        </FormControl>
        </div>
        </CardActions>
        </CardContent>
        </Card>

        <div className={classes.space} />
        

        <Card className={classes.card}>
          <CardContent>
          <div className={classes.text}>
        <Typography gutterBottom variant="h4" component="h4">
        Course Information</Typography>
        <Typography gutterBottom component ="h6">
        This section is to be filled ONLY by the individual course leaders. Please leave this blank if you are not a course leader.
         Course leaders should discuss with his/her colleauges before filling this section. You do not need to fill in all three course soft constraints. Thank you. </Typography>
       
        </div>
        <CardActions className={classes.textfields}>
        <FormControl fullWidth className={classes.text} >
        <Typography variant='h5'>First Course</Typography>
        <Divider/>
        </FormControl>
        
        <div >
        <TextField
          id="instructor-input"
          className={classes.coursecode}
          margin="normal"
          variant="outlined"
          placeholder= "Course Code"
          
        />
        <TextField
          id="instructor-input"
          className={classes.coursetitle}
          margin="normal"
          variant="outlined"
          placeholder= "Course Title"
        />
        </div>

        

        <div>
        <div className={classes.space} />
        <CourseMaterial/>
        </div>

        </CardActions>
          </CardContent>
        
        </Card>
      
        <div className={classes.space} />
        <Card className={classes.card}>
          <CardContent>

        <CardActions className={classes.textfields}>
        <FormControl fullWidth className={classes.text} >
        <Typography variant='h5'>Second Course</Typography>
        <Divider/>
        </FormControl>
        
        <div >
        <TextField
          id="instructor-input"
          className={classes.coursecode}
          margin="normal"
          variant="outlined"
          placeholder= "Course Code"
          
        />
        <TextField
          id="instructor-input"
          className={classes.coursetitle}
          margin="normal"
          variant="outlined"
          placeholder= "Course Title"
        />
        </div>

        

        <div>
        <div className={classes.space} />
        <CourseMaterial/>
        </div>

        </CardActions>
          </CardContent>
        
        </Card>

        <div className={classes.space} />

        
      </main>
    </div>
  );
}

UploadCourse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadCourse);
