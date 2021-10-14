// const router = require("express").Router();
const express = require("express");
const app = express();
const timeout = require("connect-timeout");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Info = require("../models/info");
const createArrayMod = require("../utils/fakeData");
app.post("/post", upload.single("image"), timeout('5s'), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Imitating Vision Api, creating random labels about image
    createArrayMod.createFake()
    createArrayMod.createArray()
    const array = createArrayMod.createArray()
    console.log(array)
    // Create new info
    let info = new Info({
      name: array,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save info
    await info.save();
    res.json(info);
    res.end();
  } catch (err) {
    console.log(err);
  }
});

app.get("/get", timeout('5s'), async (req, res) => {
  try {
    let info = await Info.find();
    res.json(info);
  } catch (err) {
    console.log(err);
  }
});
app.delete("/delete/:id", async (req, res) => {
  try {
    // Find user by id
    let info = await Info.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(info.cloudinary_id);
    // Delete user from db
    await info.remove();
    res.json(info);
  } catch (err) {
    console.log(err);
  }
});
module.exports = app;
