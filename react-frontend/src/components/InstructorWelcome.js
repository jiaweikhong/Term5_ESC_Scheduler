import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core'
import MUIDataTable from "mui-datatables";
import InstructorAppBar from './InstructorAppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import AccountBoxIcon from "@material-ui/icons/AccountBox";

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
  meeting:{
    width: 550
  }
});

class InstructorWelcome extends React.Component{
  state = {
    open: false,
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleClick = () => {
    this.setState({ open: true });};
  
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
    customToolbar: () => {
      return (
        <React.Fragment>
          <Tooltip title={"Schedule Meeting"}>
            <IconButton className={classes.iconButton} onClick={this.handleClick}>
              <AccountBoxIcon  />
            </IconButton>
          </Tooltip>

        </React.Fragment>
      );
    },

    // customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
    //   <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
    // ),
    // onRowsSelect: (rowsSelected, allRows) => {
    //   console.log(rowsSelected, allRows);
    // },
    // onRowsDelete: (rowsDeleted) => {
    //   console.log(rowsDeleted, "were deleted!");
    // },
    onChangePage: (numberRows) => {
      console.log(numberRows);
    },
    onSearchChange: (searchText) => {
      console.log(searchText);
    },
    // onColumnSortChange: (column, direction) => {
    //   console.log(column, direction);
    // },
    // onColumnViewChange: (column, action) => {
    //   console.log(column, action);
    // },
    // onFilterChange: (column, filters) => {
    //   console.log(column, filters);
    // },
    // onCellClick: (cellData, cellMeta) => {
    //   console.log(cellData, cellMeta);
    // }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <InstructorAppBar />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <Typography id='tabtitle' variant="h4" gutterBottom component="h2">
          My Timetable
        </Typography> */}
      {/* <form method = "POST>">
        <Button variant="outlined" color="black" className={classes.button} onClick={this.handleClick} style={{ borderColor: '#0097a7' }} >
        SCHEDULE MEETING
      </Button>
      </form> */}
        <MUIDataTable title={'My Timetable'} data={window.instructorTimetable} columns={columns} options={options} />

        <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"

            >
              <form method='POST'>
                <DialogTitle id="form-dialog-title">Meeting Scheduling</DialogTitle>
                <DialogContent>

                <TextField
                    //autoFocus
                    margin="dense"
                    name='meetingID'
                    label="MeetingID"
                    fullWidth
                    required
                    className={classes.meeting}
                    variant="outlined"
                  ></TextField>

                  <TextField
                    //autoFocus
                    margin="dense"
                    name='instructorMeeting'
                    label="Name of instructors. Please separate each instructor with a comma."
                    fullWidth
                    required
                    className={classes.meeting}
                    variant="outlined"
                  ></TextField>

                  <TextField
                    margin="dense"
                    name='duratonMeeting'
                    label="Duration of meeting (hr) e.g. 1.5"
                    fullWidth
                    required
                    className={classes.meeting}
                    variant="outlined"
                  ></TextField>

                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" type='submit' name='meeting'>
                    Save
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
      </main>
    </div>
  );
}
}

InstructorWelcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InstructorWelcome);
