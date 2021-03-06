// pages/campDetail/index.js
const app = getApp()

var request = require('../../utils/request.js')
var CONFIG = require('../../utils/config.js')
var util = require('../../utils/util.js')
var amapFile = require('../../libs/amap-wx.js');
var WxParse = require('../../wxParse/wxParse.js');

var id;
var width;
var height;
var imgHeight
var myAmapFun;
var longitude, latitude, campShortName, campOwerAddress, campOwerTel;
var campOwerGuid;
let isCollection;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        src: "",
        hasCamperData: false,
        isCollection: false,
        campDetail: {},
        camperData: []
    },
    /**
    * 接口调用成功处理
    */
    successFun: function (id, res, selfObj) {
        if (id === 100) {
            var that = selfObj;
            if (res.res_code == 200) {
                var campDetail = res.data;
                if (campDetail.isCollection === 0 ){
                    isCollection=false;
                }else{
                    isCollection=true;
                }
                imgHeight = parseInt(width * 3 / 5)
                campDetail.Img = util.spiltStr(campDetail.Imgs)[0] + "_" + parseInt(width) + "X" + parseInt(width * 3 / 5) + ".jpg";
                campDetail.ImgSize = util.spiltStr(campDetail.Imgs).length;
                selfObj.setData({
                    imgHeight: imgHeight,
                    campDetail: campDetail,
                    camperData: res.camperData,
                    hasCamperData: res.camperData.length > 0 ? false : true,
                    isCollection: isCollection
                })
                longitude = campDetail.Longitude;
                latitude = campDetail.Latitude;
                campShortName = campDetail.CampShortName;
                campOwerAddress = campDetail.CampOwerAddress;
                campOwerTel = campDetail.CampOwerTel;
                //高德静态地图
                var key = CONFIG.APP_KEY.AmapKey;
                myAmapFun = new amapFile.AMapWX({ key: key });
                var size = width + "*" + parseInt(height / 2);
                myAmapFun.getStaticmap({
                    zoom: 13,
                    size: size,
                    scale: 2,
                    location: res.data.Longitude + "," + res.data.Latitude,
                    markers: "large,0xFF0000,A:" + res.data.Longitude + "," + res.data.Latitude,
                    labels: res.data.CampShortName + ",2,0,32,0xFFFFFF,0x008000:" + res.data.Longitude + "," + res.data.Latitude,
                    success: function (data) {
                        that.setData({
                            src: data.url
                        })
                    },
                    fail: function (info) {
                        wx.showModal({ title: info.errMsg })
                    }
                })

                //html
                WxParse.wxParse('article', 'html', res.data.Description, this, 5);
            }
        } else if (id === 101) {
            wx.showToast({
                title: res.res_msg,
            })
            if (res.res_code == 200) {
                console.error(res.res_msg)
                isCollection=true;
                selfObj.setData({
                    isCollection: isCollection
                })
            }else{
                isCollection = false;
                // selfObj.setData({
                //     isCollection: isCollection
                // })
            }
        } else if (id === 102) {
            if (res.res_code == 200) {
                console.error(res.res_msg)
                isCollection = false;
                selfObj.setData({
                    isCollection: isCollection
                })
            } else {
                isCollection = true;
                // selfObj.setData({
                //     isCollection: isCollection
                // })
            }
            wx.showToast({
                title: res.res_msg,
            })
        }

    },
    /**
     * 接口调用失败处理
     */
    failFun: function (id, res, selfObj) {
        console.log('failFun', res)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        width = app.globalData.width;
        height = app.globalData.height;
        campOwerGuid = options.CampOwerGuid;
        if (!util.isEmpty(options.inviteId)) {
            console.log("inviteId:" + options.inviteId)
            wx.setStorageSync('inviteId', options.inviteId)
        }
        //获取营地详情
        var url = CONFIG.API_URL.GET_CampOwerInfo
        var params = {
            memberguid: '',
            token: '',
            CampOwerGuid: options.CampOwerGuid
        }
        request.GET(url, params, 100, true, this, this.successFun, this.failFun)
    },

    goTel: function () {
        app.tel(campOwerTel);
    },
    goMap: function () {
        app.map(latitude, longitude, 28, campShortName, campOwerAddress);
    },
    collectClick: function() {
        let params = {
            collectionType: '6',
            relevantGuid: campOwerGuid
        }
        if (isCollection){
            let delurl = CONFIG.API_URL.GET_DelMyCollection
            request.GET(delurl, params, 102, true, this, this.successFun, this.failFun)
        }else{
            let addUrl = CONFIG.API_URL.GET_AddMyCollection
            request.GET(addUrl, params, 101, true, this, this.successFun, this.failFun)
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
        var inviteId = wx.getStorageSync('memberguid')
        console.log("inviteId:" + inviteId)
        console.log("campOwerGuid:" + campOwerGuid)
        console.log('onShareAppMessage')
        var shareObj = {
            title: '房车行',
            desc: '营地详情',
            path: '/pages/campDetail/index?CampOwerGuid=' + campOwerGuid + '&inviteId=' + inviteId,
            success: function (res) {
                console.log('success')
            },
            fail: function () {
                console.log('fail')
            },
            complete: function () {
            }
        };

        return shareObj;
    }
})