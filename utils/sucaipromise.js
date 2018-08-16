const app = getApp();

//通过ID获取素材内容
const getSucaiById = (sid) => new Promise((resolve) => {
  wx.request({
    url: app.globalData.apiUrl + "/SucaiApi/GetJkSucaiById?sid=" + sid,
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      resolve(res.data);
    },
  });
});


const getVideoSucaiById = (cid) => new Promise((resolve) => {

  wx.request({
    url: app.globalData.apiUrl + '/SucaiApi/GetJkVideoSucai?cid=' + cid,
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      resolve(res);
    }
  });

});

//暴露接口给外部使用
module.exports = {
  getSucaiById: getSucaiById,
  getVideoSucaiById: getVideoSucaiById
}