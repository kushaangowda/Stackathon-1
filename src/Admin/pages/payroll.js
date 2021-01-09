import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function Payroll() {

    const [employees, setEmployes] = useState([])
    const [isError, setIsError] = useState(false)
    const [empDetails, setEmpDetails] = useState();
    const [currdata, setcurdata] = useState();
    const host = 'http://localhost:5000/';

    const Accept = async(_id) => {
        axios.get(host+ 'payrollrequest/'+_id+'/accept');
    }

    const Reject = async(_id) => {
        axios.get(host+ 'payrollrequest/'+_id+'/reject');
    }

    const ChangeData = async (id) => {
        axios.get(host + 'payrollrequest/' + id)
            .then((res) => {
                if (res['data'].length == 0) {
                    setcurdata(
                        <tr>
                            <td>No Pending Requests</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    )

                } else {
                    let temp = [];
                    temp.push(
                        res['data'].map(({ description, Status, _id }) => {
                            if (Status == "Pending") {

                                return (<tr>
                                    <td>{description}</td>
                                    <td><button onClick={()=>Accept(_id)} type="button" class="btn btn-success" >Accept</button></td>
                                    <td><button onClick={()=>Reject(_id)} type="button" class="btn btn-danger" >Reject</button></td>
                                </tr>);
                            } else if (Status == "Accepted") {
                                return (<tr>
                                    <td>{description}</td>
                                    <td>Accepted</td>
                                    <td>-</td>
                                </tr>);
                            } else {
                                return (<tr>
                                    <td>{description}</td>
                                    <td>-</td>
                                    <td>Rejected</td>
                                </tr>);
                            }
                        })
                    )
                    setcurdata(temp);
                }
            })
    }


    const fetchEmployees = async () => {
        axios.get(host + 'employee')
            .then((emp) => {
                console.log(emp['data'])
                const fetchedEmployees = emp['data'];
                let temp = []
                temp.push(
                    fetchedEmployees.map(({ _id, name, email, Salary }) => {
                        return (<tr key={_id}>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{Salary}</td>
                            <td><button onClick={() => ChangeData(_id)} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Check</button> </td>
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
        <>



            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Requests</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <table className="table table-hover table-bordered mt-5">
                                <thead className="thead-dark">
                                    <tr>
                                        <th className="text-uppercase">Description</th>
                                        <th className="text-uppercase">Accept</th>
                                        <th className="text-uppercase">Reject</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {currdata}
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <span style={{ fontSize: 50, marginLeft: 100 }} >Payroll Information</span>
            <table className="table table-hover table-bordered mt-5">
                <caption>List of Employees</caption>
                <thead className="thead-dark">
                    <tr>
                        <th className="text-uppercase">name</th>
                        <th className="text-uppercase">email</th>
                        <th className="text-uppercase">salary</th>
                        <th className="text-uppercase">Payroll Requests</th>

                    </tr>
                </thead>
                <tbody>
                    {empDetails}

                </tbody>
            </table>
        </>
    );
}

export default Payroll;
