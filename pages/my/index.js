// pages/my/index.js
const app = getApp()

Page({

        /**
         * 页面的初始数据
         */
        data: {
                items: [
                        {
                                icon: '../../images/tel.png',
                                text: '我的订单',
                                path: '/pages/myOrder/index'
                        },
                        {
                                icon: '../../images/tel.png',
                                text: '设置',
                                path: '/pages/setting/index'
                        }
                ],
                userInfo: null
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                console.log("onload")
                this.setData({
                        userInfo: app.globalData.userInfo
                })

        },
        toLogin: function (options) {
                var that = this;
                //未授权 去授权登录
                app.wxAuthorize()
                
        },
        navigateTo: function (e) {
                const index = e.currentTarget.dataset.index
                const path = e.currentTarget.dataset.path
                console.error(index + path)
                var my_authorize = wx.getStorageSync('wx_authorize')
                var token = wx.getStorageSync('token')
                switch (index) {
                        case 0:
                                if(my_authorize){
                                    if(token==''){
                                        wx.navigateTo({
                                          url: '../login/index?id=1'
                                        })
                                    }else{
                                        wx.navigateTo({
                                          url: path
                                        })
                                    }
                                    
                                }else{
                                    app.wxAuthorize();
                                }
                                break
                        default:
                                wx.navigateTo({
                                        url: path,
                                        success: function(res) {},
                                        fail: function(res) {},
                                        complete: function(res) {},
                                })
                }
        },
        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {
                console.log("onReady")
        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {
                var that=this
                console.log("onShow")
                

                setTimeout(function () {
                        console.log("userInfo:" + app.globalData.userInfo)

                        that.setData({
                                userInfo: app.globalData.userInfo
                        });
                }, 1000);
        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {
                console.log("onHide")
        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function () {
                console.log("onUnload")
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