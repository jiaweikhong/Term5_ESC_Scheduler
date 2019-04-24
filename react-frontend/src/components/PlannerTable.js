

import React from "react";
import MUIDataTable from "mui-datatables";
import { withStyles } from '@material-ui/core/styles';
import CustomToolbarSelect from './TableHeader'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { TextField, Table, TableBody, TableHead, Typography } from "@material-ui/core";


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
    minWidth: 500,
  },
  text: {
    textAlign: 'left',
    marginTop: 30,
    marginLeft: 20
  }


});

class PlannerTable extends React.Component {

  render() {
    const { classes } = this.props;

    const columns = [
      "Pillar",
      "Course Code",
      "Course Title",
      "Course Lead",
      "Instructors",
      //   { name: "Salary", options: { hint: "USD / year"}}
    ];

    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
   
    };

    return (
      <MUIDataTable data={window.data} columns={columns} options={options} />
    );

  }
}


export default withStyles(styles)(PlannerTable);

