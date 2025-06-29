const express = require("express");
const connection = require("./config/db");
const upload = require("./middleware/multer");
const BookModel = require("./models/bookModel");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3690;
app.set("view engine", "ejs");
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    let showBook = await BookModel.find({});
    console.log(showBook);
    res.render("home", { showBook });
  } catch (error) {
    console.log(error);
  }
  
});

app.post("/submit-book", upload, async (req, res) => {
  try {
    if (req.file) {
      req.body.image = "/uploads/" + req.file.filename;
    }
    await BookModel.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.get("/deleteBook", async (req, res) => {
  const id = req.query.bookId;
  console.log(id);
  const delBook = await BookModel.findById(id);
  console.log(delBook);
  try {
    fs.unlinkSync(path.join(__dirname, delBook.image));
    await BookModel.findByIdAndDelete(id);
    console.log("user is deleted successfully");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.get("/editBook/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const bookData = await BookModel.findById(id);
  console.log(bookData);
  res.render("edit", { bookData });
});

app.post("/updateBook", upload, async (req, res) => {
  console.log(req.body);
  try {
    const bookData = await BookModel.findById(req.body.id);
    if (!bookData) {
      console.log("Book not found for update.");
      return res.redirect("/");
    }  

    if (req.file) {  
      fs.unlinkSync(path.join(__dirname, bookData.image));
      req.body.image = "/uploads" + "/" + req.file.filename;
    }
    await BookModel.findByIdAndUpdate(req.body.id, req.body);
    console.log("bookData Updated successfully");
    res.redirect("/");
  } catch (error) { 
    console.log(error);
    res.redirect("/");
  }
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("server is not connected");
  } else {
    connection();
    console.log("server is connected", PORT);
  }
});
