import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CourseMaterial from "./CourseMaterial";
import { TextField } from "@material-ui/core";

class CourseTable extends React.Component {

  render() {

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
              Put course information and soft constraints here. Allow Admin to edit soft constraints in this section
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

export default CourseTable;
