import React, { Component } from 'react';
import {BrowserRouter, Route}  from 'react-router-dom';

import AdminLogin from "./AdminLogin"; 
import InstructorLogin from "./InstructorLogin"; 
import PlannerLogin from "./PlannerLogin"; 

import InstructorWelcome from './InstructorWelcome';
import AdminWelcome from './AdminWelcome';
import PlannerWelcome from './PlannerWelcome';
import UploadCourse from './UploadCourse';
import SoftConstraints from './Softconstrains';
import EditSchedule from './EditSchedule';
import CreateSchedule from './CreateSchedule';
import PlannerEditSchedule from './PlannerEditSchedule';
import Home from './Home';
import AdminNotification from './AdminNotifications';
import InstructorNotification from './InstructorNotification';
import DeleteSchedule from './DeleteSchedule';
import EventSchedule from './EventSchedule';
 



class App extends Component {
  render() {
    return (

      <BrowserRouter>

        <div>
          <Route path="/home" component={Home}/>

      
          <Route path="/instructorlogin" component={InstructorLogin}/>
          <Route path="/instructorwelcome" component={InstructorWelcome}/>
          <Route path="/uploadcourse" component={UploadCourse}/>
          <Route path="/softconstraints" component={SoftConstraints}/>
          <Route path="/instructornotifications" component={InstructorNotification}/>

      
          <Route path="/adminlogin" component={AdminLogin}/>
          <Route path="/editschedule" component={EditSchedule}/>
          <Route path="/adminwelcome" component={AdminWelcome}/>
          <Route path="/adminnotifications" component={AdminNotification}/>

          
          <Route path="/plannerlogin" component={PlannerLogin}/>
          <Route path="/plannerwelcome" component={PlannerWelcome}/>
          <Route path="/createschedule" component={CreateSchedule}/>
          <Route path="/plannereditschedule" component={PlannerEditSchedule}/>
          <Route path="/deleteschedule" component={DeleteSchedule}/>
          <Route path="/eventscheduling" component={EventSchedule}/>
          
        </div>
      </BrowserRouter>

       

    

    );
  }
}

export default App;
