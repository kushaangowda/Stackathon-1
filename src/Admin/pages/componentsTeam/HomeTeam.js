import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import "../pages.css";

export const HomeTeam = ({ teams, empdict, handleDelete }) => {
	return (
		<div className="table-responsive">
			<h2 className="pageTitle">Manage Teams</h2>
			<div id="no-more-tables">
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
									<td data-title="NAME">{team.name}</td>
									<td data-title="MEMBERS">
										{team.members.map((member) => {
											return empdict[member] + ", ";
										})}
									</td>
									<td data-title="EDIT">
										<Link to={"/team/edit/" + team._id} className="btn btn-warning">
											Edit <FaIcons.FaEdit />
										</Link>
									</td>
									<td className="deleteIcon" data-title="DELETE">
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
		</div>
	);
};
