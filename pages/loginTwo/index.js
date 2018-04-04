// pages/loginTwo/index.js
const app = getApp()

const request = require('../../utils/request.js')
var CONFIG = require('../../utils/config.js')
var util = require('../../utils/util.js')

var unionid, phone, openid
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  successFun: function (res, selfObj) {
          var that = selfObj;
          if (res.res_code == 200) {
                  console.log(res)
                  app.globalData.eUserInfo = res.data;

                  console.log("memberguid:" + res.data.GUID)
                  wx.setStorageSync('wx_unionid', res.data.unionid)
                  wx.setStorageSync('token', res.data.token)
                  wx.setStorageSync('memberguid', res.data.GUID)

                  wx.navigateBack({
                          delta: 2, // 回退前 delta(默认为1) 页面
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
          console.log(options.phone)
          phone = options.phone
          unionid=wx.getStorageSync('wx_unionid')
          openid = wx.getStorageSync('wx_openid')
          
  },
  submitForm(e) {
          var that = this;
          var code = e.detail.value.code;
        
          if (code == "") {
                  wx.showToast({
                          title: '请填写短信验证码',
                  })
                  return
          }

          var url = CONFIG.API_URL.GET_BindWxPhone
          var params = {
                  flag: "1",
                  openid: openid,
                  unionid: unionid,
                  phone: phone,
                  code: code
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