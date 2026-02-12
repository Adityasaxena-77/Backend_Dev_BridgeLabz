const express=require("express");
const app=express();
const fs=require("fs");

app.use(express.urlencoded({extended:true}));
app.post("/student/registration",(req,res)=>{
  fs.appendFileSync("./students.json",JSON.stringify(req.body)+ "\n");
    const {name, branch}=req.body;

    console.log("Student Registered");
    console.log("Name", name);
    console.log("Branch", branch);
    res.send("Registered Successfully");


});

app.listen(3000,()=>{
    console.log("Server is running on 3000");
})