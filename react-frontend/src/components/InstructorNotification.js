import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {Button, Divider, TextField, FormControl} from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';



const styles = theme => ({
	root: {
		display: 'flex',
	  },
 
});



class InstructorNotifications extends React.Component {


  render(){
    const { classes } = this.props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      
         
    </div>
  );
}}

InstructorNotifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InstructorNotifications);