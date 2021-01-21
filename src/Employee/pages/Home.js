import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import JSONPretty from "react-json-pretty";
import axios from "axios";

export const Home = () => {
	const { user } = useAuth0();
	const [employee, setEmployee] = useState({
		_id: "",
		email: "",
		Role: "",
		Post: "",
		Salary: "",
		attendance: 0,
	});
	const [team, setTeam] = useState({
		name: "N/A",
		members: ["N/A"],
	});
	const [empdict, setEmpdict] = useState({});
	const [reload, setReload] = useState(false);
	const [lastDate, setLastDate] = useState("");
	const [markAttendanceClickable, setMarkAttendanceClickable] = useState(true);

	useEffect(() => {
		var link = "http://localhost:5000/employee/email/" + user["email"];
		axios
			.get(link)
			.then((emp) => {
				setEmployee(emp.data.message);
				link = "http://localhost:5000/team/" + emp.data.message["teamID"];
				axios
					.get(link)
					.then((res) => {
						if (String(res.data.error) !== 'Cast to ObjectId failed for value "0" at path "_id" for model "team"') setTeam(res.data);
					})
					.catch((err) => console.log(err));
				link = "http://localhost:5000/attendance/" + emp.data.message["_id"];
				axios
					.get(link)
					.then((res) => {
						if (res.data.attendance.length > 0) {
							setLastDate(res.data.attendance[res.data.attendance.length - 1]);
							if (!lastDate)
								setReload(true)
							const now = new Date;

							if (lastDate.slice(0, 15) === now.toString().slice(0, 15)) {
								setMarkAttendanceClickable(false)
							}
						}
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));

		axios
			.get("http://localhost:5000/employee/")
			.then((res) => {
				var dict = {};
				res.data.forEach((emp) => {
					dict[emp._id] = emp.name;
				});
				setEmpdict(dict);
			})
			.catch((err) => console.log(err));
	}, []);

	if (reload) {
		setReload(false);
		var link = "http://localhost:5000/employee/email/" + user["email"];
		axios
			.get(link)
			.then((emp) => {
				setEmployee(emp.data.message);
				link = "http://localhost:5000/team/" + emp.data.message["teamID"];
				axios
					.get(link)
					.then((res) => {
						setTeam(res.data);
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
		link = "http://localhost:5000/attendance/" + employee._id;
		axios
			.get(link)
			.then((res) => {
				setLastDate(res.data.attendance[res.data.attendance.length - 1]);
				const now = new Date;

				if (lastDate.slice(0, 15) === now.toString().slice(0, 15)) {
					setMarkAttendanceClickable(false)
				}
			})
			.catch((err) => console.log(err));
	}

	const markAttendance = () => {
		console.log(employee._id);
		var link = "http://localhost:5000/attendance/" + employee._id + "/create";
		axios
			.get(link)
			.then((res) => {
				if (res.data.message === "This Employee is already present")
					setMarkAttendanceClickable(false)
				setReload(true);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="Home container">
			<div className="user" style={{ textAlign: "center" }}>
				<h1>
					<strong>Welcome {user.given_name}</strong>
				</h1>
				<img src={user.picture} style={{ borderRadius: "50%", marginBottom: "10px" }} alt="profile pic" referrerpolicy="no-referrer" />
				<table className="table table-hover table-bordered">
					<caption>General Stuff</caption>
					<thead className="thead-dark">
						<tr>
							<th className="text-uppercase">Key</th>
							<th className="text-uppercase">Value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Mark Attendance</td>
							{markAttendanceClickable ?
								<td>
									<button className="btn btn-primary" onClick={markAttendance}>
										Mark Attendance
								</button>
								</td> :
								<td>
									<button className="btn btn-primary disabled">
										Mark Attendance
								</button>
								</td>}

						</tr>
						<tr>
							<td>Last Attendance Registered on</td>
							<td>{lastDate}</td>
						</tr>
						<tr>
							<td>Email</td>
							<td>{employee.email}</td>
						</tr>
						<tr>
							<td>Role</td>
							<td>{employee.Role}</td>
						</tr>
						<tr>
							<td>Post</td>
							<td>{employee.Post}</td>
						</tr>
						<tr>
							<td>Salary</td>
							<td>Rs. {employee.Salary}</td>
						</tr>
						<tr>
							<td>Attendance</td>
							<td>{employee.attendance}</td>
						</tr>

						{team["name"] === undefined ||
							<tr>
								<td>Your Team</td>
								<td>{team.name}</td>
							</tr>}


						{team["members"] === undefined ||
							<tr>
								<td>Members</td>
								<td>
									{team["members"].map((eid) => {
										return empdict[eid] + ", ";
									})}
								</td>
							</tr>}

					</tbody>
				</table>

				{/* <JSONPretty data={user} /> */}
			</div>
		</div>
	);
};
