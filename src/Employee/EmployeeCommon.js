import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { Home } from "./pages/Home";
import { Leave } from "./pages/Leave";
import { Payroll } from "./pages/Payroll";
import { Tasks } from "./pages/Tasks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const EmployeeCommon = () => {
	const { isAuthenticated, user } = useAuth0();

	const [render, setRender] = useState(false);

	if (isAuthenticated) console.log(user["sub"]);

	useEffect(() => {
		if (isAuthenticated) {
			var link = "http://localhost:5000/auth/check/" + user["sub"];
			axios
				.get(link)
				.then((res) => {
					if (String(res.data["scope"]) === "employee") {
						setRender("true");
					}
				})
				.catch((err) => console.log(err));
		}
	}, [render]);

	return (
		render && (
			<>
				<Router>
					<div className="Admincommon">
						<Sidebar />
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
