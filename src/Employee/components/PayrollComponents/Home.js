import React from "react";
import "../leaveComponents/pages.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

export const Home = ({ requests, handleDelete }) => {

    return (
        <div className="table-responsive">
            <h2 className="pageTitle">Manage Your Payroll Requests</h2>
            <div id="no-more-tables">
            <table className="table table-hover table-bordered">
                <caption>List of Documents</caption>
                <thead className="thead-dark">
                    <tr>
                        <th className="text-uppercase">S.No</th>
                        <th className="text-uppercase">Description</th>
                        <th className="text-uppercase">edit</th>
                        <th className="text-uppercase">delete</th>
                        <th className="text-uppercase">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => {
                        return (
                            <tr key={request[`_id`]}>
                                <td className="text-uppercase" data-title="S.No">{requests.indexOf(request) + 1}</td>
                                <td className="text-uppercase" data-title="Description">{request.description}</td>
                                <td className="text-uppercase" data-title="edit">
                                    <Link to={"/payroll/edit/" + request._id} className="btn btn-warning">
                                        Edit <FaIcons.FaEdit />
                                    </Link>
                                </td>
                                <td  data-title="delete" className="deleteIcon">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            handleDelete(request._id);
                                        }}
                                    >
                                        Delete <RiIcons.RiDeleteBin5Fill />
                                    </button>
                                </td>
                                <td className="text-uppercase" data-title="Status">{request.Status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </div>
    );

};
