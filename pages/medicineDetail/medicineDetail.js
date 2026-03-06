const { MEDICINE_IMAGE, getMedicineDetail } = require('../../data/medicineData')

Page({
  data: {
    medicineId: '',
    category: '',
    medicine: {
      name: '',
      latinName: '',
      image: MEDICINE_IMAGE.fallback,
      brief: '',
      effects: '',
      properties: '',
      usage: '',
      cautions: ''
    }
  },

  onLoad: function(options) {
    const medicineId = Number(options.id)
    const category = options.category || 'common'

    this.setData({
      medicineId: medicineId,
      category: category
    })

    wx.setNavigationBarTitle({
      title: '中医药材详情'
    })

    this.loadMedicineDetail()
  },

  loadMedicineDetail: function() {
    const medicine = getMedicineDetail(this.data.category, this.data.medicineId)
    if (!medicine) {
      wx.showToast({
        title: '药材内容加载失败',
        icon: 'none'
      })
      return
    }

    this.setData({
      medicine: {
        ...medicine,
        image: medicine.image || MEDICINE_IMAGE.fallback
      }
    })
  },

  onDetailImageError: function() {
    this.setData({
      medicine: {
        ...this.data.medicine,
        image: MEDICINE_IMAGE.fallback
      }
    })
  },

  navigateBack: function() {
    wx.navigateBack()
  }
})
