import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import { Link } from 'react-router-dom'; 


export const mainListItems = (


  <div>
    <ListItem 
    button
    component = {Link} to = "/instructorwelcome">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="My Schedule" />
    </ListItem>

    <ListItem 
    button
    component = {Link} to = "/uploadcourse">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Upload Course" />
    </ListItem>

    <ListItem 
    button
    component = {Link} to = "/softconstraints">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Personal Constraints" />
    </ListItem>
    
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Event Schedule" />
    </ListItem>
    
  </div>
);
