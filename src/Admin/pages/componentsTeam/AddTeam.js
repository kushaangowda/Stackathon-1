import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const AddTeam = ({ handleAdd, employees }) => {
	let history = useHistory();

	const [team, setTeam] = useState({
		name: "",
		members: [],
	});

	const handleFormChange = (type, e) => {
		var newTeam = team;
		if (type != "members") {
			newTeam[`${type}`] = e.target.value;
		} else {
			var newMembers = team["members"];
			console.log(newMembers);
			if (e.target.checked) newMembers.push(e.target.value);
			else {
				newMembers = team["members"].filter((member) => {
					return member != e.target.value;
				});
			}
			newTeam["members"] = newMembers;
		}
		setTeam(newTeam);
		console.log(team);
	};

	const handleSubmit = () => {
		handleAdd(team);
		history.push("/team");
	};

	return (
		<div>
			<form className="addEmployee" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Name</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={(e) => handleFormChange("name", e)}
					/>
				</div>

				{employees.map((emp) => {
					return (
						<div className="form-check" key={emp._id}>
							<input
								className="form-check-input"
								type="checkbox"
								value={emp._id}
								id={emp._id}
								name="members"
								onChange={(e) => handleFormChange("members", e)}
							/>
							<label className="form-check-label" htmlFor={emp._id}>
								{emp.name}
							</label>
						</div>
					);
				})}

				<button type="submit" className="btn btn-primary">
					Add Team
				</button>
			</form>
		</div>
	);
};
