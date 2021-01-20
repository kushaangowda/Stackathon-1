import React, { useState, useEffect } from "react";
import { Card } from "./componentsVerify/Card";
import axios from "axios";

export const Verify = () => {
	const [emps, setEmps] = useState([
		{ name: "kushaan", email: "kush@gmail.com", picture: "https://picsum.photos/200", sub: "abc123def456", nickname: "kush" },
	]);

	const verify = (emp, employee) => {
		console.log(emp);
		const id = {
			auth_id: emp["sub"],
		};
		axios
			.post("http://localhost:5000/auth/addEmployee", id)
			.then((res) => {
				console.log(res);
				setReload(true);
				axios
					.post("http://localhost:5000/employee/add", employee)
					.then((res) => {
						console.log(res.data);
						setReload(true);
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	const reject = (sub) => {
		var link = "http://localhost:5000/wannabeEmployee/remove/" + sub;
		axios
			.get(link)
			.then((res) => {
				console.log(res);
				setReload(true);
			})
			.catch((err) => console.log(err));
	};

	const [reload, setReload] = useState(false);

	if (reload) {
		setReload(false);
		axios
			.get("http://localhost:5000/wannabeEmployee/")
			.then((res) => {
				console.log(res.data);
				setEmps(res.data);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		axios
			.get("http://localhost:5000/wannabeEmployee/")
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
				{emps.map((emp) => {
					return <Card emp={emp} key={emp.sub} verify={verify} reject={reject} />;
				})}
			</div>
		</div>
	);
};
