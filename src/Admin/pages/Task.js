import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages.css";
// import * as GrIcons from "react-icons/gr";
import { EditTask } from "./componentsTask/EditTask";
import { AddTask } from "./componentsTask/AddTask";
import { Tasknav } from "./componentsTask/Tasknav";
import { GlobalProvider } from "./componentsTask/context/GlobalState";

export const Task = () => {
	return (
		<div className="Task">
			<GlobalProvider>
				<Router>
					<Switch>
						<Route path="/task" exact component={Tasknav} />
						<Route path="/task/add" exact component={AddTask} />
						<Route path="/task/edit/:Id" exact component={EditTask} />
					</Switch>
				</Router>
			</GlobalProvider>
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
