import React from "react";
import { CommonScreen } from "./Common/CommonScreen";
import { LoadingScreen } from "./Common/LoadingScreen";
import { Admincommon } from "./Admin/Admincommon";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
	const { isLoading } = useAuth0();

	if (isLoading)
		return (
			<div className="App Preloader">
				<LoadingScreen />
			</div>
		);

	return (
		<div className="App">
			<CommonScreen />
			<Admincommon />
		</div>
	);
}

export default App;
