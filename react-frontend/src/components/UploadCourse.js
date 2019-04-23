

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
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormLabel } from '@material-ui/core';







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
    padding:30
    
  },
  space:{
    height:20
  },
  pillar:{
    marginReft: theme.spacing.unit,
    width:150
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
  },
  input:{
    width: 800,
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


class UploadCourse extends React.Component {

  state = {
    pillar1:'',
    pillar2:'',
    pillar3:'',
    pillar4:'',
    pillar5:'',
    from1:'',from2:'',from3:'',from4:'',from5:'',
    to1:'',to2:'',to3:'',to4:'',to5:'',
    day1:'',day2:'',day3:'',day4:'',day5:''
    
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
        <Typography id="tabtitle" gutterBottom variant="h4" component="h4">
        My Courses</Typography>
        <Typography gutterBottom component ="h6">
        Please fill in the following details for the courses you teach. Note that each submission will be a new submission. If uou wish to make changes to previous submissions, you are required to re-fill all fields. Thank you.</Typography>
        </div>
        <Divider/>

       
        <CardActions>
        <div className={classes.text}>

        <FormControl fullWidth>
        <div>
        <TextField
          name='ID'
          id="instructor-input"
          className={classes.coursecode}
          margin="normal"
          //variant='outlined'
          placeholder= "Your ID"
          
          
        />

        <TextField
        name='name'
          id="instructor-input"
          className={classes.coursetitle}
          margin="normal"
          //variant='outlined'
          placeholder= "Your Name"
        
          
        />
        </div>
        </FormControl>

        <FormControl fullWidth>
        <div>
        <TextField
        name='pillar1'
        id='choose-pillar'
        select
        label ='Pillar'
        className={classes.pillar}
        value={this.state.pillar1}
        onChange={this.handleChange('pillar1')}
        variant='outlined'
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
        name='coursecode1'
          id="instructor-input"
          className={classes.coursecode}
          margin="normal"
          variant='outlined'
          placeholder= "Course Code"
          
          
        />

        <TextField
        name='coursetitle1'
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
        name='pillar2'
        id='choose-pillar'
        select
        label ='Pillar'
        className={classes.pillar}
        value={this.state.pillar2}
        onChange={this.handleChange('pillar2')}
        variant='outlined'
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
        name='coursecode2'
          id="instructor-input"
          className={classes.coursecode}
          margin="normal"
          variant='outlined'
          placeholder= "Course Code"
          
        />

        <TextField
        name='coursetitle2'
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
        name='pillar3'
        id='choose-pillar'
        select
        label ='Pillar'
        className={classes.pillar}
        value={this.state.pillar3}
        onChange={this.handleChange('pillar3')}
        variant='outlined'
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
        name='coursecode3'
          id="instructor-input"
          className={classes.coursecode}
          margin="normal"
          variant='outlined'
          placeholder= "Course Code"
          
        />

        <TextField
        name='coursetitle3'
          id="instructor-input"
          className={classes.coursetitle}
          margin="normal"
          variant='outlined'
          placeholder= "Course Title"
        />
        </div>
        <FormControl fullWidth>
        <Button variant="contained" color="primary" className={classes.button} type='submit' name='course'>
        Submit
      </Button>
      </FormControl>
        
        </FormControl>
        </div>
        </CardActions>
        <FormControl fullWidth>

      </FormControl>
        
        </CardContent>
        </Card>

        <div className={classes.space} />
        

        <Card className={classes.card}>
          <CardContent>
          <div className={classes.text}>
        <Typography gutterBottom variant="h4" component="h4">
        Soft Constraints</Typography>
        <Typography gutterBottom component ="h6">
        Please rank your desired soft constraints. They will be taken into consideration when creating your schedule. Note that each submission overwrites all your previous submissions. Thank you. </Typography>
        </div>
        <Divider/>
        <CardActions className={classes.textfields}>

        <div>
        {/* <div className={classes.space} /> */}
        

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
        <FormControl fullWidth>
        <Button variant="contained" color="primary" className={classes.button} type='submit' name='constraints'>
        Submit
      </Button>
      </FormControl>
      
      
        </div>


        </CardActions>
        
          </CardContent>
        
        </Card>
        </form>
        

        <div className={classes.space} />

        
      </main>
    </div>
  );
}
}
UploadCourse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadCourse);
