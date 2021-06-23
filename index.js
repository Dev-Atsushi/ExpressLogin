const express = require('express');
const App = express();
const Router = require('./src/router');

App
    .use(express.static(__dirname + '/src/public'))
    .set('views', __dirname + '/src/views')
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use('/', Router)
    .engine('html', require('ejs').renderFile)
;

App.listen(3000, () => { console.log('App is running in port 3000') });
