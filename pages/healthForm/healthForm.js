const REPORT_STORAGE_KEY = 'healthAnalysisReports'
const MAX_REPORTS = 30

Page({
  data: {
    isSubmitting: false,
    isFormReady: false,
    errors: {},
    form: {
      gender: 'male',
      age: '',
      height: '',
      weight: '',
      systolic: '',
      diastolic: '',
      heartRate: '',
      diseases: ['none']
    },
    diseaseOptions: [
      { value: 'hypertension', label: '高血压', checked: false },
      { value: 'diabetes', label: '糖尿病', checked: false },
      { value: 'heartDisease', label: '心脏病', checked: false },
      { value: 'none', label: '无', checked: true }
    ]
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: 'AI身体指标分析'
    })
  },

  onGenderChange: function(e) {
    const nextForm = {
      ...this.data.form,
      gender: e.detail.value
    }
    this.setData({
      'form.gender': e.detail.value,
      isFormReady: this.checkFormReady(nextForm)
    })
  },

  sanitizeInput: function(field, value) {
    if (typeof value !== 'string') {
      return ''
    }
    const text = value.trim()
    const integerFields = ['age', 'systolic', 'diastolic', 'heartRate']
    const decimalFields = ['height', 'weight']

    if (integerFields.includes(field)) {
      return text.replace(/[^\d]/g, '')
    }

    if (decimalFields.includes(field)) {
      const sanitized = text.replace(/[^\d.]/g, '')
      const firstDot = sanitized.indexOf('.')
      if (firstDot === -1) {
        return sanitized
      }
      return `${sanitized.slice(0, firstDot + 1)}${sanitized.slice(firstDot + 1).replace(/\./g, '')}`
    }

    return text
  },

  onInputChange: function(e) {
    const field = e.currentTarget.dataset.field
    const value = this.sanitizeInput(field, e.detail.value || '')
    if (!field) {
      return
    }
    const nextForm = {
      ...this.data.form,
      [field]: value
    }
    const errors = {
      ...this.data.errors
    }
    delete errors[field]
    if (field === 'systolic' || field === 'diastolic') {
      delete errors.bloodPressure
    }
    this.setData({
      [`form.${field}`]: value,
      errors,
      isFormReady: this.checkFormReady(nextForm)
    })
  },

  onInputBlur: function(e) {
    const field = e.currentTarget.dataset.field
    if (!field) {
      return
    }
    const form = {
      ...this.data.form
    }
    const errors = {
      ...this.data.errors
    }

    const fieldError = this.validateSingleField(form, field)
    if (fieldError) {
      errors[field] = fieldError
    } else {
      delete errors[field]
    }

    if (field === 'systolic' || field === 'diastolic') {
      const bloodPressureError = this.validateBloodPressureRelation(form)
      if (bloodPressureError) {
        errors.bloodPressure = bloodPressureError
      } else {
        delete errors.bloodPressure
      }
    }

    this.setData({ errors })
  },

  onDiseaseChange: function(e) {
    const selected = e.detail.value || []
    const previous = this.data.form.diseases || []
    let diseases = selected

    if (diseases.length === 0) {
      diseases = ['none']
    } else if (diseases.includes('none') && diseases.length > 1) {
      if (previous.includes('none')) {
        diseases = diseases.filter(item => item !== 'none')
      } else {
        diseases = ['none']
      }
    }

    const diseaseOptions = this.data.diseaseOptions.map(option => ({
      ...option,
      checked: diseases.includes(option.value)
    }))

    const nextForm = {
      ...this.data.form,
      diseases
    }

    this.setData({
      'form.diseases': diseases,
      diseaseOptions,
      isFormReady: this.checkFormReady(nextForm)
    })
  },

  parseNumber: function(value) {
    if (value === '' || value === null || value === undefined) {
      return NaN
    }
    return Number(value)
  },

  validateSingleField: function(form, field) {
    const value = form[field]
    const num = this.parseNumber(value)

    if (field === 'age') {
      if (!Number.isFinite(num)) return '请填写年龄'
      if (num < 40 || num > 100) return '年龄建议填写 40-100 岁'
      return ''
    }

    if (field === 'height') {
      if (!Number.isFinite(num)) return '请填写身高'
      if (num < 120 || num > 220) return '身高范围应在 120-220 cm'
      return ''
    }

    if (field === 'weight') {
      if (!Number.isFinite(num)) return '请填写体重'
      if (num < 30 || num > 200) return '体重范围应在 30-200 kg'
      return ''
    }

    if (field === 'systolic') {
      if (!Number.isFinite(num)) return '请填写收缩压'
      if (num < 70 || num > 240) return '收缩压范围应在 70-240 mmHg'
      return ''
    }

    if (field === 'diastolic') {
      if (!Number.isFinite(num)) return '请填写舒张压'
      if (num < 40 || num > 140) return '舒张压范围应在 40-140 mmHg'
      return ''
    }

    if (field === 'heartRate') {
      if (!Number.isFinite(num)) return '请填写心率'
      if (num < 35 || num > 200) return '心率范围应在 35-200 次/分钟'
      return ''
    }

    return ''
  },

  validateBloodPressureRelation: function(form) {
    const systolic = this.parseNumber(form.systolic)
    const diastolic = this.parseNumber(form.diastolic)
    if (!Number.isFinite(systolic) || !Number.isFinite(diastolic)) {
      return ''
    }
    if (diastolic >= systolic) {
      return '舒张压应小于收缩压'
    }
    return ''
  },

  collectErrors: function(form) {
    const fields = ['age', 'height', 'weight', 'systolic', 'diastolic', 'heartRate']
    const errors = {}
    fields.forEach(field => {
      const err = this.validateSingleField(form, field)
      if (err) {
        errors[field] = err
      }
    })

    const relationError = this.validateBloodPressureRelation(form)
    if (relationError) {
      errors.bloodPressure = relationError
    }

    const orderedKeys = ['age', 'height', 'weight', 'systolic', 'diastolic', 'bloodPressure', 'heartRate']
    const firstError = orderedKeys.map(key => errors[key]).find(Boolean) || ''
    return { errors, firstError }
  },

  checkFormReady: function(form) {
    const requiredFields = ['age', 'height', 'weight', 'systolic', 'diastolic', 'heartRate']
    const hasEmptyField = requiredFields.some(field => String(form[field] || '').trim() === '')
    if (hasEmptyField) {
      return false
    }
    const validation = this.collectErrors(form)
    return !validation.firstError
  },

  formatDateTime: function(timestamp) {
    const date = new Date(timestamp)
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    const hh = String(date.getHours()).padStart(2, '0')
    const min = String(date.getMinutes()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`
  },

  getDiseaseNames: function(diseaseCodes) {
    if (!Array.isArray(diseaseCodes) || diseaseCodes.length === 0) {
      return '无'
    }

    if (diseaseCodes.includes('none')) {
      return '无'
    }

    const diseaseMap = {
      hypertension: '高血压',
      diabetes: '糖尿病',
      heartDisease: '心脏病'
    }

    return diseaseCodes.map(code => diseaseMap[code] || code).join('、')
  },

  buildAnalysisReport: function(metrics) {
    const bmi = metrics.weight / Math.pow(metrics.height / 100, 2)
    const bmiValue = Number(bmi.toFixed(1))
    let bmiLevel = ''
    if (bmiValue < 18.5) bmiLevel = '偏轻'
    else if (bmiValue < 24) bmiLevel = '正常'
    else if (bmiValue < 28) bmiLevel = '超重'
    else bmiLevel = '肥胖'

    let bloodPressureLevel = ''
    if (metrics.systolic >= 140 || metrics.diastolic >= 90) bloodPressureLevel = '偏高'
    else if (metrics.systolic < 90 || metrics.diastolic < 60) bloodPressureLevel = '偏低'
    else bloodPressureLevel = '正常'

    let heartRateLevel = ''
    if (metrics.heartRate < 60) heartRateLevel = '偏慢'
    else if (metrics.heartRate > 100) heartRateLevel = '偏快'
    else heartRateLevel = '正常'

    const diseaseText = this.getDiseaseNames(metrics.diseases)
    const suggestions = []

    if (bmiLevel === '超重' || bmiLevel === '肥胖') {
      suggestions.push('控制晚餐主食和油脂摄入，减少夜宵。')
    } else if (bmiLevel === '偏轻') {
      suggestions.push('适当增加优质蛋白和主食摄入，避免过度节食。')
    } else {
      suggestions.push('维持当前体重管理方式，保持规律饮食。')
    }

    if (bloodPressureLevel === '偏高') {
      suggestions.push('建议低盐饮食，每日监测血压并记录。')
    } else if (bloodPressureLevel === '偏低') {
      suggestions.push('避免突然起身，适当补水并规律作息。')
    }

    if (heartRateLevel === '偏快') {
      suggestions.push('减少咖啡浓茶，保证睡眠并避免过度劳累。')
    } else if (heartRateLevel === '偏慢') {
      suggestions.push('如伴头晕乏力，请及时就医评估。')
    }

    if (metrics.age >= 60) {
      suggestions.push('推荐每天 30 分钟轻中强度有氧运动（散步/太极）。')
    } else {
      suggestions.push('每周至少 150 分钟中等强度有氧运动。')
    }

    if (diseaseText !== '无') {
      suggestions.push(`既往病史：${diseaseText}，请按医嘱随访复查。`)
    }

    const timestamp = Date.now()
    return {
      id: `report-${timestamp}`,
      createdAt: timestamp,
      createdAtLabel: this.formatDateTime(timestamp),
      metrics: {
        gender: metrics.gender,
        age: metrics.age,
        height: metrics.height,
        weight: metrics.weight,
        systolic: metrics.systolic,
        diastolic: metrics.diastolic,
        heartRate: metrics.heartRate,
        diseases: metrics.diseases
      },
      summary: {
        bmiValue,
        bmiLevel,
        bloodPressure: `${metrics.systolic}/${metrics.diastolic}`,
        bloodPressureLevel,
        heartRate: metrics.heartRate,
        heartRateLevel,
        diseaseText
      },
      suggestions
    }
  },

  saveReportToStorage: function(report) {
    let history = []
    try {
      history = wx.getStorageSync(REPORT_STORAGE_KEY) || []
    } catch (e) {
      history = []
    }

    const newHistory = [report, ...history].slice(0, MAX_REPORTS)
    wx.setStorageSync(REPORT_STORAGE_KEY, newHistory)
    return newHistory
  },

  submitForm: function() {
    if (this.data.isSubmitting) {
      return
    }

    const form = { ...this.data.form }
    const validation = this.collectErrors(form)
    if (validation.firstError) {
      this.setData({ errors: validation.errors })
      wx.showToast({
        title: validation.firstError,
        icon: 'none'
      })
      return
    }

    const metrics = {
      gender: form.gender,
      age: Number(form.age),
      height: Number(form.height),
      weight: Number(form.weight),
      systolic: Number(form.systolic),
      diastolic: Number(form.diastolic),
      heartRate: Number(form.heartRate),
      diseases: form.diseases
    }

    this.setData({ isSubmitting: true })
    wx.showLoading({ title: '分析中...' })

    setTimeout(() => {
      const report = this.buildAnalysisReport(metrics)
      const history = this.saveReportToStorage(report)

      const app = getApp()
      app.globalData.latestHealthReport = report
      app.globalData.healthReportCount = history.length

      wx.hideLoading()
      this.setData({ isSubmitting: false })

      wx.navigateTo({
        url: `/pages/healthResult/healthResult?id=${encodeURIComponent(report.id)}`
      })
    }, 700)
  },

  resetForm: function() {
    this.setData({
      form: {
        gender: 'male',
        age: '',
        height: '',
        weight: '',
        systolic: '',
        diastolic: '',
        heartRate: '',
        diseases: ['none']
      },
      diseaseOptions: this.data.diseaseOptions.map(option => ({
        ...option,
        checked: option.value === 'none'
      })),
      errors: {},
      isFormReady: false
    })
  }
})
