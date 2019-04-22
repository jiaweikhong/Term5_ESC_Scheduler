

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
import MenuItem from '@material-ui/core/MenuItem';
import CourseMaterial from './CourseMaterial';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormLabel } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import ChipInput from 'material-ui-chip-input'
import FormControlLabel from '@material-ui/core/FormControlLabel';





const drawerWidth = 240;

const styles = theme => ({
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
  },
  instructors:{
    width:830
  },
  input:{
    width: 800,
},

  button: {
    margin: theme.spacing.unit,
    width: 70

  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexdirection: 'column'
  },
  textField: {
    //marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:150
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },  
  formControl: {
    margin: theme.spacing.unit * 3,
    textAlign:'left'
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },

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

const hours = [
  {
    value: '1',
    label: '1 hr',
  },
  {
    value: '1.5',
    label: '1.5 hrs',
  },
  {
    value: '2',
    label: '2 hrs',
  },
  {
    value: '2.5',
    label: '2.5 hrs',
  },
  {
    value: '3',
    label: '3 hrs',
  },

  {
    value:'',
    label:'-'
  }
];

const time = [
  {value: '0', label: '-'},
  {value: '8.5',label: '0830',},
  {value: '9',label: '0900',},
  {value: '9.5',label: '0930'},
  {value: '10',label: '1000'},
  {value: '10.5',label:'1030'},
  {value: '11',label: '1100',},
  {value: '11.5',label: '1130',},
  {value: '12',label: '1200',},
  {value: '12.5',label: '1230',},
  {value: '13',label: '1300',},
  {value: '13.5',label: '1330',},
  {value: '14',label: '1400',},
  {value: '14.5',label: '1430',},
  {value: '15',label: '1500',},
  {value: '15.5',label: '1530',},
  {value: '16',label: '1600',},
  {value: '16.5',label: '1630',},
  {value: '17',label: '1700',},
  {value: '17.5',label: '1730',},
  {value: '18',label: '1800',},
  {value: '18.5',label: '1830',},

];

const day = [
  {value: '0', label: '-'},
  {value: '1', label: 'Monday'},
  {value: '2', label: 'Tuesday'},
  {value: '3', label: 'Wednesday'},
  {value: '4', label: 'Thursday'},
  {value: '5', label: 'Friday'},

]


class SoftConstraints extends React.Component {

  state = {
    pillar1:'',from1:'',from2:'',from3:'',from4:'',from5:'',
    to1:'',to2:'',to3:'',to4:'',to5:'',
    day1:'',day2:'',day3:'',day4:'',day5:'',
    lecture: '',
    lect_1:'',
    lect_2:'',
    lect_3:'',
    cohort:'',
    co_1:'',
    co_2:'',
    co_3:'',
    lab:'',
    lab1:'',
    lab2:'',
    lab3:'',
    //value: 'female',

    
  };




  handleChange = name => event => {
    this.setState({[name]: event.target.value,});
    this.setState({ value: event.target.value });
  };

  handleAdd = name =>event => {
    this.setState({
      [name]: event.target.value,
    });
    //chips.append(this.value)

  }

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
            Welcome {window.user}
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
      <form method='POST'>

      <Card className={classes.card}>
          <CardContent>
          <div className={classes.text}>
        <Typography gutterBottom variant="h4" component="h4">
        Course Details - ONLY for course leads</Typography>
        <Typography gutterBottom component ="h6">
        You may make subsequent submissions for course information on other courses.  </Typography>
        <Divider/>
        </div>
        <CardActions className={classes.textfields}>
        <FormControl fullWidth className={classes.text} >
        {/* <Typography variant='h5'>First Course</Typography> */}
        </FormControl>

        <div className={classes.text}>
        <TextField
        id='choose-pillar'
        select
        name='pillar1'
        //label ='Pillar'
        helperText='Select your pillar'
        className={classes.pillar}
        value={this.state.pillar1}
        onChange={this.handleChange('pillar1')}
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
        name='courseCode1'
          id="instructor-input"
          className={classes.coursecode}
          margin="normal"
          //variant="outlined"
          placeholder= "Course Code"
          
        />

        <TextField
          name='courseTitle1'
          id="instructor-input"
          className={classes.coursetitle}
          margin="normal"
          //variant="outlined"
          placeholder= "Course Title"
        />
        <TextField
          name='instructors1'
          id="instructor-input"
          className={classes.instructors}
          margin="normal"
          //variant="outlined"
          label="Course Instructors"
          placeholder= "Please put a ',' inbetween instructor names"
          helperText='Please include course lead'
        />
        <TextField
        name='lead1'
          id="instructor-input"
          className={classes.instructors}
          margin="normal"
          //variant="outlined"
          placeholder= "Name of Course Lead"
        />
        </div>
       
        <div>
        <Grid container spacing={36}>

    <Grid item xs ={6}>
    <div className={classes.space} />
    <FormLabel component="legend" className={classes.text} focused>Number of lelctures per week</FormLabel>
        <RadioGroup
          aria-label="lecture"
          name="lecture"
          className={classes.group}
          lecture={this.state.lecture}
          //value={this.state.lecture}
          onChange={this.handleChange('lecture')}
        >
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="" control={<Radio />} label="No lecture" />
        </RadioGroup>

        </Grid>


        <Grid item xs={6}>
        <div className={classes.space} />
    <FormLabel component='legend' className={classes.text} focused>Duration of each lecture</FormLabel>
    <FormControl fullWidth>
    <TextField
        id='choose-soft-constraint'
        name='lect_1'
        select
        label ='First lecture'
        className={classes.textField}
        value={this.state.lect_1}
        onChange={this.handleChange('lect_1')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        
        margin="normal"
        //variant="outlined"
      >
        {hours.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

    
    <TextField
        id='choose-soft-constraint'
        name='lect_2'
        select
        label ='Second lecture'
        className={classes.textField}
        value={this.state.lect_2}
        onChange={this.handleChange('lect_2')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        
        margin="normal"
        //variant="outlined"
      >
        {hours.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

     
    <TextField
        id='choose-soft-constraint'
        name='lect_3'
        select
        label ='Third lecture'
        className={classes.textField}
        value={this.state.lect_3}
        onChange={this.handleChange('lect_3')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        
        margin="normal"
        //variant="outlined"
      >
        {hours.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      </FormControl>


    </Grid>

    <Grid item xs={6}>
    <div className={classes.space} />
    <FormLabel component="legend" className={classes.text} focused>Number of cohort classes per week</FormLabel>
        <RadioGroup
          aria-label="lecture"
          name="cohort"
          className={classes.group}
          cohort={this.state.cohort}
          onChange={this.handleChange('cohort')}
          value={this.state.cohort}
        >
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="none" control={<Radio />} label="No cohort classes" />
        </RadioGroup>
    </Grid>


    <Grid item xs={6}>
    <div className={classes.space} />
    <FormLabel component='legend' className={classes.text} focused>Duration of each cohort class</FormLabel>
    <FormControl fullWidth>
    <TextField
        id='choose-soft-constraint'
        name='co_1'
        select
        label ='First cohort'
        className={classes.textField}
        value={this.state.co_1}
        onChange={this.handleChange('co_1')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        
        margin="normal"
        //variant="outlined"
      >
        {hours.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

    
    <TextField
        id='choose-soft-constraint'
        name='co_2'
        select
        label ='Second cohort'
        className={classes.textField}
        value={this.state.co_2}
        onChange={this.handleChange('co_2')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        
        margin="normal"
        //variant="outlined"
      >
        {hours.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

     
    <TextField
        id='choose-soft-constraint'
        name='co_3'
        select
        label ='Third cohort'
        className={classes.textField}
        value={this.state.co_3}
        onChange={this.handleChange('co_3')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        
        margin="normal"
        //variant="outlined"
      >
        {hours.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      </FormControl>
      </Grid>

       <Grid item xs ={6}>
       <div className={classes.space} />
    <FormLabel component="legend" className={classes.text} focused>Number of lab sessions per week</FormLabel>
        <RadioGroup
          aria-label="lab"
          name="lab"
          className={classes.group}
          lab={this.state.lab}
          onChange={this.handleChange('lab')}
          value = {this.state.lab}
        >
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="none" control={<Radio />} label="No lab" />
        </RadioGroup>
        </Grid> 

         <Grid item xs={6}>
         <div className={classes.space} />
    <FormLabel component='legend' className={classes.text} focused>Duration of each lab session</FormLabel>
    <FormControl fullWidth>
    <TextField
        id='choose-soft-constraint'
        name='lab1'
        select
        label ='First lab session'
        className={classes.textField}
        value={this.state.lab1}
        onChange={this.handleChange('lab1')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        
        margin="normal"
        //variant="outlined"
      >
        {hours.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

    
    <TextField
        id='choose-soft-constraint'
        name='lab2'
        select
        label ='Second lab session'
        className={classes.textField}
        value={this.state.lab2}
        onChange={this.handleChange('lab2')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        
        margin="normal"
        //variant="outlined"
      >
        {hours.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

     
    <TextField
        id='choose-soft-constraint'
        name='lab3'
        select
        label ='Third lab session'
        className={classes.textField}
        value={this.state.lab3}
        onChange={this.handleChange('lab3')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        
        margin="normal"
        //variant="outlined"
      >
        {hours.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      </FormControl>


    </Grid> 
</Grid>
        </div>

        <div className={classes.main} />

        <FormControl fullWidth className={classes.text} >
        <div className={classes.main} />
        <Typography variant='h5'>Course Soft Constraints</Typography>
        </FormControl>
        
       
        <div>
        <Divider/>
        <FormControl >
        <div className={classes.dense}></div>
        <FormLabel className={classes.text} focused>Select the time slot you wish to keep free from your timetable. Requets with valid reasons will be prioritised. Thank you.</FormLabel>
        
     <div >
     
     <div className={classes.container}>
      <TextField
          name='day1'
          id='day'
          select
          label ='Day'
          className={classes.textField}
          value={this.state.day1}
          onChange={this.handleChange('day1')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">1.</InputAdornment>,
          }}
          
          margin="normal"
          
          //variant="outlined"
        >
          {day.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        


        <TextField
          name='from1'
          id='from'
          select
          label ='From'
          className={classes.textField}
          value={this.state.from1}
          onChange={this.handleChange('from1')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}          
          margin="normal"
          //variant="outlined"
        >
          {time.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name='to1'
          id='to'
          select
          label ='To'
          className={classes.textField}
          value={this.state.to1}
          onChange={this.handleChange('to1')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          //variant="outlined"
        >
          {time.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        
        <FormControl fullWidth>
        <TextField
          name='reason1'
          id="instructor-input"
          className={classes.input}
          margin="normal"
          variant="outlined"
          multiline
          rows ="5"
          placeholder= "Please provide a valid reason for your request"

        />
        </FormControl>
        </div>
        
        
        <div >
     <FormControl fullWidth margin="none">
     <div className={classes.container}> 
      <TextField
          name='day2'
          id='day'
          select
          label ='Day'
          className={classes.textField}
          value={this.state.day2}
          onChange={this.handleChange('day2')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">2.</InputAdornment>,
          }}
          
          margin="normal"
          
          //variant="outlined"
        >
          {day.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        


        <TextField
          name='from2'
          id='from'
          select
          label ='From'
          className={classes.textField}
          value={this.state.from2}
          onChange={this.handleChange('from2')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}          
          margin="normal"
          //variant="outlined"
        >
          {time.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
        name='to2'
          id='to'
          select
          label ='To'
          className={classes.textField}
          value={this.state.to2}
          onChange={this.handleChange('to2')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          //variant="outlined"
        >
          {time.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        </FormControl>
        <FormControl fullWidth>
        <TextField
        name='reason2'
          id="instructor-input"
          className={classes.input}
          margin="normal"
          variant="outlined"
          multiline
          rows ="5"
          placeholder= "Please provide a valid reason for your request"

        />
        </FormControl>
        </div>
       

        <div >
     <FormControl fullWidth margin="none">
     <div className={classes.container}>
      <TextField
      name='day3'
          id='day'
          select
          label ='Day'
          className={classes.textField}
          value={this.state.day3}
          onChange={this.handleChange('day3')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">3.</InputAdornment>,
          }}
          
          margin="normal"
          
          //variant="outlined"
        >
          {day.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        


        <TextField
        name='from3'
          id='from'
          select
          label ='From'
          className={classes.textField}
          value={this.state.from3}
          onChange={this.handleChange('from3')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}          
          margin="normal"
          //variant="outlined"
        >
          {time.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
        name='to3'
          id='to'
          select
          label ='To'
          className={classes.textField}
          value={this.state.to3}
          onChange={this.handleChange('to3')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          //variant="outlined"
        >
          {time.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        </FormControl>
        <FormControl fullWidth>
        <TextField
        name='reason3'
          id="instructor-input"
          className={classes.input}
          margin="normal"
          variant="outlined"
          multiline
          rows ="5"
          placeholder= "Please provide a valid reason for your request"

        />
        </FormControl>
        </div>
        <div >
     <FormControl fullWidth margin="none">
     <div className={classes.container}> 
      <TextField
      name='day4'
          id='day'
          select
          label ='Day'
          className={classes.textField}
          value={this.state.day4}
          onChange={this.handleChange('day4')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">4.</InputAdornment>,
          }}
          
          margin="normal"
          
          //variant="outlined"
        >
          {day.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        


        <TextField
        name='from4'
          id='from'
          select
          label ='From'
          className={classes.textField}
          value={this.state.from4}
          onChange={this.handleChange('from4')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}          
          margin="normal"
          //variant="outlined"
        >
          {time.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
        name='to4'
          id='to'
          select
          label ='To'
          className={classes.textField}
          value={this.state.to4}
          onChange={this.handleChange('to4')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          //variant="outlined"
        >
          {time.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        </FormControl>
        <FormControl fullWidth>
        <TextField
        name='reason4'
          id="instructor-input"
          className={classes.input}
          margin="normal"
          variant="outlined"
          multiline
          rows ="5"
          placeholder= "Please provide a valid reason for your request"

        />
        </FormControl>
        </div>
       
        <div >
     <FormControl fullWidth margin="none">
     <div className={classes.container}> 
      <TextField
      name='day5'
          id='day'
          select
          label ='Day'
          className={classes.textField}
          value={this.state.day5}
          onChange={this.handleChange('day5')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">5.</InputAdornment>,
          }}
          
          margin="normal"
          
          //variant="outlined"
        >
          {day.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        


        <TextField
        name='from5'
          id='from'
          select
          label ='From'
          className={classes.textField}
          value={this.state.from5}
          onChange={this.handleChange('from5')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}          
          margin="normal"
          //variant="outlined"
        >
          {time.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
        name='to5'
          id='to'
          select
          label ='To'
          className={classes.textField}
          value={this.state.to5}
          onChange={this.handleChange('to5')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          //variant="outlined"
        >
          {time.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        </FormControl>
        <FormControl fullWidth>
        <TextField
        name='reason5'
          id="instructor-input"
          className={classes.input}
          margin="normal"
          variant="outlined"
          multiline
          rows ="5"
          placeholder= "Please provide a valid reason for your request"

        />
        </FormControl>
        </div>
       
        
        </FormControl>

        </div>
        <FormControl fullWidth>
        <Button variant="contained" color="primary" className={classes.button} type='submit' name='courseInfo1'>
        Submit
      </Button>
      </FormControl>

        </CardActions>
          </CardContent>
        
        </Card>
        <div className={classes.space} />

       
        </form>
      </main>
    </div>
  );
}}

SoftConstraints.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SoftConstraints);
