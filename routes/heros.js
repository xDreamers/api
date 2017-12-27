
var express = require('express');
var router = express.Router();

var mongodb_cli = require('../common/mongodb')

/*
 var redis_cli = require('../common/redis')
 */

router.get('/get_category', function(req, res, next) {


    mongodb_cli.find('category',{},{_id:0},function(err,ret){

        if (err){

            res.json({err:err})
        }else{

            res.json({err:0,data:ret})
        }

        return;
    })
});


module.exports = router;