// pages/camperCarInfo/index.js

const app = getApp()

const request = require('../../utils/request.js')
var CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')
var amapFile = require('../../libs/amap-wx.js');
var width;
var height;
var campOwerTel;
var myAmapFun;

Page({

        /**
         * 页面的初始数据
         */
        data: {
                imgUrls: [],
                current: 0,
                indicatorDots: true,
                autoplay: true,
                interval: 5000,
                duration: 1000,
                circular: !0,
                mapSrc: null,
                height: null,
                imgheights: [],
                width: 0,
                camperCarDetail: {},
                moenyDesc:[]
        },
        /**
                * 接口调用成功处理
                */
        successFun: function (res, selfObj) {
                var that = selfObj;
                if (res.res_code == 200) {
                        var camperCarDetail = res.data[0];
                        //   campDetail.Img = util.spiltStr(camperCarDetail.Imgs)[0] + "_" + parseInt(width) + "X" + parseInt(width * 3 / 5) + ".jpg";
                        var Imgs = util.spiltStr(camperCarDetail.CarImg);

                        for (var i = 0; i < Imgs.length; i++) {
                                Imgs[i] = Imgs[i] + "_" + parseInt(width) + "X" + parseInt(width / 2) + ".jpg";
                                console.error(Imgs[i])
                        }


                        campOwerTel = camperCarDetail.CampOwerTel;
                        // console.error(camperCarDetail.MoenyDesc.length)

                        //高德静态地图
                        var key = CONFIG.APP_KEY.AmapKey;
                        myAmapFun = new amapFile.AMapWX({ key: key });
                        var size = width + "*" + parseInt(height / 2);
                        myAmapFun.getStaticmap({
                                zoom: 13,
                                size: size,
                                scale: 2,
                                location: camperCarDetail.Longitude + "," + camperCarDetail.Latitude,
                                markers: "large,0xFF0000,A:" + camperCarDetail.Longitude + "," + camperCarDetail.Latitude,
                                labels: camperCarDetail.CampShortName + ",2,0,32,0xFFFFFF,0x008000:" + camperCarDetail.Longitude + "," + camperCarDetail.Latitude,
                                success: function (data) {
                                        that.setData({
                                                mapSrc: data.url
                                        })
                                },
                                fail: function (info) {
                                        wx.showModal({ title: info.errMsg })
                                }
                        })

                        selfObj.setData({
                                camperCarDetail: camperCarDetail,
                                moenyDesc:camperCarDetail.MoenyDesc,
                                imgUrls: Imgs,
                                height: parseInt(width / 2)
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
                width = app.globalData.width;
                height = app.globalData.height;
                this.setData({
                        width: width,
                });
                //获取营地列表
                var url = CONFIG.API_URL.GET_CamperCarInfo
                var params = {
                        memberguid: '',
                        token: '',
                        carGuid: options.carGuid
                }
                request.GET(url, params, this, this.successFun, this.failFun)
        },
        //等比缩放图片并保存
        imageLoad: function (e) {
                //获取图片真实宽度  
                var imgwidth = e.detail.width,
                 imgheight = e.detail.height,
                        //宽高比  
                ratio = imgwidth / imgheight;
                console.log(imgwidth, imgheight);
                //计算的高度值  

                var viewHeight = parseInt(this.data.width) / ratio;
                console.log(viewHeight);
                var imgheight = viewHeight.toFixed(0);
                console.log(imgheight);
                var imgheightarray = this.data.imgheights;
                //把每一张图片的高度记录到数组里
                imgheightarray.push(imgheight);
                console.log(imgheightarray);
                this.setData({
                        imgheights: imgheightarray,
                });
        },
        bindchange: function (e) {
                console.log(e.detail.current)
                this.setData({ current: e.detail.current })
        },
        previewImage: function (e) {
                var current = e.currentTarget.dataset.src;
                wx.previewImage({
                        current: current, 
                        urls: this.data.imgUrls 
                })
        },
        goOrder: function (e) {
                console.error("goorder")
                var token = wx.getStorageSync('token')
                var wx_authorize = wx.getStorageSync('wx_authorize')
                if (wx_authorize){
                        console.log(token)
                        if (token == "") {
                                //登录
                                console.log("跳登录")
                                wx.navigateTo({
                                        url: '../login/index?id=1'
                                })
                        } else {
                                //下一步
                                console.log("22")
                        }
                }else{
                        //未授权 去授权登录
                        app.wxAuthorize()
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

        }
})