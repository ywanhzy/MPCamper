// pages/wxPay/wxPay.js

const app = getApp()

const request = require('../../utils/request.js')
const CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')
let orderid, payType, urls ;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    payParam: '',
  },
  successFun: function (id, res, selfObj) {
      if (id == 100) {
          if (res.res_code == 200) {
              var wxPay = res.data;
              console.log(wxPay)
              wx.requestPayment({
                  'timeStamp': wxPay.timeStamp,
                  'nonceStr': wxPay.nonceStr,
                  'package': wxPay.package,
                  'signType': 'MD5',
                  'paySign': wxPay.paySign,
                  'success': function (res) {

                      console.log("支付成功")
                      let payResultUrl;
                      if (payType==1){
                          payResultUrl = urls+"#/PaySuccess?orderno=" + orderid
                      }else{
                          payResultUrl = urls +"#/pay_success?orderno=" + orderid
                      }

                      //定义小程序页面集合
                      var pages = getCurrentPages();
                      //当前页面 (wxpay page)
                      var currPage = pages[pages.length - 1];
                      //上一个页面 （index page） 
                      var prevPage = pages[pages.length - 2];
                      //通过page.setData方法使index的webview 重新加载url  有点类似于后台刷新页面
                      //此处有点类似小程序通过加载URL的方式回调通知后端 该订单支付成功。后端逻辑不做赘述。
                      prevPage.setData({
                          url: payResultUrl,
                          types: true
                      }),
                      //小程序主动返回到上一个页面。即从wxpay page到index page。此时index page的webview已经重新加载了url 了
                      //微信小程序的page 也有栈的概念navigateBack 相当于页面出栈的操作
                      wx.navigateBack();

                    //   wx.reLaunch({
                    //       url: '../webview/index',
                    //   })
                  },
                  'fail': function (res) {
                      console.log("支付失败")
                       console.log(res)
                    //   var pages = getCurrentPages();
                    //   var currPage = pages[pages.length - 1];
                    //   var prevPage = pages[pages.length - 2];
                    //   prevPage.setData({
                    //       url: "http://cs.ezagoo.net:8002/#/pay_success",
                    //       types: false
                    //   }),
                         
                    //   wx.navigateBack();
                  }
              })
          }
      } else if (id==101){
          if (res.res_code == 200) {
              var openid = res.openid;
              console.error(openid)
              var url = CONFIG.API_URL.GET_WxPay
              var params = {
                  orderno: orderid,
                  openid: openid,
                  flag: "1"
              }
              request.GET(url, params, 100, true, selfObj, selfObj.successFun, selfObj.failFun)
          }
      }
  },

  /**
   * 接口调用失败处理
   */
  failFun: function (id, res, selfObj) {
      console.log('failFun', id+"-"+ res)
    //   wx.showToast({
    //       title: '支付失败-' + id + "-" + res,
    //   })
    //   wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    urls = CONFIG.API_URL.GET_INDEX;
    console.error(urls);
    let selfObj=this;
    console.log('option:' + JSON.stringify(options));

    console.log(options.payParam);

    let param = decodeURIComponent(options.payParam);
    payType=options.payType;

    console.log(param);

    let pay = JSON.parse(param);

    this.setData({
        orderid: pay.orderId,
    })
    orderid = pay.orderId;
    console.log('orderId:' + pay.orderId);
//根据code 获取openid
    wx.login({
        success: function (res) {
            if (res.code) {
                console.error("code:" + res.code)
                var urlOpen = CONFIG.API_URL.GET_WxOpenId
                var params = {
                    code: res.code,
                    flag: "1"
                }
                request.GET(urlOpen, params, 101, true, selfObj, selfObj.successFun, selfObj.failFun)


                // var url = CONFIG.API_URL.GET_WxPay
                // var params = {
                //     orderno: orderid,
                //     openid: res.code,
                //     flag: "1"
                // }
                // request.GET(url, params, 100, true, selfObj, selfObj.successFun, selfObj.failFun)

                //------------临时跳转---start------------
                // var pages = getCurrentPages();
                // var currPage = pages[pages.length - 1];
                // var prevPage = pages[pages.length - 2];
                // prevPage.setData({
                //     url: url+"/#/pay_success?orderno=orderid",
                //     types:true
                // })
                // wx.navigateBack();
                //------------临时跳转--end-------------
               
                
            } else {
                console.log('获取用户登录态失败！' + res.errMsg)
            }

        },
        fail: function (res) {
            console.log('login-fail')
            wx.showToast({
                title: '支付失败-wx.login-'  + "-" + res,
            })
            wx.navigateBack();
        }
    });


  },
  //根据 obj 的参数请求wx 支付
  requestPayment: function (obj) {
      //获取options的订单Id
      var orderId = obj.orderId;
      //调起微信支付
      wx.requestPayment({
          //相关支付参数
          'timeStamp': obj.timestamp,
          'nonceStr': obj.nonceStr,
          'package': 'prepay_id=' + obj.prepay_id,
          'signType': obj.signType,
          'paySign': obj.paySign,
          //小程序微信支付成功的回调通知
          'success': function (res) {
              //定义小程序页面集合
              var pages = getCurrentPages();
              //当前页面 (wxpay page)
              var currPage = pages[pages.length - 1];
              //上一个页面 （index page） 
              var prevPage = pages[pages.length - 2];
              //通过page.setData方法使index的webview 重新加载url  有点类似于后台刷新页面
              //此处有点类似小程序通过加载URL的方式回调通知后端 该订单支付成功。后端逻辑不做赘述。
              prevPage.setData({
                  url: "https://xxxxxxxxxx.com/wx_isPayment.jhtml?orderId=" + orderId + '&ispay=0',

              }),
                //小程序主动返回到上一个页面。即从wxpay page到index page。此时index page的webview已经重新加载了url 了
                //微信小程序的page 也有栈的概念navigateBack 相当于页面出栈的操作
                wx.navigateBack();
          },
          //小程序支付失败的回调通知
          'fail': function (res) {
              console.log("支付失败"),
                  console.log(res)
              var pages = getCurrentPages();
              var currPage = pages[pages.length - 1];
              var prevPage = pages[pages.length - 2];
              console.log("准备修改数据")
              prevPage.setData({
                  url: "https://xxxxxxxxxx/wx_isPayment.jhtml?orderId=" + orderId + '&ispay=0',
              }),
                  console.log("准备结束页面")
              wx.navigateBack();
          }
      })
  },

  //采用小程序支付
  confirmPay: function () {
    console.log('wxpay');
    const _this = this;
    wx.requestPayment(
      {
        "timeStamp": _this.data.payParam.timeStamp,
        "package": _this.data.payParam.package,
        "paySign": _this.data.payParam.paySign,
        "signType": _this.data.payParam.signType,
        "nonceStr": _this.data.payParam.nonceStr,
        "paySign": _this.data.payParam.paySign,
         //支付成功的回调
        'success': function (res) {      
          console.log('success:' + JSON.stringify(res));
        },
        //支付失败的回调
        'fail': function (res) {
          console.log('fail:' + JSON.stringify(res));
          wx.showToast({
            title: '支付失败:' + JSON.stringify(res),
            icon: 'none',
          })
          

        },
        'complete': function (res) {
          console.log('complete:' + JSON.stringify(res));
        }
      })
  }

})