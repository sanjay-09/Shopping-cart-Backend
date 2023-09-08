const express=require("express");
const app=express();
const dbConnector=require("./dbConnector");
const dotenv=require("dotenv");
const authRouter=require("./Routers/auth");
const cors=require("cors");
dotenv.config({path:"./.env"})

app.use(express.json());




app.use(cors({
    credentials:true,
    
    origin:'http://localhost:1234'
}))
app.use("/auth",authRouter);
dbConnector();
app.get("/",(req,res)=>{
    res.send("ok");

});
const PORT=4003;
app.listen(PORT,(req,res)=>{
    console.log("running on the port No.",PORT);
})