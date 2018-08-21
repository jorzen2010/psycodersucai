var util = require("../../utils/common.js");
var Wxparse = require("../../utils/wxParse/wxParse.js");
const app = getApp();
Page({
  data:{ 
    id:0,
    article_content:'',
    imgpre:'',
    sysnews:{}
    
  },
  onLoad: function (option) {
    var that = this//不要漏了这句，很重要
    that.setData({
      id: option.id,
      imgpre: app.globalData.apiUrl,
    }) 
    wx.request({
      url: app.globalData.apiUrl + '/SucaiApi/GetSysNewsById?sid=' + that.data.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        res.data.CreateTime = util.formatDateStamp(res.data.CreateTime,"short");
        
        
        that.setData({
          sysnews: res.data,
         // article_content: Wxparse.wxParse('article_content', 'html', res.data.Content, that, 5)
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        });
        Wxparse.wxParse('article_content','html',res.data.Content,that,5)
      }
    });
  },

 
})