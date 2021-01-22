import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
// import { GlobalContext } from "./context/GlobalState";
import "../pages.css";
// import * as MdIcons from "react-icons/md";

export const EditTask = ({ editTask, tasks }) => {
	let params = useParams();
	const id = params.Id;

	const task = tasks.filter((task1) => {
		return String(task1._id) === String(id);
	});
	console.log('received', task);
	const [name, setName] = useState(task[0].name);
	const [deadline, setDeadline] = useState(task[0].deadline.slice(0, 10));
	const [description, setDescription] = useState(task[0].description);
	const [status, setStatus] = useState(task[0].status);

	console.log(deadline);

	const history = useHistory();

	const onSubmit = (e) => {
		e.preventDefault();
		var updatedTask = {
			taskID: id,
			name: name,
			description: description,
			deadline: deadline,
			teamID: task[0].teamID,
			status: status,
		};
		console.log(updatedTask);
		editTask(updatedTask);
		history.push("/task");
	};

	return (

		<>
			<div className="col-lg-7 mx-auto">
				<div className="card mt-5 mx-auto p-4 bg-light">
					<div className="card-body bg-light">
						<form onSubmit={onSubmit}>
							<div className="controls">
								<div className="row">
									<div className="col-md-12">
										<label>Name :</label>{" "}
										<input
											id="Name"
											Name="Name"
											onChange={(e) => {
												setName(e.target.value);
											}}
											value={name}
											type="text"
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											{" "}
											<label>Description :</label>{" "}
											<textarea
												id="Description"
												Name="Name"
												onChange={(e) => {
													setDescription(e.target.value);
												}}
												value={description}
												type="textarea"
												className="form-control"
											></textarea>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											{" "}
											<label HtmlFor="Name">Status :</label>{" "}
											<select
												id="Status"
												Name="Name"
												onChange={(e) => {
													setStatus(e.target.value);
												}}
												value={status}
											>
												<option>Pending</option>
												<option>Completed</option>
												<option>Active</option>
											</select>
										</div>
									</div>
									<div className="col-md-6">
										<label>Deadline : </label>
										<input
											id="Deadline"
											Name="Name"
											onChange={(e) => {
												setDeadline(e.target.value);
											}}
											value={deadline}
											type="date"
										/>
									</div>
								</div>
								<button className="btn btn-info ml-5">Edit</button>
								<Link to="/task" className="btn btn-danger ml-2">
									Cancel
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};