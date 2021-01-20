import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export const Add = ({ handleAdd, id }) => {
    let history = useHistory();
    console.log(id);
    const [payrollRequest, setPayrollRequest] = useState({
        empID: id,
        description: "",
        Status: "Pending"
    })
    // const [doc, setDoc] = useState({
    // 	name: "",
    // 	link: "",
    // });

    const handleFormChange = (value) => {
        setPayrollRequest({ ...payrollRequest, description: value });
        // console.log(newPayrollRequest);
    };

    const handleSubmit = () => {
        handleAdd(payrollRequest);
        history.push("/Payroll");
    };

    return (
        <div>
            <form className="addEmployee" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="desc"
                        aria-describedby="description"
                        onChange={(e) => handleFormChange(e.target.value)}
                    />
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
