import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js/dist/popper.min.js";
import { Navbar } from "./components/Navbar";
import "./common.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./Home";
import { Developers } from "./Developers";
import { useAuth0 } from "@auth0/auth0-react";

export const CommonScreen = () => {
	const { isAuthenticated } = useAuth0();

	return (
		!isAuthenticated && (
			<Router>
				<div className="CommonScreen">
					<Navbar />
					<div className="container-fluid">
						<Route path="/" exact component={Home} />
						<Route path="/developers" exact component={Developers} />
					</div>
				</div>
			</Router>
		)
	);
};
