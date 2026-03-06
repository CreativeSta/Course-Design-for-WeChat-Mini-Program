// mine.js
Page({
  data: {
    orders: [],
    messageCount: 0,
    phoneNumber: '',
    isLoggedIn: false,
    userInfo: null,
    displayUser: {
      name: '用户',
      phoneNumber: '未绑定手机号',
      avatar: '/images/tabbar/mine_normal.png'
    }
  },
  onLoad: function () {
    // 获取全局数据
    const app = getApp()
    this.setData({
      orders: app.globalData.orders || [],
      messageCount: app.globalData.messages || 0
    })
    this.syncLoginState()
  },
  
  onShow: function() {
    // 每次显示页面时更新登录状态
    this.syncLoginState()
  },

  syncLoginState: function() {
    const app = getApp()
    const userInfo = app.globalData.userInfo || null
    this.setData({
      isLoggedIn: app.globalData.isLoggedIn || false,
      userInfo: userInfo,
      displayUser: this.normalizeUserInfo(userInfo)
    })
  },

  normalizeUserInfo: function(userInfo) {
    const info = userInfo || {}
    const rawPhone = info.phoneNumber || this.data.phoneNumber || ''
    const is11DigitPhone = /^\d{11}$/.test(rawPhone)
    const maskedPhone = is11DigitPhone ? rawPhone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : (rawPhone || '未绑定手机号')
    const fallbackAvatar = '/images/tabbar/mine_normal.png'
    const avatar = info.avatar || info.avatarUrl || fallbackAvatar
    const safeAvatar = avatar === '/images/user-placeholder.png' ? fallbackAvatar : avatar

    return {
      name: info.name || info.nickName || (rawPhone ? `用户${rawPhone.slice(-4)}` : '用户'),
      phoneNumber: info.maskedPhone || maskedPhone,
      avatar: safeAvatar
    }
  },
  // 点击登录按钮
  onLoginTap: function() {
    console.log('Login button tapped');
    try {
      // 检查当前页面栈
      const pages = getCurrentPages();
      console.log('Current pages stack:', pages.length, pages);
      
      // 使用wx.navigateTo跳转到登录页面
      wx.navigateTo({
        url: '/pages/login/login',
        success: function(res) {
          console.log('Navigate to login success:', res);
        },
        fail: function(err) {
          console.error('Navigate to login failed:', err);
          // 如果失败，尝试使用wx.redirectTo
          wx.redirectTo({
            url: '/pages/login/login',
            success: function(res) {
              console.log('Redirect to login success:', res);
            },
            fail: function(err2) {
              console.error('Redirect to login also failed:', err2);
              wx.showToast({
                title: '无法跳转到登录页面',
                icon: 'none'
              })
            }
          })
        },
        complete: function() {
          console.log('Navigation operation completed');
        }
      })
    } catch (e) {
      console.error('Exception in login navigation:', e);
      wx.showToast({
        title: '登录功能出现错误',
        icon: 'none'
      })
    }
  },
  // 点击订单类型 - 由于orderList页面不存在，暂时显示提示
  onOrderTypeTap: function(e) {
    const status = e.currentTarget.dataset.status
    console.log('Order type tapped:', status);
    wx.showToast({
      title: '订单功能暂未实现',
      icon: 'none'
    })
  },
  // 点击最新消息 - 由于messageList页面不存在，暂时显示提示
  onMessageTap: function() {
    console.log('Message tapped');
    wx.showToast({
      title: '消息功能暂未实现',
      icon: 'none'
    })
  },
  // 点击我的订阅 - 由于subscription页面不存在，暂时显示提示
  onSubscriptionTap: function() {
    console.log('Subscription tapped');
    wx.showToast({
      title: '订阅功能暂未实现',
      icon: 'none'
    })
  },
  // 点击我的表单 - 由于formList页面不存在，暂时显示提示
  onFormTap: function() {
    console.log('Form tapped');
    wx.showToast({
      title: '表单功能暂未实现',
      icon: 'none'
    })
  },
  // 点击手机号码
  onPhoneTap: function() {
    const userPhone = this.data.userInfo && this.data.userInfo.phoneNumber
    const phoneNumber = userPhone || this.data.phoneNumber
    if (!phoneNumber) {
      wx.showToast({
        title: '暂无可拨打号码',
        icon: 'none'
      })
      return
    }
    wx.makePhoneCall({
      phoneNumber: phoneNumber
    })
  },
  // 退出登录
  onLogout: function() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出当前登录吗？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          // 清除登录状态
          const app = getApp()
          app.globalData.isLoggedIn = false
          app.globalData.userInfo = null
          wx.removeStorageSync('isLoggedIn')
          wx.removeStorageSync('userInfo')
          
          // 更新页面状态
          this.setData({
            isLoggedIn: false,
            userInfo: null,
            displayUser: this.normalizeUserInfo(null)
          })
          
          // 显示退出成功提示
          wx.showToast({
            title: '已退出登录',
            icon: 'success',
            duration: 1500
          })
        }
      }
    })
  },
  // 返回首页
  navigateToHome: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})
