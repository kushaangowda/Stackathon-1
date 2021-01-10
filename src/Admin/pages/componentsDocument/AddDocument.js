import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export const AddDocument = ({ handleAdd }) => {
	let history = useHistory();

	const [doc, setDoc] = useState({
		name: "",
		link: "",
	});

	const handleFormChange = (type, value) => {
		var newDoc = doc;
		newDoc[`${type}`] = value;
		setDoc(newDoc);
		console.log(doc);
	};

	const handleSubmit = () => {
		handleAdd(doc);
		history.push("/docs");
	};

	return (
		<div>
			<form className="addEmployee" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Name</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={(e) => handleFormChange("name", e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputEmail2">Link</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail2"
						aria-describedby="emailHelp"
						onChange={(e) => handleFormChange("link", e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Add Document
				</button>
				<Link to="/docs" className="btn btn-primary ml-2">
					Cancel
				</Link>
			</form>
		</div>
	);
};
