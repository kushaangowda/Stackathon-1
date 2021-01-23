import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { Home } from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import createNotification from '../Notification'


export const UnknownCommon = () => {
	// const history = useHistory();

	const { isAuthenticated, user } = useAuth0();

	const [render, setRender] = useState(false);

	if (isAuthenticated) console.log(user["sub"]);

	const addEmployeeRequest = (emp) => {
		axios
			.post("http://api-stackathon.herokuapp.com/wannabeEmployee/new", emp)
			.then((res) => {
				console.log(res)
				if (res.data.error) {
					createNotification({
						title: "Duplicate Request",
						message: "Chotto Matte, Request already created!!",
						type: "info",
						time: 5000
					})
				}
			})
			.catch((err) => {
				createNotification({
					title: "",
					message: err.message,
					type: "warning",
					time: 1000

				})
			});
	};

	useEffect(() => {
		if (isAuthenticated) {
			var link = "https://api-stackathon.herokuapp.com/auth/check/" + user["sub"];
			axios
				.get(link)
				.then((res) => {
					if (String(res.data["scope"]) === "unknown") setRender(true);
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
						<Switch>
							<Route path="/" exact component={() => <Home addEmployeeRequest={addEmployeeRequest} />} />
						</Switch>
					</div>
				</Router>
			</>
		)
	);
};
