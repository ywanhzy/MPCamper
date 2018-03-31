//index.js
//获取应用实例
const app = getApp()

const request = require('../../utils/request.js')
var CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')
var width;
var height;

Page({
        data: {
                motto: 'Hello World',
                userInfo: {},
                camperCar: [],
                width:'',
                height:'',
                telstatus: true,
                hasUserInfo: false,
                canIUse: wx.canIUse('button.open-type.getUserInfo')
        },
        //事件处理函数
        bindViewTap: function () {
                wx.navigateTo({
                        url: '../logs/logs'
                })
        },
        goTel: function (e) {
                app.tel("");
        },
        /**
         * 接口调用成功处理
         */
        successFun: function (res, selfObj) {
                if (res.res_code == 200) {
                        var camperCar = res.data;
                        var camperCars = [];
                        console.log("length:" + camperCar.length)
                        if (camperCar.length > 0) {
                                for (var i = 0; i < camperCar.length; i++) {
                                        var obj = camperCar[i]
                                       // obj.Img1 = spiltStr(obj.Img)[0] + "_" + parseInt(width * 3 / 4) + "X" + parseInt(width / 2) + ".jpg";
                                        obj.Img = util.spiltStr(obj.CarImg)[0] + "_" + parseInt(width) + "X" + parseInt(width / 2) + ".jpg";
                                        obj.i = i;
                                        if (obj.Num==1){
                                                obj.yes = true;
                                        }else{
                                                obj.yes = false;
                                        }
                                        camperCars.push(obj);
                                }
                        }
                        selfObj.setData({
                                camperCar: camperCars
                        });
                }

        },
        /**
         * 接口调用失败处理
         */
        failFun: function (res, selfObj) {
                console.log('failFun', res)
        },
        onLoad: function () {
                var that=this
                width=app.globalData.width
                height=app.globalData.height
                
                // wx.setStorageSync('token', "")
                // wx.setStorageSync('memberid', "")
                
                if (app.globalData.userInfo) {
                        this.setData({
                                userInfo: app.globalData.userInfo,
                                hasUserInfo: true
                        })
                } else if (this.data.canIUse) {
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        app.userInfoReadyCallback = res => {
                                this.setData({
                                        userInfo: res.userInfo,
                                        hasUserInfo: true
                                })
                        }
                } else {
                        // 在没有 open-type=getUserInfo 版本的兼容处理
                        wx.getUserInfo({
                                success: res => {
                                        app.globalData.userInfo = res.userInfo
                                        this.setData({
                                                userInfo: res.userInfo,
                                                hasUserInfo: true
                                        })
                                }
                        })
                }

                //获取住房车列表
                var url = CONFIG.API_URL.GET_CamperCarAll
                var params = {}
                request.GET(url, params, this, this.successFun, this.failFun)

        },

        getUserInfo: function (e) {
                console.log(e)
                app.globalData.userInfo = e.detail.userInfo
                this.setData({
                        userInfo: e.detail.userInfo,
                        hasUserInfo: true
                })
        }

})


