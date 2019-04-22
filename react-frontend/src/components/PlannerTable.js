

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

    // const data = [
    //   ["ISTD", 50.003, "Elements of Software Construction", "Sun Jun", "Sudipta Chattopadhyay"],
    //   ["ISTD5", 50.005, "Computer Systems Engineering", "David Yau", "Natalie Agus"],
    //   ["ISTD", 50.034, "Introduction to Probability and Statistics", "Tony Quek", "Gemma Roig, Cong Kai Fong Ernest"],
    //   ["Freshmore", 10.004, "Advanced Math II", "Sergey Kushnarev", "Wang XinYin"],
    //   ["HASS", "01.010", "Freshmore Writing Programme", "Pang Yang Hui", "Eunice Leong"],



    // ];

    const options = {
      filter: true,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      expandableRows: true,

      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
      ),
      onRowsSelect: (rowsSelected, allRows) => {
        console.log(rowsSelected, allRows);
      },
      onRowsDelete: (rowsDeleted) => {
        console.log(rowsDeleted, "were deleted!");
      },
      onChangePage: (numberRows) => {
        console.log(numberRows);
      },
      onSearchChange: (searchText) => {
        console.log(searchText);
      },
      onColumnSortChange: (column, direction) => {
        console.log(column, direction);
      },
      onColumnViewChange: (column, action) => {
        console.log(column, action);
      },
      onFilterChange: (column, filters) => {
        console.log(column, filters);
      },
      onCellClick: (cellData, cellMeta) => {
        console.log(cellData, cellMeta);
      },
      onRowClick: (rowData, rowState) => {
        console.log(rowData, rowState);
      },
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

                    <TableRow >
                      <TableCell >Class</TableCell>
                      <TableCell align='center'>Number of sessions per week</TableCell>
                      <TableCell align='center'>First session (hrs)</TableCell>
                      <TableCell align='center'>Second session (hrs)</TableCell>
                      <TableCell align='center'>Third session(hrs)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell >Lecture</TableCell>
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
                    <TableRow rowSpan={10}>
                      <TableCell >Day</TableCell>
                      <TableCell >From</TableCell>
                      <TableCell >To</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell >Monday</TableCell>
                      <TableCell>0830</TableCell>
                      <TableCell>1030</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell >Tuesday</TableCell>
                      <TableCell>0830</TableCell>
                      <TableCell>1030</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell >Wednesday</TableCell>
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
      //   isRowSelectable: (dataIndex) => {
      //     //prevents selection of row with title "Attorney"
      //     return data[dataIndex][1] != "Attorney";
      //   }
    };

    return (
      <MUIDataTable title={"Create Timetable"} data={window.data} columns={columns} options={options} />
    );

  }
}


export default withStyles(styles)(PlannerTable);

