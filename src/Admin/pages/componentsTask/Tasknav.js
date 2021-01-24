import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import { GlobalContext } from "./context/GlobalState";
import * as MdIcons from "react-icons/md";
import "../pages.css";
import * as GrIcons from "react-icons/gr";
// import { Tasks } from "../../../Employee/pages/Tasks";
import axios from "axios";
import createNotification from "../../../Notification";

export const Tasknav = ({ deleteTask }) => {
	const [filter, setFilter] = useState("all");
	const [currtasks, setcurrtasks] = useState([]);

	const display = () => {
		axios
			.get("https://api-stackathon.herokuapp.com/task/")
			.then((res) => {
				let tasks = res.data;
				let final = [];
				let temp = [];
				temp = tasks.filter((item) => {
					return item.status === filter || filter === "all";
				});
				final.push(
					temp.map((Tasks) => {
						return (
							<tr data-status={Tasks.Status} key={Tasks._id}>


								<td data-title="NAME">{Tasks.name}</td>
								<td data-title="DESCRIPTION">{Tasks.description}</td>
								<td data-title="TEAM">{Tasks.teamID} </td>
								<td data-title="DEADLINE">{Tasks.deadline.slice(0, 10)}</td>
								<td data-title="STATUS">

									<span
										className={
											"btn btn-" +
											(String(Tasks.status) === "Pending" ? "warning" : String(Tasks.status) === "Active" ? "success" : "success")
										}
									>
										{String(Tasks.status)}
									</span>
								</td>

								<td data-title="ACTION">
									<Link to={`./task/edit/${Tasks._id}`} className="btn btn">
										<MdIcons.MdModeEdit />

									</Link>
								</td>
								<td>
									<button onClick={() => deleteTask(Tasks._id)} className="btn btn-danger">
										Delete
									</button>
								</td>
							</tr>
						);
					})
				);
				setcurrtasks(final);
			})
			.catch((err) => {
				console.log(err.message);
				if (err.message == 'tasks.filter is not a function') {
					err.message = "No Tasks currently present";
				}
				createNotification({
					title: "",
					message: err.message,
					type: "warning",
					time: 1000

				})
			}
			);
	}

	useEffect(() => {
		display();
	}, []);

	useEffect(() => {
		display();
	}, [filter]);
	return (
		<div>
			<div className="Tasks ml-2 mr-2">
				<div className="row mt-2">
					<div className="navheading col-sm-7">
						<h2 className="pageTitle">Manage Task</h2>
					</div>
					<div className="col-sm-5">
						<div onChange={(e) => setFilter(e.target.value)} className="btn-group" data-toggle="buttons">
							<label className="btn btn-info success">
								<input
									type="radio"
									name="status"
									value="all"
									defaultChecked
									onClick={() => {
										createNotification({
											title: "",
											message: "Showing tasks all tasks",
											type: "default",
											time: 1000,
										});
									}}
								/>{" "}
								All
							</label>{" "}

							{/* <label className="btn btn-success">
								<input type="radio" name="status" value="Active" onClick={() => {
									createNotification({
										title: "",
										message: "Showing tasks with status: ACTIVE",
										type: "success",
										time: 1000

									})
								}} /> Active
							</label> */}

							<label className="btn btn-warning">
								<input
									type="radio"
									name="status"
									value="Pending"
									onClick={() => {
										createNotification({
											title: "",
											message: "Showing tasks with status: PENDING",
											type: "warning",
											time: 1000,
										});
									}}
								/>{" "}
								Pending
							</label>
							<label className="btn btn-success">
								<input
									type="radio"
									name="status"
									value="Completed"
									onClick={() => {
										createNotification({
											title: "",
											message: "Showing only tasks with status: COMPLETED",
											type: "success",
											time: 1000,
										});
									}}
								/>{" "}
								Completed
							</label>
							<Link to="/task/add" className="btn btn-secondary mb-2 ml-1">
								<GrIcons.GrFormAdd /> Add Task
							</Link>
						</div>
					</div>
				</div>
				<div className="table-responsive">
					<div id="no-more-tables">
						<table className="table table-bordered table-hover">
							<caption>List of Tasks</caption>
							<thead className="thead-dark">
								<tr>
									{/*<th>#</th>*/}
									<th className="text-uppercase">Name</th>
									<th className="text-uppercase">Description</th>
									<th className="text-uppercase">Team</th>
									<th className="text-uppercase">Deadline</th>
									<th className="text-uppercase">Status</th>
									<th className="text-uppercase">Edit</th>
									<th className="text-uppercase">Delete</th>
								</tr>
							</thead>
							<tbody>{currtasks}</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

// export default Tasknav;
