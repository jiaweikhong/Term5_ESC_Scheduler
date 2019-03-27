import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';



const styles = theme => ({

  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
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
];

class OutlinedTextFields extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      // <form className={classes.container} noValidate autoComplete="off">
      <form noValidate autoComplete="off">
      
        
        <TextField
          
          id='choose-soft-constraint'
          select

          className={classes.textField}
          value={this.state.constraint}
          onChange={this.handleChange('constraint')}
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

        <TextField

          id='choose-soft-constraint'
          select
          
          className={classes.textField}
          value={this.state.constraint}
          onChange={this.handleChange('constraint')}
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

        <TextField
      
          id='choose-soft-constraint'
          select
          
          className={classes.textField}
          value={this.state.constraint}
          onChange={this.handleChange('constraint')}
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

   
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
