const DEFAULT_SERVICE_IMAGE = '/images/service1.png'

const SERVICE_LIST = [
  { id: 1, name: '就医指导', image: '/images/service1.png', url: '/pages/medicalGuide/medicalGuide' },
  { id: 2, name: '基础病普及', image: '/images/service2.png', url: '/pages/diseaseEducation/diseaseEducation' },
  { id: 3, name: '医学知识科普', image: '/images/service1.png', url: '/pages/medicalKnowledge/medicalKnowledge' },
  { id: 4, name: '中医药材科普', image: '/images/service2.png', url: '/pages/chineseMedicine/chineseMedicine' }
]

Page({
  data: {
    services: SERVICE_LIST
  },

  onLoad: function() {
    this.initServices()
  },

  onShow: function() {
    this.initServices()
  },

  initServices: function() {
    const app = getApp()
    const globalServices = app.globalData && Array.isArray(app.globalData.services)
      ? app.globalData.services
      : []

    const globalMap = {}
    globalServices.forEach(item => {
      if (item && item.id) {
        globalMap[item.id] = item
      }
    })

    const services = SERVICE_LIST.map(item => {
      const globalItem = globalMap[item.id] || {}
      return {
        ...item,
        image: globalItem.image || item.image || DEFAULT_SERVICE_IMAGE
      }
    })

    this.setData({ services })
  },

  onServiceTap: function(e) {
    const serviceId = Number(e.currentTarget.dataset.id)
    const target = this.data.services.find(item => item.id === serviceId)
    if (!target || !target.url) {
      return
    }

    wx.navigateTo({
      url: target.url
    })
  },

  onServiceImageError: function(e) {
    const serviceId = Number(e.currentTarget.dataset.id)
    const nextServices = this.data.services.map(item => {
      if (item.id === serviceId) {
        return {
          ...item,
          image: DEFAULT_SERVICE_IMAGE
        }
      }
      return item
    })
    this.setData({
      services: nextServices
    })
  },

  navigateToHome: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})
