import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomModal from '../components/CustomModal'

function Home() {

    const [employees, setEmployes] = useState([])
    const [isError, setIsError] = useState(false)
    const [empDetails, setEmpDetails] = useState();
    const [modalTitle, setModalTitle] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);


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
                            <td><button className="btn btn-warning" onClick={() => { setShow(true); setModalTitle(name) }}>Check</button></td>
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
        <div>
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
            <CustomModal handleClose={handleClose} show={show} name={modalTitle} />
        </div>

        // <div className="" style={{ textAlign: 'center' }}>

        //     {empDetails}
        // </div>
    );
}

export default Home;
