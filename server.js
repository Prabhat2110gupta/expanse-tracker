const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const colors = require('colors');
const connectDb=require("./config/connectDb");
const dotenv = require('dotenv');
dotenv.config();
connectDb();
const app=express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
// app.get('/',(req,res)=>{
//     res.send("<h>hello from server</h>");
// });
//routes for user
app.use("/api/v1/users",require("./routes/userRoute"));
//routes for transection
app.use("/api/v1/transections",require("./routes/transectionRoutes"));
const PORT=8080||process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});