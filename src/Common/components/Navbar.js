import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Navbar = () => {
	const { loginWithRedirect } = useAuth0();

	const [documents, setDocuments] = useState([]);

	useEffect(() => {
		axios
			.get("http://api-stackathon.herokuapp.com/document/")
			.then((res) => {
				setDocuments(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

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
					<Link className="nav-item nav-link" to="/">
						Home
					</Link>
					<div className="nav-item dropdown">
						<a
							className="nav-link dropdown-toggle"
							href="/"
							id="navbarDropdownMenuLink"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							Documents
						</a>
						<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							{documents.map((doc) => {
								return (
									<a className="dropdown-item" rel="noreferrer" href={doc.link} target="_blank">
										{doc.name}
									</a>
								);
							})}
						</div>
					</div>
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
