const app = getApp()
const sucaipromise = require('../../utils/sucaipromise.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    sclist:[],
    url: app.globalData.apiUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
     _this.GetTopSucai();



  
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
  search:function(){
    wx.navigateTo({
      url: '../../pages/search/search',
    })
  },
  GetTopSucai:function(){
    var _this = this;
    wx.request({
      url: app.globalData.apiUrl + "/SucaiApi/GetTopJKSucai?num=3&table=JKSucai&where=Price=0&orderby=Id Desc",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
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

})