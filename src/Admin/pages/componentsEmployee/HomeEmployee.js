import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

export const HomeEmployee = ({ employees, handleDelete }) => {
	return (
		<div className="table-responsive">
			<table className="table table-hover table-bordered">
				<caption>List of Employees</caption>
				<thead className="thead-dark">
					<tr>
						<th className="text-uppercase">email</th>
						<th className="text-uppercase">name</th>
						<th className="text-uppercase">teamID</th>
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
							<tr key={employee.id}>
								<td>{employee.email}</td>
								<td>{employee.name}</td>
								<td>{employee.teamID || "N/A"}</td>
								<td>{employee.role}</td>
								<td>{employee.post}</td>
								<td>{employee.salary}</td>
								<td>{employee.attendance}</td>
								<td>
									<Link to={"/employee/edit/" + employee.id} className="btn btn-warning">
										Edit <FaIcons.FaEdit />
									</Link>
								</td>
								<td className="deleteIcon">
									<button
										className="btn btn-danger"
										onClick={() => {
											handleDelete(employee.id);
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
	);
};
