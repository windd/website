let express = require('express');
let goods = require('../controls/goods');
let user = require('../controls/user');
let map=require('../controls/map')
let data=require('../controls/data')
let command=require('../controls/command')
let api = require('../api');
let upload = require('../utils/upload');

let router = express.Router();

// goods
router.get(api.goodsList, goods.fetchAll);

router.post(api.goodsDetail, goods.fetchById);
router.post(api.goodsAdd, goods.addOne);
router.post(api.goodsDelete, goods.deleteOne);
router.post(api.goodsDeleteMulti, goods.deleteMulti);
router.post(api.goodsUploadImg, upload.single('avatar'),goods.uploadGoodsImg); // 图片上传

// user
router.get(api.userList, user.fetchAll);
router.get(api.userLogout, user.logout);
router.get(api.userAutoLogin, user.autoLogin); // 自动登录

router.post(api.userAdd, user.addOne);
router.post(api.userDelete, user.deleteOne);
router.post(api.userDeleteMulti, user.deleteMulti);
router.post(api.userLogin, user.login); // 登录
router.post(api.userChangeRole, user.controlVisit, user.changeRole); // 更改权限

// map
router.get(api.mapList,map.fetchAll);

//data
router.get(api.dataLastest,data.lastest);
router.post(api.dataHistory,data.history);
router.post(api.dataChart,data.chart);

//command
router.post(api.commandFZ,command.FZ);
router.post(api.commandHZ,command.HZ);

module.exports = router;