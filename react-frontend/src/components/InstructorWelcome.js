import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core'
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from './TableHeader'
import InstructorAppBar from './InstructorAppBar';

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
  button: {
    margin: theme.spacing.unit,
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

class InstructorWelcome extends React.Component{
  
  render(){

  const { classes } = this.props;

  const columns = [
    'Time Slot',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
  ];

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
      <InstructorAppBar />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography id='tabtitle' variant="h4" gutterBottom component="h2">
          My Timetable
        </Typography>
      <form method = "POST>">
        <Button variant="outlined" color="black" className={classes.button} type='submit' name='scheduleMeeting'>
        SCHEDULE MEETING
      </Button>
      </form>

        <MUIDataTable title={"Your Timetable"} data={window.instructorTimetable} columns={columns} options={options} />

      </main>
    </div>
  );
}}

InstructorWelcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InstructorWelcome);
