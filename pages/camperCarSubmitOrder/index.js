// pages/camperCarSubmitOrder/index.js
const app = getApp()

const request = require('../../utils/request.js')
const CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')

var camperCarDetail;

Page({

        /**
         * 页面的初始数据
         */
        data: {
                camperCarDetail: [],
        },
        /**
                 * 接口调用成功处理
                 */
        successFun: function (res, selfObj) {
                if (res.res_code == 100) {
                        var camperCarOrder = res.data;
                        console.log(camperCarOrder)
                        console.log(camperCarDetail)
                        var camperCarOrder = JSON.stringify(camperCarOrder);
                        //var camperCarDetail = JSON.stringify(camperCarDetail);
                        
                        wx.navigateTo({
                                url: '/pages/camperCarPay/index?camperCarOrder=' + camperCarOrder + '&camperCarDetail=' + camperCarDetail,
                        })
                }

                //   "res_code": 100,
                //           "res_msg": "提交成功",
                //                   "orderNo": "7201804071106509206",
                //                           "data": {
                //           "orderGuid": "e4bc4484a6ca44a1b9776ad9cc0705c4",
                //                   "payMoney": 0.01,
                //                           "orderNo": "7201804071106509206"
                //   }

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
                var moenyDesc = JSON.parse(options.moenyDesc);
                camperCarDetail = JSON.parse(options.camperCarDetail);
                this.setData({
                        camperCarDetail: camperCarDetail
                })
                if (options.camperCarDetail == null) {
                        wx.showToast({
                                title: '数据为空',
                        })
                }
                //   wx.chooseInvoiceTitle({
                //           success(res) {
                //                   console.log(res)
                //                   res.type//抬头类型（0：单位，1：个人）
                //                   res.title//抬头名称
                //                   res.taxNumber//抬头税号
                //                   res.companyAddress//单位地址
                //                   res.telephone//手机号码
                //                   res.bankName//银行名称
                //                   res.bankAccount//银行账号
                //                   res.errMsg//接口调用结果
                //           },
                //           complete(res) {// 接口调用失败 / 结束的回调函数
                //   }
                // })

        },
        submitOrder: function (e) {
                console.error("goorder")
                var token = wx.getStorageSync('token')

                var url = CONFIG.API_URL.POST_CamperOrder
                // memberguid 会员id
                // bookingPersonName 预定人
                // bookingPersonPhone 预定人手机号
                // carGuid 车型id
                // bTime 预定开始日期2017- 09 - 22
                // eTime  预定结束日期2017- 09 - 22
                // currencyAmount-1 不用电子币支付抵扣
                // totalMoney 总金额
                // invoice  0 不需要邮费 1 需要邮费（不填默认为0）
                var params = {
                        bookingPersonName: app.globalData.eUserInfo.NickName,
                        bookingPersonPhone: app.globalData.eUserInfo.Phone,
                        carGuid: camperCarDetail.CarGuid,
                        bTime: "2018-04-22",
                        eTime: "2018-04-23",
                        currencyAmount: "-1",
                        totalMoney: "0.01",
                        invoice: "0"
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