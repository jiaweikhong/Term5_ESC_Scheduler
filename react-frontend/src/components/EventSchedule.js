

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
import { mainListItems } from '../lists/PlannerMenu';
import { Link } from 'react-router-dom';
import { Button, FormControl, DialogContentText } from '@material-ui/core'
import MUIDataTable from "mui-datatables";
import Tooltip from "@material-ui/core/Tooltip";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';



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
  text: {
    textAlign: 'left'
  },
  margin: {
    margin: 16
  },
  card: {
    padding: 30
  },
  time: {
    width: 265,
    marginRight: 15

  },
  timeEnd: {
    width: 265,

  },
  day: {
    marginLeft: 15,
    width: 265
  }



});

const time = [
  { value: '', label: '-' },
  { value: 0, label: '0830', },
  { value: 1, label: '0900', },
  { value: 2, label: '0930' },
  { value: 3, label: '1000' },
  { value: 4, label: '1030' },
  { value: 5, label: '1100', },
  { value: 6, label: '1130', },
  { value: 7, label: '1200', },
  { value: 8, label: '1230', },
  { value: 9, label: '1300', },
  { value: 10, label: '1330', },
  { value: 11, label: '1400', },
  { value: 12, label: '1430', },
  { value: 13, label: '1500', },
  { value: 14, label: '1530', },
  { value: 15, label: '1600', },
  { value: 16, label: '1630', },
  { value: 17, label: '1700', },
  { value: 18, label: '1730', },
  { value: 19, label: '1800', },


];
const constraints = [
  {
    value: '1.203',
    label: '1.203',
  },
  {
    value: '2.303',
    label: '2.303',
  },
  {
    value: '2.403',
    label: '2.403',
  },
  {
    value: '2.412',
    label: '2.412',
  },
  {
    value: '2.503',
    label: '2.503'
  },
  {
    value: '2.513',
    label: '2.513'
  },
  {
    value: 'Albert Hong Lecture Hall',
    label: 'Albert Hong Lecture Hall'
  },
  {
    value: 'LT5',
    label: 'LT5'
  },
  {
    value: 'LT2',
    label: 'LT2'
  },

];

const days = [
  {
    value: 'Monday',
    label: 'Monday',
  },
  {
    value: 'Tuesday',
    label: 'Tuesday',
  },
  {
    value: 'Wednesday',
    label: 'Wednesday',
  },
  {
    value: 'Thursday',
    label: 'Thursday',
  },
  {
    value: 'Friday',
    label: 'Friday'
  },

];

class EventSchedule extends React.Component {
  state = {
    open: false,
    delopen: false,
    selectedDate: new Date('2019-01-01T21:11:54'),
  }
  handleAdd = () => {
    this.setState({ open: true });
  }
  handleDelete = () => {
    this.setState({ delopen: true });
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  handleClose = () => {
    this.setState({ open: false, delopen: false });
  };

  render() {

    const { classes } = this.props;
    const { selectedDate } = this.state;


    const columns = [
      "Date ",
      "Event Title ",
      "Venue ",
      "Start (hr)",
      "End (hr)"


    ];

    const data = [
      ['August 18th', "Artificial Intelligence Talk", "Albert Hong", "1600", "1800"],
      ['August 18th', "ISTD Pillar Talk", "Albert Hong", "1600", "1700"],
      ['May 18th', "Global Exchange Talk", "2.403", "0800", "1700"],
      ['November 25th', "EPD Pillar Talk", " 2.412", "1600", "1800"],
      ['June 23rd', "Capstone Talk", "Albert Hong", "1400", "1600"],

    ];

    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,

      onChangePage: (numberRows) => {
        console.log(numberRows);
      },
      onSearchChange: (searchText) => {
        console.log(searchText);
      },
      customToolbar: () => {
        return (
          <React.Fragment>
            <Tooltip title={"Add event"}>
              <IconButton className={classes.iconButton} onClick={this.handleAdd}>
                <AddIcon className={classes.deleteIcon} />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Delete event"}>
              <IconButton className={classes.iconButton} onClick={this.handleDelete}>
                <ClearIcon className={classes.deleteIcon} />
              </IconButton>
            </Tooltip>
           
          </React.Fragment>
        );
      },

    };



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
              Welcome { window.user }
          </Typography>
            <div className={classes.icons}>
              <IconButton
                color="inherit"
                component={Link} to="/plannernotification">
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
          <Typography id="tabtitle" variant="h4" gutterBottom component="h2">
            Events
          </Typography>
          <Typography id="tabtitle" variant="h6" gutterBottom component="h2">
            Events can only be added if the venue is available. Please check the availability of the venue for the new event.
          </Typography>
          <Typography id="tabtitle" variant="h6" gutterBottom component="h2">
            {window.venue}
          </Typography>
          <MUIDataTable data={window.eventData} columns={columns} options={options} />

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <form method='POST'>

              <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
              <DialogContentText>Submissions with incomplete fields will not be recorded</DialogContentText>

              <DialogContent>
                <FormControl fullWidth>
                  <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                      <DatePicker
                        required
                        name='DateAdd'
                        margin="normal"
                        label="Date picker"
                        value={selectedDate}
                        onChange={this.handleDateChange}
                      />

                    </MuiPickersUtilsProvider>

                    <TextField
                      name='day'
                      required
                      select
                      label='Day'
                      className={classes.day}
                      value={this.state.day}
                      onChange={this.handleChange('day')}
                      variant='outlined'
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                    >
                      {days.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </FormControl>

                <TextField
                  required
                  name='titleAdd'
                  variant='outlined'
                  margin="dense"
                  fullWidth
                  placeholder='Name of the event.'></TextField>

                <TextField
                  name='venue'
                  required
                  select
                  fullWidth
                  label='Choice of venue'
                  // className={classes.pillar}
                  value={this.state.venue}
                  onChange={this.handleChange('venue')}
                  variant='outlined'
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  {constraints.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <FormControl fullWidth>
                  <div>
                    <TextField
                      name='StartAdd'
                      select
                      required
                      label='Start'
                      // className={classes.pillar}
                      value={this.state.start}
                      onChange={this.handleChange('start')}
                      variant='outlined'
                      className={classes.time}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                    >
                      {time.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      name='EndAdd'
                      required
                      select
                      className={classes.timeEnd}
                      label='End'
                      // className={classes.pillar}
                      value={this.state.end}
                      onChange={this.handleChange('end')}
                      variant='outlined'
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                    >
                      {time.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </FormControl>

              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary" type='submit' name='AddEvent'>
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


              <DialogTitle id="form-dialog-title">Delete Event</DialogTitle>
              <DialogContentText>Please ensure that the title matches the existing event title.</DialogContentText>
              <DialogContent>
                <TextField
                  required
                  margin="dense"
                  name='titleDel'
                  label="Name of event"
                  fullWidth
                  variant="outlined"
                ></TextField>

              
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary" type='submit' name='DelEvent'>
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

EventSchedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventSchedule);