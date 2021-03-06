const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(fileUpload());

mongoose.connect("mongodb://localhost:27017/aviosDB", { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = {
  name: { type: String, required: true },
  description: { type: String, required: true },
  dateUploaded: { type: Date, required: true },
  dateEdited: Date

}

const Product = mongoose.model("Post", productSchema);

const uploadRouter = require("./routes/upload")

app.use("/upload", uploadRouter)

// Upload endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "no file uploaded" })
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });

  });

});

app.listen(4040, () => console.log("Server started on port 4040"));