import React from "react";
import { LoginButton } from "./LoginButton";

import createNotification from '../../Notification'

function Text() {

	const copyEmail = () => {
		createNotification({
			message: "Email Copied to clipboard"
		})
		navigator.clipboard.writeText("stackhack@iiti.ac.in")
	}

	const copyPassword = () => {
		createNotification({
			message: "Password Copied to clipboard"
		})
		navigator.clipboard.writeText("Stackhack2.0")
	}

	return (
		<div className="Text1">
			<p className="text1stuff">Stackathon</p>
			<p className="smalltext">
				Hi Stackhack 2.0 Community
			</p>

			<p className="text-white">This application is developed to be used as a medium between the admin and employees of a company.</p>
			<p className="text-white">You can use this email id and password for testing purposes.</p>
			<div className="jumbotron">
				<h6>click to copy</h6>
				<h3 onClick={copyEmail}>Email: <b>stackhack@iiti.ac.in</b></h3>
				<h3 onClick={copyPassword}>Password: <b>Stackhack2.0</b></h3>
			</div>
			<LoginButton />
		</div>
	);
}

export default Text;
