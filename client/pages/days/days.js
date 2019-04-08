// pages/days/days.js
var dateUtil = require('../../utils/dateUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keys:[],
    date:"2019-04-21",
    wish:{
      date: "2019-04-21",
      time:1,
      name:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    try {
      var value = wx.getStorageSync('keys')
      if (value) {
        console.log(res.data)
        that.setData({
          keys: res.data
        })
      }
    } catch (e) {
      // Do something when catch error
      console.log("getStorageSync error!")
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

  onSave:function(){
      
    this.setData({
      wish:{
        date: this.data.date,
        time: dateUtil.js_date_time(this.data.date),
        name:"柴古越野赛"
      }
    })
    wx.setStorageSync(this.data.date,
      JSON.stringify(this.data.wish))
    // wx.setStorage({
    //   key: "keys",
    //   data: [1,2,3,4,5,6]
    // })
  },
  onGetData:function(){

    wx.getStorage({
      key: this.data.date,
      success: function (res) {
        console.log(res.data)
        var wish = JSON.parse(res.data)
        console.log("res.data.time", dateUtil.get_current_minus_days(wish.time))
      }
    })
    wx.getStorage({
      key: 'keys',
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  dateTest:function(){
    console.log(new Date())
    console.log(dateUtil.js_time_date(new Date()))
    console.log("2018-09-03 15:46:13",dateUtil.js_date_time("2018-09-03 15:46:13"))
    console.log("2018-09-03",dateUtil.js_date_time("2018-09-03"))
  }
})