// pages/campPic/index.js
const app = getApp()

var util = require('../../utils/util.js')
var width;
var height;

Page({

        /**
         * 页面的初始数据
         */
        data: {
                size: 0,
                height:null,
                campPicInitial :[],
                campPic: []
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                width = app.globalData.width;
                height = app.globalData.height;
                console.error(options.imgs)
                var Imgs = util.spiltStr(options.imgs);
                var tempImgs;
                for (var i = 0; i < Imgs.length; i++) {
                        Imgs[i] = Imgs[i] + "_" + parseInt(width/2) + "X" + parseInt(width / 4) + ".jpg";
                        console.error(Imgs[i])
                }
          
                this.setData({
                        size: Imgs.length,
                        height: width / 3,
                        campPicInitial: util.spiltStr(options.imgs),
                        campPic: Imgs
                })


        },
        //预览图片
        previewImage: function (e) {
                var that = this;
                var src = e.currentTarget.dataset.src;
                var imageList = that.data.campPic;
                wx.previewImage({
                        current: src,
                        urls: imageList,
                        fail: function () {
                        },
                        complete: function () {
                        },
                });
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