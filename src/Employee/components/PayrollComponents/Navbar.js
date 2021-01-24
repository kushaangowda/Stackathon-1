import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="empnav">
            <ul className="addandeditbutton">
                {/* <li>
                    <Link className="empnavLink" to="/leave">
                        Home
			        </Link>
                </li> */}
                <li>
                    <Link className="empnavLink" to="/Payroll/add">
                        New Payroll Request
			        </Link>
                </li>
            </ul>
        </div>
    );
};
