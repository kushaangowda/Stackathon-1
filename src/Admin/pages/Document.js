import React, { useState, useEffect } from "react";
import { HomeDocument } from "./componentsDocument/HomeDocument";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from "./componentsDocument/Navbar";
import { AddDocument } from "./componentsDocument/AddDocument";
import { EditDocument } from "./componentsDocument/EditDocument";
import axios from "axios";

function Document() {
	const [documents, setDocuments] = useState([]);

	const [reload, setReload] = useState(false);

	useEffect(() => {
		axios
			.get("https://api-stackathon.herokuapp.com/document/")
			.then((res) => {
				setDocuments(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	if (reload) {
		setReload(false);
		axios
			.get("https://api-stackathon.herokuapp.com/document/")
			.then((res) => {
				setDocuments(res.data);
			})
			.catch((err) => console.log(err));
	}

	const handleDelete = (id) => {
		var message = "Are you sure you want to delete this document??\nDetails of this document will be erased permanently.\nThis action cannot be undone";
		var check = window.confirm(message);
		if (check) {
			var link = "https://api-stackathon.herokuapp.com/document/" + id;
			axios
				.delete(link)
				.then((res) => {
					console.log(res.data);
					setReload(true);
				})
				.catch((err) => console.log(err));
		}
	};

	const handleAdd = (doc) => {
		axios
			.post("https://api-stackathon.herokuapp.com/document/add", doc)
			.then((res) => {
				console.log(res.data);
				setReload(true);
			})
			.catch((err) => console.log(err));
	};

	const handleEdit = (doc) => {
		var link = "https://api-stackathon.herokuapp.com/document/update/" + doc.id;
		axios
			.put(link, doc)
			.then((res) => {
				console.log(res.data);
				setReload(true);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="employee container-fluid">
			<Router>
				<Navbar />
				<Route path="/docs" exact component={() => <HomeDocument documents={documents} handleDelete={handleDelete} />} />
				<Route path="/docs/add" exact component={() => <AddDocument handleAdd={handleAdd} />} />
				<Route path="/docs/edit/:id" exact component={() => <EditDocument handleEdit={handleEdit} documents={documents} />} />
			</Router>
		</div>
	);
}

export default Document;
