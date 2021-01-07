import React, { useState, useEffect } from "react";
import { HomeEmployee } from "./componentsEmployee/HomeEmployee";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from "./componentsEmployee/Navbar";
import { AddEmployee } from "./componentsEmployee/AddEmployee";
import { EditEmployee } from "./componentsEmployee/EditEmployee";
import axios from "axios";
import "./employee.css";

function Employee() {
	const [employees, setEmployees] = useState([
		{ id: 1, email: "a@b.c", name: "a b", teamID: 1, role: "employee", post: "eng", salary: 1000, attendance: 10 },
		{ id: 2, email: "b@b.c", name: "b b", teamID: 2, role: "employee", post: "mkt", salary: 2000, attendance: 10 },
		{ id: 3, email: "c@b.c", name: "c b", teamID: 3, role: "employee", post: "soc", salary: 1000, attendance: 100 },
		{ id: 4, email: "d@b.c", name: "d b", teamID: 2, role: "employee", post: "eng", salary: 3000, attendance: 20 },
	]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/employee/")
			.then((res) => {
				setEmployees(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleDelete = (id) => {
		var message = "Are you sure you want to delete this employee??\nDetails of this employee will be erased permanently.\nThis action cannot be undone";
		var check = window.confirm(message);
		if (check) {
			var newEmployees = employees.filter((employee) => {
				return employee._id != id;
			});
			console.log("yo", newEmployees);
			setEmployees(newEmployees);
			var link = "http://localhost:5000/employee/" + id;
			axios
				.delete(link)
				.then((res) => console.log(res.data))
				.catch((err) => console.log(err));
		}
	};

	const handleAdd = (employee) => {
		employee.attendance = 0;
		var newEmployees = [employee, ...employees];
		setEmployees(newEmployees);
		axios
			.post("http://localhost:5000/employee/add", employee)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	};

	const handleEdit = (employee) => {
		var newEmployees1 = employees.filter((employeei) => {
			return employeei._id != employee.id;
		});
		var newEmployees = [employee, ...newEmployees1];
		setEmployees(newEmployees);
		var link = "http://localhost:5000/employee/update/" + employee.id;
		axios
			.put(link, employee)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	};

	return (
		<div className="employee container-fluid">
			<Router>
				<Navbar />
				<Route path="/employee" exact component={() => <HomeEmployee employees={employees} handleDelete={handleDelete} />} />
				<Route path="/employee/add" exact component={() => <AddEmployee handleAdd={handleAdd} />} />
				<Route path="/employee/edit/:id" exact component={() => <EditEmployee handleEdit={handleEdit} employees={employees} />} />
			</Router>
		</div>
	);
}

export default Employee;
