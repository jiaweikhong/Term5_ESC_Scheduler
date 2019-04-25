import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom'; 
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import TodayIcon from '@material-ui/icons/Today'
import ViewlistIcon from '@material-ui/icons/Viewlist'


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
        <ViewlistIcon />
      </ListItemIcon>
      <ListItemText primary="Course Information" />
    </ListItem>
    
    <ListItem id='events'
    button
    component = {Link} to = "/instructorevents">
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="Event Schedule" />
    </ListItem>
    
  </div>
);
