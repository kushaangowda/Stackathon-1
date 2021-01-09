import axios from 'axios'
import React, { useState } from 'react'

export default function EmployeeCard(props) {

    const [attendanceMarked, setAttendanceMarked] = useState(false);
    const [isError, setIsError] = useState(false);
    const markAttendance = () => {
        axios.get(`http://localhost:5000/attendance/${props.details._id}/create`)
            .then((res) => {
                setAttendanceMarked(true)
            })
            .catch((err) => {
                console.log(err)
                setAttendanceMarked(false);
                setIsError(true)
            })
    }

    const attendance = () => {
        if (isError)
            return <h6>Something Went Wrong</h6>
        if (attendanceMarked)
            return <h6>Attendance for today already marked</h6>
        else
            return <button onClick={markAttendance}>Mark Attendance</button>
    }

    return (
        <tr className="emp-card">
            <td>{props.details.name}</td>
            <td>{props.details.email}</td>
            <td>{props.details.Post}</td>
            <td>{props.details.Role}</td>
            <td>{props.details.Salary}</td>
            <td>{attendance()}</td>

        </tr>
    )
}
