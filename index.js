const express = require("express");
const ejs = require("ejs");
const path = require('path');
const qrcode = require("qrcode");
const app = express();
const port = process.env.port || 3000;

app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'));
app.get("/",(req, res, next) => {
    res.render("index")
});
app.get('/FAQ', (req, res) => {
    res.render('FAQ.ejs');
});
app.get('/PlansandPrices', (req, res) => {
    res.render('PlansandPrices.ejs');
});
app.get('/Services', (req, res) => {
    res.render('Services.ejs');
});
app.get('/Contact', (req, res) => {
    res.render('Contact.ejs');
});
app.get('/Login', (req, res) => {
    res.render('Login.ejs');
});


app.post('/scan', (req, res, next) => {
const input_text = req.body.text;
qrcode.toDataURL(input_text, (err, src) => {
    if (err) res.send("something went wrong!");
    res.render("scan", {
       qr_code: src,
       });
    });
});

app.listen(port, console.log(`listening on port ${port}`));
