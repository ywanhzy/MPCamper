// pages/invitation/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    goRecord: function () {
        wx.navigateTo({
            url: '/pages/invitationRecord/index?id=1'
        })
    },
    onShareAppMessage: function (options) {
        var inviteId = wx.getStorageSync('memberguid')

        console.log("inviteId:" + inviteId)
        var shareObj = {
            title: '房车行',
            desc: '房车行',
            path: '/pages/index/index?inviteId=' + inviteId,
            success: function (res) {
                console.log('success')
                var shareTickets = res.shareTickets;
                console.log('shareTickets：' + shareTickets)
                // if (shareTickets.length == 0) {
                //         return false;
                // }
                // wx.getShareInfo({
                //         shareTicket: shareTickets[0],
                //         success: function (res) {
                //                 var encryptedData = res.encryptedData;
                //                 var iv = res.iv;
                //         }
                // })
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