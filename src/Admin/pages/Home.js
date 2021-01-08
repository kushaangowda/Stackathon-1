import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from "react-json-pretty";
import axios from "axios";
import EmployeeCard from '../components/EmployeeCard'

function Home() {
	const { user } = useAuth0();

	const [employees, setEmployes] = useState([])
	const [isError, setIsError] = useState(false)
	const [empDetails, setEmpDetails] = useState();
	const fetchEmployees = async () => {
		axios.get('http://localhost:5000/employee')
			.then((emp) => {
				console.log(emp['data'])
				const fetchedEmployees = emp['data'];
				let temp = []
				temp.push(
					fetchedEmployees.map((emp) => {
						return <EmployeeCard key={emp['_id']} details={emp} />
					})
				)
				setEmployes(temp)
			})
			.catch((err) => {
				console.log(err)
				setIsError(true);
			})
	}

	useEffect(() => {
		fetchEmployees();
	}, [])

	useEffect(() => {
		if (isError) {
			setEmpDetails(<h1>Something went wrong</h1>)
		}

		else {
			setEmpDetails(employees)
		}
	}, [isError, employees])
	return (
		<div className="Home" style={{ textAlign: 'center' }}>
			<h1>Welcome {user.given_name}</h1>
			<img src={user.picture} style={{ borderRadius: '50%' }} alt="user image" />
			{empDetails}
		</div>
	);
}

export default Home;
