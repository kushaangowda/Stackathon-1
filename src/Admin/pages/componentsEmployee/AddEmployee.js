import React, { useState } from "react";

export const AddEmployee = ({ handleAdd }) => {
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
	};

	return (
		<form onSubmit={handleSubmit}>
			<p>
				Email: <input type="text" onChange={(e) => handleFormChange("email", e.target.value)} />
			</p>
			<p>
				Name: <input type="text" onChange={(e) => handleFormChange("name", e.target.value)} />
			</p>
			<p>
				TeamID: <input type="text" onChange={(e) => handleFormChange("teamID", e.target.value)} />
			</p>
			<p>
				Role: <input type="text" onChange={(e) => handleFormChange("role", e.target.value)} />
			</p>
			<p>
				Post: <input type="text" onChange={(e) => handleFormChange("post", e.target.value)} />
			</p>
			<p>
				Salary: <input type="number" onChange={(e) => handleFormChange("salary", e.target.value)} />
			</p>
			<button type="submit">Add Employee</button>
		</form>
	);
};
