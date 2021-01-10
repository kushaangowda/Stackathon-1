import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

export const EditTeam = ({ empdict, handleEdit, teams }) => {
	let history = useHistory();

	let params = useParams();
	const id = params.id;

	const team = teams.filter((team1) => {
		return team1._id == id;
	});

	const [name, setName] = useState(team[0].name);
	const [members, setMembers] = useState(team[0].members);

	const handleNameChange = (value) => {
		setName(value);
	};

	const handleMembersChange = (e) => {
		var newMembers = members;
		// console.log(newMembers);
		if (e.target.checked) newMembers.push(e.target.value);
		else {
			newMembers = [];
			newMembers = members.filter((member) => {
				return member != e.target.value;
			});
		}
		setMembers(newMembers);
		console.log(newMembers);
	};

	const handleSubmit = () => {
		var team = {
			id: id,
			name: name,
			members: members,
		};
		console.log(team);
		handleEdit(team);
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
						onChange={(e) => handleNameChange(e.target.value)}
						value={name}
					/>
				</div>
				{Object.keys(empdict).map((key) => {
					if (members.indexOf(key) > -1) {
						return (
							<div className="form-check" key={key}>
								<input
									className="form-check-input"
									type="checkbox"
									value={key}
									id={key}
									name="members"
									onChange={(e) => handleMembersChange(e)}
									defaultChecked
								/>
								<label className="form-check-label" htmlFor={key}>
									{empdict[key]}
								</label>
							</div>
						);
					}
					return (
						<div className="form-check" key={key}>
							<input className="form-check-input" type="checkbox" value={key} id={key} name="members" onChange={(e) => handleMembersChange(e)} />
							<label className="form-check-label" htmlFor={key}>
								{empdict[key]}
							</label>
						</div>
					);
				})}

				<button type="submit" className="btn btn-primary">
					Update Team
				</button>
				<Link to="/team" className="btn btn-primary ml-2">
					Cancel
				</Link>
			</form>
		</div>
	);
};
