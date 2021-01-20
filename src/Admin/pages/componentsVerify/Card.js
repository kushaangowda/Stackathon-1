import React from "react";

export const Card = ({ emp, verify }) => {
	return (
		<div className="col-md-6 col-lg-3 mb-4">
			<div className="card" style={{ textAlign: "center" }}>
				<img src={emp["picture"]} alt="profile image" className="card-img-top" />
				<div className="card-body">
					<h5 className="card-title">{emp["name"]}</h5>
					<p className="card-text">{emp["email"]}</p>
				</div>
				<div className="card-footer">
					<button className="btn btn-primary" onClick={() => verify(emp)}>
						Verified
					</button>
				</div>
			</div>
		</div>
	);
};
