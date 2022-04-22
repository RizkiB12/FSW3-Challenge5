const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
        content: "Welcome to the home page"
    })});

router.get("/add", (req, res) => {
    res.render("addNewCar");
});

router.get("/edit", (req, res) => {
    res.render("edit", {
        title: "Cars",
        content: "Welcome to t`he cars page"
    })});
module.exports = router;

