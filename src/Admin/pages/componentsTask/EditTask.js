import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
// import { GlobalContext } from "./context/GlobalState";
import "../pages.css";
// import * as MdIcons from "react-icons/md";

export const EditTask = ({ editTask, tasks }) => {
	// const [selectedTask, setselectedTask] = useState({
	// 	Id: null,
	// 	Name: "",
	// 	Description: "",
	// 	Deadline: null,
	// });

	let params = useParams();
	const id = params.Id;

	const task = tasks.filter((task1) => {
		return task1._id == id;
	});

	const [name, setName] = useState(task[0].name);
	const [deadline, setDeadline] = useState(task[0].deadline.slice(0, 10));
	const [description, setDescription] = useState(task[0].description);

	console.log(deadline);

	const history = useHistory();

	// useEffect(() => {
	// 	const TaskId = currentTaskId;
	// 	const selectedTask1 = Tasks.find((Tasks) => Tasks.Id === Number(TaskId));
	// 	setselectedTask(selectedTask1);
	// 	setName(selectedTask1.name);
	// 	setDeadline(selectedTask1.deadline);
	// 	setDescription(selectedTask1.description);
	// 	// console.log(selectedTask)
	// }, [currentTaskId, Tasks]);

	const onSubmit = (e) => {
		e.preventDefault();
		var updatedTask = {
			taskID: id,
			name: name,
			description: description,
			deadline: deadline,
			teamID: task[0].teamID,
		};
		console.log(updatedTask);
		editTask(updatedTask);
		history.push("/task");
	};

	// const onchange = (e, type) => {
	// 	var changedTask = selectedTask;
	// 	changedTask[`${type}`] = e.target.value;
	// 	setselectedTask(changedTask);
	// 	console.log(selectedTask);
	// };

	return (
		<div>
			<form className="mt-4" onSubmit={onSubmit}>
				<label htmlFor="Name" className=" ml-5">
					Name :
				</label>
				<input
					id="Name"
					Name="Name"
					onChange={(e) => {
						setName(e.target.value);
					}}
					value={name}
					type="text"
				/>
				<label htmlFor="Name" className="ml-5">
					Description :
				</label>
				<input
					id="Description"
					name="Name"
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					value={description}
					type="textarea"
				/>
				<label htmlFor="Name" className="ml-5">
					Deadline :
				</label>
				<input
					id="Deadline"
					name="Name"
					onChange={(e) => {
						setDeadline(e.target.value);
					}}
					value={deadline}
					type="date"
				/>
				<button className="btn btn-info ml-5">Edit</button>
				<Link to="/task" className="btn btn-danger ml-2">
					Cancel
				</Link>
				{/* <span id="Action"><MdIcons.MdModeEdit />&nbsp;<MdIcons.MdDeleteForever /></span> */}
			</form>
		</div>
	);
};
// export default EditTask;

// const TaskCom = (props) => {
//     const { Tasks ,deleteTask} = props;
//     const Tasklist = Tasks.map(Task => {
//         return (
//             <tr data-status={Task.Status} key={Task.Id}>
//                 <td>{Task.Id=Math.random()}</td>
//                 <td>{Task.Name}</td>
//                 <td>{Task.Description}</td>
//                 <td>{Task.Team} </td>
//                 <td>{Task.Deadline}</td>
//                 <td><span class={Task.Status}>{Task.Status}</span></td>
//                 <td><button><MdIcons.MdModeEdit /></button>&nbsp;<button onClick={() => { deleteTask(Task.Id)}}> <MdIcons.MdDeleteForever /></button></td>
//             </tr>
//         )
//     })
//     return (
//         <>
//             { Tasklist}
//         </>
//     )
// }

// export default TaskCom
