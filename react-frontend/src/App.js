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
import InstructorEvent from './components/InstructorEvent'

import AdminLogin from "./components/AdminLogin";
import AdminWelcome from './components/AdminWelcome';
import EditSchedule from './components/EditSchedule';
import AdminNotification from './components/AdminNotifications';
import AdminInstructPage from './components/AdminInstructPage';
import CohortClass from './components/CohortClass';
import AdminEvent from './components/AdminEvent';

import PlannerLogin from "./components/PlannerLogin";
import PlannerWelcome from './components/PlannerWelcome';
import CreateSchedule from './components/CreateSchedule';
import PlannerEditSchedule from './components/PlannerEditSchedule';
import DeleteSchedule from './components/DeleteSchedule';
import EventSchedule from './components/EventSchedule';
import FreshmoreSchedule from './components/FreshmoreSchedule';
import EPDSchedule from './components/EPDSchedule';
import ISTDSchedule from './components/ISTDSchedule';
import ESDSchedule from './components/ESDSchedule';
import ASDSchedule from './components/ASDSchedule';

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
            <Route path ='/instructorevents' component={InstructorEvent}/>

            {/* related to admins */}
            <Route path="/adminlogin" component={AdminLogin} />
            <Route path="/adminwelcome" component={AdminWelcome} />
            <Route path="/editschedule" component={EditSchedule} />
            <Route path="/adminnotifications" component={AdminNotification} />
            <Route path="/instructorinformation" component={AdminInstructPage}/>
            <Route path="/cohortclass" component={CohortClass}/>
            <Route path='/adminevents' component={AdminEvent}/>

            {/* related to planners */}
            <Route path="/plannerlogin" component={PlannerLogin} />
            <Route path="/plannerwelcome" component={PlannerWelcome} />
            <Route path="/createschedule" component={CreateSchedule} />
            <Route path="/plannereditschedule" component={PlannerEditSchedule} />
            <Route path="/deleteschedule" component={DeleteSchedule} />
            <Route path="/eventscheduling" component={EventSchedule} />
            <Route path="/freshmoreschedule" component={FreshmoreSchedule} />
            <Route path="/epdschedule" component={EPDSchedule} />
            <Route path="/istdschedule" component={ISTDSchedule} />
            <Route path="/esdschedule" component={ESDSchedule} />
            <Route path="/asdschedule" component={ASDSchedule} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;