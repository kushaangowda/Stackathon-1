import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const AddEmployee = ({ handleAdd }) => {
	let history = useHistory();

	const [employee, setEmployee] = useState({
		email: "",
		name: "",
		teamID: null,
		role: "",
		post: "",
		salary: 0,
	});

	const handleFormChange = (type, value) => {
		var newEmployee = employee;
		newEmployee[`${type}`] = value;
		setEmployee(newEmployee);
		console.log(employee);
	};

	const handleSubmit = () => {
		handleAdd(employee);
		history.push("/employee");
	};

	return (
		<div>
			<form className="addEmployee" onSubmit={handleSubmit}>
				<div className="form-group">
					<label for="exampleInputEmail1">Email address</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={(e) => handleFormChange("email", e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label for="exampleInputEmail2">Name</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail2"
						aria-describedby="emailHelp"
						onChange={(e) => handleFormChange("name", e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label for="exampleInputEmail3">TeamID</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail3"
						aria-describedby="emailHelp"
						onChange={(e) => handleFormChange("teamID", e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label for="exampleInputEmail4">Role</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail4"
						aria-describedby="emailHelp"
						onChange={(e) => handleFormChange("role", e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label for="exampleInputEmail5">Post</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail5"
						aria-describedby="emailHelp"
						onChange={(e) => handleFormChange("post", e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label for="exampleInputEmail6">Salary</label>
					<input
						type="number"
						className="form-control"
						id="exampleInputEmail6"
						aria-describedby="emailHelp"
						onChange={(e) => handleFormChange("salary", e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Add Employee
				</button>
			</form>
		</div>
	);
};
