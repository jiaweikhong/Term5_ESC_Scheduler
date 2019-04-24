import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import { Link } from 'react-router-dom'; 
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


export const mainListItems = (


  <div>
    <ListItem id='mysched'
    button
    component = {Link} to = "/instructorwelcome">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="My Schedule" />
    </ListItem>

    <ListItem id='myinfo'
    button
    component = {Link} to = "/uploadcourse">
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="My Information" />
    </ListItem>

    <ListItem id='courseinfo'
    button
    component = {Link} to = "/softconstraints">
      <ListItemIcon>
        <CheckBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Course Information" />
    </ListItem>
    
    <ListItem id='events'
    button
    component = {Link} to = "/instructorevents">
      <ListItemIcon>
        <CheckBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Event Schedule" />
    </ListItem>
    
  </div>
);
