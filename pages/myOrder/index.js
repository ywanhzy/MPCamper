// pages/myOrder/index.js
import { $wuxPrompt } from '../../components/wux'
const sliderWidth = 96
var CONFIG = require('../../utils/config.js')
const request = require('../../utils/request.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部', '待付款', '待使用', '退款'],
    activeIndex: '0',
    sliderOffset: 0,
    sliderLeft: 0,
    order: [],
    status:0,
    statuStr:[]
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
        // icon: '../../images/iconfont-order.png',
        // title: '您还没有相关的订单',
        // text: '可以去看看有哪些想买',
        // buttons: [
        //   {
        //     text: '随便逛逛'
        //   }
        // ],
        // buttonClicked(index, item) {
        //   console.log(index, item)
        // },
        title: '空空如也',
        text: '暂时没有相关数据',
      }).show()

    $wuxPrompt.init('msg3', {
        title: '空空如也',
        text: '暂时没有相关数据',
      }).show()

    $wuxPrompt.init('msg4', {
        title: '空空如也',
        text: '暂时没有相关数据',
    }).show()

      this.getSystemInfo()

      //获取营地列表
      this.getData()
  },

  /**
   * 接口调用成功处理
   */
  successFun: function (id,res, selfObj) {
    if (res.res_code == 200) {
      var orders = res.dtOrderCar;
      var oo = [];
      var ss = [];
      console.log("length:" + orders.length)
      if (orders.length > 0) {
        if(status==0){
          for (var i = 0; i < orders.length; i++) {
            var obj = orders[i]
            var str =""
            switch (obj.OrderStatus){
              case 1://待付款
                str = "待付款"
                break;
              case 3://待入住
                str = "待入住"
                break;
              case 4://已入住
                str = "已入住"
                break;
              case 6://已消费 
                str = "已消费"
                break;
              case 7://已取消  
                str = "已取消"
                break;
              case 8://关闭订单
                str = "关闭订单"
                break;
            }
            ss.push(str);
            
            obj.Img = util.spiltStr(obj.CarImg)[0] + "_" + 200 + "X" + 200 + ".jpg";
            obj.i = i;
            oo.push(obj);
          }
          selfObj.setData({
            statuStr: ss
          })
        }else if(status==1){
          for (var i = 0; i < orders.length; i++) {
            var obj = orders[i]
            if (obj.OrderStatus==1){
              var str = ""
              switch (obj.OrderStatus) {
                case 1://待付款
                  str = "待付款"
                  break;
                case 3://待入住
                  str = "待入住"
                  break;
                case 4://已入住
                  str = "已入住"
                  break;
                case 6://已消费 
                  str = "已消费"
                  break;
                case 7://已取消  
                  str = "已取消"
                  break;
                case 8://关闭订单
                  str = "关闭订单"
                  break;
              }
              ss.push(str);
              obj.Img = util.spiltStr(obj.CarImg)[0] + "_" + 160 + "X" + 160 + ".jpg";
              obj.i = i;
              oo.push(obj);
            }
          }
        } else if (status == 3){
          for (var i = 0; i < orders.length; i++) {
            var obj = orders[i]
            if (obj.OrderStatus == 3) {
              var str = ""
              switch (obj.OrderStatus) {
                case 1://待付款
                  str = "待付款"
                  break;
                case 3://待入住
                  str = "待入住"
                  break;
                case 4://已入住
                  str = "已入住"
                  break;
                case 6://已消费 
                  str = "已消费"
                  break;
                case 7://已取消  
                  str = "已取消"
                  break;
                case 8://关闭订单
                  str = "关闭订单"
                  break;
              }
              ss.push(str);
              obj.Img = util.spiltStr(obj.CarImg)[0] + "_" + 160 + "X" + 160 + ".jpg";
              obj.i = i;
              oo.push(obj);
            }
          }
        }
      }
      selfObj.setData({
        order: oo
      });
    }

  },

  /**
   * 接口调用失败处理
   */
  failFun: function (id,res, selfObj) {
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
        status = 0;
        this.setData({ status: status,})
        break;
      case '1':
        console.log("代付款");
        status = 1;
        this.setData({ status: 1 })
        break;
      case '2':
        console.log("待使用");
        status = 3;
        this.setData({ status: 3 })
        break;
      case '3':
        console.log("退款");
        // this.setData({ status: 0 })
        break;
    }
    this.getData(this.data.activeIndex);
  },

  getData: function(type){
    var url = CONFIG.API_URL.GET_MyOrderData
    var params = {}
    request.GET(url, params, 100, true, this, this.successFun, this.failFun)
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