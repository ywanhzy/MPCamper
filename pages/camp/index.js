// pages/camp/index.js
const app = getApp()

const request = require('../../utils/request.js')
const CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')
let width, height;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        camp: [],
        width: '',
        hight: '',
        telstatus: true,
        districtList: [],
        sortingList: [{ key: 1, value: "综合排序", selected: false }, {
            key: 2, value: "距离优先", selected: false
        }, {
            key: 3, value: "热门优先", selected: false
        }],
        filterList: [{ key: 1, value: "自行式房车租赁", selected: false }, {
            key: 2, value: "营地房车出租", selected: false
        }, {
            key: 3, value: "有充电桩", selected: false
        }, {
            key: 4, value: "免费车位", selected: false
        }],
        districtChioceIcon: "../../images/icon-go-black.png",
        sortingChioceIcon: "../../images/icon-go-black.png",
        chioceDistrict: false,
        chioceSorting: false,
        chioceFilter: false,
        activeDistrictParentIndex: -1,
        activeDistrictChildrenIndex: -1,
        activeDistrictName: "区域位置",
        scrollTop: 0,
        scrollIntoView: 0,
        activeSortingIndex: 0,
        activeSortingName: "综合排序"
    },
    //综合排序
    selectSorting: function (e) {
        var index = e.currentTarget.dataset.index;
        // var _sortingList = this.data.sortingList;
        // _sortingList[index].selected = !_sortingList[index].selected;
        this.setData({
            sortingChioceIcon: "../../images/icon-go-black.png",
            chioceSorting: false,
            activeSortingIndex: index,
            activeSortingName: this.data.sortingList[index].value,
            productList: [],
            pageIndex: 1,
            loadOver: false,
            isLoading: true
        })
        //this.getProductList();
    },
    //筛选
    selectFilter: function (e) {
        var index = e.currentTarget.dataset.index;
        var _filterList = this.data.filterList;
        _filterList[index].selected = !_filterList[index].selected;
        this.setData({
            filterList: _filterList
        })
    },
    resetFilter: function () {
        var _filterList = this.data.filterList;
        _filterList.forEach(function (e) {
            e.selected = false;
        })
        this.setData({
            filterList: _filterList
        })
    },
    filterButtonClick: function () {
        this.setData({
            chioceFilter: false,
            productList: [],
            pageIndex: 1,
            loadOver: false,
            isLoading: true
        })
        //this.getProductList();
    },
    hideAllChioce: function () {
        this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
        });
    },
    goTel: function (e) {
        app.tel("");
    },
    /**
     * 接口调用成功处理
     */
    successFun: function (id, res, selfObj) {
        if (id === 100) {
            if (res.res_code == 200) {
                let camp = res.data;
                let camps = [];
                console.log("length:" + camp.length)
                if (camp.length > 0) {
                    for (let i = 0; i < camp.length; i++) {
                        let obj = camp[i]
                        obj.Img = util.spiltStr(obj.Imgs)[0] + "_" + parseInt(width) + "X" + parseInt(width / 2) + ".jpg";
                        obj.i = i;
                        camps.push(obj);
                    }
                }
                selfObj.setData({
                    camp: camps
                });
            }
            wx.stopPullDownRefresh(); //停止下拉刷新
        } else if (id === 101) {

        }
    },
    /**
     * 接口调用失败处理
     */
    failFun: function (id, res, selfObj) {
        console.log('failFun', res)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        width = app.globalData.width;
        height = app.globalData.height;
        if (!util.isEmpty(options.inviteId)) {
            console.log("inviteId:" + options.inviteId)
            wx.setStorageSync('inviteId', options.inviteId)
        }
        this.getList(this);
        this.getCity(this);
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        let that = this;
        console.log("下拉刷新")
        this.getList(that);
    },
    getList: function (that) {
        //获取营地列表
        // campowertype营地类型
        // playway 玩法
        // Sort 排序 / 0默认排序 1 距离排序 2 热门
        // pageIndex  第几页 不传默认第一页
        // pageSize  每页数量 不传默认20条
        // longitude 经度
        // latitude 维度
        // cityName 城市 ,
        //     a = 自行式房车租赁 1 选择 0未选择,
        //         b = 营地房车出租1 选择 0 未选择，
        // c = 有充电桩1 选择 0 未选择，
        // d = 免费车位 1 选择 0 未选择
        let url = CONFIG.API_URL.GET_CampOwerData
        let params = {}
        request.GET(url, params, 100, true, that, that.successFun, that.failFun)
    },
    getCity: (that) => {
        let url = CONFIG.API_URL.GET_CityData
        let params = { type: '3' }
        request.GET(url, params, 101, true, that, that.successFun, that.failFun)
    },
    //条件选择
    choiceItem: function (e) {
        switch (e.currentTarget.dataset.item) {
            case "1":
                if (this.data.chioceDistrict) {
                    this.setData({
                        districtChioceIcon: "../../images/icon-go-black.png",
                        sortingChioceIcon: "../../images/icon-go-black.png",
                        chioceDistrict: false,
                        chioceSorting: false,
                        chioceFilter: false,
                    });
                }
                else {
                    this.setData({
                        districtChioceIcon: "../../images/icon-down-black.png",
                        sortingChioceIcon: "../../images/icon-go-black.png",
                        chioceDistrict: true,
                        chioceSorting: false,
                        chioceFilter: false,
                    });
                }
                break;
            case "2":
                if (this.data.chioceSorting) {
                    this.setData({
                        districtChioceIcon: "../../images/icon-go-black.png",
                        sortingChioceIcon: "../../images/icon-go-black.png",
                        chioceDistrict: false,
                        chioceSorting: false,
                        chioceFilter: false,
                    });
                }
                else {
                    this.setData({
                        districtChioceIcon: "../../images/icon-go-black.png",
                        sortingChioceIcon: "../../images/icon-down-black.png",
                        chioceDistrict: false,
                        chioceSorting: true,
                        chioceFilter: false,
                    });
                }
                break;
            case "3":
                if (this.data.chioceFilter) {
                    this.setData({
                        districtChioceIcon: "../../images/icon-go-black.png",
                        sortingChioceIcon: "../../images/icon-go-black.png",
                        chioceDistrict: false,
                        chioceSorting: false,
                        chioceFilter: false,
                    });
                }
                else {
                    this.setData({
                        districtChioceIcon: "../../images/icon-go-black.png",
                        sortingChioceIcon: "../../images/icon-go-black.png",
                        chioceDistrict: false,
                        chioceSorting: false,
                        chioceFilter: true,
                    });
                }
                break;
        }
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        let inviteId = wx.getStorageSync('memberguid')
        console.log("inviteId:" + inviteId)
        console.log('onShareAppMessage')
        let shareObj = {
            title: '房车行',
            desc: '房车行',
            path: '/pages/camp/index?inviteId=' + inviteId,
            success: function (res) {
                console.log('success')
            },
            fail: function () {
                console.log('fail')
            },
            complete: function () {
            }
        };

        return shareObj;
    }
})