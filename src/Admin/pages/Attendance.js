import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function Home() {

    const [employees, setEmployes] = useState([])
    const [isError, setIsError] = useState(false)
    const [empDetails, setEmpDetails] = useState();

    const host = 'http://localhost:5000/'
    const fetchEmployees = async () => {
        axios.get(host + 'employee')
            .then((emp) => {
                console.log(emp['data'])
                const fetchedEmployees = emp['data'];
                let temp = []
                temp.push(
                    fetchedEmployees.map(({ _id, name, email, attendance }) => {
                        return (<tr key={_id}>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{attendance}</td>
                            <td><a href={host + 'leaverequest/' + _id}><button className="btn btn-success">Check</button></a> </td>
                        </tr>);
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
        <table className="table table-hover table-bordered mt-5">
            <caption>List of Employees</caption>
            <thead className="thead-dark">
                <tr>
                    <th className="text-uppercase">name</th>
                    <th className="text-uppercase">email</th>
                    <th className="text-uppercase">attendance</th>
                    <th className="text-uppercase">Leave Requests</th>

                </tr>
            </thead>
            <tbody>
                {empDetails}

            </tbody>
        </table>
        // <div className="" style={{ textAlign: 'center' }}>

        //     {empDetails}
        // </div>
    );
}

export default Home;
