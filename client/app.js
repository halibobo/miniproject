//app.js
// var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        // qcloud.setLoginUrl(config.service.loginUrl)
        console.log("app","onLaunch")
    },
    onShow:function(){
      console.log("app", "onShow")
    },
  globalData: {
    cityId: '101020100',
    // 版本升级时这里的version加1并替换versionFeature的文案即可
    version: 1,
    versionFeature: '更新说明'
  },
  
})