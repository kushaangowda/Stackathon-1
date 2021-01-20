import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import JSONPretty from "react-json-pretty";

export const Home = ({ addEmployeeRequest }) => {
	const { user } = useAuth0();

	const [emp] = useState({
		name: user["name"],
		sub: user["sub"],
		picture: user["picture"],
		email: user["email"],
	});

	return (
		<div>
			<h2 className="pageTitle">User Not Found</h2>
			<h5 style={{ textAlign: "center" }}>
				Looks like your Email ID has not been verified by the admin. <br />
				Please verify your details given below, and send a request to the admin for verification
			</h5>
			<br />
			<table className="table table-hover table-bordered">
				<caption>General Details</caption>
				<thead className="thead-dark">
					<tr>
						<th className="text-uppercase">Key</th>
						<th className="text-uppercase">Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Name</td>
						<td>{user["name"]}</td>
					</tr>
					<tr>
						<td>Email</td>
						<td>{user["email"]}</td>
					</tr>
					<tr>
						<td>Send Request</td>
						<td>
							<button className="btn btn-primary" onClick={() => addEmployeeRequest(emp)}>
								Send Request
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			{/*<JSONPretty data={user} />*/}
		</div>
	);
};
