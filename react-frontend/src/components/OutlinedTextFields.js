import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormControl, Typography, FormLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';


// need to work on submit button

const styles = theme => ({

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
  },
  space:{
    height:50
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
  {value: 'Monday', label: 'Monday'},
  {value: 'Tuesday', label: 'Tuesday'},
  {value: 'Wednesday', label: 'Wednesday'},
  {value: 'Thursday', label: 'Thursday'},
  {value: 'Friday', label: 'Friday'},

]

class OutlinedTextFields extends React.Component {
  state = {
    from1:'',from2:'',from3:'',from4:'',from5:'',
    to1:'',to2:'',to3:'',to4:'',to5:'',
    day1:'',day2:'',day3:'',day4:'',day5:''
    
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off" method='POST' >

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
          {constraints.map(option => (
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
          {constraints.map(option => (
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
          {constraints.map(option => (
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
          {constraints.map(option => (
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
          {constraints.map(option => (
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
          {constraints.map(option => (
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
          {constraints.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
        name='form4'
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
          {constraints.map(option => (
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
          {constraints.map(option => (
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
          {constraints.map(option => (
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
        <Button variant="contained" color="primary" className={classes.button} type='submit'>
        Submit
      </Button>
      </FormControl>
      
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
