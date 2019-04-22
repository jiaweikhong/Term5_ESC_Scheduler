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
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="Course Details" />
    </ListItem>

    <ListItem 
    button
    component = {Link} to = "/cohortclass">
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="Cohort Class Details" />
    </ListItem>

    {/* <ListItem 
    button
  component = {Link} to = "/softconstraints"> {/*need to change 
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Edit Soft Constraints" />
    </ListItem> */}

    
  </div>
);

// export const secondaryListItems = (
//   <div>

//     <ListSubheader >Instructors</ListSubheader>
//     <ListItem button
//     component = {Link} to = "/instructorinformation">
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Sudipta Chattopadhyay" />
//     </ListItem>
//     <ListItem button
//     component = {Link} to = "/instructorinformation">
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Sun Jun" />
//     </ListItem>
//     <ListItem button
//     component = {Link} to = "/instructorinformation">
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Natalie Agus" />
//     </ListItem>
//   </div>
// );
