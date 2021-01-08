export default (state, action) => {
	switch (action.type) {
		case "DELETE_TASK":
			return {
				...state,
				Tasks: state.Tasks.filter((Tasks) => {
					return Tasks.Id !== action.payload;
				}),
			};

		case "ADD_TASK":
			return {
				...state,
				Tasks: [action.payload, ...state.Tasks],
			};
		case "EDIT_TASK":
			const updateTask = action.payload;

			const updateTasks = state.Tasks.map((Tasks) => {
				if (Tasks.Id === updateTask.Id) {
					updateTask["Team"] = Tasks["Team"];
					updateTask["Status"] = Tasks["Status"];
					return updateTask;
				}
				return Tasks;
			});
			return {
				...state,
				Tasks: updateTasks,
			};

		default:
			return state;
	}
};
