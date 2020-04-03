var express = require('express');
const fs = require('fs');
var router = express.Router();
const {check, validationResult} = require('express-validator');

var bodyParser = require('body-parser');
var Recaptcha = require('express-recaptcha').RecaptchaV2;
var options = {'hl': 'en'};
var recaptcha = new Recaptcha('6Le4ZuYUAAAAAOeh5-cPBI6ntbcJvXFYh50e8X_x', '6Le4ZuYUAAAAAOqKg59KlXenI-NGfquk1aFQOICM', options);


var app = express();

//required by express-recaptcha in order to get data from body or query.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* GET Register Page. */
router.post('/', [
    //validate email
    check('email').isEmail()
], recaptcha.middleware.verify, function (req, res, next) {
    console.log(req.recaptcha);
    if (!req.recaptcha.error) {
        try {
            /*GET TODAY'S DATE*/
            var datetime = new Date();
            req.body.date = datetime.toISOString().slice(0, 19).replace("T", " ");

            /*CHECK FILE EXISTS*/
            if (fs.existsSync("inquires.json")) {
                /*APPEND DATA TO JSON FILE*/
                fs.appendFile('inquires.json', "," + JSON.stringify(req.body), 'utf8',
                        // callback function
                                function (err) {
                                    if (err)
                                        throw err;
                                    // if no error                                
                                });
                    } else {
                /* CREATE A CSV FILE TO STORE THE DATA*/
                fs.writeFile("inquires.json", "", function (err) {
                    if (err) {
                        return console.log(err);
                    } else {
                        /*APPEND DATA TO JSON FILE*/
                        fs.appendFile('inquires.json', "," + JSON.stringify(req.body), 'utf8',
                                // callback function
                                        function (err) {
                                            if (err)
                                                throw err;
                                            // if no error                                        
                                        });
                            }

                });
            }
        } catch (err) {
            console.error(err)
        }
    } else {
        res.send("Captcha error!");
        return false;
    }

    const errors = validationResult(req);
    //if validate email
    if (!errors.isEmpty()) {
        res.render('register', {title: 'Tasty Treats - Inquiry Send', msg: 'Email is invalid, try again.'});
    } else {
        res.render('register', {title: 'Tasty Treats - Inquiry Send', msg: 'Your inquiry was sent!'});
    }
});

module.exports = router;
