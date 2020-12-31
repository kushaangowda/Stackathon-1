
"/employee"
{
    employees: [
        {
            email: "test@gmail.com",
            id: 1,
            name: Lorem,
            teamID: 23,
            Role: "ADMIN",
            Post: "Eng",
            Salary: 10,
            attendance: "10 days",
        },
        {
            email: "test12@gmail.com",
            id: 2,
            name: Lorem,
            teamID: 203,
            Role: "ADMIN",
            Post: "Eng",
            Salary: 10,
            attendance: "10 days",
        },
        {
            email: "test34@gmail.com",
            id: 44,
            name: Lorem,
            teamID: 23,
            Role: "ADMIN",
            Post: "Eng",
            Salary: 10,
            attendance: 10,
        }
    ]
}


"/employee/:email"
var obj = {
    email: "test34@gmail.com",
    id: 44,
    name: Lorem,
    teamID: 23,
    Role: "ADMIN",
    Post: "Eng",
    Salary: 10,
    attendance: 10,
}


"/task"
{
    tasks: [
        {
            name: "Name",
            description: "Descc",
            teamID: 23,
            deadline: "30 days"
        },
        {
            name: "Name",
            description: "Descc",
            teamID: 23,
            deadline: "30 days"
        }
    ]
}


"/task/:teamID"
var task = {
    name: "Name",
    description: "Descc",
    teamID: 23,
    deadline: "30 days"
}

"/team"
"/team/:teamID"




"/request"
{
    allRequests: [
        {
            empID: 1,
            type: "Payroll", //Payroll, Leave,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, tempora.",
            duration: "30 days",
            status: "Pending" //Accepted(1), Rejected(0), Pending(null, -1)
        },
        {
            empID: 1,
            type: "Payroll", //Payroll, Leave,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, tempora.",
            duration: "30 days",
            status: "Pending" //Accepted(1), Rejected(0), Pending(null, -1)
        }
    ]
}

"/request/:empID"
var emp_request = {
    empID: 1,
    type: "Payroll", //Payroll, Leave,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, tempora.",
    duration: "30 days",
    status: "Pending" //Accepted(1), Rejected(0), Pending(null, -1)
}







"/employee/add"
var obj = {
    email: "",
    name: "",
    teamID: "",
    Role: "",
    Post: "",
    Salary: "",
}
"/employee/delete/:empID"
"/employee/update/:empID"
var obj = {
    email: "",
    name: "",
    teamID: "",
    Role: "",
    Post: "",
    Salary: "",
}

"/team/add"
var team = {
    name: "",
    members: [
        "emp1", "emp2"
    ]
}
"/team/delete/:empID"
"/team/update/:empID"
var team = {
    name: "",
    members: [
        "emp1", "emp2"
    ]
}


"/request/add"
var request = {
    empID: 1,
    type: "Payroll", //Payroll, Leave,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, tempora.",
    duration: "30 days",
}
"/request/delete/:empID"
"/request/update/:empID"
var request = {
    empID: 1,
    type: "Payroll", //Payroll, Leave,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, tempora.",
    duration: "30 days",
    status: "Pending" //Accepted(1), Rejected(0), Pending(null, -1)
    // Status POST only from ADMIN
}

"/task/add"
var task = {
    name: "Name",
    description: "Descc",
    teamID: 23,
    deadline: "30 days"
}
"/task/delete/:empID"
"/task/update/:empID"
var task = {
    name: "Name",
    description: "Descc",
    teamID: 23,
    deadline: "30 days"
}