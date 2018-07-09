// pages/webviewIndex/index.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**orderno=?orderno=?orderno=?orderno=?
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      //如果已经显示过web-view页了，则执行后退操作，否则就跳到web-view页
      var app = getApp();

      console.error("webviewindex:" + app.data.webShowed)

      if (!app.data.webShowed) {
          setTimeout(() =>
           wx.navigateTo({
              url: '/pages/webview/index'
          }), 500)
       
      } else {
          console.error("navigateBack")
          wx.navigateBack({
              delta: 5
          });
          
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