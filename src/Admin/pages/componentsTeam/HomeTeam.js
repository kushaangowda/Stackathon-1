import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

export const HomeTeam = ({ teams, employees, handleDelete }) => {
	return (
		<div className="table-responsive">
			<table className="table table-hover table-bordered">
				<caption>List of Teams</caption>
				<thead className="thead-dark">
					<tr>
						<th className="text-uppercase">name</th>
						<th className="text-uppercase">members</th>
						<th className="text-uppercase">edit</th>
						<th className="text-uppercase">delete</th>
					</tr>
				</thead>
				<tbody>
					{teams.map((team) => {
						return (
							<tr key={team[`_id`]}>
								<td>{team.name}</td>
								<td>
									{team.members.map((member) => {
										return (
											employees.filter((emp) => {
												return emp._id == member;
											})[0]["name"] + ", "
										);
									})}
								</td>
								<td>
									<Link to={"/team/edit/" + team._id} className="btn btn-warning">
										Edit <FaIcons.FaEdit />
									</Link>
								</td>
								<td className="deleteIcon">
									<button
										className="btn btn-danger"
										onClick={() => {
											handleDelete(team._id);
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
