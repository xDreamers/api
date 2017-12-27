var express = require('express');
var router = express.Router();


var mongodb_cli = require('../common/mongodb')

/*
var redis_cli = require('../common/redis')
*/


var func = require('../common/func');

/*
var sender = require('../common/sms_render');
*/


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


      mongodb_cli.count('users',{phone:para.phone},function(err,ret) {

        if (err) {

            res.json(func.op_db_error(err))
            return
        }

        if (ret != 0) {

            res.json({code: -2001, message: "user is exsit"})
            return
        }


        var phone = para.phone;

        var sms_code = func.create_sms_code();

        sender.singleSmsSend(0, '86', phone, '您正在注册回收基地，验证码为' + sms_code + "  有效期5分钟", '', '', function (data) {

            var ret = JSON.parse(data);

            console.log(ret)

            if (0 != ret.result) {

                res.json({code: ret.result, message: "验证码发送失败"});
                return;

            }

            redis_cli.set("register_" + phone, sms_code, 5 * 60);

            res.json({code: 0, data: []});

            return;
        });
    })

})

router.post('/register',function (req,res,next) {

    var keys = ['phone','smscode','password']

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


/*
          腾讯的验证码需要小程序上线后才能申请使用，扯淡！！
*/
       /* if (para.smscode != ret){

            res.json({code:-2001,message:"验证码错误"});
            return;
        }*/

        var user_id = func.create_id();

        var data = {phone:para.phone,user_id:user_id};
            data.password = para.password

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
