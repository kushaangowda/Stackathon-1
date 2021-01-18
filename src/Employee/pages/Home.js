import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import JSONPretty from "react-json-pretty";
import axios from "axios";

export const Home = () => {
	const { user } = useAuth0();
	const [employee, setEmployee] = useState({
		email: "",
		Role: "",
		Post: "",
		Salary: "",
		attendance: 0,
	});
	const [team, setTeam] = useState({
		name: "",
		members: [],
	});
	const [empdict, setEmpdict] = useState({});

	useEffect(() => {
		var link = "http://localhost:5000/employee/email/" + user["email"];
		axios
			.get(link)
			.then((emp) => {
				setEmployee(emp.data.message);
				console.log("emp", emp.data.message);
				link = "http://localhost:5000/team/" + emp.data.message["teamID"];
				axios
					.get(link)
					.then((res) => {
						console.log("team", res.data);
						setTeam(res.data);
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));

		axios
			.get("http://localhost:5000/employee/")
			.then((res) => {
				console.log(res.data);
				var dict = {};
				res.data.forEach((emp) => {
					dict[emp._id] = emp.name;
				});
				setEmpdict(dict);
				console.log("emp_dict", dict);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="Home">
			<div className="user" style={{ textAlign: "center" }}>
				<h1>Welcome {user.given_name}</h1>
				<img src={user.picture} style={{ borderRadius: "50%" }} alt="profile pic" />
				<p>Email: {employee.email}</p>
				<p>Role: {employee.Role}</p>
				<p>Post: {employee.Post}</p>
				<p>Salary: Rs.{employee.Salary}</p>
				<p>Attendance: {employee.attendance}</p>
				<p>Your Team: {team.name}</p>
				<p>
					Members:{" "}
					{team["members"].map((eid) => {
						return empdict[eid] + ", ";
					})}
				</p>

				{/* <JSONPretty data={user} /> */}
			</div>
		</div>
	);
};
