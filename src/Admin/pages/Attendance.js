import React, { useEffect, useState } from "react";
import axios from "axios";
// import CustomModal from "../components/CustomModal";
// import { RiAirplayLine } from "react-icons/ri";

function Home() {
	const [employees, setEmployes] = useState([]);
	const [isError, setIsError] = useState(false);
	const [empDetails, setEmpDetails] = useState();
	const [currdata, setcurdata] = useState();
	const host = "http://localhost:5000/";

	const payrollAccept = async (_id, id) => {
		axios.get(host + "payrollrequest/" + _id + "/accept");
		ChangePayrollData(id);
	};

	const payrollReject = async (_id, id) => {
		axios.get(host + "payrollrequest/" + _id + "/reject");
		ChangePayrollData(id);
	};

	const leaveAccept = async (_id, id) => {
		axios.get(host + "leaverequest/" + _id + "/accept");
		ChangeLeaveData(id);
	};

	const leaveReject = async (_id, id) => {
		axios.get(host + "leaverequest/" + _id + "/reject");
		ChangeLeaveData(id);
	};

	const ChangePayrollData = async (id) => {
		axios.get(host + "payrollrequest/" + id).then((res) => {
			if (Number(res["data"].length) === 0) {
				setcurdata(
					<tr>
						<td>No Pending Requests</td>
						<td>-</td>
						<td>-</td>
					</tr>
				);
			} else {
				let temp = [];
				temp.push(
					res["data"].map(({ description, Status, _id }) => {
						if (String(Status) === "Pending") {
							return (
								<tr>
									<td>{description}</td>
									<td>
										<button onClick={() => payrollAccept(_id, id)} type="button" className="btn btn-success">
											Accept
										</button>
									</td>
									<td>
										<button onClick={() => payrollReject(_id, id)} type="button" className="btn btn-danger">
											Reject
										</button>
									</td>
								</tr>
							);
						} else if (String(Status) === "Accepted") {
							return (
								<tr>
									<td>{description}</td>
									<td>Accepted</td>
									<td>-</td>
								</tr>
							);
						} else {
							return (
								<tr>
									<td>{description}</td>
									<td>-</td>
									<td>Rejected</td>
								</tr>
							);
						}
					})
				);
				setcurdata(temp);
			}
		});
	};

	const ChangeLeaveData = async (id) => {
		axios.get(host + "leaverequest/" + id).then((res) => {
			if (Number(res["data"].length) === 0) {
				setcurdata(
					<tr>
						<td>No Pending Requests</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
					</tr>
				);
			} else {
				let temp = [];
				temp.push(
					res["data"].map(({ duration, start, description, Status, _id }) => {
						if (String(Status) === "Pending") {
							return (
								<tr>
									<td>{start.slice(0, 10)}</td>
									<td>{duration}</td>
									<td>{description}</td>
									<td>
										<button onClick={() => leaveAccept(_id, id)} type="button" className="btn btn-success">
											Accept
										</button>
									</td>
									<td>
										<button onClick={() => leaveReject(_id, id)} type="button" className="btn btn-danger">
											Reject
										</button>
									</td>
								</tr>
							);
						} else if (String(Status) === "Accepted") {
							return (
								<tr>
									<td>{start.slice(0, 10)}</td>
									<td>{duration}</td>
									<td>{description}</td>
									<td>Accepted</td>
									<td>-</td>
								</tr>
							);
						} else {
							return (
								<tr>
									<td>{start.slice(0, 10)}</td>
									<td>{duration}</td>
									<td>{description}</td>
									<td>-</td>
									<td>Rejected</td>
								</tr>
							);
						}
					})
				);
				setcurdata(temp);
			}
		});
	};

	useEffect(() => {
		const fetchEmployees = async () => {
			axios
				.get(host + "employee")
				.then((emp) => {
					console.log(emp["data"]);
					const fetchedEmployees = emp["data"];
					let temp = [];
					temp.push(
						fetchedEmployees.map(({ _id, name, email, attendance, Salary }) => {
							return (
								<tr key={_id}>
									<td>{name}</td>
									<td>{email}</td>
									<td>{attendance}</td>
									<td>{Salary}</td>
									{/* <td><button className="btn btn-warning" onClick={() => handleClick(name, _id)}>Check</button></td> */}
									<td>
										<button
											onClick={() => ChangeLeaveData(_id)}
											type="button"
											className="btn btn-primary"
											data-toggle="modal"
											data-target="#exampleModal2"
										>
											Check
										</button>{" "}
									</td>
									<td>
										<button
											onClick={() => ChangePayrollData(_id)}
											type="button"
											className="btn btn-primary"
											data-toggle="modal"
											data-target="#exampleModal1"
										>
											Check
										</button>{" "}
									</td>
								</tr>
							);
						})
					);
					setEmployes(temp);
				})
				.catch((err) => {
					console.log(err);
					setIsError(true);
				});
		};
		fetchEmployees();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (isError) {
			setEmpDetails(<h1>Something went wrong</h1>);
		} else {
			setEmpDetails(employees);
		}
	}, [isError, employees]);
	return (
		<div>
			<h2 className="pageTitle">Leave and Payroll Requests</h2>
			<table className="table table-hover table-bordered mt-5">
				<caption>List of Employees</caption>
				<thead className="thead-dark">
					<tr>
						<th className="text-uppercase">name</th>
						<th className="text-uppercase">email</th>
						<th className="text-uppercase">attendance</th>
						<th className="text-uppercase">Salary</th>
						<th className="text-uppercase">Leave Requests</th>
						<th className="text-uppercase">Payroll Requests</th>
					</tr>
				</thead>
				<tbody>{empDetails}</tbody>
			</table>
			<div
				className="modal fade bd-example-modal-xl"
				id="exampleModal1"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-xl " role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Payroll Requests
							</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<table className="table table-hover table-bordered mt-5">
								<thead className="thead-dark">
									<tr>
										<th className="text-uppercase">Description</th>
										<th className="text-uppercase">Accept</th>
										<th className="text-uppercase">Reject</th>
									</tr>
								</thead>
								<tbody>{currdata}</tbody>
							</table>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				className="modal fade bd-example-modal-xl"
				id="exampleModal2"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-xl " role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Leave Requests
							</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<table className="table table-hover table-bordered mt-5">
								<thead className="thead-dark">
									<tr>
										<th className="text-uppercase">Start</th>
										<th className="text-uppercase">Duration</th>
										<th className="text-uppercase">Description</th>
										<th className="text-uppercase">Accept</th>
										<th className="text-uppercase">Reject</th>
									</tr>
								</thead>
								<tbody>{currdata}</tbody>
							</table>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
