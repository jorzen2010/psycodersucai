const app = getApp()
const sucaipromise = require('../../utils/sucaipromise.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'全部',
    pagecount:0,
    sclist:[],
    url: app.globalData.apiUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    _this.setData({
      title: options.keys
    })
   // _this.GetSucaiByCate(options.cate);
    _this.GetSucaiByKeys(options.keys);

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
  
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  GetSucaiByCate:function(cate){
    var _this = this;
    wx.request({
      url: app.globalData.apiUrl + "/SucaiApi/GetJKSucaiListByCate?cate=" + cate,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        _this.setData({
          pagecount: res.data.pagecount,
        });
        Promise.all(res.data.jksucai.map(item => sucaipromise.getSucaiById(item.Id)))
          .then(function (result) {
            _this.setData({
              sclist: result,
            });
            console.log(result);
          });

      },
    })
  },

  GetSucaiByKeys: function (keys) {
    var _this = this;
    wx.request({
      url: app.globalData.apiUrl + "/SucaiApi/GetJKSucaiListTags?keys=" + keys,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        _this.setData({
          pagecount: res.data.pagecount,
        });
        Promise.all(res.data.jksucai.map(item => sucaipromise.getSucaiById(item.Id)))
          .then(function (result) {
            _this.setData({
              sclist: result,
            });
            console.log(result);
          });
      },
    })
  },

  NavContent: function (e) {
    var _type = e.currentTarget.dataset.type;
    var _sid = e.currentTarget.dataset.sid;


    if (_type == "shipin") {
      console.log("视频" + _sid);
      wx.navigateTo({
        url: '../../pages/videoview/videoview?id=' + _sid,
      })
    }
    if (_type == "yinpin") {
      console.log("音频" + _sid);
      wx.navigateTo({
        url: '../../pages/audioview/audioview?id=' + _sid,
      })
    }
    if (_type == "tupian") {
      console.log("图片" + _sid);
      wx.navigateTo({
        url: '../../pages/content/content?id=' + _sid,
      })
    }
    if (_type == "anli") {
      console.log("案例" + _sid);
      wx.navigateTo({
        url: '../../pages/content/content?id=' + _sid,
      })
    }
  },
})