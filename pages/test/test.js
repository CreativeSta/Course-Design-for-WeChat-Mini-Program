// test.js
Page({
  data: {
    // 测试页面数据
  },
  
  onLoad: function() {
    console.log('Test page loaded');
  },
  
  goBack: function() {
    console.log('Go back button tapped');
    wx.navigateBack();
  }
})