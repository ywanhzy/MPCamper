// pages/feedBack/index.js
import { $wuxGallery } from '../../components/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'one', value: '功能异常', checked: 'true' },
      { name: 'two', value: '优化建议' },
    ],
    type:'one',
    content: '请描述你的问题或建议，如果有系统截图，请在添加图片处上传截图，我们将尽快优化体验，感谢您的反馈。',

    urls:[],
    
    hideAddImg: false
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  chooseImg: function(){
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },

  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          urls: res.tempFilePaths,
        })
        if(urls.length>=9){
          this.setData({hideAddImg:true})
        }else{
          this.setData({ hideAddImg: false })
        }
      }
    })
  },

  showGallery:function(e) {
    const dataset = e.currentTarget.dataset
    const current = dataset.current
    const urls = this.data.urls

    $wuxGallery.show({
      current: current,
      urls: urls,
      [`delete`](current, urls) {
        urls.splice(current, 1)
        this.setData({
          urls: urls,
        })
        return !0
      },
      cancel: () => console.log('Close gallery')
    })
  },
  previewImage:function(e) {
    const dataset = e.currentTarget.dataset
    const current = dataset.current
    const urls = this.data.urls

    wx.previewImage({
      current: current,
      urls: urls,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({ type: e.detail.value});
  }
})