

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
import OutlinedTextFields from './OutlinedTextFields';
import MenuItem from '@material-ui/core/MenuItem';








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
  pillar:{
    //marginLeft: theme.spacing.unit,
    width:150
  },
  coursetitle:{
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:500
  },
  card: {
    minWidth: 275,
    padding:30
    
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

  main:{
    height:35
  },

  textfields:{
    display: 'flex',
    flexWrap: 'wrap'
  }
  

  
});

const constraints = [
  {
    value: 'ISTD',
    label: 'ISTD',
  },
  {
    value: 'EPD',
    label: 'EPD',
  },
  {
    value: 'ESD',
    label: 'ESD',
  },
  {
    value: 'ASD',
    label: 'ASD',
  },
  {
    value:'Freshmore',
    label:'Freshmore'
  },
  {
    value:'HASS',
    label:'HASS'
  },

];


class SoftConstraints extends React.Component {

  state = {
    pillar:''
    
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render(){
    const { classes } = this.props;

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
        Individual Soft Constraints</Typography>
        <Typography gutterBottom component ="h6">
        Please rank you soft constraints. They will be taken into consideration when creating your timetable. Thank you</Typography>
        </div>
        <Divider/>
        <CardActions>
          <FormControl fullWidth>
        <OutlinedTextFields/>
        
        <Button variant="contained" color="primary" className={classes.button}>
        Submit
      </Button>
      </FormControl>
        </CardActions>
        </CardContent>
        </Card>

        <div className={classes.space} />

        <Card className={classes.card}>
          <CardContent>
          <div className={classes.text}>
        <Typography gutterBottom variant="h4" component="h4">
        Course Soft Constraints</Typography>
        <Typography gutterBottom component ="h6">
        This section is to be filled ONLY by the individual course leaders. Please leave this blank if you are not a course leader.
         Course leaders should discuss with his/her colleauges before filling this section. You do not need to fill in all three course soft constraints. Thank you. </Typography>
        <Divider/>
        </div>
        <CardActions className={classes.textfields}>
        <FormControl fullWidth className={classes.text} >
        <Typography variant='h5'>First Course</Typography>
        </FormControl>

        <div >
        <TextField
        id='choose-pillar'
        select
        //label ='Pillar'
        helperText='Select your pillar'
        className={classes.pillar}
        value={this.state.pillar}
        onChange={this.handleChange('pillar')}
        //variant='outlined'
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        
        margin="normal"
       
        //variant="outlined"
      >
        {constraints.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
        <TextField
          id="instructor-input"
          className={classes.coursecode}
          margin="normal"
          //variant="outlined"
          placeholder= "Course Code"
          
        />

        <TextField
          id="instructor-input"
          className={classes.coursetitle}
          margin="normal"
          //variant="outlined"
          placeholder= "Course Title"
        />
        </div>
       
        <div>
        <OutlinedTextFields/>
        </div>

        <div className={classes.main} />

        <FormControl fullWidth className={classes.text} >
        <div className={classes.main} />
        <Typography variant='h5'>Second Course</Typography>
        </FormControl>
        <div >
        <TextField
        id='choose-pillar'
        select
        //label ='Pillar'
        InputLa
        className={classes.pillar}
        value={this.state.pillar}
        onChange={this.handleChange('pillar')}
        helperText='Select your pillar'
        //variant='outlined'
        
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        
        margin="normal"
       
        //variant="outlined"
      >
        {constraints.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

        <TextField
          id="instructor-input"
          className={classes.coursecode}
          margin="normal"
          //variant="outlined"
          placeholder= "Course Code"
          
        />

        <TextField
          id="instructor-input"
          className={classes.coursetitle}
          margin="normal"
          //variant="outlined"
          placeholder= "Course Title"
        />
        </div>
       
        <div>
        <OutlinedTextFields/>
        </div>

        <FormControl fullWidth>

        <Button variant="contained" color="primary" className={classes.button}>
        Submit
      </Button>

      </FormControl>
        </CardActions>
          </CardContent>
        
        </Card>
      </main>
    </div>
  );
}}

SoftConstraints.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SoftConstraints);
