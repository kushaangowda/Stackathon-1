import React, { useState, useEffect } from "react";
// import './App.css';
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Team from "./pages/Team";
import { Task } from "./pages/Task";
import Attendance from "./pages/Attendance";
// import Payroll from "./pages/payroll";
import Document from "./pages/Document";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Verify } from "./pages/Verify";
import createNotification from "../Notification";

export const Admincommon = () => {
	const { isAuthenticated, user } = useAuth0();

	const [render, setRender] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			var link = "https://api-stackathon.herokuapp.com/auth/check/" + user["sub"];
			axios
				.get(link)
				.then((res) => {
					if (String(res.data["scope"]) === "admin") {
						setRender(true);
					}
				})
				.catch((err) => createNotification({
					title: "",
					message: "Showing tasks with status: PENDING",
					type: "warning",
					time: 1000

				}));
		}
	});




	return (
		render && (
			<>
				<Router>
					<div className="Admincommon">
						<Sidebar />
						{createNotification({
							title: "Welcome Admin",
							message: `Successfully signed in as ${user.name}`,
							type: "success",
							time: 5000
						})}
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/Employee" exact component={Employee} />
							<Route path="/Task" exact component={Task} />
							<Route path="/Team" exact component={Team} />
							<Route path="/Requests" exact component={Attendance} />
							<Route path="/Verify" exact component={Verify} />
							<Route path="/Docs" exact component={Document} />

						</Switch>
					</div>
				</Router>
			</>
		)
	);
};

export default Admincommon;
