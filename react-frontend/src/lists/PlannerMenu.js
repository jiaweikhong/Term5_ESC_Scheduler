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
    component = {Link} to = "/plannerwelcome">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>

    <ListItem 
    button
    component = {Link} to = "/createschedule">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Create Schedule" />
    </ListItem>

    <ListItem 
    button
    component = {Link} to = "/deleteschedule">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Delete Schedule" />
    </ListItem>

    <ListItem 
    button
    component = {Link} to = "/plannereditschedule">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Edit Schedule" />
    </ListItem>


    
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Event Schedule" />
    </ListItem>
    
  </div>
);
