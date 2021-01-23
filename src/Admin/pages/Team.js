import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AddTeam } from "./componentsTeam/AddTeam";
import { EditTeam } from "./componentsTeam/EditTeam";
import { HomeTeam } from "./componentsTeam/HomeTeam";
import axios from "axios";
import { Navbar } from "./componentsTeam/Navbar";

import createNotification from '../../Notification'

function Team() {
	const [teams, setTeams] = useState([]);

	const [reload, setReload] = useState(false);

	const [empdict, setEmpdict] = useState({});

	useEffect(() => {
		axios
			.get("https://api-stackathon.herokuapp.com/team/")
			.then((res) => {
				setTeams(res.data);
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
				var emp1 = {};
				res.data.forEach((emp) => {
					emp1[emp._id] = emp.name;
				});
				console.log("yahoo", emp1);
				setEmpdict(emp1);
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));
	}, []);

	if (reload) {
		setReload(false);
		axios
			.get("https://api-stackathon.herokuapp.com/team/")
			.then((res) => {
				setTeams(res.data);
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
			message: "Are you sure you want to delete this team??\nDetails of this team will be erased permanently.\nThis action cannot be undone",
			type: "danger",
			time: 5000
		})
		setTimeout(() => {
			var message = "Are you sure you want to delete this team??\nDetails of this team will be erased permanently.\nThis action cannot be undone";
			var check = window.confirm(message);
			if (check) {
				var link = "http://api-stackathon.herokuapp.com/team/delete/" + id;
				axios
					.delete(link)
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
			}
		}, 4500)
	};

	const handleAdd = (team) => {
		axios
			.post("https://api-stackathon.herokuapp.com/team/add", team)
			.then((res) => {
				console.log(res.data);
				setReload(true);
				createNotification({
					title: "Success",
					message: "New Team successfully created!!"
				})
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));
	};

	const handleEdit = (team) => {
		var link = "https://api-stackathon.herokuapp.com/team/update/" + team.id;
		axios
			.put(link, team)
			.then((res) => {
				console.log(res.data);
				createNotification({
					title: ":)",
					message: "Successfully updated the team",
					type: "success",
					time: 5000
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

	return (
		<div className="Team">
			<Router>
				<Navbar />
				<h2 className="pageTitle">Manage Teams</h2>
				<Route path="/team" exact component={() => <HomeTeam teams={teams} empdict={empdict} handleDelete={handleDelete} />} />
				<Route path="/team/add" exact component={() => <AddTeam empdict={empdict} handleAdd={handleAdd} />} />
				<Route path="/team/edit/:id" exact component={() => <EditTeam teams={teams} empdict={empdict} handleEdit={handleEdit} />} />
			</Router>
		</div>
	);
}

export default Team;
