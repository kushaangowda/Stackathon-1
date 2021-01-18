import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="empnav">
            <Link className="empnavLink" to="/Payroll">
                Home
			</Link>
            <Link className="empnavLink" to="/Payroll/add">
                New Payroll Request
			</Link>
        </div>
    );
};
