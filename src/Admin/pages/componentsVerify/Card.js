import React, { useState } from "react";
import createNotification from "../../../Notification";

export const Card = ({ emp, verify, reject }) => {
	const [employee, setEmployee] = useState({
		email: emp["email"],
		name: emp["name"],
		Role: "employee",
		sub: `${emp.sub}`,
		Post: "",
		Salary: 0,
		attendance: 0,
		teamID: "",
	});

	const handleFormChange = (type, value) => {
		var newEmp = employee;
		newEmp[`${type}`] = value;
		setEmployee(newEmp);
	};

	return (
		<div className="col-sm-6 col-lg-3 mb-4">
			<div className="card" style={{ textAlign: "center" }}>
				<img src={emp["picture"]} alt="profile image" className="card-img-top" />
				<div className="card-body">
					<h5 className="card-title">{emp["name"]}</h5>
					<p className="card-text">{emp["email"]}</p>
					<form>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-2">
									<label htmlFor="exampleInputPassword1">Salary</label>
								</div>
								<div className="col-sm-10">
									<input
										type="number"
										className="form-control"
										id="exampleInputPassword1"
										placeholder="10000"
										required
										onChange={(e) => handleFormChange("Salary", e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-2">
									<label htmlFor="exampleInputPassword2">Post</label>
								</div>
								<div className="col-sm-10">
									<input
										type="text"
										className="form-control"
										id="exampleInputPassword2"
										placeholder="Engineer"
										required
										onChange={(e) => handleFormChange("Post", e.target.value)}
									/>
								</div>
							</div>
						</div>
						<button
							className="btn btn-danger mr-4"
							onClick={() => {
								reject(emp["sub"]);
								createNotification({
									message: "Rejected the selected employee",
									type: "danger",
								});
							}}
						>
							Reject
						</button>
						<button
							className="btn btn-success ml-4"
							type="submit"
							onClick={(e) => {
								e.preventDefault();
								if (employee.Salary === 0) {
									createNotification({
										message: "Please specify the salary of the employee!!",
										type: "warning",
										time: 3000,
										position: "top-center",
									});
								} else if (employee.Post === "") {
									createNotification({
										message: "Please specify the post of the employee!!",
										type: "warning",
										time: 3000,
										position: "top-center",
									});
								} else {
									createNotification({
										message: "Accepting employee!!",
										type: "info",
										time: 3000,
									});
									verify(emp, employee);
								}
							}}
						>
							Verify
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
