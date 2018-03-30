// pages/camp/index.js
const app = getApp()

const request = require('../../utils/request.js')
var CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')
var width;
var height;

Page({

        /**
         * 页面的初始数据
         */
        data: {
                camp: [],
                width: '',
                hight: '',
                telstatus: true
        },
        goTel: function (e) {
                app.tel("");
        },
        /**
         * 接口调用成功处理
         */
        successFun: function (res, selfObj) {
                if (res.res_code == 200) {
                        var camp = res.data;
                        var camps = [];
                        console.log("length:" + camp.length)
                        if (camp.length > 0) {
                                for (var i = 0; i < camp.length; i++) {
                                        var obj = camp[i]

                                        obj.Img = util.spiltStr(obj.Imgs)[0] + "_" + parseInt(width) + "X" + parseInt(width / 2) + ".jpg";
                                        obj.i = i;
                                        camps.push(obj);
                                }
                        }
                        selfObj.setData({
                                camp: camps
                        });
                }

        },
        /**
         * 接口调用失败处理
         */
        failFun: function (res, selfObj) {
                console.log('failFun', res)
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                width=app.globalData.width;
                height=app.globalData.height;

                //获取营地列表
                var url = CONFIG.API_URL.GET_CampOwerData
                var params = {
                        memberguid: '',
                        token: '',
                }
                request.GET(url, params, this, this.successFun, this.failFun)
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {

        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {

        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function () {

        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {

        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function () {

        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function () {

        }
})