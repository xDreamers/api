
var express = require('express');
var router = express.Router();

var mongodb_cli = require('../common/mongodb')
var func = require('../common/func');


/* GET home page. */
router.get('/', function(req, res, next) {

    var array = [{

        name:'女娲'
    },{

        name:'梦奇'
    },{

        name:'干将莫邪'
    },{

        name:'诸葛亮'
    },{

        name:'钟馗'
    },{

        name:'不知火舞'
    },{

        name:'张良'
    },{

        name:'安其拉'
    },{

        name:'貂蝉'
    },{

        name:'武则天'
    },{

        name:'甄姬'
    },{

        name:'周瑜'
    },{

        name:'芈月'
    },{

        name:'扁鹊'
    },{

        name:'孙膑'
    },{

        name:'高渐离'
    },{

        name:'嬴政'
    },{

        name:'妲己'
    },{

        name:'墨子'
    },{

        name:'小乔'
    }];


    var owned_id = '34afc800-e9e4-11e7-bbd9-67a23cddd58f'; //法师


/*
    var owned_id = '4e908980-e9e4-11e7-b769-6395bf78ee2d'; //射手
*/


/*
    var owned_id = '88fe4530-e9e4-11e7-9537-41bde47570a5'; //坦克
*/





/*
 var owned_id='9a40e910-e9e4-11e7-9887-71a964c098ba';//刺客
*/



/*var owned_id = 'a716bcf0-e9e4-11e7-b605-2f30e875405f'; //战士*/

/*
var owned_id = 'b97901a0-e9e4-11e7-89ac-19c1667d1563' //辅助
*/

    for (var i = 0;i < array.length;i++){

        var id = func.create_id();

        array[i].id = id;
        array[i].owned_id =owned_id
    }


    for (var i = 0;i<array.length;i++){

        mongodb_cli.update('heros',{name:array[i].name},{$push:{"owned_id":owned_id},$set:{id:array[i].id}},function(err,ret){

            console.log(err)
        })

    }

    res.json('ok')



});

module.exports = router;
