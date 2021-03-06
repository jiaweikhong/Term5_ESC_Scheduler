

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Button, FormControl } from '@material-ui/core'
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
import { borders } from '@material-ui/system';
import PlannerAppbar from './PlannerAppbar';
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

  icons: {
    position: 'absolute',
    right: 15

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  time: {
    width: 265,
    marginRight: 15

  },
  timeEnd: {
    width: 265,

  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  pillar: {
    width: 150,
    marginLeft: 20
  },

  submit: {
    color: '#0097a7',
    marginTop: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit

  },
  space:{height:20},

  typography:{
    backgroundColor: '#ffe082',
    width:500,
    borderRadius:20,
    fontSize:18,
    // padding:5,
    marginLeft:370,
    marginTop:5

  }
  

});


const time = [
  { value: null, label: '-' },
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
  // { value: 20, label: '1830', },

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

const type = [
  {
    value: 'Cohort',
    label: 'Cohort Class'
  },
  {
    value: 'Lecture',
    label: 'Lecture '
  },
  {
    value: 'Lab',
    label: 'Lab'
  },]

const pillars = [
  {
    value: 'ISTD',
    label: 'ISTD',
  },
  {
    value: 'EPD',
    label: 'EPD',
  },
  {
    value: 'ESD',
    label: 'ESD',
  },
  {
    value: 'ASD',
    label: 'ASD',
  },
  {
    value: 'Freshmore',
    label: 'Freshmore'
  },
  {
    value: 'HASS',
    label: 'HASS'
  },

];

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class CreateSchedule extends React.Component {
  state = {
    open: false,
    delopen: false,
    modopen: false,
    pillar: '',
    day: '',
    start: '',
    end: '',
    venue: '',
    type:''
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
  handleClose = () => {
    this.setState({ open: false, delopen: false });
  };
  handleOpen = () => {
    this.setState({ modopen: true });
  };

  handleMClose = () => {
    this.setState({ modopen: false });
  };

  render() {

    const { classes } = this.props;

    const columns = [
      "Pillar",
      "Course Code",
      "Course Title",
      "Course Lead",
      "Instructors",

    ];

    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => {
        return (
          <React.Fragment>
            <Tooltip title={"Add"}>
              <IconButton className={classes.iconButton} onClick={this.handleAdd}>
                <AddIcon className={classes.deleteIcon} />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Delete"}>
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
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={this.state.open}
          onClose={this.handleMClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Schedule Sent
            </Typography>
            <Typography variant="subtitle1" id="modal-description">
              Created Schedule has been sent to Admins and Instructors
            </Typography>
          </div>
        </Modal>
        <CssBaseline />
        <PlannerAppbar />
        <main className={classes.content}>
          <div className={classes.space} />
          {/* <Typography id="tabtitle" variant="h4" gutterBottom component="h2">
            Create Timetable
          </Typography> */}

          <FormControl fullWidth>
          <div>
          <form method="POST">
          <Button
            style={{ borderColor: '#0097a7' }}
            className={classes.submit}
            variant="outlined"
            size="medium"
            id="submit"
            type="submit"
            name ='generateButton'
            marginRight='10'
            >
            Click here to Generate Schedule
        </Button>
      
        <Button className={classes.submit} style={{ borderColor: '#0097a7' }} variant="outlined" id = "changebool" color="inherit" type="submit" name = "changebool" onClick={this.handleOpen}>Send Notifications</Button>
        </form>  
        </div>
        </FormControl>  


        <Typography id="message" gutterBottom className={classes.typography}>
          {window.message}
        </Typography>
        <Typography id="message" gutterBottom  className={classes.typography}>
          {window.errorCourse}
        </Typography>
        <Typography id="message" gutterBottom  className={classes.typography}>
          {window.errorCohort}
        </Typography>
        <Typography id="message" gutterBottom  className={classes.typography}>
          {window.errorRoom}
        </Typography>
        <Typography id="message" gutterBottom  className={classes.typography}>
          {window.errorInstructor}
        </Typography>
        <Typography id="message" gutterBottom  className={classes.typography}>
          {window.noclass}
        </Typography>
        <Typography id="message" gutterBottom  className={classes.typography}>
          {window.classAdd}
        </Typography>
        <Typography id="message" gutterBottom  className={classes.typography}>
          {window.added}
        </Typography>
        <Typography id="message" gutterBottom  className={classes.typography}>
          {window.deleted}
        </Typography>

       

        <br/>
          <MUIDataTable title = {'Course Details'} data={window.data} columns={columns} options={options} />
          <br />

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <form method='POST'>

              <DialogTitle id="form-dialog-title">Add course to schedule</DialogTitle>
              <DialogContent>

                <TextField
                  id='choose-pillar'
                  select
                  name='pillar'
                  label='Pillar'
                  // helperText='Select pillar'
                  className={classes.pillar}
                  value={this.state.pillar}
                  onChange={this.handleChange('pillar')}
                  variant='outlined'
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}

                  margin="normal"
                >
                  {pillars.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id='choose-pillar'
                  select
                  name='type'
                  label='Session type'
                  // helperText='Select pillar'
                  className={classes.pillar}
                  value={this.state.type}
                  onChange={this.handleChange('type')}
                  variant='outlined'
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}

                  margin="normal"
                >
                  {type.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  //autoFocus
                  margin="dense"
                  name='venue'
                  id='lab'
                  fullWidth
                  label='Venue (e.g. 2.506)'
                  variant="outlined"
                >
                </TextField>
                <TextField
                  //autoFocus
                  margin="dense"
                  name='cohort'
                  fullWidth
                  label='Cohort Class'
                  variant="outlined"
                >
                </TextField>

                <TextField
                  required
                  name='courseCode'
                  variant='outlined'
                  margin="dense"
                  fullWidth
                  placeholder='Course Code'></TextField>
                <TextField
                  required
                  name='courseTitle'
                  variant='outlined'
                  margin="dense"
                  fullWidth
                  placeholder='Course Title'></TextField>

                <TextField
                  name='day'
                  required
                  select
                  fullWidth
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

                <FormControl fullWidth>
                  <div>
                    <TextField
                      name='StartAdd'
                      select
                      required
                      label='Start'
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
                <Button onClick={this.handleClose} color="primary" type='submit' name='addCourse'>
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

              <DialogTitle id="form-dialog-title">Delete course from schedule</DialogTitle>
              <DialogContent>

                <TextField
                  id='choose-pillar'
                  select
                  name='pillardel'
                  label='Pillar'
                  // helperText='Select pillar'
                  className={classes.pillar}
                  value={this.state.pillar}
                  onChange={this.handleChange('pillar')}
                  variant='outlined'
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}

                  margin="normal"
                >
                  {pillars.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id='choose-pillar'
                  select
                  name='typeDel'
                  label='Session type'
                  // helperText='Select pillar'
                  className={classes.pillar}
                  value={this.state.type}
                  onChange={this.handleChange('type')}
                  variant='outlined'
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}

                  margin="normal"
                >
                  {type.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  required
                  name='courseCodedel'
                  variant='outlined'
                  margin="dense"
                  fullWidth
                  placeholder='Course Code'></TextField>

                <TextField
                  required
                  name='titleDel'
                  variant='outlined'
                  margin="dense"
                  fullWidth
                  placeholder='Course Title'></TextField>

                <TextField
                  //autoFocus
                  margin="dense"
                  name='venueDel'
                  id='lab'
                  fullWidth
                  label='Venue (e.g. 2.506)'
                  variant="outlined"
                >
                </TextField>
                <TextField
                  //autoFocus
                  margin="dense"
                  name='cohortDel'
                  fullWidth
                  label='Cohort Class'
                  variant="outlined"
                >
                </TextField>

                <TextField
                  name='daydel'
                  required
                  select
                  fullWidth
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

                <FormControl fullWidth>
                  <div>
                    <TextField
                      name='delStart'
                      select
                      required
                      label='Start'
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
                      name='delEnd'
                      required
                      select
                      className={classes.timeEnd}
                      label='End'
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
                <Button onClick={this.handleClose} color="primary" type='submit' name='delCourse'>
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

CreateSchedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateSchedule);
