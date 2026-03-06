Page({
  data: {
    activities: [],
    selectedActivityId: null,
    currentActivity: null,
    hasJoinedSelected: false
  },

  onLoad: function() {
    this.loadActivities()
  },

  onShow: function() {
    this.loadActivities()
  },

  loadActivities: function() {
    const app = getApp()
    const rawActivities = app.globalData.communityActivities || []
    const normalized = rawActivities.map((item, index) => this.normalizeActivity(item, index))

    this.setData({
      activities: normalized
    })

    const selectedId = this.data.selectedActivityId || (normalized[0] && normalized[0].id)
    if (selectedId) {
      this.updateSelectedActivity(selectedId)
    }
  },

  normalizeActivity: function(activity, index) {
    const participants = Array.isArray(activity.participants) ? activity.participants.map((participant, idx) => {
      if (typeof participant === 'string') {
        return {
          id: `${activity.id || index + 1}-${idx + 1}`,
          name: participant,
          age: 65,
          phone: '未填写',
          skillLevel: '初级'
        }
      }
      return {
        id: participant.id || `${activity.id || index + 1}-${idx + 1}`,
        name: participant.name || '未命名成员',
        age: participant.age || 65,
        phone: participant.phone || '未填写',
        skillLevel: participant.skillLevel || '初级'
      }
    }) : []

    return {
      id: Number(activity.id) || index + 1,
      name: activity.name || `活动 ${index + 1}`,
      description: activity.description || '暂无活动简介',
      time: activity.time || '时间待定',
      location: activity.location || '地点待定',
      capacity: Number(activity.capacity) || 20,
      participants
    }
  },

  onActivityTap: function(e) {
    const activityId = Number(e.currentTarget.dataset.id)
    this.updateSelectedActivity(activityId)
  },

  updateSelectedActivity: function(activityId) {
    const currentActivity = this.data.activities.find(item => item.id === activityId) || null
    const hasJoinedSelected = currentActivity ? this.isCurrentUserJoined(currentActivity) : false

    this.setData({
      selectedActivityId: activityId,
      currentActivity,
      hasJoinedSelected
    })
  },

  isCurrentUserJoined: function(activity) {
    const app = getApp()
    const userInfo = app.globalData.userInfo || {}
    const phoneKey = userInfo.phoneNumber || ''
    const nameKey = userInfo.name || userInfo.nickName || ''

    if (!phoneKey && !nameKey) {
      return false
    }

    return activity.participants.some(item => {
      if (phoneKey && item.phone === phoneKey) {
        return true
      }
      return Boolean(nameKey && item.name === nameKey)
    })
  },

  buildParticipantFromUser: function() {
    const app = getApp()
    const userInfo = app.globalData.userInfo || {}
    const now = Date.now()
    return {
      id: `u-${now}`,
      name: userInfo.name || userInfo.nickName || '微信用户',
      age: userInfo.age || 65,
      phone: userInfo.phoneNumber || userInfo.maskedPhone || '未填写',
      skillLevel: userInfo.skillLevel || '初级'
    }
  },

  joinSelectedActivity: function() {
    const app = getApp()
    if (!app.globalData.isLoggedIn) {
      wx.showToast({
        title: '请先登录后再加入',
        icon: 'none'
      })
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return
    }

    const current = this.data.currentActivity
    if (!current) {
      return
    }

    if (this.data.hasJoinedSelected) {
      wx.showToast({
        title: '您已加入该活动',
        icon: 'none'
      })
      return
    }

    if (current.participants.length >= current.capacity) {
      wx.showToast({
        title: '活动名额已满',
        icon: 'none'
      })
      return
    }

    const newParticipant = this.buildParticipantFromUser()
    const updatedActivities = this.data.activities.map(item => {
      if (item.id === current.id) {
        return {
          ...item,
          participants: [...item.participants, newParticipant]
        }
      }
      return item
    })

    app.globalData.communityActivities = updatedActivities
    this.setData({
      activities: updatedActivities
    })
    this.updateSelectedActivity(current.id)

    wx.showToast({
      title: '已加入活动',
      icon: 'success'
    })
  },

  quitSelectedActivity: function() {
    const app = getApp()
    const current = this.data.currentActivity
    if (!current || !this.data.hasJoinedSelected) {
      return
    }

    const userInfo = app.globalData.userInfo || {}
    const phoneKey = userInfo.phoneNumber || ''
    const nameKey = userInfo.name || userInfo.nickName || ''

    const updatedActivities = this.data.activities.map(item => {
      if (item.id !== current.id) {
        return item
      }

      const participants = item.participants.filter(participant => {
        if (phoneKey && participant.phone === phoneKey) {
          return false
        }
        if (nameKey && participant.name === nameKey) {
          return false
        }
        return true
      })

      return {
        ...item,
        participants
      }
    })

    app.globalData.communityActivities = updatedActivities
    this.setData({
      activities: updatedActivities
    })
    this.updateSelectedActivity(current.id)

    wx.showToast({
      title: '已退出活动',
      icon: 'success'
    })
  }
})
