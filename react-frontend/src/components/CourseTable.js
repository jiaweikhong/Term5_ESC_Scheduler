import React, { Component } from 'react'
import MaterialTable from 'material-table'

class CourseTable extends Component {
  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Course code', field: 'code', type:'numeric' },
            { title: 'Course Title', field: 'title' },
            { title: 'Course Lead', field: 'lead'},
            { title: 'Instructors', field: 'instructors' }
          ]}
          data={[{ code: 50.003, title: 'Elements of Software Construction', lead: 'Sudipta Chatta]opadhyay', instructors: 'Sun Jun' },
        {code: 50.005, title: 'Computer System Engineering', lead:'David Yau', instructors:'Natalie Agus'},{code: 50.034, title: 'Introduction to Probability & Statistics', 
      lead:'Tony Quek', instructors:'Gemma Roig, Chong Kai Fong Ernest'}]}
          title="Course Details"

          detailPanel={rowData => {
            return (
              <iframe
                title='hello'
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/C0DPdy98e4c"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            )
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
      </div>
    )
  }
}
export default CourseTable;
