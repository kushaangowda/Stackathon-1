import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js/dist/popper.min.js";
import { Navbar } from "./components/Navbar";
import "./common.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./Home";
import { Developers } from "./Developers";

export const CommonScreen = () => {
	const [active, setActive] = useState(false);

	return (
		<Router>
			<div className="CommonScreen">
				<Navbar active={active} />
				<div className="container-fluid">
					<Route path="/" exact component={Home} />
					<Route path="/developers" exact component={Developers} />
				</div>
			</div>
		</Router>
	);
};
