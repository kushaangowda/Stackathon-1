import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export const AddTeam = ({ handleAdd, empdict }) => {
	let history = useHistory();

	const [team, setTeam] = useState({
		name: "",
		members: [],
	});

	const handleFormChange = (type, e) => {
		var newTeam = team;
		if (String(type) !== "members") {
			newTeam[`${type}`] = e.target.value;
		} else {
			var newMembers = team["members"];
			console.log(newMembers);
			if (e.target.checked) newMembers.push(e.target.value);
			else {
				newMembers = team["members"].filter((member) => {
					return String(member) !== String(e.target.value);
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
						required
						onChange={(e) => handleFormChange("name", e)}
					/>
				</div>
				{Object.keys(empdict).map((key) => {
					return (
						<div className="form-check" key={key}>
							<input
								className="form-check-input"
								type="checkbox"
								value={key}
								id={key}
								name="members"
								required
								onChange={(e) => handleFormChange("members", e)}
							/>
							<label className="form-check-label" htmlFor={key}>
								{empdict[key]}
							</label>
						</div>
					);
				})}

				<button type="submit" className="btn btn-primary">
					Add Team
				</button>
				<Link to="/team" className="btn btn-primary ml-2">
					Cancel
				</Link>
			</form>
		</div>
	);
};
