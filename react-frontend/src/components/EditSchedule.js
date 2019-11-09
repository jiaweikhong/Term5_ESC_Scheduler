import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MUIDataTable from "mui-datatables";
import AdminAppbar from './AdminAppbar';

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

const lab = [
  { value: 'Physics Lab', label: 'Physics Lab' },
  { value: 'Chemistry and Biology Lab', label: 'Chemistry and Biology Lab', },
  { value: 'ARMS II', label: 'AMRS II' },
  { value: 'Digital Systems Lab', label: 'Digital Systems Lab' },
  { value: '', label: 'None' }]

class EditSchedule extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      shareholders: [{ name: "" }],
    };
  }

  state = {
    open: false,
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  onChange = chips => {
    this.setState({ chips });
  }



  handleClose = () => {
    this.setState({ open: false });
  };


  render() {

    const { classes } = this.props;


    const columns = [
      "Course Code",
      "Course Title",
      "Course Lead",
      "Instructors",
      "Cohort Classes",
      "Lab Venue",
      "Status"

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
      onRowClick: (rowData, rowState) => {
        console.log(rowData, rowState);
        this.setState({
          open: true
        })
      },
    };



    return (
      <div className={classes.root}>
        <CssBaseline />
        <AdminAppbar />
        <main className={classes.content}>
          <div>
            <div className={classes.toolbar} />
   
            <MUIDataTable title={'Course Details'} data={window.data} columns={columns} options={options} />
            {/* {window.data} */}
            {/* {this.renderDialog()} */}

            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"

            >
              <form method='POST'>
                <DialogTitle id="form-dialog-title">Course Details</DialogTitle>
                <DialogContent>
                  {/* <DialogContentText>
          You may leave irrelevant fields blank. Please provide the details accurately.                 
        </DialogContentText>
        <DialogContentText>
          Please list the classes enlisted in this class.                 
        </DialogContentText> */}


                  <TextField
                    name='courseCode'
                    variant='outlined'
                    margin="dense"
                    fullWidth
                    placeholder='Please type in the course code.'></TextField>
                  <TextField
                    name='cohortclass'
                    variant='outlined'
                    fullWidth
                    placeholder='Please separate the classes with a comma.'></TextField>
                  <TextField
                    //autoFocus
                    margin="dense"
                    name='venue'
                    id='lab'
                    select
                    label='Choice of lab for lab sessions '
                    //className={classes.textField}
                    value={this.state.lab}
                    fullWidth
                    onChange={this.handleChange('lab')}
                    SelectProps={{
                      // MenuProps: {
                      //   className: classes.menu,
                      // },
                    }}

                    variant="outlined"
                  >
                    {lab.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" type='submit' name='please'>
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


EditSchedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditSchedule);