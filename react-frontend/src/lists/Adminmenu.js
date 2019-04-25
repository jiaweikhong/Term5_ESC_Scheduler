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
        <ViewlistIcon />
      </ListItemIcon>
      <ListItemText primary="Cohort Class Details" />
    </ListItem>

    <ListItem id="events"
    button
    component = {Link} to = "/adminevents">
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="Event Schedule" />
    </ListItem>

  </div>
);
