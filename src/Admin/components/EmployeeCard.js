import axios from "axios";
import React, { useState } from "react";
import createNotification from "../../Notification";

export default function EmployeeCard(props) {
	const [attendanceMarked, setAttendanceMarked] = useState(false);
	const [isError, setIsError] = useState(false);
	const markAttendance = () => {
		axios
			.get(`http://api-stackathon.herokuapp.com/attendance/${props.details._id}/create`)
			.then((res) => {
				setAttendanceMarked(true);
				createNotification({
					title: "Success",
					message: "Attendance successfully marked!",
					type: "success",
					time: 3000,
				});
			})
			.catch((err) => {
				console.log(err);
				setAttendanceMarked(false);
				setIsError(true);
				createNotification({
					title: ":(",
					message: "Something went wrong, Please try again later!",
					type: "danger",
					time: 5000,
				});
			});
	};

	const attendance = () => {
		if (isError) return <h6>Something Went Wrong</h6>;
		if (attendanceMarked) return <h6>Attendance for today already marked</h6>;
		else
			return (
				<button className="btn btn-success" onClick={markAttendance}>
					Mark Attendance
				</button>
			);
	};


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
            <td  data-title="NAME">{props.details.name}</td>
            <td  data-title="EMAIL">{props.details.email}</td>
            <td  data-title="POST">{props.details.Post}</td>
            <td  data-title="ROLE">{props.details.Role}</td>
            <td data-title="SALARY">{props.details.Salary}</td>
            <td  data-title="ATTENDANCE">{attendance()}</td>
        </tr>
    )
}
