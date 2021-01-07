import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "./context/GlobalState";
import * as MdIcons from "react-icons/md";

export const AddTask = () => {
	const { addTask } = useContext(GlobalContext);
	const [Name, setTask] = useState("");
	const history = useHistory();

	const onSubmit = (e) => {
		e.preventDefault();
		const newTask = {
			Id: Math.random(),
			Name: Name,
			Status: "Pending",
		};
		addTask(newTask);
		history.push("/task");
	};

	const onchange = (e) => {
		setTask(e.target.value);
	};
	return (
		<div>
			<form className="mt-4" onSubmit={onSubmit}>
				<label htmlFor="Name" className=" ml-5">
					Name :
				</label>
				<input id="Name" type="text" onChange={onchange} />
				<label htmlFor="Name" className="ml-5">
					Description :
				</label>
				<input id="Description" type="textarea" onChange={onchange} />
				<label htmlFor="Name" className="ml-5">
					Team :
				</label>
				<input id="Team" type="text" onChange={onchange} />
				<label htmlFor="Name" className="ml-5">
					Deadline :
				</label>
				<input id="Deadline" type="date" onChange={onchange} />
				<button className="btn btn-info ml-5">Submit</button>
				<Link to="/task" className="btn btn-danger ml-2">
					Cancel
				</Link>
				{/* <span id="Action"><MdIcons.MdModeEdit />&nbsp;<MdIcons.MdDeleteForever /></span> */}
			</form>
		</div>
	);
};

// export default AddTask;
// class AddTask extends Component {
//     state = {
//         Name: null,
//         Description: null,
//         Team: null,
//         Deadline: null,
//     }
//     handleChange = (e) => {
//         this.setState({
//             [e.target.id]: e.target.value
//         })
//     }
//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.AddTask(this.state);
//     }

//     render() {
//         return (
//             <div >
//                 <form onSubmit={this.handleSubmit} >
//                     <label htmlFor="Name" className="ml-5">Name :</label>
//                     <input id="Name" onChange={this.handleChange} type="text" />
//                     <label htmlFor="Name" className="ml-5">Description :</label>
//                     <input id="Description" onChange={this.handleChange} type="text" />
//                     <label htmlFor="Name" className="ml-5">Team :</label>
//                     <input id="Team" onChange={this.handleChange} type="text" />
//                     <label htmlFor="Name" className="ml-5">Deadline :</label>
//                     <input id="Deadline" onChange={this.handleChange} type="date" />
//                     <button className="add-new ml-5">Submit</button>
//                     {/* <span id="Action"><MdIcons.MdModeEdit />&nbsp;<MdIcons.MdDeleteForever /></span> */}
//                 </form>
//             </div>
//         )
//     }
// }

// export default AddTask;
