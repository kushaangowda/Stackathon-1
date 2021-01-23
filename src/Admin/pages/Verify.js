import React, { useState, useEffect } from "react";
import { Card } from "./componentsVerify/Card";
import axios from "axios";

import createNotification from '../../Notification'

export const Verify = () => {
	const [emps, setEmps] = useState("");

	const [reload, setReload] = useState(false);

	const verify = (emp, employee) => {
		console.log(emp);
		const id = {
			auth_id: emp["sub"],
		};
		axios
			.post("http://api-stackathon.herokuapp.com/auth/addEmployee", id)
			.then((res) => {
				console.log(res);
				setReload(true);
				createNotification({
					title: "Done",
					message: "Employee Successfully verified",
					type: "success"
				})
				axios
					.post("http://api-stackathon.herokuapp.com/employee/add", employee)
					.then((res) => {
						console.log(res.data);
						setReload(true);
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	const reject = (sub) => {
		var link = "http://api-stackathon.herokuapp.com/wannabeEmployee/remove/" + sub;
		axios
			.get(link)
			.then((res) => {
				console.log(res);
				createNotification({
					title: "",
					message: "Employee rejected",
					type: "danger"
				})
				setReload(true);
			})
			.catch((err) => console.log(err));
	};


	if (reload) {
		setReload(false);
		axios
			.get("http://api-stackathon.herokuapp.com/wannabeEmployee/")
			.then((res) => {
				console.log(res.data);
				setEmps(res.data);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		axios
			.get("http://api-stackathon.herokuapp.com/wannabeEmployee/")
			.then((res) => {
				console.log(res.data);
				setEmps(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="container-fluid">
			<h2 className="pageTitle">Verify Employee</h2>
			<div className="row">
				{emps === "" ? <></> : emps.map((emp) => {
					return <Card emp={emp} key={emp.sub} verify={verify} reject={reject} />;
				})}
			</div>
		</div>
	);
};
