// pages/camperCarPayResult/index.js
const app = getApp()

const request = require('../../utils/request.js')
const CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')

var camperCarOrder, camperCarDetail, orderInfo;

Page({

        data: {
                camperCarDetail: {},
                camperCarOrder: {},
                orderInfo: {}
        },

        onLoad: function (options) {
                camperCarOrder = JSON.parse(options.camperCarOrder);
                camperCarDetail = JSON.parse(options.camperCarDetail);
                orderInfo = JSON.parse(options.orderInfo);

                this.setData({
                        camperCarDetail: camperCarDetail,
                        camperCarOrder: camperCarOrder,
                        orderInfo: orderInfo
                })
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