import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

export const Home = ({ requests, handleDelete }) => {
	return (
		<div className="table-responsive">
			<h2 className="pageTitle">Manage Your Payroll Requests</h2>
			<table className="table table-hover table-bordered">
				<caption>List of Documents</caption>
				<thead className="thead-dark">
					<tr>
						<th className="">S.No</th>
						<th className="text-uppercase">Description</th>
						<th className="text-uppercase">edit</th>
						<th className="text-uppercase">delete</th>
						<th className="text-uppercase">Status</th>
					</tr>
				</thead>
				<tbody>
					{requests.map((request) => {
						return (
							<tr key={request[`_id`]}>
								<td>{requests.indexOf(request) + 1}</td>
								<td>{request.description}</td>
								<td>
									<Link to={"/payroll/edit/" + request._id} className="btn btn-warning">
										Edit <FaIcons.FaEdit />
									</Link>
								</td>
								<td className="deleteIcon">
									<button
										className="btn btn-danger"
										onClick={() => {
											handleDelete(request._id);
										}}
									>
										Delete <RiIcons.RiDeleteBin5Fill />
									</button>
								</td>
								<td>
									<p className={"btn btn-" + (request.Status == "Pending" ? "warning" : "success")}>{request.Status}</p>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
