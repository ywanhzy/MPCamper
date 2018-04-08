// pages/myOrder/index.js
import { $wuxPrompt } from '../../components/wux'
const sliderWidth = 96
var CONFIG = require('../../utils/config.js')
const request = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部', '待付款', '待使用', '退款'],
    activeIndex: '0',
    sliderOffset: 0,
    sliderLeft: 0,
    order: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $wuxPrompt.init('msg1', {
        title: '空空如也',
        text: '暂时没有相关数据',
      }).show()

    $wuxPrompt.init('msg2', {
        icon: '../../images/iconfont-order.png',
        title: '您还没有相关的订单',
        text: '可以去看看有哪些想买',
        buttons: [
          {
            text: '随便逛逛'
          }
        ],
        buttonClicked(index, item) {
          console.log(index, item)
        },
      }).show()

    $wuxPrompt.init('msg3', {
        icon: '../../images/iconfont-empty.png',
        title: '暂无待评价订单',
      }).show()

    $wuxPrompt.init('msg4', {
      icon: '../../images/iconfont-order.png',
      title: '您还没有相关的订单',
      text: '可以去看看有哪些想买',
      buttons: [
        {
          text: '随便逛逛'
        }
      ],
      buttonClicked(index, item) {
        console.log(index, item)
      },
    }).show()

      this.getSystemInfo()

      //获取营地列表
      this.getData()
  },

  /**
   * 接口调用成功处理
   */
  successFun: function (res, selfObj) {
    if (res.res_code == 200) {
      var orders = res.data;
      console.log("length:" + order.length)
      
      selfObj.setData({
        order: orders
      });
    }

  },

  /**
   * 接口调用失败处理
   */
  failFun: function (res, selfObj) {
    console.log('failFun', res)
  },

  getSystemInfo: function() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
        })
      }
    })
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    })
    switch (this.data.activeIndex){
      case '0':
        console.log("全部");
        getData();
        break;
      case '1':
        console.log("代付款");
        break;
      case '2':
        console.log("待使用");
        break;
      case '3':
        console.log("退款");
        break;
    }
    this.getData(this.data.activeIndex);
  },

  getData: function(type){
    var url = CONFIG.API_URL.GET_MyOrderData
    var params = {}
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

})