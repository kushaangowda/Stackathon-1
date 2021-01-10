import React, { useState, useEffect } from "react";
// import './App.css';
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Team from "./pages/Team";
import { Task } from "./pages/Task";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/payroll";
import Document from "./pages/Document";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const Admincommon = () => {
	const { isAuthenticated, user } = useAuth0();

	const [render, setRender] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			if (user["sub"] == "google-oauth2|105916184375669631353") {
				setRender(true);
			}
		}
	}, []);

	return (
		render && (
			<>
				<Router>
					<div className="Admincommon">
						<Sidebar />
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/Employee" exact component={Employee} />
							<Route path="/Task" exact component={Task} />
							<Route path="/Team" exact component={Team} />
							<Route path="/Requests" exact component={Attendance} />
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
