
import { $wuxCalendar } from '../../components/wux'
import { $wuxToast } from '../../components/wux'
const app = getApp()

const request = require('../../utils/request.js')
const CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')

var camperCarDetail = new Object();
var moenyDesc =new Array;
var startDay, endDay, foregift;
var orderInfo = new Object();
Page({
        data: {
                camperCarDetail: [],
                start: '',//入住时间
                end:'',  //离开时间
                day:'0',//入住晚数
                totalPrice:0.00, //所有费用
                roomPrice: 0.00,//房车费用
                foregift:0.00,
                NickName:'',
                Phone:'',

        },
        successFun: function (id,res, selfObj) {
                if (res.res_code == 100) {
                        var camperCarOrder = res.data;
                        console.log(camperCarOrder)
                        console.log(camperCarDetail)                       
                        console.log(orderInfo)     
                        var camperCarOrder = JSON.stringify(camperCarOrder);
                        var camperCarDetails = JSON.stringify(camperCarDetail);
                        var orderInfos = JSON.stringify(orderInfo);
                        wx.navigateTo({
                                url: '/pages/camperCarPay/index?camperCarOrder=' + camperCarOrder + '&camperCarDetail=' + camperCarDetails + '&orderInfo=' + orderInfos,
                        })
                }

        },
        failFun: function (id,res, selfObj) {
                console.log('failFun', res)
        },
        onLoad: function (options) {
                moenyDesc = JSON.parse(options.moenyDesc);
                camperCarDetail = JSON.parse(options.camperCarDetail);
                foregift = camperCarDetail.Deposit;
                this.setData({
                        camperCarDetail: camperCarDetail,
                        NickName: app.globalData.eUserInfo.NickName,
                        Phone: app.globalData.eUserInfo.Phone,
                        foregift:camperCarDetail.Deposit
                })
                if (options.camperCarDetail == null) {
                        wx.showToast({
                                title: '数据为空',
                        })
                }
        },
        submitOrder: function (e) {
                console.error(this.data.totalPrice)
                if (this.data.start =='') {
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: '请选择入住日期',
                                success: () => console.log('文本提示')
                        })
                        return
                }
                if (this.data.end == '') {
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: '请选择退房日期',
                                success: () => console.log('文本提示')
                        })
                        return
                }
                if (this.data.totalPrice==0.00){
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: '参数错误',
                                success: () => console.log('文本提示')
                        })
                        return
                }

                orderInfo.start = startDay;
                orderInfo.end = endDay;
                orderInfo.nickName=app.globalData.eUserInfo.NickName
                orderInfo.phone = app.globalData.eUserInfo.Phone
                orderInfo.totalMoney=this.data.totalPrice
                orderInfo.day = this.data.day
                var token = wx.getStorageSync('token')

                var url = CONFIG.API_URL.POST_CamperOrder
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
                        bTime: startDay,
                        eTime: endDay,
                        currencyAmount: "-1",
                        totalMoney: this.data.totalPrice,
                        invoice: "0"
                }
                console.log(params)
                request.GET(url, params, 100, true, this, this.successFun, this.failFun)
        },
        openCalendarS() {
                if (this.start) {
                        return this.start.show()
                }

                this.start = $wuxCalendar.init('start', {
                        // dateFormat: 'DD, MM dd, yyyy',
                        dayMoney: moenyDesc,
                        onChange(p, v, d) {
                                console.error("start:"+d) 
                                console.error("endDay:" + endDay) 
                                if (!util.isEmpty(endDay) && !util.isEmpty(d)){
                                        var dayNum = util.dateDifference(d, endDay)
                                        console.error("相差：" + dayNum)
                                        if (dayNum <= 0) {
                                                $wuxToast.show({
                                                        type: 'text',
                                                        timer: 2000,
                                                        color: '#fff',
                                                        text: '退房日期不能小于等于入住日期',
                                                        success: () => console.log('文本提示')
                                                })
                                        } else {
                                                var roomPrice = dayNum * camperCarDetail.DailyPrice
                                                var totalPrice = roomPrice + foregift;
                                                this.setData({
                                                        day: dayNum,
                                                        totalPrice: totalPrice,
                                                        roomPrice: roomPrice,
                                                })
                                        }
                                }       
                                
                                this.setData({
                                        start: d.join(', ')
                                })
                                startDay = d.join(', ')
                        }
                })
        },
        openCalendarE() {
                if (this.end) {
                        return this.end.show()
                }
                this.end = $wuxCalendar.init('end', {
                        // dateFormat: 'DD, MM dd, yyyy',
                        dayMoney: moenyDesc,
                        onChange(p, v, d) {
                                 if (!util.isEmpty(startDay) && !util.isEmpty(d)) {
                                        var dayNum = util.dateDifference(startDay,d)
                                        console.error("相差：" + dayNum)
                                        if (dayNum<=0){
                                                $wuxToast.show({
                                                        type: 'text',
                                                        timer: 2000,
                                                        color: '#fff',
                                                        text: '退房日期不能小于等于入住日期',
                                                        success: () => console.log('文本提示')
                                                })
                                        }else{
                                                var roomPrice = dayNum * camperCarDetail.DailyPrice
                                                var totalPrice = roomPrice+ foregift;
                                                this.setData({
                                                        day: dayNum,
                                                        totalPrice: totalPrice,
                                                        roomPrice: roomPrice,
                                                })
                                        }
                                }    
                                this.setData({
                                        end: d.join(', ')
                                })
                                endDay = d.join(', ')
                        }
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

        }

})


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