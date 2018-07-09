
import { $wuxCalendar } from '../../components/wux'

const app = getApp()
const request = require('../../utils/request.js')
const CONFIG = require('../../utils/config.js')
const IMAGE = require('../../utils/image.js');

import * as util from '../../utils/util';


let width, height;
let citys;
let startDay = "", foregift;
let endDay = "";
let dayNum = 0;
Page({
    data: {
        userInfo: {},
        camperCar: [],
        width: '',
        height: '',
        telstatus: true,
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    successFun: function (id, res, selfObj) {
        if (id === 100) {
            if (res.res_code === 200) {
                let camperCar = res.data;
                let camperCars = [];
                if (camperCar.length > 0) {
                    for (let i = 0; i < camperCar.length; i++) {
                        let obj = camperCar[i]
                        obj.Img = obj.Url + "_" + parseInt(width) + "X" + parseInt(width / 2) + ".jpg";
                        obj.i = i;
                    
                        camperCars.push(obj);
                    }
                }
                selfObj.setData({
                    camperCar: camperCars
                });
            }

          

            wx.stopPullDownRefresh(); //停止下拉刷新
        } else if (id === 101) {
            //获取区域位置
            if (res.res_code == 200) {
                citys = res.data;
                console.error(citys)
                selfObj.setData({
                    cityList: citys
                });
            }
        }
    },
    /**
     * 接口调用失败处理
     */
    failFun: function (res, selfObj) {
        console.log('failFun', res)
    },
    onLoad: function (options) {
        if (!util.isEmpty(options.inviteId)) {
            console.error("inviteId:" + options.inviteId)
            wx.setStorageSync('inviteId', options.inviteId)
        }
        let that = this
        width = app.globalData.width
        height = app.globalData.height

        this.getList(that);
        this.getCity(that);

    },
    onPullDownRefresh: function () {
        let that = this;
        console.log("下拉刷新")
        this.getList(that);
    },
    getCity: (that) => {
        let url = CONFIG.API_URL.GET_CityData
        let params = { type: '2' }
        request.GET(url, params, 101, true, that, that.successFun, that.failFun)
    },
    getList: (that) => {
        //获取租房车列表
        let url = CONFIG.API_URL.GET_MotorHomes
        let params = {}
        request.GET(url, params, 100, true, that, that.successFun, that.failFun)
    },
    binderrorimg: function (e) {
        // var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
        // var imgObject = "camperCar[" + errorImgIndex + "].Img" //carlistData为数据源，对象数组
        // console.error(imgObject)//camperCar[5].Img
        // var errorImg = {}
        // errorImg[imgObject] = "https://w.chesudi.com/Public/web/img/onerrorcar.png" //我们构建一个对象
        // this.setData(errorImg) //修改数据源对应的数据

        let _that = this;
        IMAGE.errImgFun(e, _that);

    },
    openCalendarS() {
        if (this.start) {
            return this.start.show()
        }

        this.start = $wuxCalendar.init('start', {
            // dateFormat: 'DD, MM dd, yyyy',
            onChange(p, v, d) {
                console.error("start:" + d)
                console.error("endDay:" + endDay)
                if (!util.isEmpty(endDay) && !util.isEmpty(d)) {
                    dayNum = util.dateDifference(d, endDay)
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

                        this.setData({
                            day: dayNum,
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
            onChange(p, v, d) {
                if (!util.isEmpty(startDay) && !util.isEmpty(d)) {
                    dayNum = util.dateDifference(startDay, d)
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

                        this.setData({
                            day: dayNum,

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
     * 用户点击右上角分享
     */
    onShareAppMessage: function (options) {
        let inviteId = wx.getStorageSync('memberguid')

        console.log("inviteId:" + inviteId)
        console.log('onShareAppMessage')
        let shareObj = {
            title: '约你游',
            desc: '约你游',
            path: '/pages/index/index?inviteId=' + inviteId,
            success: function (res) {
                console.log('success')
                let shareTickets = res.shareTickets;
                console.log('shareTickets：' + shareTickets)
                // if (shareTickets.length == 0) {
                //         return false;
                // }
                // wx.getShareInfo({
                //         shareTicket: shareTickets[0],
                //         success: function (res) {
                //                 let encryptedData = res.encryptedData;
                //                 let iv = res.iv;
                //         }
                // })
            },
            fail: function () {
                console.log('fail')
            },
            complete: function () {

            }
        };

        // 来自页面内的按钮的转发
        // if (options.from == 'button') {
        //         let eData = options.target.dataset;
        //         console.log(eData.name);     // shareBtn
        //         // 此处可以修改 shareObj 中的内容
        //         shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;
        // }
        return shareObj;
    }

})

