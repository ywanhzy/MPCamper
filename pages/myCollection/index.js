// pages/myCollection/index.js
import { $wuxPrompt } from '../../components/wux'
import { $wuxToast } from '../../components/wux'
const sliderWidth = 96
const CONFIG = require('../../utils/config.js')
const request = require('../../utils/request.js')
const util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: ['营地', '住房车', '租房车', '吃喝玩乐'],
        activeIndex: '0',
        sliderOffset: 0,
        sliderLeft: 0,
        collections:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        $wuxPrompt.init('msg1', {
            title: '',
            text: '暂时没有相关数据',
        }).show()

        $wuxPrompt.init('msg2', {
            title: '',
            text: '暂时没有相关数据',
        }).show()

        $wuxPrompt.init('msg3', {
            title: '',
            text: '暂时没有相关数据',
        }).show()

        $wuxPrompt.init('msg4', {
            title: '',
            text: '暂时没有相关数据',
        }).show()

        this.getSystemInfo()
        this.getData();
    },

    //获取收藏数据
    getData: function () {
        var url = CONFIG.API_URL.GET_MyColectionData
        var params = {}
        request.GET(url, params, 100, true, this, this.successFun, this.failFun)
    },

    /**
     * 接口调用成功处理
     */
    successFun: function (id, res, selfObj) {
        switch (id) {
            case 100:
                if (res.res_code == 200) {
                    if (this.data.activeIndex === '0'){//营地
                        selfObj.setData({
                            collections: res.data.Table5
                        });
                    } else if (this.data.activeIndex === '1'){//住房车
                        selfObj.setData({
                            collections: res.data.Table6
                        });
                    } else if (this.data.activeIndex === '2') {//租房车
                        selfObj.setData({
                            collections: res.data.Table
                        });
                        for(let i = 0 ; i < this.data.collections.length; i++){
                            let obj = this.data.collections[i]
                            obj.Url = util.spiltStr(obj.Url)[0] + "_" + 200 + "X" + 200 + ".jpg";
                        }
                        
                    } else{
                        selfObj.setData({
                            collections: []
                        });
                    }
                }
            break;
        }
    },

    /**
     * 接口调用失败处理
     */
    failFun: function (id, res, selfObj) {
        console.log('failFun', res)
    },

    getSystemInfo() {
        const that = this
        wx.getSystemInfo({
            success(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                })
            }
        })
    },
    tabClick(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id,
        })
        this.getData();
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