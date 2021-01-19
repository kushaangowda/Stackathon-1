import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import { GlobalContext } from "./context/GlobalState";
import * as MdIcons from "react-icons/md";
import "../pages.css";
import * as GrIcons from "react-icons/gr";
import { Tasks } from "../../../Employee/pages/Tasks";
import axios from "axios";

export const Tasknav = ({ deleteTask }) => {
	const [filter, setFilter] = useState('all');
	const [currtasks, setcurrtasks] = useState([]);
	const [loading, setloading] = useState(false);
	const display = () => {
		setloading(true);
		axios
			.get("http://localhost:5000/task/")
			.then((res) => {
				let tasks = res.data;
				let final = [];
				let temp = [];
				temp = tasks.filter(item => {
					return (item.status == filter || filter == 'all');
				});
				final.push(
					temp.map(Tasks => {
						return (
							<tr data-status={Tasks.Status} key={Tasks._id}>
								<td>{Tasks.name}</td>
								<td>{Tasks.description}</td>
								<td>{Tasks.teamID} </td>
								<td>{Tasks.deadline.slice(0, 10)}</td>
								<td>
									{Tasks.status}
								</td>
								<td onClick={() => console.log('sent', Tasks._id, Tasks.name)}>
									<Link to={`./task/edit/${Tasks._id}`} className="btn btn">
										<MdIcons.MdModeEdit />
									</Link>
									<button onClick={() => deleteTask(Tasks._id)}>
										{" "}
										<MdIcons.MdDeleteForever />
									</button>
								</td>
							</tr>
						)
					}
					)
				)
				setcurrtasks(final);
				setloading(false);
			})
			.catch((err) => console.log(err));
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
						<h2>
							Manage <b>Task</b>
						</h2>
					</div>
					<div className="col-sm-5">
						<div onChange={(e) => setFilter(e.target.value)} className="btn-group" data-toggle="buttons">
							<label className="btn btn-info active">
								<input type="radio" name="status" value="all" defaultChecked /> All
							</label>{" "}
							<label className="btn btn-success">
								<input type="radio" name="status" value="Active" /> Active
							</label>
							<label className="btn btn-warning">
								<input type="radio" name="status" value="Pending" /> Pending
							</label>
							<label className="btn btn-danger">
								<input type="radio" name="status" value="Completed" /> Completed
							</label>
							<Link to="/task/add" className="btn btn-secondary m-1">
								<GrIcons.GrFormAdd /> Add Task
							</Link>
						</div>
					</div>
				</div>
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							{/*<th>#</th>*/}
							<th>Name</th>
							<th>Description</th>
							<th>Team</th>
							<th>Deadline</th>
							<th>Status</th>
							<th>Action</th>
						</tr>

						{!loading ? currtasks : <h1>loading</h1>}
					</thead>
				</table>
			</div>
		</div>
	);
};

// export default Tasknav;
