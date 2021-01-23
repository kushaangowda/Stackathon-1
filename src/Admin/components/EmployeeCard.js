import axios from 'axios'
import React, { useState } from 'react'
import createNotification from '../../Notification'

export default function EmployeeCard(props) {

    const [attendanceMarked, setAttendanceMarked] = useState(false);
    const [isError, setIsError] = useState(false);
    const markAttendance = () => {
        axios.get(`https://api-stackathon.herokuapp.com/attendance/${props.details._id}/create`)
            .then((res) => {
                setAttendanceMarked(true)
                createNotification({
                    title: "Success",
                    message: "Attendance successfully marked!",
                    type: "success",
                    time: 3000
                })
            })
            .catch((err) => {
                createNotification({
                    title: "",
                    message: err.message,
                    type: "warning",
                    time: 1000

                })
                setAttendanceMarked(false);
                setIsError(true)
                createNotification({
                    title: ":(",
                    message: "Something went wrong, Please try again later!",
                    type: "danger",
                    time: 5000
                })
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
