import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

export const Edit = ({ handleEdit, requests }) => {
    let history = useHistory();

    let params = useParams();
    const id = params.id;

    const req = requests.filter((req1) => {
        return String(req1._id) === String(id);
    });

    console.log(id);
    const [payrollRequest, setPayrollRequest] = useState({
        empID: req[0].empID,
        description: req[0].description,
        duration: req[0].duration,
        start: req[0].start,
        Status: "Pending"
    })

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
        handleEdit(payrollRequest, id);
        history.push("/leave");
    };

    return (
        <div>
            <form className="addEmployee" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail2">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail2"
                        aria-describedby="desc"
                        onChange={(e) => handleFormChange(e.target.value)}
                        value={payrollRequest.description}
                    />
                    <span>Duration of Leave:</span>
                    <input value={payrollRequest.duration} type="number" onChange={(e) => handleFormChange3(e.target.value)} className="form-control" />
                    <span>Start of Leave:</span>
                    <input value={payrollRequest.start} type="date" onChange={(e) => handleFormChange2(e.target.value)} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Description
				</button>
                <Link to="/Payroll" className="btn btn-primary ml-2">
                    Cancel
				</Link>
            </form>
        </div>
    );
};
