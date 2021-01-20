import React from "react";
import { CommonScreen } from "./Common/CommonScreen";
import { LoadingScreen } from "./Common/LoadingScreen";
import { Admincommon } from "./Admin/Admincommon";
import { useAuth0 } from "@auth0/auth0-react";
import { EmployeeCommon } from "./Employee/EmployeeCommon";
import { UnknownCommon } from "./Unknown/UnknownCommon";

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
			<EmployeeCommon />
			<UnknownCommon />
		</div>
	);
}

export default App;
