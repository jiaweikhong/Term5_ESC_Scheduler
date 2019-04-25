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
import Modal from '@material-ui/core/Modal';

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
    color: '#0097a7',
  },

  icons: {
    position: 'absolute',
    right: 15

  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
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

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class InstructorWelcome extends React.Component{
  state = {
    modopen: true,
    open: false,
    delopen:false
  }
  handleClose = () => {
    this.setState({ open: false , delopen:false});
  };

  handleClick = () => {
    this.setState({ open: true });};

  handleDel = () => {
      this.setState({ delopen: true });};

  handleMOpen = () => {
        this.setState({ modopen: true });
  };

  handleMClose = () => {
        this.setState({ modopen: false });
  };
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
          <Tooltip title={"Delete Meeting"}>
            <IconButton className={classes.iconButton} onClick={this.handleDel}>
              <AccountBoxIcon  />
            </IconButton>
          </Tooltip>

        </React.Fragment>
      );
    },


    onChangePage: (numberRows) => {
      console.log(numberRows);
    },
    onSearchChange: (searchText) => {
      console.log(searchText);
    },

  }

  return (
    <div className={classes.root}>
      <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={this.state.modopen}
      onClose={this.handleMClose}
    >
      <div style={getModalStyle()} className={classes.paper}>
        <Typography variant="h6" id="modal-title">
          Welcome {window.user}
        </Typography>
        <Typography variant="subtitle1" id="modal-description">
          {window.notif}
        </Typography>
        </div>
      </Modal>
      <CssBaseline />
      <InstructorAppBar />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <form method="POST">
        <Button id="instructorpressed" color="inherit" name="instructorpressed" type="submit">Acknowledge Notifications</Button>
        </form>
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

            <Dialog
              open={this.state.delopen}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"

            >
              <form method='POST'>
                <DialogTitle id="form-dialog-title">Delete Meeting</DialogTitle>
                <DialogContent>

                <TextField
                    //autoFocus
                    margin="dense"
                    name='delmeetingID'
                    label="MeetingID"
                    fullWidth
                    required
                    className={classes.meeting}
                    variant="outlined"
                  ></TextField>

             </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" type='submit' name='meetingdel'>
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
