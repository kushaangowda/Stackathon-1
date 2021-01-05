import React from "react";

export const HomeEmployee = ({ employees, handleDelete }) => {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>email</th>
						<th>name</th>
						<th>teamID</th>
						<th>role</th>
						<th>post</th>
						<th>salary</th>
						<th>attendance</th>
						<th>delete</th>
					</tr>
				</thead>
				<tbody>
					{employees.map((employee) => {
						return (
							<tr key={employee.id}>
								<td>{employee.email}</td>
								<td>{employee.name}</td>
								<td>{employee.teamID}</td>
								<td>{employee.role}</td>
								<td>{employee.post}</td>
								<td>{employee.salary}</td>
								<td>{employee.attendance}</td>
								<td>
									<button
										onClick={() => {
											handleDelete(employee.id);
										}}
									>
										Delete
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
