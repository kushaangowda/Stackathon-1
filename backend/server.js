const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {useNewUrlParser: true , useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',()=>{
  console.log('MongoDB database linked successfully!');
})

// app.use('/exercises',exercisesRouter);
// app.use('/users',userRouter);



app.listen(port,()=>{
  console.log("Server is running at port : " , port);
})
console.log(uri)