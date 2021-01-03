import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from "react-json-pretty";

function Home() {
	const { user } = useAuth0();
	return (
		<div className="Home">
			<h1>Homepage</h1>
			<JSONPretty data={user} />
		</div>
	);
}

export default Home;
