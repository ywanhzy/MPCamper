const app = getApp()
const util = require('../../utils/util.js')
const CONFIG = require('../../utils/config.js')
const request = require('../../utils/request.js')
let isShow=false;
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
                path: '/pages/myCollection/index'
            },
            {
                icon: '../../images/my_kf.png',
                text: '在线客服',
                path: null,
            },
            {
                icon: '../../images/my_tjyj.png',
                text: '推荐有奖',
                path: '/pages/invitation/index'
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
        nickName: null,
        Profit: 0.00,
        WalletMoney: 0.00,
        ConponTotalMoney: 0.00,
        TotalProfit: 0.00,
        showPic:'../../images/eye_off.png',
        isShow: isShow
    },
    successFun: function (id, res, selfObj) {
        if (id === 100) {
            if (res.res_code == 200) {
                let myData = res.data[0];
                console.log("length:" + myData)
                selfObj.setData({
                    Profit: myData.Profit,
                    WalletMoney: myData.WalletMoney,
                    ConponTotalMoney: myData.ConponTotalMoney,
                    TotalProfit: myData.TotalProfit
                })
            } else {
                wx.showToast({
                    title: res.res_msg,
                })
            }
        } else if (id === 101) {
            // “Profit”:昨日收益,
            // “ConponTotalMoney”:总优惠券金额,
            // “TotalProfit”:累计收益
        }
    },
 
    failFun: function (id, res, selfObj) {
        console.log('failFun', res)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("onload")
        let memeberguid = wx.getStorageSync("memberguid")


    },
    toLogin: function (options) {
        let that = this;
        //未授权 去授权登录
        app.wxAuthorize()

    },
    showMoney: function (){
        if (isShow){
            isShow=false;
            this.setData({
                isShow: isShow,
                showPic: '../../images/eye_off.png'
            });
        }else{
            isShow = true;
            this.setData({
                isShow: isShow,
                showPic: '../../images/eye_on.png'
            });
        }
        
    },
    goClean: function () {
        try {
            // wx.clearStorageSync()
            // wx.reLaunch({
            //         url: '/pages/index/index',
            // })
        } catch (e) {
            // Do something when catch error
        }
    },
    navigateTo: function (e) {
        const index = e.currentTarget.dataset.index
        const path = e.currentTarget.dataset.path
        console.error(index + path)
        let my_authorize = wx.getStorageSync('wx_authorize')
        let token = wx.getStorageSync('token')
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
        let that = this
        console.log("onShow")
        setTimeout(()=> {
            console.log("userInfo:" + app.globalData.userInfo)
            console.log("eUserInfo:" + app.globalData.eUserInfo)
            let memeberguid = wx.getStorageSync("memberguid")
            let eUserInfo = wx.getStorageSync("eUserInfo")
            let userInfo = wx.getStorageSync("userInfo")
            if (util.isEmpty(memeberguid)) {
                if (userInfo != null) {
                    this.setData({
                        nickName: userInfo.nickName,
                        avatarUrl: userInfo.avatarUrl,
                    });
                }
            } else {
                if (eUserInfo != null) {
                    this.setData({
                        nickName: eUserInfo.NickName,
                        avatarUrl: eUserInfo.HeadImg,
                        phone: eUserInfo.Phone
                    });
                }
            }
        }, 500);

        let memeberguid = wx.getStorageSync("memberguid")
        if (!util.isEmpty(memeberguid)) {
            this.getMyData(that);
        }
        
    },
    getMyData: (that)=>{
        let url = CONFIG.API_URL.GET_MyIndexData;
        let params = {};
        request.GET(url, params, 100, true, that, that.successFun, that.failFun);
    },
    userInfoHandler: function (e) {
        let that = this
        console.log("userInfoHandler：" + JSON.stringify(e.detail))
        let resData = e.detail

        console.log("getUserInfo:" + JSON.stringify(e.detail.userInfo))
        wx.setStorage({ key: "userInfo", data: e.detail.userInfo }) //保存微信的信息

        if (util.isEmpty(e.detail.userInfo)) {
            wx.setStorageSync('wx_authorize', false)
            console.log("userInfofalse")
        } else {
            wx.setStorageSync('wx_authorize', true)
            console.log("userInfotrue")
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

                                that.getMyData(that);

                                let memeberguid = wx.getStorageSync("memberguid")

                                if (util.isEmpty(res.data.data.GUID)) {
                                    e.detail.userInfo
                                    let userInfo = wx.getStorageSync("userInfo")
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
                                        let _nickName, _avatarUrl
                                        let userInfo = wx.getStorageSync("userInfo")
                                        if (util.isEmpty(res.data.data.NickName)) {
                                            _nickName = userInfo.nickName;
                                        } else {
                                            _nickName = res.data.data.NickName;
                                        }
                                        if (util.isEmpty(res.data.data.HeadImg)) {
                                            _avatarUrl = userInfo.avatarUrl;
                                        } else {
                                            _avatarUrl = res.data.data.HeadImg;
                                        }
                                        console.error("_nickName" + _nickName)
                                        console.error("_avatarUrl" + _avatarUrl)
                                        that.setData({
                                            nickName: _nickName,
                                            avatarUrl: _avatarUrl,
                                            phone: res.data.data.Phone
                                        });
                                    }
                                }

                                let token = wx.getStorageSync('token')
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
    goMyInfo:()=>{
        let memeberguid = wx.getStorageSync("memberguid")
        if (util.isEmpty(memeberguid)) {
            
        }else{
            wx.navigateTo({
                url: '../../pages/myInfo/index',
            })
        }
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