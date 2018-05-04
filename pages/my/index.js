// pages/my/index.js
const app = getApp()
const util = require('../../utils/util.js')
const CONFIG = require('../../utils/config.js')
Page({

        data: {
                items: [
                        {
                                icon: '../../images/my_order.png',
                                text: '我的订单',
                                path: '/pages/myOrder/index'
                        },
                        {
                                icon: '../../images/my_about.png',
                                text: '设置',
                                path: '/pages/setting/index'
                        }
                ],

                gridItems: [
                        {
                                icon: '../../images/my_sc.png',
                                text: '我的收藏',
                                path: '11'
                        },
                        {
                                icon: '../../images/my_kf.png',
                                text: '在线客服',
                                path: null,
                        },
                        {
                                icon: '../../images/my_tjyj.png',
                                text: '推荐有奖',
                                path: ''
                                // path: '/pages/invitation/index'
                        },
                        {
                                icon: '../../images/my_yjfk.png',
                                text: '建议反馈',
                                path: '/pages/feedBack/index'
                        },
                        {
                                icon: '../../images/my_wyhz.png',
                                text: '我要合作',
                                path: '/pages/cooperate/index'
                        },
                        {
                                icon: '../../images/my_about.png',
                                text: '关于我们',
                                path: '/pages/aboutUs/index'
                        }
                ],
                userInfo: null,
                nickName:null
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                console.log("onload")
                var memeberguid = wx.getStorageSync("memberguid")


        },
        toLogin: function (options) {
                var that = this;
                //未授权 去授权登录
                app.wxAuthorize()

        },
        goClean: function(){
                try {
                        wx.clearStorageSync()
                        wx.reLaunch({
                                url: '/pages/index/index',
                        })
                } catch (e) {
                        // Do something when catch error
                }
        },
        navigateTo: function (e) {
                const index = e.currentTarget.dataset.index
                const path = e.currentTarget.dataset.path
                console.error(index + path)
                var my_authorize = wx.getStorageSync('wx_authorize')
                var token = wx.getStorageSync('token')
                switch (index) {
                        case 0:
                                if (my_authorize) {
                                        if (token == '') {
                                                wx.navigateTo({
                                                        url: '../login/index?id=1'
                                                })
                                        } else {
                                                wx.navigateTo({
                                                        url: path
                                                })
                                        }

                                } else {
                                        // app.wxAuthorize();
                                        wx.showToast({
                                                title: '请绑定房车行账号',
                                        })
                                }
                                break
                        default:
                                wx.navigateTo({
                                        url: path,
                                        success: function (res) { },
                                        fail: function (res) { },
                                        complete: function (res) { },
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
                var that = this
                console.log("onShow")
                setTimeout(function () {
                        console.log("userInfo:" + app.globalData.userInfo)
                        console.log("eUserInfo:" + app.globalData.eUserInfo)
                        var memeberguid = wx.getStorageSync("memberguid")
                        var eUserInfo=wx.getStorageSync("eUserInfo")
                        var userInfo = wx.getStorageSync("userInfo")
                        if (util.isEmpty(memeberguid)) {
                                if (userInfo != null) {
                                        that.setData({
                                                nickName: userInfo.nickName,
                                                avatarUrl: userInfo.avatarUrl,
                                        });
                                }
                        } else {
                                if (eUserInfo != null) {
                                        that.setData({
                                                nickName: eUserInfo.NickName,
                                                avatarUrl: eUserInfo.HeadImg,
                                                phone: eUserInfo.Phone
                                        });
                                }
                        }

                }, 500);
        },
        userInfoHandler:function(e){
                var that=this
                console.log("userInfoHandler：" + JSON.stringify(e.detail))
                var resData = e.detail

                console.log("getUserInfo:" + JSON.stringify(e.detail.userInfo))
                wx.setStorage({ key: "userInfo", data: e.detail.userInfo }) //保存微信的信息

                if (util.isEmpty(e.detail.userInfo)) {
                        wx.setStorageSync('wx_authorize', false)
                        console.log("userInfofalse" )
                }else{
                        wx.setStorageSync('wx_authorize', true)
                        console.log("userInfotrue" )
                }

                wx.login({
                        success: function (res) {
                                if (res.code) {
                                        console.error("code:" + res.code)
                                        wx.setStorageSync('wx_code', res.code)
                                        resData.code = wx.getStorageSync('wx_code')

                                        console.error(JSON.stringify(resData))
                                        wx.showLoading({
                                                title: '加载中...',
                                        })
                                        wx.request({
                                                url: CONFIG.API_URL.GET_WeChatLoginInfo,
                                                data: {
                                                        jsonData: JSON.stringify(resData)
                                                },
                                                success: function (res) {
                                                        console.log(res.data)
                                                        wx.hideLoading()
                                                        if (!util.isEmpty(res.data)) {
                                                                app.globalData.eUserInfo = res.data.data;
                                                                wx.setStorage({ key: "eUserInfo", data: res.data.data })


                                                                wx.setStorageSync('wx_unionid', res.data.data.unionid)
                                                                wx.setStorageSync('wx_openid', res.data.data.Openid)
                                                                wx.setStorageSync('token', res.data.data.token)
                                                                wx.setStorageSync('memberguid', res.data.data.GUID)

                                                                var memeberguid = wx.getStorageSync("memberguid")

                                                                if (util.isEmpty(res.data.data.GUID)) {
                                                                        e.detail.userInfo
                                                                        var userInfo = wx.getStorageSync("userInfo")
                                                                        if (userInfo != null) {
                                                                                that.setData({
                                                                                        nickName: userInfo.nickName,
                                                                                        avatarUrl: userInfo.avatarUrl,
                                                                                });
                                                                        }
                                                                } else {
                                                                        console.log(res.data.data.NickName)
                                                                        console.log(res.data.data.HeadImg)

                                                                        if (res.data.data != null) {
                                                                                that.setData({
                                                                                        nickName: res.data.data.NickName,
                                                                                        avatarUrl: res.data.data.HeadImg,
                                                                                        phone: res.data.data.Phone
                                                                                });
                                                                        }
                                                                }

                                                                var token = wx.getStorageSync('token')
                                                                if (token == '') {
                                                                        wx.navigateTo({
                                                                                url: '../login/index?id=1'
                                                                        })
                                                                } 
                                                        }
                                                }
                                        })

                                } else {
                                        console.log('获取用户登录态失败！' + res.errMsg)
                                }

                        },
                        fail: function (res) {
                                console.log('login-fail')
                        }
                });

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

        }
})