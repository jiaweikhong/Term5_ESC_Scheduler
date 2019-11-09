import React from "react";
import MUIDataTable from "mui-datatables";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from "@material-ui/core";



const lab = [
    {value: 'physics', label: 'Physics Lab'},
    {value: 'chembio',label: 'Chemistry and Biology Lab',},
    {value:'armsII',label:'AMRS II'},
    {value:'dsl',label:'Digital Systems Lab'},
    {value:'', label:'None'}]

class CourseTable extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      shareholders: [{ name: "" }]
    };
  }

  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  };

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleSubmit = evt => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  state = {
      open: false,}   

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

  renderDialog(){
  if(this.state.open)
  return(
    <Dialog
      open={this.state.open}
      onClose={this.handleClose}
      aria-labelledby="form-dialog-title"
  
    >
      <DialogTitle id="form-dialog-title">Course Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You may leave irrelevant fields blank. Please provide the details accurately.                 
        </DialogContentText>
        <DialogContentText>
          Please list the classes enlisted in this class.                 
        </DialogContentText>

        {/* <TextField
          autoFocus
          margin="dense"
          id="name"
          //label="Classes"
          //type="email"
          fullWidth
          variant='outlined'
          placeholder='Please list all the classes enlisted in this course'
        /> */}

        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder">
            <input
              name='cohortclass'
              type="text"
              placeholder={`Cohort Class #${idx + 1} `}
              value={shareholder.name}
              onChange={this.handleShareholderNameChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemoveShareholder(idx)}
              
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={this.handleAddShareholder}
          className="button"
          
        >
          Add Cohort Class
        </button>
       

    <TextField
        //autoFocus
        margin="dense"
      id='lab'
      select
      label ='Choice of lab for lab sessions '
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
    <Typography></Typography>
    <Typography></Typography>
    <Typography></Typography>
    <Typography></Typography>
    <Typography></Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Save
        </Button>

      </DialogActions>
    </Dialog>
    
   
  );
}
    
      

  render() {
    
    
    const columns = [
      "Course Code",
      "Course Title",
      "Course Lead",
      "Instructors",
      "Cohort Classes",
      "Lab Venue"

    ];

    const data = [
      [50.003, "Computer System Engineering", "David Yau", "David Yau, Natalie Agus", "C01,C02,C03","Digital System Laboratory"],
      [50.004, "Introduction to Algorithm", "David Yau", "David Yau, Natalie Agus", "C01,C02,C03"],
      [50.032, "Introduction to Probability and Statistics", "David Yau", "David Yau, Natalie Agus", "C01,C02,C03"],
  
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
          open:true
        })
        
        
        
      },
    };
    

    return (
      <div>
      <MUIDataTable title={"Course Details"} data={data} columns={columns} options={options} />
      
      {this.renderDialog()}
      </div>
    );

  }
}

export default CourseTable;

