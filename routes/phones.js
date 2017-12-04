
var express = require('express');
var router = express.Router();

var mongodb_cli = require('../common/mongodb')

var redis_cli = require('../common/redis')

router.get('/get_hot_phones', function(req, res, next) {


    mongodb_cli.find("hot_phones",{},{_id:0},function(err,data){


        console.log(err)
        console.log(data)
        if (err){

            res.json({code:err,message:"read db error"})
        }

        res.json({code:0,data:data})
    })
});


module.exports = router;