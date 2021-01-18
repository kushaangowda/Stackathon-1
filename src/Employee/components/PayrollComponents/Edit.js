import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

export const Edit = ({ handleEdit, requests }) => {
    let history = useHistory();

    let params = useParams();
    const id = params.id;

    const req = requests.filter((req1) => {
        return String(req1._id) === String(id);
    });

    const [desc, setDesc] = useState(req[0].description)
    // const [name, setName] = useState(doc[0].name);
    // const [link, setLink] = useState(doc[0].link);

    const handleChange = (value) => {
        setDesc(value);
    };

    const handleSubmit = () => {
        // e.preventDefault()
        var req1 = {
            id: req[0]._id,
            description: desc,
        }
        // var doc1 = {
        // 	id: doc[0]._id,
        // 	name: name,
        // 	link: link,
        // };
        handleEdit(req1);
        history.push("/Payroll");
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
                        onChange={(e) => handleChange(e.target.value)}
                        value={desc}
                    />
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
