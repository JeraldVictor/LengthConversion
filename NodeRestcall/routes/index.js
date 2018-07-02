var express = require('express');
var router = express.Router();
var db = require('diskdb');
var path = require('path');

db.connect(path.join(__dirname,'../db'), ['dbvalues']);

/* GET home page. */
router.get('/', function(req, res, next) {
    var output=[];
    db.dbvalues.find().forEach((i)=>{
        output.push({measurement:i.measurement,unit:i.unit});
    });
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(output));
});

router.get("/conversion/:val/:mes",function (req,res) {
    var measure=req.params.mes;
    var value=req.params.val;
    var output=[];
    db.dbvalues.find({unit:measure}).forEach((i)=>{
        var measurement = i.measurement;
        i.conversion.forEach((j)=>{
            output.push({measurement: measurement,unit: j.unit, conversion: (j.value * value)})
        });
    });
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(output))
});
module.exports = router;
