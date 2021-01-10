import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

export const EditEmployee = ({ handleEdit, employees }) => {
	let history = useHistory();

	let params = useParams();
	const id = params.id;

	const emp = employees.filter((employee) => {
		return employee._id == id;
	});

	const [name, setName] = useState(emp[0].name);
	const [email, setEmail] = useState(emp[0].email);
	const [teamID, setTeamID] = useState(emp[0].teamID);
	const [role, setRole] = useState(emp[0].Role);
	const [post, setPost] = useState(emp[0].Post);
	const [salary, setSalary] = useState(emp[0].Salary);

	const handleNameChange = (value) => {
		setName(value);
	};
	const handleEmailChange = (value) => {
		setEmail(value);
	};
	const handleRoleChange = (value) => {
		setRole(value);
	};
	const handlePostChange = (value) => {
		setPost(value);
	};
	const handleSalaryChange = (value) => {
		setSalary(value);
	};
	const handleSubmit = () => {
		var employee = {
			id: emp[0]._id,
			email: email,
			name: name,
			teamID: teamID,
			Role: role,
			Post: post,
			Salary: salary,
			attendance: emp[0].attendance,
		};
		console.log(employee);
		handleEdit(employee);
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
						onChange={(e) => handleEmailChange(e.target.value)}
						value={email}
					/>
				</div>
				<div className="form-group">
					<label for="exampleInputEmail2">Name</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail2"
						aria-describedby="emailHelp"
						onChange={(e) => handleNameChange(e.target.value)}
						value={name}
					/>
				</div>
				<div className="form-group">
					<label for="exampleFormControlSelect1">Role</label>
					<select className="form-control" id="exampleFormControlSelect1" onChange={(e) => handleRoleChange(e.target.value)} value={role}>
						<option value="admin">Admin</option>
						<option value="employee">Employee</option>
					</select>
				</div>
				<div className="form-group">
					<label for="exampleInputEmail5">Post</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail5"
						aria-describedby="emailHelp"
						onChange={(e) => handlePostChange(e.target.value)}
						value={post}
					/>
				</div>
				<div className="form-group">
					<label for="exampleInputEmail6">Salary</label>
					<input
						type="number"
						className="form-control"
						id="exampleInputEmail6"
						aria-describedby="emailHelp"
						onChange={(e) => handleSalaryChange(e.target.value)}
						value={salary}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Update Employee
				</button>
				<Link to="/employee" className="btn btn-primary ml-2">
					Cancel
				</Link>
			</form>
		</div>
	);
};
