
import { $wuxCountDown } from '../../components/wux'
const app = getApp()

const request = require('../../utils/request.js')
const CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')

var camperCarOrder;
Page({

        /**
         * 页面的初始数据
         */
        data: {
                camperCarDetail: {},
                camperCarOrder: {}
        },
        successFun: function (res, selfObj) {
                if (res.res_code == 200) {
                        var wxPay = res.data;
                        console.log(wxPay)

                        wx.requestPayment({
                                'timeStamp': wxPay.timeStamp,
                                'nonceStr': wxPay.nonceStr,
                                'package': wxPay.package,
                                'signType': 'MD5',
                                'paySign': wxPay.paySign,
                                'success': function (res) {
                                        console.log("支付成功")
                                },
                                'fail': function (res) {
                                        console.log("支付失败")
                                }
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
                camperCarOrder = JSON.parse(options.camperCarOrder);
                //   var camperCarDetail = JSON.parse(options.camperCarDetail);
                //   this.setData({
                //           camperCarDetail: camperCarDetail,
                //         //   camperCarOrder: camperCarOrder
                //   })
                this.c1 = new $wuxCountDown({
                        date: +(new Date) + 60 * 1000 * 60 * 24,
                        render(date) {
                                //   const years = this.leadingZeros(date.years, 4) + ' 年 '
                                //   const days = this.leadingZeros(date.days, 3) + ' 天 '
                                const hours = this.leadingZeros(date.hours, 2) + ' 时 '
                                const min = this.leadingZeros(date.min, 2) + ' 分 '
                                const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
                                this.setData({
                                        c1: hours + min + sec,
                                })
                        },
                })
        },
        orderPay: function (e) {
                var openid = wx.getStorageSync('wx_openid')

                var url = CONFIG.API_URL.GET_WxPay

                var params = {
                        orderno: camperCarOrder.orderNo,
                        openid: openid,
                        flag: "1"
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