const app = getApp()

const request = require('../../utils/request.js')
const CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')
const amapFile = require('../../libs/amap-wx.js');

let width, height;
let sort = 0, cityName = '', longitude, latitude,a=0,b=0,c=0,d=0;
let arrTypt=[];
let counts=0;
let _filterList = [{ key: 'a', value: "自行式房车租赁", selected: false }, {
    key: 'b', value: "营地房车出租", selected: false
}, {
    key: 'c', value: "有充电桩", selected: false
}, {
    key: 'd', value: "免费车位", selected: false
}];
let citys=[];

Page({
    data: {
        camp: [],
        width: '',
        hight: '',
        telstatus: true,
        districtList: [],
        sortingList: [{ key: 0, value: "综合排序", selected: false }, {
            key: 1, value: "距离优先", selected: false
        }, {
            key: 2, value: "热门优先", selected: false
        }],
        filterList: _filterList,
        districtChioceIcon: "../../images/jiantou_off.png",
        sortingChioceIcon: "../../images/jiantou_off.png",
        chioceDistrict: false,
        chioceSorting: false,
        chioceFilter: false,
        activeDistrictParentIndex: -1,
        activeDistrictChildrenIndex: -1,
        activeDistrictName: "区域位置",
        scrollTop: 0,
        scrollIntoView: 0,
        activeSortingIndex: 0,
        activeDistrictIndex: 0,
        activeSortingName: "综合排序",
        checkboxCounts: counts
    },
    //综合排序
    selectSorting: function (e) {
        let that = this;
        var index = e.currentTarget.dataset.index;
        var _sortingList = this.data.sortingList;
        // _sortingList[index].selected = !_sortingList[index].selected;
        sort = _sortingList[index].key;
        console.error(_sortingList[index].key);
        this.setData({
            sortingChioceIcon: "../../images/jiantou_off.png",
            chioceSorting: false,
            activeSortingIndex: index,
            activeSortingName: this.data.sortingList[index].value,
            productList: [],
            pageIndex: 1,
            loadOver: false,
            isLoading: true
        })
        this.getList(that);
    },
    //区域位置
    selectDistrict: function (e) {
        let that = this;
        var index = e.currentTarget.dataset.index;
        var _districtList = this.data.districtList;
        // _sortingList[index].selected = !_sortingList[index].selected;
        cityName = _districtList[index].CityName;
        console.error(_districtList[index].CityName);
        this.setData({
            districtChioceIcon: "../../images/jiantou_off.png",
            chioceDistrict: false,
            activeDistrictIndex: index,
            activeDistrictName: this.data.districtList[index].CityName,
            productList: [],
            pageIndex: 1,
            loadOver: false,
            isLoading: true
        })
        this.getList(that);
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
         _filterList = this.data.filterList;
        console.error(_filterList);
        arrTypt.splice(0, arrTypt.length);//清空数组 
        counts=0;
        _filterList.forEach((e)=>{
            let _value='0';
            if (e.selected){
                _value='1'
                counts++;
            }
            arrTypt.push(_value)
            // console.error(e.key+e.selected);
        })
        console.error(arrTypt)

        console.error(counts)
        this.setData({
            chioceFilter: false,
            productList: [],
            pageIndex: 1,
            loadOver: false,
            checkboxCounts: counts,
            isLoading: true
        })
        this.getList(this);
    },
    hideAllChioce: function () {
        this.setData({
            districtChioceIcon: "../../images/jiantou_off.png",
            sortingChioceIcon: "../../images/jiantou_off.png",
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
            }else{
                let camp = res.data;
                selfObj.setData({
                    camp: camp
                });
                wx.showToast({
                    title: res.res_msg,
                })
            }
            wx.stopPullDownRefresh(); //停止下拉刷新
        } else if (id === 101) {
            //获取区域位置
            if (res.res_code == 200) {
                citys = res.data;
                let country  = [{ "Guid": "1", "CityName": "全国", "TotalNum": 10 }]

                let allCity = [...country, ...citys];
                console.error(allCity)
                selfObj.setData({
                    districtList: allCity
                });
            }
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
        longitude = wx.getStorageSync('longitude')
        latitude = wx.getStorageSync('latitude')
        arrTypt=[0,0,0,0]
        this.getList(this);
        this.getCity(this);

        var that= this;
        var key = CONFIG.APP_KEY.AmapKey;
        var myAmapFun = new amapFile.AMapWX({ key: key });
        myAmapFun.getRegeo({
            iconPath: "",
            iconWidth: 22,
            iconHeight: 32,
            success: function (data) {
                console.error(data[0])
                console.error(data[0].regeocodeData.addressComponent.city)
                wx.setStorageSync('location_city', data[0].regeocodeData.addressComponent.city)
                wx.setStorageSync('location_province', data[0].regeocodeData.addressComponent.province)
                wx.setStorageSync('location_name', data[0].name)
                wx.setStorageSync('location_desc', data[0].desc)
                wx.setStorageSync('location_address', data[0].regeocodeData.formatted_address)
                var marker = [{
                    id: data[0].id,
                    latitude: data[0].latitude,
                    longitude: data[0].longitude,
                    iconPath: data[0].iconPath,
                    width: data[0].width,
                    height: data[0].height
                }]
                that.setData({
                    markers: marker
                });
                that.setData({
                    latitude: data[0].latitude
                });
                that.setData({
                    longitude: data[0].longitude
                });
                that.setData({
                    textData: {
                        name: data[0].name,
                        desc: data[0].desc
                    }
                })
            },
            fail: function (info) {
                // wx.showModal({title:info.errMsg})
            }
        })
    
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
        // pageIndex  第几页 不传默认第一页
        // pageSize  每页数量 不传默认20条

        let url = CONFIG.API_URL.GET_CampOwerData
        let params = { Sort: sort, cityName: cityName, longitude: longitude, latitude: latitude, a: arrTypt[0], b: arrTypt[1], c: arrTypt[2], d: arrTypt[3]}
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
                        districtChioceIcon: "../../images/jiantou_off.png",
                        sortingChioceIcon: "../../images/jiantou_off.png",
                        chioceDistrict: false,
                        chioceSorting: false,
                        chioceFilter: false,
                    });
                }
                else {
                    this.setData({
                        districtChioceIcon: "../../images/jiantou_on.png",
                        sortingChioceIcon: "../../images/jiantou_off.png",
                        chioceDistrict: true,
                        chioceSorting: false,
                        chioceFilter: false,
                    });
                }
                break;
            case "2":
                if (this.data.chioceSorting) {
                    this.setData({
                        districtChioceIcon: "../../images/jiantou_off.png",
                        sortingChioceIcon: "../../images/jiantou_off.png",
                        chioceDistrict: false,
                        chioceSorting: false,
                        chioceFilter: false,
                    });
                }
                else {
                    this.setData({
                        districtChioceIcon: "../../images/jiantou_off.png",
                        sortingChioceIcon: "../../images/jiantou_on.png",
                        chioceDistrict: false,
                        chioceSorting: true,
                        chioceFilter: false,
                    });
                }
                break;
            case "3":
                if (this.data.chioceFilter) {
                    this.setData({
                        districtChioceIcon: "../../images/jiantou_off.png",
                        sortingChioceIcon: "../../images/jiantou_off.png",
                        chioceDistrict: false,
                        chioceSorting: false,
                        chioceFilter: false,
                        filterList: _filterList,
                    });
                }
                else {
                    this.setData({
                        districtChioceIcon: "../../images/jiantou_off.png",
                        sortingChioceIcon: "../../images/jiantou_off.png",
                        chioceDistrict: false,
                        chioceSorting: false,
                        chioceFilter: true,
                        filterList: _filterList,
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
            title: '约你游',
            desc: '约你游',
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