import React, { useEffect, useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function Payroll() {
	const [employees, setEmployes] = useState([]);
	const [isError, setIsError] = useState(false);
	const [empDetails, setEmpDetails] = useState();
	const [currdata, setcurdata] = useState();
	const host = "http://api-stackathon.herokuapp.com/";

	const Accept = async (_id, id) => {
		axios.get(host + "payrollrequest/" + _id + "/accept");
		ChangeData(id);
	};

	const Reject = async (_id, id) => {
		axios.get(host + "payrollrequest/" + _id + "/reject");
		ChangeData(id);
	};

	const ChangeData = async (id) => {
		axios.get(host + "payrollrequest/" + id).then((res) => {
			console.log('res', res);
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
										<button onClick={() => Accept(_id, id)} type="button" className="btn btn-success">
											Accept
										</button>
									</td>
									<td>
										<button onClick={() => Reject(_id, id)} type="button" className="btn btn-danger">
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

	useEffect(() => {
		const fetchEmployees = async () => {
			axios
				.get(host + "employee")
				.then((emp) => {
					console.log(emp["data"]);
					const fetchedEmployees = emp["data"];
					let temp = [];
					temp.push(
						fetchedEmployees.map(({ _id, name, email, Salary }) => {
							return (
								<tr key={_id}>
									<td>{name}</td>
									<td>{email}</td>
									<td>{Salary}</td>
									<td>
										<button
											onClick={() => ChangeData(_id)}
											type="button"
											className="btn btn-primary"
											data-toggle="modal"
											data-target="#exampleModal"
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
		console.log("FETCHING...")
		// eslint-disable-next-line
	}, [])


	useEffect(() => {
		if (isError) {
			setEmpDetails(<h1>Something went wrong</h1>);
		} else {
			setEmpDetails(employees);
		}
	}, [isError, employees]);
	return (
		<>
			<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Requests
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
			<span style={{ fontSize: 50, marginLeft: 100 }}>Payroll Information</span>
			<table className="table table-hover table-bordered mt-5">
				<caption>List of Employees</caption>
				<thead className="thead-dark">
					<tr>
						<th className="text-uppercase">name</th>
						<th className="text-uppercase">email</th>
						<th className="text-uppercase">salary</th>
						<th className="text-uppercase">Payroll Requests</th>
					</tr>
				</thead>
				<tbody>{empDetails}</tbody>
			</table>
		</>
	);
}

export default Payroll;
