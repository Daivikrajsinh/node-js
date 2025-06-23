const express = require("express");
const upload = require("./middlewere/multer");
const MovieModel = require("./models/movieModel");
const fs = require("fs");
const path = require("path");
const connections  = require("./config/db");
const app = express();
const port = 8083;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", async (req, res) => {
  try {
    let movieData = await MovieModel.find({});
    // console.log(showData)
    res.render("home", { movieData });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  } 
}); 

app.post("/add-movie", upload, async (req, res) => {
  try {
    if (req.file) {
      req.body.image = "/uploads/" + req.file.filename;
      console.log("file", req.file);
    }
    await MovieModel.create(req.body);
    console.log("body", req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.get("/deleteMovie", async (req, res) => {
  const id = req.query.dataId;
  console.log("id", id);

  const movieData = await MovieModel.findById(id);
  console.log("moviedata", movieData);
  try {
    // console.log(image)
    await MovieModel.findByIdAndDelete(id);
    fs.unlinkSync(path.join(__dirname, movieData.image));
  
    console.log("Movie is deleted successfully");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.get("/editMovie/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const movieData = await MovieModel.findById(id);
  res.render("edit", { movieData });
});

app.post("/updateMovie", upload, async (req, res) => {
    console.log(req.body)
  try {
    const movieData = await MovieModel.findById(req.body.id);

    if (req.file) {
      fs.unlinkSync(path.join(__dirname, movieData.image)); 
      req.body.image = "/uploads" + "/" + req.file.filename;
    }
    
    await MovieModel.findByIdAndUpdate(req.body.id, req.body);
    console.log("Movie Data Updated SuccessFulley");
    res.redirect("/");
  } catch (error) {   
    console.log(error);
    res.redirect("/"); 
  }
}); 

app.listen(port, (error) => {
  if (error) { 
    console.log("Server is not connecting");
  }
  connections()
  console.log(`Server is connected`, port);
});
 