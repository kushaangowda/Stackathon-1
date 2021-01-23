import React from "react";
import { CommonScreen } from "./Common/CommonScreen";
import { LoadingScreen } from "./Common/LoadingScreen";
import { Admincommon } from "./Admin/Admincommon";
import { useAuth0 } from "@auth0/auth0-react";
import { EmployeeCommon } from "./Employee/EmployeeCommon";
import { UnknownCommon } from "./Unknown/UnknownCommon";

import createNotification from "./Notification";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

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
			<ReactNotification />
			<CommonScreen />
			<Admincommon />
			<EmployeeCommon />
			<UnknownCommon />
			{/* <div className="btn btn-success" onClick={() => {
				createNotification({
					title: "Just Checking",
					message: "This is a fake message for testing",
					type: "danger",
					position: "top-right",
					time: 2000
				})
			}}>PRESS</div> */}
		</div>
	);
}

export default App;
