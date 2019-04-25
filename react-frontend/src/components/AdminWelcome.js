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
import { mainListItems } from '../lists/Adminmenu';
import { Link } from 'react-router-dom';
import { Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import AdminAppbar from './AdminAppbar';
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
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  toolbar: theme.mixins.toolbar,
  submit: {
    color: '#0097a7',
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
  },
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
class AdminWelcome extends React.Component {
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
    render(){

  const { classes } = this.props;

  return (
    <div className={classes.root}>
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={this.state.open}
      onClose={this.handleClose}
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


      <AdminAppbar />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography id="tabtitle" variant="h4" gutterBottom component="h2">
          {window.pillar} Pillar Timetable
          </Typography>
        {/* {window.user}<br/>
        {window.pillar}<br/>
        {window.pillarcourses[0]}<br/> */}
        <form method="POST">
          <Button className={classes.submit} style={{ borderColor: '#0097a7' }} variant="outlined"  id="adminpressed" color="inherit" name="adminpressed" type="submit">Check for Notifications</Button>
        </form>
        <form method="POST">
          <Button className={classes.submit} style={{ borderColor: '#0097a7' }} variant="outlined" id="course1" type='submit' color='inherit' name={window.pillarcourses[0]}>{window.pillarcourses[0]}</Button>
          <Button className={classes.submit} style={{ borderColor: '#0097a7' }} variant="outlined" id="course2" type='submit' color='inherit' name={window.pillarcourses[1]}>{window.pillarcourses[1]}</Button>
          <Button className={classes.submit} style={{ borderColor: '#0097a7' }} variant="outlined" id="course3" type='submit' color='inherit' name={window.pillarcourses[2]}>{window.pillarcourses[2]}</Button>
          <Button className={classes.submit} style={{ borderColor: '#0097a7' }} variant="outlined" id="course1" type='submit' color='inherit' name={window.pillarcourses[3]}>{window.pillarcourses[3]}</Button>
          <Button className={classes.submit} style={{ borderColor: '#0097a7' }} variant="outlined" id="course2" type='submit' color='inherit' name={window.pillarcourses[4]}>{window.pillarcourses[4]}</Button>
        </form>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time Slot</TableCell>
              <TableCell align="center">Monday</TableCell>
              <TableCell align="center">Tuesday</TableCell>
              <TableCell align="center">Wednesday</TableCell>
              <TableCell align="center">Thursday</TableCell>
              <TableCell align="center">Friday</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>0830 - 0900</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][0]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][0]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][0]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][0]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][0]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>0900 - 0930</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][1]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][1]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][1]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][1]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][1]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>0930 - 1000</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][2]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][2]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][2]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][2]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][2]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1000 - 1030</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][3]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][3]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][3]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][3]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][3]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1030 - 1100</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][4]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][4]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][4]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][4]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][4]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1100 - 1130</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][5]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][5]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][5]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][5]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][5]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1130 - 1200</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][6]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][6]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][6]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][6]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][6]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1200 - 1230</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][7]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][7]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][7]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][7]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][7]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1230 - 1300</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][8]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][8]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][8]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][8]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][8]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1300 - 1330</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][9]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][9]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][9]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][9]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][9]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1330 - 1400</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][10]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][10]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][10]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][10]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][10]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1400 - 1430</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][11]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][11]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][11]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][11]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][11]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1430 - 1500</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][12]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][12]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][12]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][12]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][12]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1500 - 1530</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][13]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][13]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][13]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][13]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][13]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1530 - 1600</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][14]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][14]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][14]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][14]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][14]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1600 - 1630</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][15]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][15]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][15]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][15]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][15]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1630 - 1700</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][16]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][16]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][16]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][16]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][16]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1700 - 1730</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][17]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][17]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][17]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][17]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][17]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1730 - 1800</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][18]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][18]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][18]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][18]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][18]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1800 - 1830</TableCell>
              <TableCell align="center">{window.parsedtoken['Monday'][19]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Tuesday'][19]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Wednesday'][19]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Thursday'][19]}</TableCell>
              <TableCell align="center">{window.parsedtoken['Friday'][19]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>


      </main>
    </div>
  );
}}


AdminWelcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminWelcome);
