import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Text from "./components/Text";

export const Home = () => {
	const { isLoading } = useAuth0();

	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			<Text />
		</div>
	);
};
