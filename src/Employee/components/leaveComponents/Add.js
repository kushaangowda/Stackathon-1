import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { demo } from '../../../Notification'

export const Add = ({ handleAdd, id }) => {
    let history = useHistory();
    console.log(id);
    const [payrollRequest, setPayrollRequest] = useState({
        empID: id,
        description: "",
        duration: 0,
        start: "",
        Status: "Pending"
    })

    useEffect(() => {
        demo(["Fill in the details and create your new leave request", "Then click on ADD REQUEST button to make your request reach the admin"])
    }, [])

    const handleFormChange = (value) => {
        setPayrollRequest({ ...payrollRequest, description: value });
        // console.log(newPayrollRequest);
    };
    const handleFormChange2 = (value) => {
        setPayrollRequest({ ...payrollRequest, start: value });
        // console.log(newPayrollRequest);
    };
    const handleFormChange3 = (value) => {
        setPayrollRequest({ ...payrollRequest, duration: value });
        // console.log(newPayrollRequest);
    };

    const handleSubmit = (e) => {
        handleAdd(payrollRequest);
        history.push("/leave");
    };

    return (
        <div>
            <form className="addEmployee" onSubmit={handleSubmit}>
                <div className="form-group">
                    <span>Description:</span>
                    <input
                        type="text"
                        className="form-control"
                        id="desc"
                        aria-describedby="description"
                        required
                        onChange={(e) => handleFormChange(e.target.value)}
                    />
                    <span>Duration of Leave:</span>
                    <input type="number" onChange={(e) => handleFormChange3(e.target.value)} className="form-control" required />
                    <span>Start of Leave:</span>
                    <input type="date" onChange={(e) => handleFormChange2(e.target.value)} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Request
				</button>
                <Link to="/Payroll" className="btn btn-primary ml-2">
                    Cancel
				</Link>
            </form>
        </div>
    );
};
