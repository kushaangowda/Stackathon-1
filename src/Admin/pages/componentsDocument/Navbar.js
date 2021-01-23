import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="empnav">
			<ul>
				<li>	<Link className="empnavLink" to="/docs">
					Home
			</Link></li>
				<li>	<Link className="empnavLink" to="/docs/add">
					Add Document
			</Link></li>
			</ul>
		</div>
	);
};
