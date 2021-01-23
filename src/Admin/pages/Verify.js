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
			.post("https://api-stackathon.herokuapp.com/auth/addEmployee", id)
			.then((res) => {
				console.log(res);
				setReload(true);
				createNotification({
					title: "Done",
					message: "Employee Successfully verified",
					type: "success"
				})
				axios
					.post("https://api-stackathon.herokuapp.com/employee/add", employee)
					.then((res) => {
						console.log(res.data);
						setReload(true);
					})
					.catch((err) => createNotification({
						title: "",
						message: err.message,
						type: "warning",
						time: 1000

					}));
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));
	};

	const reject = (sub) => {
		var link = "https://api-stackathon.herokuapp.com/wannabeEmployee/remove/" + sub;
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
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));
	};


	if (reload) {
		setReload(false);
		axios
			.get("https://api-stackathon.herokuapp.com/wannabeEmployee/")
			.then((res) => {
				console.log(res.data);
				setEmps(res.data);
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));
	}

	useEffect(() => {
		axios
			.get("https://api-stackathon.herokuapp.com/wannabeEmployee/")
			.then((res) => {
				console.log(res.data);
				setEmps(res.data);
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));
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
