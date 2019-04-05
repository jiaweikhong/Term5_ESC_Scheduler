import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  text:{
    textAlign: 'left'
  },
  root: {
    display: 'flex',
    flexdirection: 'column'
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    textAlign:'left'
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  textField:{
    width:150
  },
  space:{
    height:20
  }
});

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

class CourseMaterial extends React.Component {
  state = {
    lecture: '',
    lect_1:'',
    lect_2:'',
    lect_3:'',
    cohort:'',
    co_1:'',
    co_2:'',
    co_3:''
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


render() {
  const { classes } = this.props;

  return (
    <div className={classes.root}>
    <Grid container spacing={24}>

    <Grid item xs ={6}>
    <FormLabel component="legend" className={classes.text}>Number of lelctures per week</FormLabel>
        <RadioGroup
          aria-label="lecture"
          name="lecture"
          className={classes.group}
          lecture={this.state.lecture}
          onChange={this.handleChange}
        >
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="none" control={<Radio />} label="No lecture" />
        </RadioGroup>
        </Grid>

        <Grid item xs={6}>
    <FormLabel component='legend' className={classes.text}>Duration of each lecture</FormLabel>
    <FormControl fullWidth>
    <TextField
        id='choose-soft-constraint'
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
    <FormLabel component="legend" className={classes.text}>Number of cohort classes per week</FormLabel>
        <RadioGroup
          aria-label="lecture"
          name="lecture"
          className={classes.group}
          cohort={this.state.cohort}
          onChange={this.handleChange}
        >
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="none" control={<Radio />} label="No cohort classes" />
        </RadioGroup>
    </Grid>


    <Grid item xs={6}>
    <div className={classes.space} />
    <FormLabel component='legend' className={classes.text}>Duration of each cohort class</FormLabel>
    <FormControl fullWidth>
    <TextField
        id='choose-soft-constraint'
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

      </Grid></Grid></div>



   
    
  );
}
}


CourseMaterial.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseMaterial);