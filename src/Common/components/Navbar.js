import React from "react";
import logo from "../../assets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link className="navbar-brand" to="/">
				<img src={logo} alt="logo" className="logo" />
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavAltMarkup"
				aria-controls="navbarNavAltMarkup"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div className="navbar-nav">
					<Link className="nav-item nav-link active" to="/">
						Home
					</Link>
					<a
						target="_blank"
						className="nav-item nav-link"
						rel="noreferrer nofollow"
						href="https://ilearn.marist.edu/access/lessonbuilder/item/172134/group/e0d1b466-ea21-433b-8926-c41f19455217/Course%20Materials/SamplePDF.pdf"
					>
						FAQ
					</a>
					<a
						target="_blank"
						className="nav-item nav-link"
						rel="noreferrer nofollow"
						href="https://ilearn.marist.edu/access/lessonbuilder/item/172134/group/e0d1b466-ea21-433b-8926-c41f19455217/Course%20Materials/SamplePDF.pdf"
					>
						Policies
					</a>
					<Link className="nav-item nav-link" to="/developers">
						Developers
					</Link>
					<p className="nav-item nav-link loginbutton" onClick={() => loginWithRedirect()}>
						Login
					</p>
				</div>
			</div>
		</nav>
	);
};
