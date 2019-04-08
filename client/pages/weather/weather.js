// pages/weather/weather.js

var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * Page initial data
   */
  data: {
    weather:{},
    remark:{},
    airData:[],
    airLoad:false,
    loaded:false,
    remarkable:false,
    cityId: getApp().globalData.cityId
    // cityId: getApp().globalData.cityId//101190101,101070101
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.onSyncData()
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    console.log('page onshow');
    if (this.data.cityId != getApp().globalData.cityId){
      console.log('un fail onshow', this.data.cityId, getApp().globalData.cityId);
      this.onSyncData()
    }
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  onSyncData:function(){
    try {
      const value = wx.getStorageSync('cityId')
      if (value) {
        getApp().globalData.cityId = value
      }
    } catch (e) {
      // Do something when catch error
    }
    this.setData({
      cityId: getApp().globalData.cityId
    })
    wx.startPullDownRefresh() 
    this.getTem()
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    
    // getApp().globalData.cityId = '101070101'
    // this.setData({
    //   cityId: getApp().globalData.cityId
    // })
    // wx.setStorageSync('cityId', "101070101");
    this.refresh()
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  
  gotoSelectCity:function(){
    wx.navigateTo({
      url: '../city/city?cityId=' + getApp().globalData.cityId
    })
  },

  getPosition:function(){
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        util.showSuccess('位置成功' + 'latitude:' + latitude)
        
      }
    })
  },

  refresh:function(){
    wx.showNavigationBarLoading() //在标题栏中显示加载
    
    this.getWeatherData()
    this.getRemarkData()
  },

  stopRefresh:function(){
    wx.stopPullDownRefresh() 
    wx.hideNavigationBarLoading() //完成停止加载
  },

  getWeatherData:function(){
    let that = this
    wx.request({
      url: 'https://api.help.bj.cn/apis/aqi?id=' + getApp().globalData.cityId,
      method:'GET',
      data:{
        city:'北京'
      },
      header:{
        'Content-Type':'application/json'
      }, fail: error => {
        that.stopRefresh() //完成停止加载
        util.showSuccess("error")},
      success:res=>{
        // util.showSuccess("success")
        that.stopRefresh() //完成停止加载
        console.log("res",res.data)
        that.setData({
          weather:res.data,
          loaded:true
        })
      }
    })
  },
  getTem:function(){
    let that = this
    wx.request({
      url: 'https://www.tianqiapi.com/api/?version=v1&cityid=' + getApp().globalData.cityId,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      }, fail: error => {
        util.showSuccess("error")
        that.stopRefresh() //完成停止加载
      },
      success: res => {
        console.log("air", res)
        that.setData({
          airLoad:true,
          airData: res.data.data
        })
      }
    })
  },

  getRemarkData:function(){
    let that = this
    wx.request({
      url: 'https://api.help.bj.cn/apis/aqi2?id=' + getApp().globalData.cityId,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      }, fail: error => {
         util.showSuccess("error")
         that.stopRefresh() //完成停止加载
      },
      success: res => {
        that.stopRefresh() //完成停止加载
        if (typeof (res.data) == 'string'){
          console.log("getRemarkData", res.data.replace(/\s+/g, ""))
          that.setData({
            remark: JSON.parse(res.data.replace(/\s+/g, "")),
            remarkable: true
          })
        }else{
          that.setData({
            remark: res.data,
            remarkable: true
          })
        }
      }
    })
  }
  
})