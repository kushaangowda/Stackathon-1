import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const EmployeeCommon = () => {
	const { isAuthenticated, user } = useAuth0();

	const [render, setRender] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			if (user["sub"] != "google-oauth2|105916184375669631353") {
				setRender(true);
			}
		}
	}, []);

	return (
		render && (
			<div>
				<p>This is Employee Section</p>
				<a href="https://dev-f-rf7g-f.us.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A3000">Logout</a>
			</div>
		)
	);
};
