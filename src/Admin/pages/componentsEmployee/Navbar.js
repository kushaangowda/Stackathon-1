import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="empnav">
			<ul>
			<li><Link className="empnavLink" to="/employee">
				Home
			</Link></li>
			<li><Link className="empnavLink" to="/employee/add">
				Add Employee
			</Link></li>
			</ul>
		</div>
	);
};
