Page({
  data: {
    greeting: '今天也要动起来',
    dailyGoalMinutes: 30,
    completedMinutes: 12,
    weeklySessions: 4,
    heartRateStatus: '正常',
    suggestion: '建议晚饭后散步 20 分钟'
  },

  onShow: function() {
    const app = getApp()
    const user = app.globalData.userInfo || {}
    const name = user.name || user.nickName || ''
    if (name) {
      this.setData({
        greeting: `${name}，今天也要动起来`
      })
    } else {
      this.setData({
        greeting: '今天也要动起来'
      })
    }
  },

  startAIAnalysis: function() {
    wx.navigateTo({
      url: '/pages/healthForm/healthForm'
    })
  },

  goCommunity: function() {
    wx.switchTab({
      url: '/pages/community/community'
    })
  },

  goProduct: function() {
    wx.switchTab({
      url: '/pages/product/product'
    })
  }
})
