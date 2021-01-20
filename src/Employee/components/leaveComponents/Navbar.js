import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="empnav">
            <Link className="empnavLink" to="/leave">
                Home
			</Link>
            <Link className="empnavLink" to="/leave/add">
                New Leave Request
			</Link>
        </div>
    );
};
