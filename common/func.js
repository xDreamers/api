
var UUID = require('uuid');


var func = {}

func.get_web_params = function(req,keys){

    console.log(req.body)

    var para = {...req.query,...req.body}

    var para_keys = Object.keys(para)


    for (var i = 0;i<keys.length;i++){

        if (para_keys.contains(keys[i]))
         continue
         else
         return {ret:-1,message:'param '+keys[i] +' is miss'}
    }

    return {ret:0,data:para}


}


func.op_db_error = function(err){

    return {code:err,message:"operate db error"}
}



func.create_id = function(){

    return UUID.v1();

}

module.exports = func;