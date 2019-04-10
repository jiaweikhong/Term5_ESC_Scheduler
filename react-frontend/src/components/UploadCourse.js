

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
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedTextFields from './OutlinedTextFields';






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
  }
];


class UploadCourse extends React.Component {

  state = {
    pillar1:'',
    pillar2:'',
    pillar3:'',
    pillar4:'',
    pillar5:'',
    
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
        My Courses</Typography>
        <Typography gutterBottom component ="h6">
        Please fill in the following details for the courses you teach. Thank you.</Typography>
        </div>
        <Divider/>

        <CardActions>
        <div className={classes.text}>
        <FormControl fullWidth>
        <div>
        <TextField
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
        <Button variant="contained" color="primary" className={classes.button} type='submit'>
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
        Soft Constraints</Typography>
        <Typography gutterBottom component ="h6">
        Please rank your desired soft constraints. They will be taken into consideration when creating your schedule. Thank you. </Typography>
        </div>
        <Divider/>
        <CardActions className={classes.textfields}>

        <div>
        {/* <div className={classes.space} /> */}
        <OutlinedTextFields/>
        </div>
        <Button variant="contained" color="primary" className={classes.button} type='submit'>
        Submit
      </Button>

        </CardActions>
          </CardContent>
        
        </Card>

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
