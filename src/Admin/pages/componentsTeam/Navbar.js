import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="empnav">
			<ul>
			<li><Link className="empnavLink" to="/team">
				Home
			</Link></li>
			<li><Link className="empnavLink" to="/team/add">
				Add Team
			</Link></li>
			</ul>
		</div>
	);
};
