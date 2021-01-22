import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../pages.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { GlobalContext } from "./context/GlobalState";
// import * as MdIcons from "react-icons/md";

export const AddTask = ({ addTask }) => {
	const [task, setTask] = useState({
		name: "",
		description: "",
		teamID: "",
		deadline: null,
		status: "",
	});

	const history = useHistory();

	const onSubmit = (e) => {
		e.preventDefault();
		addTask(task);
		history.push("/task");
	};

	const onchange = (e, type) => {
		var updatedTask = task;
		updatedTask[`${type}`] = e.target.value;
		setTask(updatedTask);
		console.log(task);
	};

	return (
		<>
			<div className="col-lg-6 mx-auto">
				<div className="card mt-5 mx-auto p-4 bg-light">
					<div className="card-body bg-light">
						<form onSubmit={onSubmit}>
							<div className="controls">
								<div className="row">
									<div className="col-md-12">
										<label>Name :</label> <input id="Name"
											type="text"
											onChange={(e) => {
												onchange(e, "name");
											}} className="form-control" />
									</div>
								</div>
								<div className="row">
									<div className="col-md-12">
										<label HtmlFor="form_name">Team :</label> <input
											id="Team"
											type="text"
											onChange={(e) => {
												onchange(e, "teamID");
											}}
											className="form-control" />
									</div>
								</div>
								<div className="row">
									<div className="col-md-12">
										<div className="form-group"> <label >Description :</label> <textarea id="Description"
											type="textarea"
											onChange={(e) => {
												onchange(e, "description");
											}}
											className="form-control"></textarea>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<label>Deadline : </label>
										<input
											id="Deadline"
											type="date"
											onChange={(e) => {
												onchange(e, "deadline");
											}}
										/>
									</div>
								</div>
								<button className="btn btn-info ml-5">Submit</button>
								<Link to="/task" className="btn btn-danger ml-2">
									Cancel</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>

	);
};





