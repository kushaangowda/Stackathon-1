import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomModal from '../components/CustomModal'
import { RiAirplayLine } from "react-icons/ri";

function Home() {

    const [employees, setEmployes] = useState([])
    const [isError, setIsError] = useState(false)
    const [empDetails, setEmpDetails] = useState();
    const [modalTitle, setModalTitle] = useState('')
    const [modalEmpID, setModalEmpID] = useState('')
    const [modalBody, setModalBody] = useState(<></>)

    const [show, setShow] = useState(false);

    let fetchedLeaveRequests = []
    const handleClose = () => setShow(false);

    function handleClick(name, id) {
        setShow(true);
        setModalTitle(name)
        setModalEmpID(id)
        const request = getRequestById(id)
        if (request) {
            const body = (
                <div>
                    <div className="form-group">
                        <label for="duration">Duration</label>
                        <input type="text" className="form-control" id="duration" value={request['duration']} readOnly />
                    </div>

                    <div className="form-group">
                        <label for="start">start</label>
                        <input type="text" className="form-control" id="start" value={request['start'].slice(0, 10)} readOnly />
                    </div>

                    <div className="form-group">
                        <label for="description">Description</label>
                        <input type="text" className="form-control" id="description" value={request['description']} readOnly />
                    </div>
                </div>
            )
            setModalBody(body)

        }
        else {
            setModalBody(<h4>Nothing Here</h4>)
        }
    }


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
                            <td><button className="btn btn-warning" onClick={() => handleClick(name, _id)}>Check</button></td>
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

    const fetchLeaveRequests = async () => {
        axios.get(host + 'leaverequest')
            .then((req) => {
                fetchedLeaveRequests = req['data'];
                console.log(fetchedLeaveRequests)
            })
            .catch((err) => {
                console.log(err)
                setIsError(true);
            })
    }

    function getRequestById(id) {

        let res = 0
        fetchedLeaveRequests.forEach((request) => {

            if (request['empID'] != undefined) {
                const a = String(request['empID'])
                const b = String(id)
                console.log(a === b)
                if (a === b) {
                    res = request
                    return
                }
            }

        })

        return res
    }

    function handleAccept(empID) {
        setShow(false)
        console.log(host + 'leaverequest/update/' + empID)
        axios.put(host + 'leaverequest/update/' + empID, { 'Status': 'Accepted' })
            .then((res) => console.log(res))
    }

    function handleReject(empID) {
        setShow(false)
        console.log(host + 'leaverequest/update/' + empID)
        axios.put(host + 'leaverequest/update/' + empID, { 'Status': 'Rejected' })
            .then((res) => console.log(res))
    }

    useEffect(() => {
        fetchEmployees();
        fetchLeaveRequests();
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
            <CustomModal handleClose={handleClose} show={show} name={modalTitle} id={modalEmpID} body={modalBody} accept={handleAccept} reject={handleReject} />
        </div>

        // <div className="" style={{ textAlign: 'center' }}>

        //     {empDetails}
        // </div>
    );
}

export default Home;
