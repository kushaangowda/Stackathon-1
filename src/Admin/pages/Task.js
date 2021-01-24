import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages.css";
import { EditTask } from "./componentsTask/EditTask";
import { AddTask } from "./componentsTask/AddTask";
import { Tasknav } from "./componentsTask/Tasknav";
import axios from "axios";
import createNotification, { demo } from "../../Notification";

export const Task = () => {
	const [tasks, setTasks] = useState([]);

	const [teams, setTeams] = useState([]);

	const [reload, setReload] = useState(false);

	const display = () => {
		axios
			.get("https://api-stackathon.herokuapp.com/task/")
			.then((res) => {
				if (String(res.data.message) !== "No tasks currently present.") setTasks(res.data);
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));

		axios
			.get("http://api-stackathon.herokuapp.com/team/")
			.then((res) => {
				console.log("teams: ", res.data);
				var teams1 = [];
				res.data.forEach((team) => {
					teams1.push(team.name);
				});
				console.log(teams1);
				setTeams(teams1);
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));
	};

	if (reload) {
		setReload(false);
		display();
	}

	useEffect(() => {
		display();
		demo(["Welcome to tasks page", "Here you can edit/ delete/ assign tasks to different teams.", "Try sorting tasks based on their status"])
	}, []);

	const addTask = (task) => {
		var newTasks = [task, ...tasks];
		setTasks(newTasks);
		axios
			.post("http://api-stackathon.herokuapp.com/task/add", task)
			.then((res) => {
				console.log(res.data);
				createNotification({
					title: " :) ",
					message: "New task added successfully",
					type: "success",
					time: 3000,
				});
				setReload(true);
			})
			.catch((err) => {
				createNotification({
					title: "",
					message: err.message,
					type: "warning",
					time: 1000

				});
				createNotification({
					title: " :( ",
					message: "Something went wrong, please try again later!!",
					type: "danger",
					time: 5000,
				});
			});
	};

	const editTask = (task) => {
		var newTasks1 = tasks.filter((task1) => {
			return String(task1._id) !== String(task.taskID);
		});
		var newTasks = [task, ...newTasks1];
		setTasks(newTasks);
		var link = "https://api-stackathon.herokuapp.com/task/update/" + task.taskID;
		axios
			.put(link, task)
			.then((res) => {
				console.log(res.data);
				display();
				createNotification({
					title: " Task Update ",
					message: "Successfully updated the task",
					type: "success",
					time: 3000,
				});
				setReload(true);
			})
			.catch((err) => createNotification({
				title: "",
				message: err.message,
				type: "warning",
				time: 1000

			}));
	};

	const deleteTask = (id) => {
		createNotification({
			title: "Are you sure about that?",
			message: "Are you sure you want to delete this task??\nDetails of this task will be erased permanently.\nThis action cannot be undone",
			type: "warning",
			time: 5000,
		});
		setTimeout(() => {
			var message = "Are you sure?";
			var check = window.confirm(message);
			if (check) {

				var newTasks = tasks.filter((task) => {
					return String(task._id) !== String(id);
				});
				setTasks(newTasks);
				var link = "http://api-stackathon.herokuapp.com/task/" + id;
				axios
					.delete(link)
					.then((res) => {
						console.log(res.data);
						setReload(true);
						createNotification({
							title: " :) ",
							message: "Successfully deteled the task.",
							type: "success",
							time: 1000,
						});
					})
					.catch((err) => createNotification({
						title: "",
						message: err.message,
						type: "warning",
						time: 1000

					}));
			}
		}, 3000);
	};

	return (
		<div className="Task">
			{/*<GlobalProvider>*/}
			<Router>
				<Route path="/task" exact component={() => <Tasknav tasks={tasks} deleteTask={deleteTask} />} />
				<Route path="/task/add" exact component={() => <AddTask addTask={addTask} tasks={tasks} teams={teams} />} />
				<Route path="/task/edit/:Id" exact component={() => <EditTask tasks={tasks} editTask={editTask} />} />
			</Router>
			{/*</GlobalProvider>*/}
		</div>
	);
};
