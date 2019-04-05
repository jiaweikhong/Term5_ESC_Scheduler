import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';


// need to work on submit button

const styles = theme => ({

  button: {
    margin: theme.spacing.unit,

  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexdirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:400
    

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
    value: 'No morning classes',
    label: 'No morning classes',
  },
  {
    value: 'No classes during lunch hours',
    label: 'No classes during lunch hours',
  },
  {
    value: 'No classes in the afternoon',
    label: 'No classes in the afternoon',
  },
  {
    value: 'No classes on Friday',
    label: 'No classes on Friday',
  },
  {
    value:'',
    label:'-'
  }
];

class OutlinedTextFields extends React.Component {
  state = {
    constraint1:'',
    constraint2:'',
    constraint3:'',
    
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

      
      <FormControl  fullWidth>
      <TextField
          id='choose-soft-constraint'
          select
          label ='select'
          className={classes.textField}
          value={this.state.constraints1}
          onChange={this.handleChange('constraints1')}
          InputProps={{
            startAdornment: <InputAdornment position="start">1.</InputAdornment>,
          }}
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

      </FormControl>
        
      
      <FormControl  fullWidth>
        <TextField
          
          id='choose-soft-constraint'
          select
          label ='select'
          className={classes.textField}
          value={this.state.constraints2}
          onChange={this.handleChange('constraints2')}
          InputProps={{
            startAdornment: <InputAdornment position="start">2.</InputAdornment>,
          }}
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
        </FormControl>

        <FormControl  fullWidth>
        <TextField
      
          id='choose-soft-constraint'
          select
          label ='select'
          className={classes.textField}
          value={this.state.constraints3}
          onChange={this.handleChange('constraints3')}
          InputProps={{
            startAdornment: <InputAdornment position="start">3.</InputAdornment>,
          }}
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
        </FormControl>

        <FormControl fullWidth>
        <TextField
          id="instructor-input"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          multiline
          placeholder= " Please type in your soft constraint"
          InputProps={{
            startAdornment: <InputAdornment position="start">4.</InputAdornment>,
          }}
        />
        </FormControl>

        <FormControl fullWidth>
        <TextField
          id="instructor-input"
          className={classes.textField}
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
