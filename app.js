//app.js
App({
        onLaunch: function () {
                // 展示本地存储能力
                var that=this
                var logs = wx.getStorageSync('logs') || []
                logs.unshift(Date.now())
                wx.setStorageSync('logs', logs)
                this.GetInfo(that);
                // 登录
                wx.login({
                        success: res => {
                                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                        }
                })
                // 获取用户信息
                wx.getSetting({
                        success: res => {
                                if (res.authSetting['scope.userInfo']) {
                                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                                        wx.getUserInfo({
                                                success: res => {
                                                        // 可以将 res 发送给后台解码出 unionId
                                                        this.globalData.userInfo = res.userInfo

                                                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                                        // 所以此处加入 callback 以防止这种情况
                                                        if (this.userInfoReadyCallback) {
                                                                this.userInfoReadyCallback(res)
                                                        }
                                                }
                                        })
                                }
                        }
                })

        },
        GetInfo: function (that) {
                wx.getSystemInfo({
                        success: function (res) {
                                that.globalData.width = res.windowWidth
                                that.globalData.height = res.windowHeight
                                console.log('手机型号：' + res.model + '操作系统版本：' + res.system + '手机品牌：' + res.brand)
                                console.log('设备像素比：' + res.pixelRatio)
                                console.log('窗口宽度：' + res.windowWidth)
                                console.log('窗口高度：' + res.windowHeight)
                                console.log('微信设置的语言：' + res.language)
                                console.log('微信版本号：' + res.version)
                                console.log('客户端平台：' + res.platform + '客户端基础库版本：' + res.SDKVersion)
                        }
                });

                //获取网络类型
                wx.getNetworkType({
                        success: function (res) {
                                // 返回网络类型, 有效值：
                                // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
                                var networkType = res.networkType
                                console.log('网络类型：' + res.networkType)
                        }
                });
                //监听网络状态变化
                wx.onNetworkStatusChange(function (res) {
                        console.log(res.isConnected)
                        console.log(res.networkType)
                });
                //获取定位
                // wx.getLocation({
                //         type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                //         success: function (res) {
                //                 var latitude = res.latitude
                //                 var longitude = res.longitude
                //                 console.log(latitude + "--" + longitude)
                //         }
                // })
        },
        //拨打电话 phoneNumber 为空时默认电话
        tel: function (phoneNumber) {
                var that = this;
                console.error(phoneNumber)
                var telNum;
                if (phoneNumber != null && phoneNumber != undefined && phoneNumber != '') {
                        telNum = phoneNumber;
                }else{
                        telNum = that.globalData.phoneNumber;
                }
                wx.makePhoneCall({
                        phoneNumber: telNum
                })
        },
        //地图导航
        // latitude：纬度，范围为-90~90，负数表示南纬
        // longitude：经度，范围为 - 180~180，负数表示西经
        // scale: 缩放比例，范围5~18，默认为18
        // name：位置名
        // address：地址
        map: function (latitude, longitude, scale, name, address){
                wx.openLocation({
                        latitude: latitude,
                        longitude: longitude,
                        scale: scale,
                        name: name,
                        address: address
                })
        },
        globalData: {
                userInfo: null,
                phoneNumber: '4000-155-105',
                width:null,//屏幕宽
                height:null//屏幕高
        }
})

