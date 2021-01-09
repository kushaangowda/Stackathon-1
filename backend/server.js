const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRouter = require('./routes/Employee');
const leaveRequestRouter = require('./routes/leaveRequest');
const payrollRequestRouter = require('./routes/payrollRequest');
const teamRouter = require('./routes/team')
const attendanceRouter = require('./routes/Attendance')
const taskRouter = require('./routes/task')
const documentRouter = require('./routes/Document')
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database linked successfully!');
})

app.use('/team', teamRouter)
app.use('/employee', employeeRouter);
app.use('/leaverequest', leaveRequestRouter);
app.use('/payrollrequest', payrollRequestRouter);
app.use('/attendance', attendanceRouter);
app.use('/task', taskRouter);
app.use('/document',documentRouter);

app.listen(port, () => {
  console.log("Server is running at port : ", port);
})
