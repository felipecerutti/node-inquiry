var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var Recaptcha = require('express-recaptcha').RecaptchaV2;
var options = {'hl': 'en'};
var recaptcha = new Recaptcha('6Le4ZuYUAAAAAOeh5-cPBI6ntbcJvXFYh50e8X_x', '6Le4ZuYUAAAAAOqKg59KlXenI-NGfquk1aFQOICM', options);

var app = express();

//required by express-recaptcha in order to get data from body or query.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* GET home page. */
router.get('/', recaptcha.middleware.render, function (req, res, next) {
    //render view index.pug
    res.render('index', {title: 'Tasty Treats - Inquiry', captcha: res.recaptcha});
});

module.exports = router;
