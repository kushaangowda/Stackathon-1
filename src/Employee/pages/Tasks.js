import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const Tasks = () => {
	const [currtask, setcurrTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [filter, setFilter] = useState("all");
	const [currdata, setcurrdata] = useState("");
	const [error, seterror] = useState();
	const [display, setDisplay] = useState();
	const { user } = useAuth0();
	useEffect(() => {
		displaydata();
	}, []);

	const displaydata = () => {
		axios.get("https://api-stackathon.herokuapp.com/employee/email/" + user["email"]).then(async (res1) => {
			if (res1.data.error) {
				seterror("Invalid Email ID. Please contact administration");
				return;
			}
			let team = res1.data.message.teamID;
			console.log("team", team);
			let teamres = await axios.get("https://api-stackathon.herokuapp.com/team/" + team);
			let teamname = teamres.data.name;
			axios
				.get("https://api-stackathon.herokuapp.com/task/" + teamname)
				.then((res) => {
					console.log("here", res, res1);
					setTasks(res.data);
					let temp = [];
					let final = [];
					console.log("here", res);
					temp = res.data.filter((item) => {
						return item.status == filter || filter == "all";
					});
					final.push(
						temp.map((Tasks) => {
							return (
								<tr data-status={Tasks.Status} key={Tasks._id}>
									{/*<td>{Tasks.Id}</td>*/}
									<td>{Tasks.name}</td>
									<td>{Tasks.description}</td>
									<td>{Tasks.deadline.slice(0, 10)}</td>
									<td>
										<span className={Tasks.Status || "pending"}>{Tasks.status}</span>
									</td>
									<td>
										<button
											className="btn btn-primary"
											data-toggle="modal"
											onClick={() => {
												setcurrTask(Tasks._id);
												ChangeData(Tasks._id);
											}}
											data-target="#exampleModal"
										>
											Set Status
										</button>
									</td>
								</tr>
							);
						})
					);

					setDisplay(final);
					console.log(final);
				})
				.catch((err) => console.log(err));
		});
	};

	const ChangeStatus = (taskid, status) => {
		axios.get("https://api-stackathon.herokuapp.com/task/setstatus/" + taskid + "/" + status).then((res) => {
			if (res.error != null) {
				seterror(res.error);
			} else {
				displaydata();
			}
		});
	};

	useEffect(() => {
		displaydata();
	}, [filter]);

	const ChangeData = (taskid) => {
		let temp = (
			<>
				{" "}
				<span>Set Status:</span>
				<select name="status" id="status">
					<option value="Pending">Pending</option>
					<option value="Completed">Completed</option>
					<option value="Active">Active</option>
				</select>
				<button
					data-dismiss="modal"
					style={{ display: "block", margin: 20 }}
					className="btn btn-success"
					onClick={(e) => ChangeStatus(taskid, e.target.previousSibling.value)}
				>
					Save
				</button>
			</>
		);
		setcurrdata(temp);
	};

	return (
		<div className="Task">
			<div>
				<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">
									Edit Task Status
								</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">{currdata}</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
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
							</div>
						</div>
					</div>
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								{/*<th>#</th>*/}
								<th>Name</th>
								<th>Description</th>
								<th>Deadline</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>{display}</tbody>
					</table>
					{error ? <p>{error}</p> : null}
				</div>
			</div>
		</div>
	);
};
