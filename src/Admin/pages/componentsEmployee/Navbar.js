import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="empnav">
			<Link className="empnavLink" to="/employee">
				Home
			</Link>
			<Link className="empnavLink" to="/employee/add">
				Add Employee
			</Link>
		</div>
	);
};
