import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import { GlobalContext } from "./context/GlobalState";
import * as MdIcons from "react-icons/md";
import "../pages.css";
import * as GrIcons from "react-icons/gr";

export const Tasknav = ({ tasks, deleteTask }) => {
	// const { Tasks, deleteTask } = useContext(GlobalContext);

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
						<div className="btn-group" data-toggle="buttons">
							<label className="btn btn-info active">
								<input type="radio" name="status" value="all" defaultChecked /> All
							</label>{" "}
							<label className="btn btn-success">
								<input type="radio" name="status" value="active" /> Active
							</label>
							<label className="btn btn-warning">
								<input type="radio" name="status" value="inactive" /> Pending
							</label>
							<label className="btn btn-danger">
								<input type="radio" name="status" value="expired" /> Done
							</label>
							<Link to="/task/add" className="btn btn-secondary m-1">
								<GrIcons.GrFormAdd /> Add Task
							</Link>
						</div>
					</div>
				</div>
				<div className="table-responsive">
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
								<th className="text-uppercase">Action</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((Tasks) => {
								return (
									<tr data-status={Tasks.Status} key={Tasks._id}>
										{/*<td>{Tasks.Id}</td>*/}
										<td>{Tasks.name}</td>
										<td>{Tasks.description}</td>
										<td>{Tasks.teamID} </td>
										<td>{Tasks.deadline.slice(0, 10)}</td>
										<td>
											<span
												className={
													"btn btn-" +
													(String(Tasks.status) == "Pending" ? "warning" : String(Tasks.status) == "Active" ? "success" : "danger")
												}
											>
												{String(Tasks.status)}
											</span>
										</td>
										<td>
											<Link to={`./task/edit/${Tasks._id}`} className="btn btn">
												<MdIcons.MdModeEdit />
											</Link>
											<button onClick={() => deleteTask(Tasks._id)}>
												{" "}
												<MdIcons.MdDeleteForever />
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

// export default Tasknav;
