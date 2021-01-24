import React, { useState, useEffect } from "react";
import { HomeEmployee } from "./componentsEmployee/HomeEmployee";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from "./componentsEmployee/Navbar";
import { AddEmployee } from "./componentsEmployee/AddEmployee";
import { EditEmployee } from "./componentsEmployee/EditEmployee";
import axios from "axios";
import "./employee.css";

import createNotification, { demo } from '../../Notification'

function Employee() {
	const [teamdict, setTeamdict] = useState({});

	const [employees, setEmployees] = useState([]);

	const [reload, setReload] = useState(false);

	useEffect(() => {
		axios
			.get("https://api-stackathon.herokuapp.com/team/")
			.then((res) => {
				var team1 = {};
				res.data.forEach((team) => {
					team1[team._id] = team.name;
				});
				console.log("yahoo", team1);
				setTeamdict(team1);
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));

		axios
			.get("https://api-stackathon.herokuapp.com/employee/")
			.then((res) => {
				setEmployees(res.data);
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));

		demo(["Here you can manage your employee i.e update their information from the database"])
	}, []);

	if (reload) {
		setReload(false);
		axios
			.get("https://api-stackathon.herokuapp.com/employee/")
			.then((res) => {
				setEmployees(res.data);
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));
	}

	const handleDelete = (id) => {
		createNotification({
			title: "Are you sure about that?",
			message: "Are you sure you want to delete this employee??\nDetails of this employee will be erased permanently.\nThis action cannot be undone",
			type: "warning",
			time: 5000
		})
		setTimeout(() => {
			var message = "Are you sure ?";
			var check = window.confirm(message);
			if (check) {
				createNotification({
					title: " :| ",
					message: "Sorry!! But you are admin just for testing purposes, Kindly don't delete our employees",
					type: "danger",
					time: 10000
				})
				// var link = "http://api-stackathon.herokuapp.com/employee/" + id;
				// axios
				// 	.delete(link)
				// 	.then((res) => {
				// 		console.log(res.data);
				// 		setReload(true);
				// 	})
				// 	.catch((err) => createNotification({
				// 		title: "",
				// 		message: err.message,
				// 		type: "warning",
				// 		time: 1000

				// 	}));
			}

		}, 4500)
	};

	const handleAdd = (employee) => {
		axios
			.post("https://api-stackathon.herokuapp.com/employee/add", employee)
			.then((res) => {
				createNotification({
					title: "Success ",
					message: "New Employee Added!!",
					type: "success",
					time: 2000
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

	const handleEdit = (employee) => {
		createNotification({
			title: " -_- ",
			message: "Sorry!! But you are admin just for testing purposes, Kindly don't edit our employees",
			type: "danger",
			time: 10000
		})
		// var link = "https://api-stackathon.herokuapp.com/employee/update/" + employee.id;
		// axios
		// 	.put(link, employee)
		// 	.then((res) => {
		// 		console.log(res.data);
		// 		setReload(true);
		// 	})
		// 	.catch((err) => createNotification({
		// 		title: "",
		// 		message: err.message,
		// 		type: "warning",
		// 		time: 1000

		// 	}));
	};

	return (
		<div className="employee container-fluid">
			<Router>
				<Navbar />
				<Route path="/employee" exact component={() => <HomeEmployee employees={employees} teamdict={teamdict} handleDelete={handleDelete} />} />
				<Route path="/employee/add" exact component={() => <AddEmployee handleAdd={handleAdd} />} />
				<Route path="/employee/edit/:id" exact component={() => <EditEmployee handleEdit={handleEdit} employees={employees} />} />
			</Router>
		</div>
	);
}

export default Employee;
