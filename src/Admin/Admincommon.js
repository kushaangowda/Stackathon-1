import React from "react";
// import './App.css';
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Team from "./pages/Team";
import Task from "./pages/Task";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/payroll";
import Document from "./pages/Document";
import { useAuth0 } from "@auth0/auth0-react";

export const Admincommon = () => {
	const { isAuthenticated } = useAuth0();

	return (
		isAuthenticated && (
			<>
				<Router>
					<div className="Admincommon">
						<Sidebar />
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/Employee" exact component={Employee} />
							<Route path="/Task" exact component={Task} />
							<Route path="/Team" exact component={Team} />
							<Route path="/Attendance" exact component={Attendance} />
							<Route path="/Docs" exact component={Document} />
							<Route path="/Payroll" exact component={Payroll} />
						</Switch>
					</div>
				</Router>
			</>
		)
	);
};

export default Admincommon;
