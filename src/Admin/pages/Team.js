import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AddTeam } from "./componentsTeam/AddTeam";
import { EditTeam } from "./componentsTeam/EditTeam";
import { HomeTeam } from "./componentsTeam/HomeTeam";
import axios from "axios";
import { Navbar } from "./componentsTeam/Navbar";

function Team() {
	const [teams, setTeams] = useState([]);

	const [employees, setEmployees] = useState([]);

	const [reload, setReload] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:5000/team/")
			.then((res) => {
				setTeams(res.data);
			})
			.catch((err) => console.log(err));

		axios
			.get("http://localhost:5000/employee/")
			.then((res) => {
				setEmployees(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	if (reload) {
		setReload(false);
		axios
			.get("http://localhost:5000/team/")
			.then((res) => {
				setTeams(res.data);
			})
			.catch((err) => console.log(err));
	}

	const handleDelete = (id) => {
		var message = "Are you sure you want to delete this team??\nDetails of this team will be erased permanently.\nThis action cannot be undone";
		var check = window.confirm(message);
		if (check) {
			var link = "http://localhost:5000/team/delete/" + id;
			axios
				.delete(link)
				.then((res) => {
					console.log(res.data);
					setReload(true);
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<div className="Team">
			<Router>
				<Navbar />
				<Route path="/team" exact component={() => <HomeTeam teams={teams} employees={employees} handleDelete={handleDelete} />} />
				<Route path="/team/add" exact component={() => <AddTeam />} />
				<Route path="/team/edit/:id" exact component={() => <EditTeam teams={teams} />} />
			</Router>
		</div>
	);
}

export default Team;
