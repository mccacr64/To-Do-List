// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = [];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {

    let day = date.getDate();

    res.render("list", {
        listTitle: day,
        newListItem: items,    
    });

});

app.post("/", (req, res) => {

    let item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

// WORK

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List", 
        newListItem: workItems,
    });
});

// About Page

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => {
    console.log("App running on port 3000")
})