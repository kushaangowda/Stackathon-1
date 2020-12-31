import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Text from "./components/Text";
import { Profile } from "./components/Profile";
import { LogoutButton } from "./components/LogoutButton";

export const Home = () => {
	const { isLoading } = useAuth0();

	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			<Text />
			<Profile />
			<LogoutButton />
		</div>
	);
};
