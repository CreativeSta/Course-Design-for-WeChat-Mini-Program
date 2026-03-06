const DEFAULT_PRODUCTS = [
  { id: 1, name: '运动鞋', image: '/images/product1.png', price: 299 },
  { id: 2, name: '血糖仪', image: '/images/product2.png', price: 499 },
  { id: 3, name: '纯棉运动服', image: '/images/product3.png', price: 199 },
  { id: 4, name: '羽毛球拍', image: '/images/product4.png', price: 149 }
]

function normalizeProducts(products) {
  if (!Array.isArray(products) || products.length === 0) {
    return DEFAULT_PRODUCTS
  }

  const map = {}
  products.forEach(item => {
    if (item && item.id) {
      map[item.id] = item
    }
  })

  return DEFAULT_PRODUCTS.map(item => {
    const merged = map[item.id] || {}
    return {
      id: item.id,
      name: item.name,
      image: merged.image || item.image,
      price: Number(merged.price) || item.price
    }
  })
}

Page({
  data: {
    products: [],
    cartCount: 0
  },

  onLoad: function() {
    const app = getApp()

    if (!app.globalData) {
      app.globalData = {}
    }

    app.globalData.products = normalizeProducts(app.globalData.products)

    if (!Array.isArray(app.globalData.cart)) {
      app.globalData.cart = []
    }

    this.setData({
      products: app.globalData.products
    })

    this.updateCartCount()
  },

  onShow: function() {
    this.updateCartCount()
  },

  getProductById: function(productId) {
    const id = Number(productId)
    if (!id) {
      return null
    }

    return this.data.products.find(item => item.id === id) || null
  },

  onProductImageError: function(e) {
    const productId = Number(e.currentTarget.dataset.id)
    const nextProducts = this.data.products.map(item => {
      if (item.id === productId) {
        return {
          ...item,
          image: '/images/product1.png'
        }
      }
      return item
    })

    this.setData({ products: nextProducts })
  },

  updateCartCount: function() {
    const app = getApp()
    const cart = app.globalData && Array.isArray(app.globalData.cart)
      ? app.globalData.cart
      : []

    const count = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
    this.setData({ cartCount: count })
  },

  navigateToCart: function() {
    wx.navigateTo({
      url: '/pages/cart/cart'
    })
  },

  addToCart: function(e) {
    const productId = Number(e.currentTarget.dataset.id)
    const product = this.getProductById(productId)
    if (!product) {
      return
    }

    const app = getApp()
    const cart = app.globalData.cart || []
    const existing = cart.find(item => item.id === product.id)

    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({
        ...product,
        quantity: 1
      })
    }

    app.globalData.cart = cart
    this.updateCartCount()

    wx.showToast({
      title: '已添加到购物车',
      icon: 'success',
      duration: 1200
    })
  },

  onProductTap: function(e) {
    const productId = Number(e.currentTarget.dataset.id)
    const product = this.getProductById(productId)
    if (!product) {
      return
    }

    wx.showModal({
      title: product.name,
      content: `欢迎选购本商品！\n\n价格：¥${product.price}\n\n点击“添加到购物车”可快速加入。`,
      showCancel: true,
      cancelText: '取消',
      confirmText: '添加到购物车',
      success: res => {
        if (res.confirm) {
          this.addToCart(e)
        }
      }
    })
  },

  navigateToHome: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})
