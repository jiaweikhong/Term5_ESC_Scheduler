import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from '../lists/instructormenu';
import { Link } from 'react-router-dom';
import { Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from './TableHeader'



const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

  icons: {
    position: 'absolute',
    right: 15

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

function InstructorWelcome(props) {

  const { classes } = props;

  const columns = [
    'Time Slot',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
  ];

  const data = [
    ["ISTD", 50.003, "Elements of Software Construction", "Sun Jun", "Sudipta Chattopadhyay"],
    ["ISTD5", 50.005, "Computer Systems Engineering", "David Yau", "Natalie Agus"],
    ["ISTD", 50.034, "Introduction to Probability and Statistics", "Tony Quek", "Gemma Roig, Cong Kai Fong Ernest"],
    ["Freshmore", 10.004, "Advanced Math II", "Sergey Kushnarev", "Wang XinYin"],
    ["HASS", "01.010", "Freshmore Writing Programme", "Pang Yang Hui", "Eunice Leong"],
  ]

  const options = {
    filter: true,
    sort: false,
    selectableRows: false,
    filterType: 'dropdown',
    responsive: 'stacked',
    rowsPerPage: 20,
    expandableRows: false,

    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
    ),
    onRowsSelect: (rowsSelected, allRows) => {
      console.log(rowsSelected, allRows);
    },
    onRowsDelete: (rowsDeleted) => {
      console.log(rowsDeleted, "were deleted!");
    },
    onChangePage: (numberRows) => {
      console.log(numberRows);
    },
    onSearchChange: (searchText) => {
      console.log(searchText);
    },
    // onColumnSortChange: (column, direction) => {
    //   console.log(column, direction);
    // },
    onColumnViewChange: (column, action) => {
      console.log(column, action);
    },
    onFilterChange: (column, filters) => {
      console.log(column, filters);
    },
    onCellClick: (cellData, cellMeta) => {
      console.log(cellData, cellMeta);
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classNames(classes.appBar)}>

        <Toolbar >
          <Typography
            variant="h6"
            color="inherit"
            noWrap
          // className ={classes.welcome}
          >
            Welcome {window.user}
          </Typography>
          <div className={classes.icons}>
            <IconButton
              color="inherit"
              component={Link} to="/instructornotifications">
              <NotificationsIcon />
            </IconButton>
            <Button
              id="logout"
              color='inherit'
              component={Link} to="/">
              LOGOUT
        </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper),
        }}
      >
        <div className={classes.toolbar} />
        <List>{mainListItems}</List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography id='tabtitle' variant="h4" gutterBottom component="h2">
          My Timetable
        </Typography>

        <MUIDataTable title={"Your Timetable"} data={window.instructorTimetable} columns={columns} options={options} />

      </main>
    </div>
  );
}

InstructorWelcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InstructorWelcome);
