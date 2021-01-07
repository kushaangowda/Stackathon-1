import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalContext } from "./context/GlobalState";
import * as MdIcons from "react-icons/md";
import "../pages.css";
import * as GrIcons from "react-icons/gr";

export const Tasknav = () => {
	const { Tasks, deleteTask } = useContext(GlobalContext);
	return (
		<div>
			<div className="Tasks ml-2 mr-2">
				<div className="row mt-2">
					<div className="col-sm-7">
						<h2>
							Manage <b>Task</b>
						</h2>
					</div>
					<div className="col-sm-5">
						<div className="btn-group" data-toggle="buttons">
							<label className="btn btn-info active">
								<input type="radio" name="status" value="all" checked="checked" /> All
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
							<Link to="/task/add" className="btn btn-secondary">
								<GrIcons.GrFormAdd /> Add Task
							</Link>
						</div>
					</div>
				</div>
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Description</th>
							<th>Team</th>
							<th>Deadline</th>
							<th>Status</th>
							<th>Action</th>
						</tr>

						{Tasks.map((Tasks) => (
							<tr data-status={Tasks.Status} key={Tasks.Id}>
								<td>{Tasks.Id}</td>
								<td>{Tasks.Name}</td>
								<td>{Tasks.Description}</td>
								<td>{Tasks.Team} </td>
								<td>{Tasks.Deadline}</td>
								<td>
									<span className={Tasks.Status}>{Tasks.Status}</span>
								</td>
								<td>
									<Link to={`./task/edit/${Tasks.Id}`} className="btn btn">
										<MdIcons.MdModeEdit />
									</Link>
									<button onClick={() => deleteTask(Tasks.Id)}>
										{" "}
										<MdIcons.MdDeleteForever />
									</button>
								</td>
							</tr>
						))}
					</thead>
				</table>
			</div>
		</div>
	);
};

// export default Tasknav;
