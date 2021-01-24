import React from "react";
import { LoginButton } from "./LoginButton";

import createNotification from '../../Notification'

function Text() {

	const copyEmail1 = () => {
		createNotification({
			message: "(Employee) Email Copied to clipboard"
		})
		navigator.clipboard.writeText("stackhack@iiti.ac.in")
	}

	const copyEmail2 = () => {
		createNotification({
			message: "(Admin) Email Copied to clipboard"
		})
		navigator.clipboard.writeText("stackhackadmin@iiti.ac.in")
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
			<div className="credentials d-flex">
				<div className="jumbotron">
					<h6>click to copy (Employee)</h6>
					<h5 onClick={copyEmail1}>Email: <b>stackhack@iiti.ac.in</b></h5>
					<h5 onClick={copyPassword}>Password: <b>Stackhack2.0</b></h5>
				</div>
				<div className="jumbotron">
					<h6>click to copy (Admin)</h6>
					<h5 onClick={copyEmail2}>Email: <b>stackhackadmin@iiti.ac.in</b></h5>
					<h5 onClick={copyPassword}>Password: <b>Stackhack2.0</b></h5>
				</div>
			</div>
			<LoginButton />
		</div>
	);
}

export default Text;
