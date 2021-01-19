import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export const AddEmployee = ({ handleAdd }) => {
	let history = useHistory();

	const [employee, setEmployee] = useState({
		email: "",
		name: "",
		Role: "admin",
		Post: "",
		Salary: 0,
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
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={(e) => handleFormChange("email", e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputEmail2">Name</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail2"
						aria-describedby="emailHelp"
						onChange={(e) => handleFormChange("name", e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleFormControlSelect1">Role</label>
					<select className="form-control" id="exampleFormControlSelect1" onChange={(e) => handleFormChange("Role", e.target.value)}>
						<option value="admin">Admin</option>
						<option value="employee">Employee</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputEmail5">Post</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail5"
						aria-describedby="emailHelp"
						onChange={(e) => handleFormChange("Post", e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputEmail6">Salary</label>
					<input
						type="number"
						className="form-control"
						id="exampleInputEmail6"
						aria-describedby="emailHelp"
						onChange={(e) => handleFormChange("Salary", e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Add Employee
				</button>
				<Link to="/employee" className="btn btn-primary ml-2">
					Cancel
				</Link>
			</form>
		</div>
	);
};
