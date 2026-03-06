App({
  onLaunch: function() {
    try {
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
    } catch (e) {
      console.log('本地存储操作失败:', e)
    }

    try {
      const isLoggedIn = wx.getStorageSync('isLoggedIn')
      const storedUserInfo = wx.getStorageSync('userInfo')
      if (isLoggedIn && storedUserInfo) {
        this.globalData.isLoggedIn = true
        this.globalData.userInfo = storedUserInfo
      }
    } catch (e) {
      console.log('读取登录状态失败:', e)
    }

    this.refreshWechatCode()
  },

  refreshWechatCode: function() {
    wx.login({
      success: res => {
        if (res.code) {
          this.globalData.wechatCode = res.code
          this.globalData.wechatCodeTime = Date.now()
        }
      },
      fail: err => {
        console.log('wx.login 调用失败:', err)
      }
    })
  },

  globalData: {
    userInfo: null,
    isLoggedIn: false,
    wechatCode: '',
    wechatCodeTime: 0,
    products: [
      { id: 1, name: '运动鞋', image: '/images/product1.png', price: 299 },
      { id: 2, name: '血糖仪', image: '/images/product2.png', price: 499 },
      { id: 3, name: '纯棉运动服', image: '/images/product3.png', price: 199 },
      { id: 4, name: '羽毛球拍', image: '/images/product4.png', price: 149 }
    ],
    services: [
      { id: 1, name: '就医指导', image: '/images/service1.png' },
      { id: 2, name: '基础病普及', image: '/images/service2.png' },
      { id: 3, name: '医学知识科普', image: '/images/service1.png' },
      { id: 4, name: '中医药材科普', image: '/images/service2.png' }
    ],
    communityActivities: [
      {
        id: 1,
        name: '社区晨练打卡',
        description: '晨间轻运动，增强心肺耐力与关节灵活度。',
        time: '每周一三五 07:30',
        location: '社区花园东广场',
        capacity: 20,
        participants: [
          { id: 1, name: '王奶奶', age: 66, phone: '138****1234', skillLevel: '初级' },
          { id: 2, name: '李叔叔', age: 69, phone: '139****5678', skillLevel: '中级' }
        ]
      },
      {
        id: 2,
        name: '羽毛球友谊组',
        description: '双打友谊活动，重在锻炼与交流。',
        time: '每周二四 15:00',
        location: '社区文体中心 2 号馆',
        capacity: 16,
        participants: [
          { id: 3, name: '张爷爷', age: 65, phone: '137****9012', skillLevel: '中级' },
          { id: 4, name: '赵奶奶', age: 63, phone: '136****3456', skillLevel: '初级' }
        ]
      },
      {
        id: 3,
        name: '太极入门班',
        description: '适合初学者，注重呼吸与动作稳定。',
        time: '每周六 09:00',
        location: '社区活动室 A 区',
        capacity: 24,
        participants: [
          { id: 5, name: '陈阿姨', age: 61, phone: '135****6789', skillLevel: '初级' }
        ]
      }
    ],
    orders: [
      { id: 1, status: 'pending', count: 1 },
      { id: 2, status: 'processing', count: 3 },
      { id: 3, status: 'completed', count: 0 },
      { id: 4, status: 'cancelled', count: 0 },
      { id: 5, status: 'afterSale', count: 0 }
    ],
    messages: 1,
    cart: []
  }
})
