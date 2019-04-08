import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CourseMaterial from "./CourseMaterial";
import { TextField, Table, TableBody, TableHead, Typography } from "@material-ui/core"; 

import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit ,
    overflowX: 'auto',
    minWidth: 500,
  },
  text:{
    textAlign:'left',
    marginTop:30,
    marginLeft: 20
  }


});

class CourseTable extends React.Component {

  render() {
    const { classes } = this.props;
    const columns = ["Course Code","Course Title","Course Lead","Instructors"];


    const data = [
      [50.003, "Elements of Software Construction", "Sun Jun","Sudipta Chattopadhyay"],
      [50.005, "Computer Systems Engineering", "David Yau","Natalie Agus"],
      [50.034, "Introduction to Probability and Statistics", "Tony Quek","Gemma Roig, Cong Kai Fong Ernest"],

    ];

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'scroll',
      expandableRows: true,
      selectableRows: false,
      renderExpandableRow: (rowData, rowMeta) => {
        const colSpan = rowData.length + 1;
        return (
          <TableRow>
            <TableCell colSpan={colSpan}>
              {/* Custom expandable row option. Data: {JSON.stringify(rowData)} */}
              <Typography variant='h6' gutterBottom className={classes.text}>Course Information</Typography>
              <Table className={classes.root}>
                <TableBody >
                  <TableHead>

                    <TableRow>
                      <TableCell align='center'>Class</TableCell>
                      <TableCell align='center'>Number of sessions per week</TableCell>
                      <TableCell align='center'>First session (hrs)</TableCell>
                      <TableCell align='center'>Second session (hrs)</TableCell>
                      <TableCell align='center'>Third session(hrs)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align='center'>Lecture</TableCell>
                      <TableCell align='center'>3</TableCell>
                      <TableCell align='center'> 1</TableCell>
                      <TableCell align='center'>2</TableCell>
                      <TableCell align='center'>2</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cohort Class</TableCell>
                      <TableCell align='center'>2</TableCell>
                      <TableCell align='center'>1</TableCell>
                      <TableCell align='center'>2</TableCell>
                      <TableCell align='center'></TableCell>
                    </TableRow>
                  </TableHead>
                </TableBody>
              </Table>

              <Typography variant='h6' gutterBottom className={classes.text}>Soft Constraints</Typography>
              <Table className={classes.root}>
                <TableBody>
                  <TableHead>
                    <TableRow>
                      <TableCell>Day</TableCell>
                      <TableCell>From</TableCell>
                      <TableCell>To</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell >Monday</TableCell>
                      <TableCell>0830</TableCell>
                      <TableCell>1030</TableCell>
                    </TableRow>
                  </TableHead>
                  </TableBody>
              </Table>
            </TableCell>
          </TableRow>
        );
      }
    };

    return (
      <MUIDataTable title={"Course Details"} data={data} columns={columns} options={options} />
    );

  }
}

export default withStyles(styles)(CourseTable);
