var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');

// app.use('/assets', function(req, res, next) {
//    console.log(req.url);
//     next();
// });
app.use('/assets', express.static('stuff'));


// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function(req, res) {
    // res.sendFile(__dirname + '/index.html');
    res.render('index');
});

app.get('/contact', function(req, res) {
    //  res.send('this is the contact page');
    /*
    http://localhost:3000/contact?dept=IT&person=shiv  ==> query dtring
    res.render('contact');
    console.log(req.query);
    */
    res.render('contact', { qs: req.query });
});

// POST /contact gets urlencoded bodies
app.post('/contact', urlencodedParser, function(req, res) {
    console.log(req.body);
    res.render('contact-success', { data: req.body });
});

// app.get('/profile/:name', function(req, res) {
//     res.send('You requested to see the profile with the name' + req.params.name);
// });

app.get('/profile/:name', function(req, res) {
    // var data = { age: 29, job: 'ninja' };
    var data = { age: 29, job: 'ninja', hobbies: ['eating', 'swimming', 'coding'] };
    res.render('profile', { person: req.params.name, data: data });
});


app.listen(3000);