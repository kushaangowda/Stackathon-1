import React, { useState } from "react";

export const Card = ({ emp, verify, reject }) => {
	const [employee, setEmployee] = useState({
		email: emp["email"],
		name: emp["name"],
		Role: "employee",
		Post: "",
		Salary: 0,
		attendance: 0,
		teamID: "",
	});

	const handleFormChange = (type, value) => {
		var newEmp = employee;
		newEmp[`${type}`] = value;
		setEmployee(newEmp);
	};

	return (
		<div className="col-sm-6 col-lg-3 mb-4">
			<div className="card" style={{ textAlign: "center" }}>
				<img src={emp["picture"]} alt="profile image" className="card-img-top" />
				<div className="card-body">
					<h5 className="card-title">{emp["name"]}</h5>
					<p className="card-text">{emp["email"]}</p>
					<form>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-2">
									<label htmlFor="exampleInputPassword1">Salary</label>
								</div>
								<div className="col-sm-10">
									<input
										type="number"
										className="form-control"
										id="exampleInputPassword1"
										placeholder="10000"
										onChange={(e) => handleFormChange("Salary", e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-2">
									<label htmlFor="exampleInputPassword2">Post</label>
								</div>
								<div className="col-sm-10">
									<input
										type="text"
										className="form-control"
										id="exampleInputPassword2"
										placeholder="Engineer"
										onChange={(e) => handleFormChange("Post", e.target.value)}
									/>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div className="card-footer">
					<button className="btn btn-danger mr-4" onClick={() => reject(emp["sub"])}>
						Rejected
					</button>
					<button className="btn btn-primary ml-4" onClick={() => verify(emp, employee)}>
						Verified
					</button>
				</div>
			</div>
		</div>
	);
};
