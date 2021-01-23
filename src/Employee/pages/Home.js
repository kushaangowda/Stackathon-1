import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import JSONPretty from "react-json-pretty";
import axios from "axios";
import createNotification from "../../Notification";

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
		var link = "https://api-stackathon.herokuapp.com/employee/email/" + user["email"];
		axios
			.get(link)
			.then((emp) => {
				setEmployee(emp.data.message);
				link = "https://api-stackathon.herokuapp.com/team/" + emp.data.message["teamID"];
				axios
					.get(link)
					.then((res) => {
						if (String(res.data.error) !== 'Cast to ObjectId failed for value "0" at path "_id" for model "team"') {
							setTeam(res.data);
							createNotification({
								title: " :(",
								message: "Something went wrong, Please try again later!",
								type: "danger"
							})
						}
					})
					.catch((err) => {
						createNotification({
							title: "",
							message: err.message,
							type: "warning",
							time: 1000

						})
						createNotification({
							title: " :(",
							message: "Something went wrong, Please try again later!",
							type: "danger"
						})
					});
				link = "http://api-stackathon.herokuapp.com/attendance/" + emp.data.message["_id"];
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

		axios
			.get("https://api-stackathon.herokuapp.com/employee/")
			.then((res) => {
				var dict = {};
				res.data.forEach((emp) => {
					dict[emp._id] = emp.name;
				});
				setEmpdict(dict);
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
		var link = "https://api-stackathon.herokuapp.com/employee/email/" + user["email"];
		axios
			.get(link)
			.then((emp) => {
				setEmployee(emp.data.message);
				link = "https://api-stackathon.herokuapp.com/team/" + emp.data.message["teamID"];
				axios
					.get(link)
					.then((res) => {
						setTeam(res.data);
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
		link = "https://api-stackathon.herokuapp.com/attendance/" + employee._id;
		axios
			.get(link)
			.then((res) => {
				setLastDate(res.data.attendance[res.data.attendance.length - 1]);
				const now = new Date;

				if (lastDate.slice(0, 15) === now.toString().slice(0, 15)) {
					setMarkAttendanceClickable(false)
				}
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));
	}

	const markAttendance = () => {
		console.log(employee._id);
		var link = "https://api-stackathon.herokuapp.com/attendance/" + employee._id + "/create";
		axios
			.get(link)
			.then((res) => {
				if (res.data.message === "This Employee is already present") {
					setMarkAttendanceClickable(false)
					createNotification({
						title: "Success",
						message: "Attendance for today successfully marked!",
						type: "success"
					})
				}
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
							<td>{lastDate.slice(0, 15)}</td>
						</tr>
						<tr>
							<td>Email</td>
							<td>{employee === undefined ? "-" : employee === undefined ? "-" : employee.email}</td>
						</tr>
						<tr>
							<td>Role</td>
							<td>{employee === undefined ? "-" : employee.Role}</td>
						</tr>
						<tr>
							<td>Post</td>
							<td>{employee === undefined ? "-" : employee.Post}</td>
						</tr>
						<tr>
							<td>Salary</td>
							<td>Rs. {employee === undefined ? "-" : employee.Salary}</td>
						</tr>
						<tr>
							<td>Attendance</td>
							<td>{employee === undefined ? "-" : employee.attendance}</td>
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
