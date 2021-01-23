import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from "react-json-pretty";
import axios from "axios";
import EmployeeCard from "../components/EmployeeCard";
import createNotification from "../../Notification";

function Home() {
	const { user } = useAuth0();

	const [employees, setEmployes] = useState([]);
	const [isError, setIsError] = useState(false);
	const [empDetails, setEmpDetails] = useState();
	const fetchEmployees = async () => {
		axios
			.get("http://api-stackathon.herokuapp.com/employee")
			.then((emp) => {
				console.log(emp["data"]);
				const fetchedEmployees = emp["data"];
				let temp = [];
				temp.push(
					fetchedEmployees.map((emp) => {
						return <EmployeeCard key={emp._id} details={emp} />;
					})
				);
				setEmployes(temp);
			})
			.catch((err) => {
				console.log(err);
				setIsError(true);
			});
	};

	useEffect(() => {
		fetchEmployees();
	}, []);

	useEffect(() => {
		if (isError) {
			setEmpDetails(<h1>Something went wrong</h1>);
			createNotification({
				title: ":(",
				message: "Something went wrong, Please try again later!!",
				type: "danger",
				time: 10000
			})

		} else {
			setEmpDetails(employees);
		}
	}, [isError, employees]);
	return (
		<div className="Home">
			<div className="user" style={{ textAlign: "center" }}>
				<h1>Welcome {user.given_name}</h1>

				<img src={user.picture} style={{ borderRadius: "50%" }} alt="profile pic" />
				<JSONPretty data={user} />
			</div>

			<table className="table table-hover table-bordered mt-5">
				<caption>List of Employees</caption>
				<thead className="thead-dark">
					<tr>
						<th className="text-uppercase">name</th>
						<th className="text-uppercase">email</th>
						<th className="text-uppercase">post</th>
						<th className="text-uppercase">role</th>
						<th className="text-uppercase">salary</th>
						<th className="text-uppercase">mark attendance</th>
					</tr>
				</thead>
				<tbody>{empDetails}</tbody>
			</table>
		</div>
	);
}

export default Home;
