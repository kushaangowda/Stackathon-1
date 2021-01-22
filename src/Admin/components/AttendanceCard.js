import axios from 'axios'
import React, { useState } from 'react'

export default function AttendanceCard(props) {
    const [attendanceMarked, setAttendanceMarked] = useState(false);
    const [isError, setIsError] = useState(false);
    const host = 'http://api-stackathon.herokuapp.com/'

    const name = props.name
    // {host + 'leaverequest/' + props.details._id}


    return (

        <tr key={props.details._id}>
            <td>{props.details.name}</td>
            <td>{props.details.email}</td>
            <td>{props.details.attendance}</td>
            <td><button className="btn btn-success" onClick={props.handleShow}>Check</button></td>
        </tr>





    )
}
