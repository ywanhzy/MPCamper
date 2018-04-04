// pages/setting/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
          items: [
                  {
                          icon: '../../images/tel.png',
                          text: '账号安全',
                          path: '/pages/myOrder/index'
                  },
                  {
                          icon: '../../images/tel.png',
                          text: '意见反馈',
                          path: '/pages/setting/index'
                  }
                  ,
                  {
                          icon: '../../images/tel.png',
                          text: '关于我们',
                          path: '/pages/aboutUs/index'
                  }
          ]
  },

  navigateTo: function (e) {
    const index = e.currentTarget.dataset.index
    const path = e.currentTarget.dataset.path
    // console.error(index + path)
    wx.navigateTo({
      url: path,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})