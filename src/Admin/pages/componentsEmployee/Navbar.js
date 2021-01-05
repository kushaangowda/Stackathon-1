import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div>
			<Link to="/employee">Home</Link>
			<Link to="/employee/add">Add</Link>
		</div>
	);
};
