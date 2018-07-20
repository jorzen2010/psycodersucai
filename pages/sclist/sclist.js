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
      title: options.title
    })
    _this.GetSucaiByCate(options.cate);
    console.log(options.cate)
    console.log(options.title)
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
  }
})