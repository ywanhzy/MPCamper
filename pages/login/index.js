// pages/login/index.js
const app = getApp()

const request = require('../../utils/request.js')
var CONFIG = require('../../utils/config.js')


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
                        console.log(res.data)

                        selfObj.setData({
                                codeImgUrl: ""
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
                var url = CONFIG.API_URL.GET_SecurityCode + "?mark=13789585258"

                this.setData({
                        codeImgUrl: url
                })

                var url = CONFIG.API_URL.GET_SendPhoneCode
                var params = {
                        phone : '',
                        imgCode : '',
                        mark: "13789585258"
                }
                request.GET(url, params, this, this.successFun, this.failFun)
        },
        bindKeyInput: function (e) {
                console.log(e.detail.value)
                this.setData({
                        tel:e.detail.value
                })
        },
        submitForm(e) {

                var that = this;
                var tel = e.detail.value.tel;
                var code = e.detail.value.code;

                if (tel == "") {
                        wx.showModal({
                                title: '提示',
                                content: '请填写手机号码',
                                showCancel: false
                        })
                        return
                }
                if (code == "") {
                        wx.showModal({
                                title: '提示',
                                content: '请填写验证码',
                                showCancel: false
                        })
                        return
                }



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