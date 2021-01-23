import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from '../components/PayrollComponents/Navbar'
import { Home } from "../components/PayrollComponents/Home";
import { Add } from "../components/PayrollComponents/Add";
import { Edit } from "../components/PayrollComponents/Edit";
import { useAuth0 } from "@auth0/auth0-react";
// import { EditDocument } from "../../Admin/pages/componentsDocument/EditDocument";
import axios from "axios";
import createNotification from '../../Notification'

export const Payroll = () => {

	const [documents, setDocuments] = useState([]);
	const [requests, setRequests] = useState([]);
	const [empID, setempid] = useState();
	const [error, seterror] = useState();
	const { user } = useAuth0();
	const [reload, setReload] = useState(false);

	useEffect(() => {
		axios
			.get("http://api-stackathon.herokuapp.com/employee/email/" + user["email"])
			.then((res) => {
				if (res.data.error) {
					seterror('Invalid Email ID. Please contact administration');
					createNotification({
						title: " :(",
						message: "Please contact ADMIN, something went wrong !!",
						type: "danger"
					})
					return;
				}
				setempid(res.data.message._id);

				createNotification({
					message: "Fetching your payroll requests",
					type: "info",
					time: 1500
				})

				axios
					.get(`http://api-stackathon.herokuapp.com/payrollrequest/${res.data.message._id}`)
					.then((res1) => {
						createNotification({
							message: "Successfully fetched your requests",
						})
						setRequests(res1.data);
					})
					.catch((err) => console.log(err));
			})

	}, []);

	if (reload) {
		setReload(false);
		axios
			.get(`http://api-stackathon.herokuapp.com/payrollrequest/${empID}`)
			.then((res) => {
				setRequests(res.data);
			})
			.catch((err) => console.log(err));
	}


	const handleDelete = (id) => {
		var message = "Are you sure you want to delete this document??\nDetails of this document will be erased permanently.\nThis action cannot be undone";
		var check = window.confirm(message);
		if (check) {
			var link = "http://api-stackathon.herokuapp.com/payrollrequest/" + id;
			axios
				.delete(link)
				.then((res) => {
					console.log(res.data);
					setReload(true);
				})
				.catch((err) => console.log(err));
		}
	};

	const handleAdd = (newRequest) => {
		axios
			.post("http://api-stackathon.herokuapp.com/payrollrequest/add", newRequest)
			.then((res) => {
				console.log(res.data);
				createNotification({
					message: "New Payroll Request added!",
					type: "success"
				})
				setReload(true);
			})
			.catch((err) => console.log(err));
	};

	const handleEdit = (request) => {
		// console.log("request id" + request.id)
		var link = "http://api-stackathon.herokuapp.com/payrollrequest/update/" + request.id;
		axios
			.put(link, request)
			.then((res) => {
				createNotification({
					message: "Payroll Request successfully updated!",
					type: "info"
				})
				setReload(true);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<div className="employee container-fluid">
				<Router>
					<Navbar />
					<Route path="/payroll" exact component={() => <Home requests={requests} handleDelete={handleDelete} />} />
					<Route path="/payroll/add" exact component={() => <Add handleAdd={handleAdd} id={empID} />} />
					<Route path="/payroll/edit/:id" exact component={() => <Edit handleEdit={handleEdit} requests={requests} />} />
				</Router>

			</div>
		</div>
	);

};




export default Document;
