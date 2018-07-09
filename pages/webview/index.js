// pages/webview/index.js
var CONFIG = require('../../utils/config.js')
let webUrl;

Page({

  /**
   * 页面的初始数据
   */
    data: {
        url: ''
        // url: 'https://fcx.ezagoo.com/#/'
        
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      webUrl = CONFIG.API_URL.GET_INDEX;
      this.setData({
          url: webUrl
      })
    //   this.data.set.url ="";
      console.error("ddf:"+options)
    //   this.setData({ url: options.url })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
      console.error("onReady:" + options)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
      var app = getApp();
      if (app.globalData.system.indexOf("Android") ==-1 ){
          app.data.webShowed = false;//标记已经显示过web-view页了
        }else{
          app.data.webShowed = true;
        }
      console.error("onShow:" + app.globalData.system.indexOf("Android") + this.data.url)
        if (this.data.types){
            this.setData({ url: this.data.url})
        }
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