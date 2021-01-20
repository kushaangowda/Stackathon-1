import React, { useState } from "react";
import { Card } from "./componentsVerify/Card";

export const Verify = () => {
	const [emps, setEmps] = useState([
		{ name: "kushaan", email: "kush@gmail.com", picture: "https://picsum.photos/200", sub: "abc123def456" },
		{ name: "test1", email: "test1@gmail.com", picture: "https://picsum.photos/200", sub: "abc1212def456" },
		{ name: "test2", email: "test2@gmail.com", picture: "https://picsum.photos/200", sub: "abc12312def456" },
	]);

	const verify = (id) => {
		console.log(id);
	};

	return (
		<div>
			<h2 className="pageTitle">Verify page</h2>
			<div className="row">
				{emps.map((emp) => {
					return <Card emp={emp} key={emp.sub} verify={verify} />;
				})}
			</div>
		</div>
	);
};
