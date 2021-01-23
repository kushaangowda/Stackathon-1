import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import "../pages.css";

export const HomeDocument = ({ documents, handleDelete }) => {
	return (
		<div className="table-responsive">
			<h2 className="pageTitle">Manage Documents</h2>
			<div id="no-more-tables">
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
									<td data-title="NAME">{document1.name}</td>
									<td data-title="LINK">
										<a href={document1.link} rel="noreferrer" target="_blank">
											{document1.link}
										</a>
									</td>
									<td data-title="EDIT">
										<Link to={"/docs/edit/" + document1._id} className="btn btn-warning">
											Edit <FaIcons.FaEdit />
										</Link>
									</td>
									<td className="deleteIcon" data-title="DELETE">
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
		</div>
	);
};
