import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages.css";
import { EditTask } from "./componentsTask/EditTask";
import { AddTask } from "./componentsTask/AddTask";
import { Tasknav } from "./componentsTask/Tasknav";
import axios from "axios";

export const Task = () => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/task/")
			.then((res) => {
				setTasks(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const addTask = (task) => {
		var newTasks = [task, ...tasks];
		setTasks(newTasks);
		axios
			.post("http://localhost:5000/task/add", task)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	};

	const editTask = (task) => {
		var newTasks1 = tasks.filter((task1) => {
			return task1._id != task.taskID;
		});
		var newTasks = [task, ...newTasks1];
		setTasks(newTasks);
		var link = "http://localhost:5000/task/update/" + task.taskID;
		axios
			.put(link, task)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	};

	const deleteTask = (id) => {
		var message = "Are you sure you want to delete this task??\nDetails of this task will be erased permanently.\nThis action cannot be undone";
		var check = window.confirm(message);
		if (check) {
			var newTasks = tasks.filter((task) => {
				return task._id != id;
			});
			console.log("yo", newTasks);
			setTasks(newTasks);
			var link = "http://localhost:5000/task/" + id;
			axios
				.delete(link)
				.then((res) => console.log(res.data))
				.catch((err) => console.log(err));
		}
	};

	return (
		<div className="Task">
			{/*<GlobalProvider>*/}
			<Router>
				<Route path="/task" exact component={() => <Tasknav tasks={tasks} deleteTask={deleteTask} />} />
				<Route path="/task/add" exact component={() => <AddTask addTask={addTask} />} />
				<Route path="/task/edit/:Id" exact component={() => <EditTask tasks={tasks} editTask={editTask} />} />
			</Router>
			{/*</GlobalProvider>*/}
		</div>
	);
};
// state = {
//     Tasks: [
//         {
//             Id: '1',
//             Name: 'Random',
//             Description: 'loremvallis.com This is a small description on loremvallis.com This is a small description ',
//             Team: 'Team1',
//             Deadline: '25/10/2020',
//             Status: 'Pending'
//         }
//     ]
// }
// class Task extends Component {
// state = {
//     Tasks: [
//         {
//             Id: '1',
//             Name: 'Random',
//             Description: 'loremvallis.com This is a small description on loremvallis.com This is a small description ',
//             Team: 'Team1',
//             Deadline: '25/10/2020',
//             Status: 'Pending'
//         },
//         {
//             Id: '2',
//             Name: 'Random2',
//             Description: 'loremvallis.com This is a small description on loremvallis.com This is a small description loremvallis.com This is a small description on loremvallis.com This is a small description loremvallis.com This is a small description on loremvallis.com This is a small description',
//             Team: 'Team3',
//             Deadline: '26/10/2020',
//             Status: 'Active'
//         },
//         {
//             Id: '3',
//             Name: 'Random4',
//             Description: 'loremvallis.com This is a small description on loremvallis.com This is a small description loremvallis.com This is a small description on loremvallis.com This is a small descrip',
//             Team: 'Team3',
//             Deadline: '2/10/2020',
//             Status: 'Done'
//         }
//     ]
//     }
//     AddTask = (AddTask) => {
//         AddTask.Id = Math.random();
//         AddTask.Status = 'Pending';
//         let Tasks = [...this.state.Tasks, AddTask]
//         this.setState({
//             Tasks: Tasks
//         })
//     }
//     deleteTask = (Id) => {
//         console.log(Id)
//     }
//     render() {
//         return (
//             <>

//                 <Router>
//                     <div className="Task">
//                         <Tasknav />
//                         <Switch>
//                             <Route path="/add" exact component={AddTask} />
//                         </Switch>
//                     </div>
//                 </Router>
//                 {/* <TaskCom Tasks={this.state.Tasks} /> */}
//                 {/* <Task deleteTask={this.deleteTask}/> */}
//             </>
//         )
//     }
// }

// export default Task
