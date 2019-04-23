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
import { Button, FormControl } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MUIDataTable from "mui-datatables";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";

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

const constraints = [
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
  }
];

class CohortClass extends React.Component {


  state = {
    open: false,
    delopen: false,
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };



  handleClose = () => {
    this.setState({ open: false, delopen:false });
  };

  handleClick = () => {
    this.setState({ open: true });
  }
  handleDelete = () => {
    this.setState({ delopen: true });
  }


  render() {

    const { classes } = this.props;




    const columns = [
      "Pillar",
      "Class",
      "Number of Students"

    ];

    // const data = [
    //   ["ISTD", "ISTD1", "40"],
    //   ["ISTD", "ISTD2", "47"],
    //   ["ISTD", "ISTD3", "44"],

    // ];

    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 20,
      customToolbar: () => {
        return (
          <React.Fragment>
            <Tooltip title={"custom icon"}>
              <IconButton className={classes.iconButton} onClick={this.handleClick}>
                <AddIcon className={classes.deleteIcon} />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Delete Event"}>
              <IconButton className={classes.iconButton} onClick={this.handleDelete}>
                <ClearIcon className={classes.deleteIcon} />
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
      //   onRowClick: (rowData, rowState) => {
      //     console.log(rowData, rowState);
      //     this.setState({
      //       open:true
      //     })



      //   },
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
              Welcome {window.user}
            </Typography>
            <div className={classes.icons}>
              <IconButton
                color="inherit"
                component={Link} to="/adminnotifications">
                <NotificationsIcon />
              </IconButton>
              <Button
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
          <div>
            <div className={classes.toolbar} />
            <Typography id="tabtitle" variant="h4" gutterBottom component="h2">
              Cohort Class Details
          </Typography>
            <MUIDataTable id="tabtitle" data={window.cohortData} columns={columns} options={options} />

            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"

            >
              <form method='POST'>
                <DialogTitle id="form-dialog-title">Cohort Class Details</DialogTitle>
                <DialogContent>

                  <TextField
                    name='cohortPillar'
                    id='choose-pillar'
                    select
                    fullWidth
                    label='Pillar'
                    className={classes.pillar}
                    value={this.state.pillar1}
                    onChange={this.handleChange('pillar1')}
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

                  <TextField
                    //autoFocus
                    margin="dense"
                    name='ClassID'
                    label="Cohort Class Number. i.e. ISTD1"
                    fullWidth
                    variant="outlined"
                  ></TextField>

                  <TextField
                    margin="dense"
                    name='studentNo'
                    label="Number of students in this class"
                    fullWidth
                    variant="outlined"
                  ></TextField>

                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" type='submit' name='cohortInfo'>
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
                <DialogTitle id="form-dialog-title"> Delete Cohort Class Details</DialogTitle>
               
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    className={classes.pillar}
                    name='delClass'
                    label="Cohort Class"
                    variant="outlined"
                    fullWidth
                  ></TextField>
                  

                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" type='submit' name='DelButton'>
                    Save
                  </Button>
                </DialogActions>
                
              </form>
            </Dialog>

            



          </div>
        </main>

      </div>
    );
  }
}


CohortClass.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CohortClass);

