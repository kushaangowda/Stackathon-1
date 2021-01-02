import React from 'react';
// import './App.css';
import Sidebar from './AdminComponent/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import Employee from './pages/Employee';
import Team from './pages/Team';
import Task from './pages/Task';
import Attendance from './pages/Attendance';
import Payroll from './pages/payroll';
import Document from './pages/Document';

export const Admincommon = () => {

  return (
    <>
      <Router>
          <div className="Admincommon">
        <Sidebar />
        <Switch>
          <Route path="/admin/home" exact component={Home}/>
          <Route path="/admin/Employee" exact component={Employee}/>
          <Route path="/admin/Task" exact component={Task}/>
          <Route path="/admin/Team" exact component={Team}/>
          <Route path="/admin/Attendance" exact component={Attendance}/>
          <Route path="/admin/Docs" exact component={Document}/>
          <Route path="/admin/Payroll" exact component={Payroll}/>
        </Switch>
        </div>
      </Router>

    </>
  );
}

export default Admincommon;
