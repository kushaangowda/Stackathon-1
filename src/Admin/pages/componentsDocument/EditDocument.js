import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

export const EditDocument = ({ handleEdit, documents }) => {
	let history = useHistory();

	let params = useParams();
	const id = params.id;

	const doc = documents.filter((doc1) => {
		return String(doc1._id) === String(id);
	});

	const [name, setName] = useState(doc[0].name);
	const [link, setLink] = useState(doc[0].link);

	const handleNameChange = (value) => {
		setName(value);
	};
	const handleLinkChange = (value) => {
		setLink(value);
	};
	const handleSubmit = () => {
		var doc1 = {
			id: doc[0]._id,
			name: name,
			link: link,
		};
		console.log(doc1);
		handleEdit(doc1);
		history.push("/docs");
	};

	return (
		<div>
			<form className="addEmployee" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="exampleInputEmail2">Name</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail2"
						aria-describedby="emailHelp"
						onChange={(e) => handleNameChange(e.target.value)}
						value={name}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Link</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={(e) => handleLinkChange(e.target.value)}
						value={link}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Update Document
				</button>
				<Link to="/docs" className="btn btn-primary ml-2">
					Cancel
				</Link>
			</form>
		</div>
	);
};
