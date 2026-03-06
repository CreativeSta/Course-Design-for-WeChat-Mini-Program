const REPORT_STORAGE_KEY = 'healthAnalysisReports'

Page({
  data: {
    report: null,
    history: [],
    showHistory: false
  },

  normalizeReport: function(report) {
    if (!report) {
      return null
    }

    const summary = report.summary || {}
    return {
      ...report,
      createdAtLabel: report.createdAtLabel || '未知时间',
      summary: {
        bmiValue: summary.bmiValue ?? '-',
        bmiLevel: summary.bmiLevel || '-',
        bloodPressure: summary.bloodPressure || '-',
        bloodPressureLevel: summary.bloodPressureLevel || '-',
        heartRate: summary.heartRate ?? '-',
        heartRateLevel: summary.heartRateLevel || '-',
        diseaseText: summary.diseaseText || '无'
      },
      suggestions: Array.isArray(report.suggestions) ? report.suggestions : []
    }
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: 'AI分析结果'
    })
    this.loadReportData(options.id || '')
  },

  loadReportData: function(reportId) {
    let history = []
    try {
      history = wx.getStorageSync(REPORT_STORAGE_KEY) || []
    } catch (e) {
      history = []
    }

    const normalizedHistory = history.map(item => this.normalizeReport(item)).filter(Boolean)
    let report = null
    if (reportId) {
      report = normalizedHistory.find(item => item.id === reportId) || null
    }
    if (!report && normalizedHistory.length > 0) {
      report = normalizedHistory[0]
    }

    if (!report) {
      wx.showToast({
        title: '暂无分析记录',
        icon: 'none'
      })
    }

    this.setData({
      report,
      history: normalizedHistory
    })
  },

  toggleHistory: function() {
    this.setData({
      showHistory: !this.data.showHistory
    })
  },

  viewHistoryReport: function(e) {
    const reportId = e.currentTarget.dataset.id
    const report = this.data.history.find(item => item.id === reportId)
    if (!report) {
      return
    }
    this.setData({
      report,
      showHistory: false
    })
  },

  goNewAnalysis: function() {
    wx.redirectTo({
      url: '/pages/healthForm/healthForm'
    })
  },

  goHome: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})
