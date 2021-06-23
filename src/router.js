const Router = require('express').Router();
const SimplDB = require('simpl.db')

const db = new SimplDB({collectionsFolder: './src/collections'});
const Login = db.createCollection('login', {});

Router.get("/", (__req, res) => { res.render('login.html') });
Router.get("/register", (__req, res) => { res.render('register.html') });

Router.post("/register", async (req, res) => {
    const query = Login.get(login => login.email === req.body.email);

    if(Object.keys(query).length > 0) {
        res.render('redirect.ejs', {
            message: 'Essa conta já existe!',
            redirectPath: 'register',
            goTo: 'registro'
        })
    } else {
        Login.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        return res.redirect('/')
    };
});
Router.post("/login", async (req, res) => {
    const query = Login.get(login => login.email === req.body.email && login.password === req.body.password)

    if (Object.keys(query).length > 0) {
        return res.send(`Olá ${query.name}!`)
    } else {
        res.render('redirect.ejs', {
            message: 'Essa conta não existe!',
            redirectPath: '/',
            goTo: 'login'
        });
    };
});

module.exports = Router;