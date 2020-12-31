import React from "react";
import { LoginButton } from "./components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

export const Developers = () => {
	const { isLoading } = useAuth0();

	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			<p>Developers</p>
			<LoginButton />
		</div>
	);
};
