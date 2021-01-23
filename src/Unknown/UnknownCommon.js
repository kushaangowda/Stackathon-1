import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { Home } from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const UnknownCommon = () => {
	// const history = useHistory();

	const { isAuthenticated, user } = useAuth0();

	const [render, setRender] = useState(false);

	if (isAuthenticated) console.log(user["sub"]);

	const addEmployeeRequest = (emp) => {
		axios
			.post("https://api-stackathon.herokuapp.com/wannabeEmployee/new", emp)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (isAuthenticated) {
			var link = "https://api-stackathon.herokuapp.com/auth/check/" + user["sub"];
			axios
				.get(link)
				.then((res) => {
					if (String(res.data["scope"]) === "unknown") setRender(true);
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
							<Route path="/" exact component={() => <Home addEmployeeRequest={addEmployeeRequest} />} />
						</Switch>
					</div>
				</Router>
			</>
		)
	);
};
