var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    //LOAD FILE inquires.json
    let rawdata = fs.readFileSync('inquires.json');
    //prepare string to become a json
    let inquires = JSON.parse("[" + rawdata + "]");

    //sort the array DESC by date
    inquires.sort(function (a, b) {
        var dateA = new Date(a.date), dateB = new Date(b.date);
        return dateB - dateA;
    });

    //render view inquires.pug
    res.render('inquires', {title: 'Tasty Treats - Inquiry', json: inquires});

});

module.exports = router;
