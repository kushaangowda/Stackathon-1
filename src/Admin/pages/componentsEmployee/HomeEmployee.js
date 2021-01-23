import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import "../pages.css";

export const HomeEmployee = ({ employees, handleDelete, teamdict }) => {
	return (
		<div className="table-responsive">
			<h2 className="pageTitle">Manage Employees</h2>
			<div id="no-more-tables">
			<table className="table table-hover table-bordered">
				<caption>List of Employees</caption>

				<thead className="thead-dark">
					<tr>
						<th className="text-uppercase">email</th>
						<th className="text-uppercase">name</th>
						<th className="text-uppercase">team</th>
						<th className="text-uppercase">role</th>
						<th className="text-uppercase">post</th>
						<th className="text-uppercase">salary</th>
						<th className="text-uppercase">attendance</th>
						<th className="text-uppercase">edit</th>
						<th className="text-uppercase">delete</th>
					</tr>
				</thead>
				<tbody>
					{employees.map((employee) => {
						return (
							<tr key={employee[`_id`]}>
								<td data-title="EMAIL">{employee.email}</td>
								<td data-title="NAME">{employee.name}</td>
								<td data-title="TEAM">{teamdict[employee.teamID] || "N/A"}</td>
								<td data-title="ROLE">{employee.Role}</td>
								<td data-title="POST">{employee.Post}</td>
								<td data-title="SALARY">{employee.Salary}</td>
								<td data-title="ATTENDANCE">{employee.attendance}</td>
								<td data-title="EDIT">
									<Link to={"/employee/edit/" + employee._id} className="btn btn-warning">
										Edit <FaIcons.FaEdit />
									</Link>
								</td>
								<td className="deleteIcon" data-title="DELETE">
									<button
										className="btn btn-danger"
										onClick={() => {
											handleDelete(employee._id);
										}}
									>
										Delete <RiIcons.RiDeleteBin5Fill />
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			</div>
		</div>
	);
};
