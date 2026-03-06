const {
  MEDICINE_IMAGE,
  getMedicineListByCategory
} = require('../../data/medicineData')

Page({
  data: {
    activeCategory: 'common',
    currentMedicines: []
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '中医药材科普'
    })
    this.setCurrentMedicines('common')
  },

  switchCategory: function(e) {
    const category = e.currentTarget.dataset.category
    if (!category || category === this.data.activeCategory) {
      return
    }

    this.setData({
      activeCategory: category
    })
    this.setCurrentMedicines(category)
  },

  setCurrentMedicines: function(category) {
    this.setData({
      currentMedicines: getMedicineListByCategory(category)
    })
  },

  viewMedicineDetail: function(e) {
    const medicineId = Number(e.currentTarget.dataset.id)
    if (!medicineId) {
      return
    }

    wx.navigateTo({
      url: `/pages/medicineDetail/medicineDetail?id=${medicineId}&category=${this.data.activeCategory}`
    })
  },

  onMedicineImageError: function(e) {
    const medicineId = Number(e.currentTarget.dataset.id)
    const updated = this.data.currentMedicines.map(item => {
      if (item.id === medicineId) {
        return {
          ...item,
          image: MEDICINE_IMAGE.fallback
        }
      }
      return item
    })

    this.setData({
      currentMedicines: updated
    })
  },

  navigateBack: function() {
    wx.navigateBack()
  }
})
