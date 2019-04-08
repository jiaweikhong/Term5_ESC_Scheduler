import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormControl, Typography, FormLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { FORMERR } from 'dns';


// need to work on submit button

const styles = theme => ({
  input:{
    width: 500,
},

  button: {
    margin: theme.spacing.unit,

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
  textfields:{
    display: 'flex',
    flexWrap: 'wrap'
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  text:{
    textAlign: 'left'
  }
});

const constraints = [
  {value: '0', label: '-'},
  {value: '1',label: '0830',},
  {value: '2',label: '0900',},
  {value: '3',label: '0930'},
  {value: '4',label: '1000'},
  {value: '5',label:'1030'},
  {value: '6',label: '1100',},
  {value: '7',label: '1130',},
  {value: '8',label: '1200',},
  {value: '9',label: '1230',},
  {value: '10',label: '1300',},
  {value: '11',label: '1330',},
  {value: '12',label: '1400',},
  {value: '13',label: '1430',},
  {value: '14',label: '1500',},
  {value: '15',label: '1530',},
  {value: '16',label: '1600',},
  {value: '17',label: '1700',},
  {value: '18',label: '1730',},
  {value: '19',label: '1800',},
  {value: '20',label: '1830',},

];

const day = [
  {value: '0', label: '-'},
  {value: '1', label: 'Monday'},
  {value: '2', label: 'Tuesday'},
  {value: '3', label: 'Wednesday'},
  {value: '4', label: 'Thursday'},
  {value: '5', label: 'Friday'},

]

class OutlinedTextFields extends React.Component {
  state = {
    from1:'',from2:'',from3:'',from4:'',from5:'',from6:'',
    to1:'',to2:'',to3:'',to4:'',to5:'',to6:'',
    day1:'',day2:'',day3:''
    
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
      {/* <form noValidate autoComplete="off"> */}
      {/* <FormControl fullWidth>
      <div className={classes.dense}></div>
        <Typography
        className={classes.text}
        variant='h6'>Select the time slot you wish to keep free from your timetable.</Typography>
        </FormControl> */}
      <FormControl >
        <div className={classes.dense}></div>
        <FormLabel className={classes.text} focused>Select the time slot you wish to keep free from your timetable.</FormLabel>
        
     <div>
      <TextField
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
          
          variant="outlined"
        >
          {day.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>


        <TextField
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
          variant="outlined"
        >
          {constraints.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
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
          variant="outlined"
        >
          {constraints.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        
        

      <div>
      <TextField
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
          variant="outlined"
        >
          {day.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
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
          variant="outlined"
        >
          {constraints.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
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
          variant="outlined"
        >
          {constraints.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
       
        
       

        <div>
      <TextField
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
          variant="outlined"
        >
          {day.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
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
          variant="outlined"
        >
          {constraints.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
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
          variant="outlined"
        >
          {constraints.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        </FormControl>
        
        <FormControl fullWidth>
        <div className={classes.dense}></div>
        <FormLabel focused className={classes.text}>Write down any other soft constraint you would like us to consider when creating your schedule.</FormLabel>
        <TextField
          id="instructor-input"
          className={classes.input}
          margin="normal"
          variant="outlined"
          multiline
          placeholder= " Please type in your soft constraint"
          InputProps={{
            startAdornment: <InputAdornment position="start">4.</InputAdornment>,
          }}
        />
         
        
        <TextField
          id="instructor-input"
          className={classes.input}
          margin="normal"
          variant="outlined"
          multiline
          placeholder= " Please type in your soft constraint"
          InputProps={{
            startAdornment: <InputAdornment position="start">5.</InputAdornment>,
          }}
        />
        </FormControl>
        
       
       

      
       
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
