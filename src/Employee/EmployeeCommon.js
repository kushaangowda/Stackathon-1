import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const EmployeeCommon = () => {
	const { isAuthenticated, user } = useAuth0();

	const [render, setRender] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			var link = "http://localhost:5000/auth/check/" + user["sub"];
			axios
				.get(link)
				.then((res) => {
					if (res.data["scope"] == "not admin") {
						setRender(true);
					}
				})
				.catch((err) => console.log(err));
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
