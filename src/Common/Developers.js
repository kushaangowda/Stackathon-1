import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import DevelopersText from "./components/DevelopersText";

export const Developers = () => {
	const { isLoading } = useAuth0();

	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			<DevelopersText />
		</div>
	);
};
