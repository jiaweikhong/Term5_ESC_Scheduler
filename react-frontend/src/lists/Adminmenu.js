import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom'; 
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

export const mainListItems = (
  <div>
    <ListItem id="pillarsched"
    button
    component = {Link} to = "/adminwelcome">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Pillar Schedule" />
    </ListItem>

    <ListItem id="coursedet"
    button
    component = {Link} to = "/editschedule">
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="Course Details" />
    </ListItem>

    <ListItem id="cohortclasses"
    button
    component = {Link} to = "/cohortclass">
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="Cohort Class Details" />
    </ListItem>

    <ListItem id="events"
    button
    component = {Link} to = "/adminevents">
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="Event Schedule" />
    </ListItem>

  </div>
);
