const express = require("express");
const app = express();
const PORT= 3690;
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("home")    
})

app.get("/about",(req,res)=>{    
    res.render("about") 
}) 

app.get("/contact",(req,res)=>{ 
    res.render("contact")
}) 

app.get("/services",(req,res)=>{ 
    res.render("services")
})

app.listen(PORT,(err)=>{
if(err){
    console.log("Server is not connected")
}else{
    console.log("Server is connected",PORT)
}
})
