const express   = require("express");
const server    = express();

const postRoute = require("./controllers/post.methods")

server.use(express.static(__dirname + "/public"));
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

server.use("/login/api", postRoute);

server.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

server.get("/register", (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

server.get("/alreadyExists", (req, res) => {
    res.sendFile(__dirname + '/views/helper/alreadyExists.html');
});

server.get("/notExists", (req, res) => {
    res.sendFile(__dirname + '/views/helper/notExists.html');
});

server.listen(3000);