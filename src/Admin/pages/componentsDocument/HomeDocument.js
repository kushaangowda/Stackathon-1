import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

export const HomeDocument = ({ documents, handleDelete }) => {
	return (
		<div className="table-responsive">
			<h2 className="pageTitle">Manage Documents</h2>
			<table className="table table-hover table-bordered">
				<caption>List of Documents</caption>
				<thead className="thead-dark">
					<tr>
						<th className="text-uppercase">name</th>
						<th className="text-uppercase">link</th>
						<th className="text-uppercase">edit</th>
						<th className="text-uppercase">delete</th>
					</tr>
				</thead>
				<tbody>
					{documents.map((document1) => {
						return (
							<tr key={document1[`_id`]}>
								<td>{document1.name}</td>
								<td>
									<a href={document1.link} target="_blank">
										{document1.link}
									</a>
								</td>
								<td>
									<Link to={"/docs/edit/" + document1._id} className="btn btn-warning">
										Edit <FaIcons.FaEdit />
									</Link>
								</td>
								<td className="deleteIcon">
									<button
										className="btn btn-danger"
										onClick={() => {
											handleDelete(document1._id);
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
