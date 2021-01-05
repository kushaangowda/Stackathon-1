import React, { useState } from "react";
import { useParams } from "react-router-dom";

export const EditEmployee = ({ handleEdit, employees }) => {
	let params = useParams();
	const id = params.id;

	const emp = employees.filter((employee) => {
		return employee.id == id;
	});

	const [name, setName] = useState(emp[0].name);
	const [email, setEmail] = useState(emp[0].email);
	const [teamID, setTeamID] = useState(emp[0].teamID);
	const [role, setRole] = useState(emp[0].role);
	const [post, setPost] = useState(emp[0].post);
	const [salary, setSalary] = useState(emp[0].salary);

	const handleNameChange = (e) => {
		var newName = e.target.value;
		setName(newName);
		console.log(name);
		console.log(emp);
	};
	const handleEmailChange = (e) => {
		var newEmail = e.target.value;
		setEmail(newEmail);
	};
	const handleTeamIDChange = (e) => {
		var newName = e.target.value;
		setTeamID(newName);
	};
	const handleRoleChange = (e) => {
		var newName = e.target.value;
		setRole(newName);
	};
	const handlePostChange = (e) => {
		var newName = e.target.value;
		setPost(newName);
	};
	const handleSalaryChange = (e) => {
		var newName = e.target.value;
		setSalary(newName);
	};
	const handleSubmit = (e) => {
		var employee = {
			id: emp[0].id,
			email: email,
			name: name,
			teamID: teamID,
			role: role,
			post: post,
			salary: salary,
			attendance: emp[0].attendance,
		};
		console.log(employee);
		handleEdit(employee);
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<p>
				Name: <input type="text" onChange={(e) => handleNameChange(e)} value={name} />
			</p>
			<p>
				Email: <input type="text" onChange={(e) => handleEmailChange(e)} value={email} />
			</p>
			<p>
				TeamID: <input type="text" onChange={(e) => handleTeamIDChange(e)} value={teamID} />
			</p>
			<p>
				Role: <input type="text" onChange={(e) => handleRoleChange(e)} value={role} />
			</p>
			<p>
				Post: <input type="text" onChange={(e) => handlePostChange(e)} value={post} />
			</p>
			<p>
				Salary: <input type="number" onChange={(e) => handleSalaryChange(e)} value={salary} />
			</p>
			<button type="submit">Update Employee</button>
		</form>
	);
};
