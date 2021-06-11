require('dotenv').config({
    path: '.env' 
});

const express  = require("express");
const server   = require('express')();
const SimplDB  = require('simpl.db');

const db = new SimplDB();
const Login = db.createCollection('login', {});

server.use(express.static("public"));
server.use(express.json());
server.engine("html", require("ejs").renderFile)
server.set("view engine", "ejs")
server.use(express.urlencoded({
    extended: true
}));

server.get("/", (req, res) => {
    res.render("login", {
        db,
        Login
    });
});

server.get("/register", (req, res) => {
    res.render('register', {
        db,
        Login
    });
});

server.post("/login/api/createAccount", async (req, res) => {
    if(Login.get(l => l.name === req.body.name).length > 0
    && Login.get(l => l.email === req.body.email).length > 0) {
        Login.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    } else {
        return res.send("<script>alert('Conta já existente!'); setTimeout(() => { window.location.href = '/' }, 1500)</script>");
    };

    return res.redirect("/")
});

server.post("/login/api/loginAccount", async (req, res) => {
    const query = Login.get(l => l.name === req.body.name && l.password === req.body.password)

    if (Object.keys(query).length > 0) {
        return res.send("Olá! "+ req.body.name)
    } else {
        return res.send("<script>alert('Esta conta não existe!'); setTimeout(() => { window.location.href = '/' }, 1500)</script>");
    };
});

server.listen(3000)