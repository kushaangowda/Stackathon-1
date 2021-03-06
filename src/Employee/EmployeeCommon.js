import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { Home } from "./pages/Home";
import { Leave } from "./pages/Leave";
import { Payroll } from "./pages/Payroll";
import { Tasks } from "./pages/Tasks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import createNotification from '../Notification'

export const EmployeeCommon = () => {
	// const history = useHistory();

	const { isAuthenticated, user } = useAuth0();

	const [render, setRender] = useState(false);

	// const [unknown, setUnknown] = useState(false);

	// Temporarily Preventing redirect
	// if (unknown) {
	// setUnknown(false);
	// window.location.href = "https://dev-f-rf7g-f.us.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A3000";
	//}

	if (isAuthenticated) console.log(user);

	useEffect(() => {
		if (isAuthenticated) {
			var link = "https://api-stackathon.herokuapp.com/auth/check/" + user["sub"];
			axios
				.get(link)
				.then((res) => {
					if (String(res.data["scope"]) === "employee") setRender("true");
					// else if (String(res.data["scope"]) === "unknown") setUnknown(true);
				})
				.catch((err) => createNotification({
					title: "",
					message: err.message,
					type: "warning",
					time: 1000

				}));
		}
	}, [render]);

	return (
		render && (
			<>
				<Router>
					<div className="Admincommon">
						<Sidebar />
						{createNotification({
							title: "Welcome!",
							message: `Successfully signed in as ${user.name}`,
							type: "success",
							time: 5000
						})}
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/Leave" exact component={Leave} />
							<Route path="/Payroll" exact component={Payroll} />
							<Route path="/Tasks" exact component={Tasks} />
						</Switch>
					</div>
				</Router>
			</>
		)
	);
};
