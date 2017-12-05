var express = require('express');
var router = express.Router();


var mongodb_cli = require('../common/mongodb')

var redis_cli = require('../common/redis')


var func = require('../common/func')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register/send_sms',function(req,res,next){

      var keys = ['phone']

      var para = func.get_web_params(req,keys);

      if (para.ret != 0){

          res.json({code:-1,message:para.message})
      }

      para = para.data;

      var phone = para.phone;

      /*发送腾讯sms 暂时为空*/


})

router.post('/register',function (req,res,next) {

    var keys = ['phone','smscode']

    var para = func.get_web_params(req,keys);

    if (para.ret != 0){

        res.json({code:-1,message:para.message});
        return
    }

    para = para.data;

    mongodb_cli.count('users',{phone:para.phone},function(err,ret){

      if (err){

          res.json(func.op_db_error(err))
          return
      }

      if (ret != 0){

          res.json({code:-2001,message:"user is exsit"})
          return
      }

      redis_cli.get('register_'+para.phone,function(err,ret){

        if (err){

          res.json(func.op_db_error(err));
          return

        }


        /*if (para.smscode != ret){

            res.json({code:-2001,message:"验证码错误"})
        }*/

        var user_id = func.create_id();

        var data = {phone:para.phone,user_id:user_id};

        mongodb_cli.save('users',data,function(err,ret){

            if (err){

                res.json(func.op_db_error(err))
                return
            }

            res.json({code:0,data:data})
            return

        })
      })


    })


})

module.exports = router;
