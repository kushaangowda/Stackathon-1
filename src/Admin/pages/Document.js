import React, { useState, useEffect } from "react";
import { HomeDocument } from "./componentsDocument/HomeDocument";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from "./componentsDocument/Navbar";
import { AddDocument } from "./componentsDocument/AddDocument";
import { EditDocument } from "./componentsDocument/EditDocument";
import axios from "axios";

import createNotification, { demo } from '../../Notification'

function Document() {
	const [documents, setDocuments] = useState([]);

	const [reload, setReload] = useState(false);

	useEffect(() => {
		axios
			.get("https://api-stackathon.herokuapp.com/document/")
			.then((res) => {
				setDocuments(res.data);
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));

		demo(["Here the admin can upload the company's privacy policies, faqs etc.", "All these docs are available to view by any new user who is neither admin or employee"])
	}, []);

	if (reload) {
		setReload(false);
		axios
			.get("https://api-stackathon.herokuapp.com/document/")
			.then((res) => {
				setDocuments(res.data);
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));
	}

	const handleDelete = (id) => {
		createNotification({
			title: ": ",
			message: "Nope, I can't allow you to change the company's documents",
			type: "danger",
			time: 10000
		})
		// var message = "Are you sure you want to delete this document??\nDetails of this document will be erased permanently.\nThis action cannot be undone";
		// var check = window.confirm(message);
		// if (check) {
		// var link = "https://api-stackathon.herokuapp.com/document/" + id;
		// axios
		// 	.delete(link)
		// 	.then((res) => {
		// 		console.log(res.data);
		// 		setReload(true);
		// 	})
		// 	.catch((err) => createNotification({
		// 		title: "",
		// 		message: err.message,
		// 		type: "warning",
		// 		time: 1000

		// 	}));
		// }
	};

	const handleAdd = (doc) => {
		createNotification({
			title: ": ",
			message: "Nope, I can't allow you to change the company's documents",
			type: "danger",
			time: 10000
		})
		// axios
		// 	.post("https://api-stackathon.herokuapp.com/document/add", doc)
		// 	.then((res) => {
		// 		console.log(res.data);
		// 		setReload(true);
		// 		createNotification({
		// 			title: "",
		// 			message: "Document successfully added",
		// 			type: "success"
		// 		})
		// 	})
		// 	.catch((err) => createNotification({
		// 		title: "",
		// 		message: err.message,
		// 		type: "warning",
		// 		time: 1000

		// 	}));
	};

	const handleEdit = (doc) => {
		createNotification({
			title: ": ",
			message: "Nope, I can't allow you to change the company's documents",
			type: "danger",
			time: 10000
		})
		// var link = "https://api-stackathon.herokuapp.com/document/update/" + doc.id;
		// axios
		// 	.put(link, doc)
		// 	.then((res) => {
		// 		console.log(res.data);
		// 		setReload(true);
		// 		createNotification({
		// 			title: "",
		// 			message: "Document successfully updated",
		// 			type: "success"
		// 		})
		// 	})
		// 	.catch((err) => createNotification({
		// 		title: "",
		// 		message: err.message,
		// 		type: "warning",
		// 		time: 1000

		// 	}));
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
