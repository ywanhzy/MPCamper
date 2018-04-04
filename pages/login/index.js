// pages/login/index.js
const app = getApp()

const request = require('../../utils/request.js')
var CONFIG = require('../../utils/config.js')
var util = require('../../utils/util.js')
var phone
Page({

        /**
         * 页面的初始数据
         */
        data: {
                tel:null,
                code:null,
                codeImgUrl: null
        },
        /**
        * 接口调用成功处理
        */
        successFun: function (res, selfObj) {
                var that = selfObj;
                if (res.res_code == 200) {
                        console.log(res)
                        wx.navigateTo({
                                url: '/pages/loginTwo/index?phone=' + phone,
                        }) 
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
                //获取营地列表
                app.globalData.me ="sdfd";
                console.log(app.globalData.me)
        },
        bindKeyInput: function (e) {
                console.log(e)
                var tel=e.detail.value
                if (util.isPhoneNumber(tel)){
                        var url = CONFIG.API_URL.GET_SecurityCode + "?mark=" + tel
                        this.setData({
                                codeImgUrl: url
                        })
                }
                this.setData({
                        tel: tel
                })
        },
        submitForm(e) {
                var that = this;
                phone = e.detail.value.tel;
                var code = e.detail.value.code;
                if (phone == "") {
                        wx.showToast({
                                title: '请填写手机号码',
                        })
                        return
                }
                if (code == "") {
                        wx.showToast({
                                title: '请填写验证码',
                        })
                        return
                }

                var url = CONFIG.API_URL.GET_SendPhoneCode
                var params = {
                        phone: phone,
                        imgCode: code,
                        mark: "9"
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
                //   wx.navigateBack({
                //           delta: 2
                //   })
                wx.switchTab({
                        url: '../index/index?id=1'
                })
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