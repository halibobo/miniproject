// pages/city/city.js
var city = require('../../utils/city.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    // tHeight: 0,
    // bHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "上海市",
    hotcityList: [{ cityCode: 101010100, city: '北京市' }, { cityCode: 101020100, city: '上海市' }, { cityCode: 101280101, city: '广州市' }, { cityCode: 101280601, city: '深圳市' }, { cityCode: 101210101, city: '杭州市' }, { cityCode: 101190101, city: '南京市' }, { cityCode: 101200101, city: '武汉市' }, { cityCode: 101180101, city: '郑州市' }, { cityCode: 101030100, city: '天津市' }, { cityCode: 101110101, city: '西安市' }, { cityCode: 101270101, city: '成都市' }, { cityCode: 101040100, city: '重庆市' }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    try {
      const value = wx.getStorageSync('cityName')
      if (value) {
        this.setData({
          city: value
        })
      }
      
    } catch (e) {
      // Do something when catch error
    }
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList
    })
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

  getA:function(){
    console.log('A',this.data.city.A)
  },
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    console.log(e.target.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) {
    this.setData({ city: e.currentTarget.dataset.city })
    wx.setStorageSync('cityId', e.currentTarget.dataset.citycode);
    wx.setStorageSync('cityName', e.currentTarget.dataset.city);
    getApp().globalData.cityId = e.currentTarget.dataset.citycode;
    
    this.navigateBack()
  },
  //选择热门城市
  bindHotCity: function (e) {
    this.setData({
      city: e.currentTarget.dataset.city
    })
    wx.setStorageSync('cityId', e.currentTarget.dataset.citycode);
    wx.setStorageSync('cityName', e.currentTarget.dataset.city);
    getApp().globalData.cityId = e.currentTarget.dataset.citycode
    console.log("e.currentTarget.dataset", e.currentTarget.dataset)
    this.navigateBack()
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  },
  navigateBack: function () {
    var self = this;
    var pages = getCurrentPages();
    if (pages.length == 1) {
      if (self.data.circleId && self.data.circleId > 0) {
        wx.redirectTo({
          url: '../pages/weather/weather?cityId=' + self.data.circleId
            + '&circleName=' + (self.data.circleName || '')
        });
      } else {
        wx.switchTab({
          url: "../pages/weather/weather"
        });
      }
    } else {
      wx.navigateBack({ changed: true });//返回上一页
    }
  }


})