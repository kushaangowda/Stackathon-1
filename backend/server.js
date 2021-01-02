const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRouter = require('./routes/Employee');
const requestRouter = require('./routes/Request');
const teamRouter = require('./routes/team')
const taskRouter = require('./routes/task')
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database linked successfully!');
})

app.use('/team', teamRouter)
app.use('/employee',employeeRouter);
app.use('/request',requestRouter);
app.use('/task',taskRouter);

app.listen(port,()=>{
  console.log("Server is running at port : " , port);
})
