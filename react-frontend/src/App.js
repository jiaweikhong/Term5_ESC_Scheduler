import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from "./components/Home";
import About from "./components/About";

import InstructorLogin from "./components/InstructorLogin";
import InstructorWelcome from './components/InstructorWelcome';
import UploadCourse from './components/UploadCourse';
import SoftConstraints from './components/SoftConstraints';
import InstructorNotification from './components/InstructorNotification';

import AdminLogin from "./components/AdminLogin";
import AdminWelcome from './components/AdminWelcome';
import EditSchedule from './components/EditSchedule';
import AdminNotification from './components/AdminNotifications';

import PlannerLogin from "./components/PlannerLogin";
import PlannerWelcome from './components/PlannerWelcome';
import CreateSchedule from './components/CreateSchedule';
import PlannerEditSchedule from './components/PlannerEditSchedule';
import DeleteSchedule from './components/DeleteSchedule';
import EventSchedule from './components/EventSchedule';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            {/* home page */}
            <Route path="/" component={Home} exact />

            {/* about page. will be removed. */}
            <Route path="/about" component={About} />

            {/* related to instructors */}
            <Route path="/instructorlogin" component={InstructorLogin} />
            <Route path="/instructorwelcome" component={InstructorWelcome} />
            <Route path="/uploadcourse" component={UploadCourse} />
            <Route path="/softconstraints" component={SoftConstraints} />
            <Route path="/instructornotifications" component={InstructorNotification} />

            {/* related to admins */}
            <Route path="/adminlogin" component={AdminLogin} />
            <Route path="/adminwelcome" component={AdminWelcome} />
            <Route path="/editschedule" component={EditSchedule} />
            <Route path="/adminnotifications" component={AdminNotification} />

            {/* related to planners */}
            <Route path="/plannerlogin" component={PlannerLogin} />
            <Route path="/plannerwelcome" component={PlannerWelcome} />
            <Route path="/createschedule" component={CreateSchedule} />
            <Route path="/plannereditschedule" component={PlannerEditSchedule} />
            <Route path="/deleteschedule" component={DeleteSchedule} />
            <Route path="/eventscheduling" component={EventSchedule} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;