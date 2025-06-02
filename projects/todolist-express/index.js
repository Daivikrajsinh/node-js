const express = require("express");
const app = express();
const PORT = 3699;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let data = [];

app.get("/", (req, res) => { 
  res.render("home", { data });
});

app.post("/add", (req, res) => { 
const { task_title, task_desc, status, deadline } = req.body;

  if (!task_title || !task_desc || !status || !deadline) {
    console.log("Please fill all required fields");
    return res.redirect("/");
  }
  
  data.push(req.body); 
  console.log("Data added successfully:", req.body);
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  console.log(req.params);
  data = data.filter((item, i) => i != req.params.id);
  console.log("Data Deteled Successfully");
  return res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  const getData = data[req.params.id];
  res.render("edit", { getData, id });
});

app.post("/updateData", (req, res) => {


  const id = req.body.id; 
  const updatedData = {
   task_title: req.body.task_title,
    task_desc: req.body.task_desc,
    status: req.body.status,
    deadline: req.body.deadline,
  };

  // Update your data array
  data[id] = updatedData;

console.log("Update Successfully:", updatedData);
  res.redirect("/");// Or wherever you want to redirect
});
app.listen(PORT, (error) => {
  if (error) { 
    console.log("server is not connecting");
  } else {
    console.log("server is connected", PORT);
  }
});
