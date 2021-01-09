import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="empnav">
			<Link className="empnavLink" to="/team">
				Home
			</Link>
			<Link className="empnavLink" to="/team/add">
				Add Team
			</Link>
		</div>
	);
};
