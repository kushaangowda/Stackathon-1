import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
	Tasks: [
		{
			Id: 1,
			Name: "Random",
			Description: "loremvallis.com This is a small description on loremvallis.com This is a small description ",
			Team: "Team1",
			Deadline: "2020-10-12",
			Status: "Pending",
		},
		{
			Id: 2,
			Name: "Random2",
			Description: "loremvallis.com This is a small description on loremvallis.com This is a small description ",
			Team: "Team12",
			Deadline: "2020-10-30",
			Status: "Done",
		},
	],
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	const deleteTask = (Id) => {
		dispatch({
			type: "DELETE_TASK",
			payload: Id,
		});
	};

	const addTask = (Tasks) => {
		dispatch({
			type: "ADD_TASK",
			payload: Tasks,
		});
	};
	const editTask = (Tasks) => {
		dispatch({
			type: "EDIT_TASK",
			payload: Tasks,
		});
	};

	return (
		<GlobalContext.Provider
			value={{
				Tasks: state.Tasks,
				deleteTask,
				addTask,
				editTask,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
