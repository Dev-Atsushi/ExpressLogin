const router   = require('express').Router();
const SimplDB  = require('simpl.db');

const db       = new SimplDB();
const Login    = db.createCollection('login', {});

router.post("/createAccount", async (req, res) => {
    const query = Login.get(l => l.name === req.body.name && l.email === req.body.email);

    if(Object.keys(query).length === 0) {
        Login.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    } else {
        return res.redirect("/alreadyExists")
    };

    return res.redirect("/");
});

router.post("/loginAccount", async (req, res) => {
    const query = Login.get(l => l.name === req.body.name && l.password === req.body.password)

    if (Object.keys(query).length > 0) {
        return res.send("Olá! "+ req.body.name)
    } else {
        return res.redirect("/notExists")
    };
});

module.exports = router;