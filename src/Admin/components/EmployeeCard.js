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
            return <h3>Something Went Wrong</h3>
        if (attendanceMarked)
            return <h1>Attendance for today already marked</h1>
        else
            return <button onClick={markAttendance}>Mark Attendance</button>
    }

    return (
        <div className="emp-card">
            <h4>Name: {props.details.name}</h4>
            <h4>Email: {props.details.email}</h4>
            <h4>Post: {props.details.Post}</h4>
            <h4>Role: {props.details.Role}</h4>
            <h4>Salary: {props.details.Salary}</h4>
            {attendance()}

        </div>
    )
}
