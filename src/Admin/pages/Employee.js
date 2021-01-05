import React, { useState } from "react";
import { HomeEmployee } from "./componentsEmployee/HomeEmployee";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from "./componentsEmployee/Navbar";
import { AddEmployee } from "./componentsEmployee/AddEmployee";
import { EditEmployee } from "./componentsEmployee/EditEmployee";
import "./employee.css";

function Employee() {
	const [employees, setEmployees] = useState([
		{ id: 1, email: "a@b.c", name: "a b", teamID: 1, role: "emp", post: "eng", salary: 1000, attendance: 10 },
		{ id: 2, email: "b@b.c", name: "b b", teamID: 2, role: "emp", post: "mkt", salary: 2000, attendance: 10 },
		{ id: 3, email: "c@b.c", name: "c b", teamID: 3, role: "emp", post: "soc", salary: 1000, attendance: 100 },
		{ id: 4, email: "d@b.c", name: "d b", teamID: 2, role: "emp", post: "eng", salary: 3000, attendance: 20 },
	]);

	const handleDelete = (id) => {
		var newEmployees = employees.filter((employee) => {
			return employee.id != id;
		});
		console.log("yo", newEmployees);
		setEmployees(newEmployees);
	};

	const handleAdd = (employee, id = Date.now()) => {
		employee.id = id;
		employee.attendance = 0;
		var newEmployees = [employee, ...employees];
		setEmployees(newEmployees);
	};

	const handleEdit = (employee) => {
		var newEmployees1 = employees.filter((employeei) => {
			return employeei.id != employee.id;
		});
		var newEmployees = [employee, ...newEmployees1];
		setEmployees(newEmployees);
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
