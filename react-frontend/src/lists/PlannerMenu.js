import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import { Link } from 'react-router-dom';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import TodayIcon from '@material-ui/icons/Today'

export const mainListItems = (


  <div>
    <ListItem id="home"
      button
      component={Link} to="/plannerwelcome">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>

    <ListItem id="createsched"
      button
      component={Link} to="/createschedule">
      <ListItemIcon>
        <LibraryAddIcon />
      </ListItemIcon>
      <ListItemText primary="Create Schedule" />
    </ListItem>

    <ListItem
      id="eventsched"
      button
      component={Link} to='/eventscheduling'>
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="Event Schedule" />
    </ListItem>

  </div>
);
