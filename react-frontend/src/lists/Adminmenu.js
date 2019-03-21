import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom'; 
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';


export const mainListItems = (


  <div>
    <ListItem 
    button
    component = {Link} to = "/adminwelcome">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Pillar Schedule" />
    </ListItem>

    <ListItem 
    button
    component = {Link} to = "/editschedule">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="View/Edit Schedule" />
    </ListItem>

    <ListItem 
    button
component = {Link} to = "/softconstraints"> {/*need to change */}
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Edit Soft Constraints" />
    </ListItem>

    
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Instructors</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Sudipta Chattopadhyay" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Sun Jun" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Natalie Agus" />
    </ListItem>
  </div>
);
