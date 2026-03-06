const app = getApp()
Page({
  data: {
    cart: [],
    totalPrice: 0
  },
  
  onShow: function() {
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: '我的购物车'
    })
    
    // 加载购物车数据
    this.loadCartData()
  },
  
  // 加载购物车数据
  loadCartData: function() {
    const cart = app.globalData.cart
    const totalPrice = this.calculateTotalPrice(cart)
    
    this.setData({
      cart: cart,
      totalPrice: totalPrice
    })
  },
  
  // 计算购物车总价
  calculateTotalPrice: function(cart) {
    let total = 0
    cart.forEach(item => {
      total += item.price * item.quantity
    })
    return total.toFixed(2)
  },
  
  // 增加商品数量
  increaseQuantity: function(e) {
    const productId = e.currentTarget.dataset.id
    const cart = app.globalData.cart
    
    // 查找商品并增加数量
    const productIndex = cart.findIndex(item => item.id === productId)
    if (productIndex !== -1) {
      cart[productIndex].quantity += 1
      
      // 更新全局购物车数据
      app.globalData.cart = cart
      
      // 重新加载购物车数据
      this.loadCartData()
      
      // 显示操作成功提示
      wx.showToast({
        title: '数量已增加',
        icon: 'none',
        duration: 1000
      })
    }
  },
  
  // 减少商品数量
  decreaseQuantity: function(e) {
    const productId = e.currentTarget.dataset.id
    const cart = app.globalData.cart
    
    // 查找商品并减少数量
    const productIndex = cart.findIndex(item => item.id === productId)
    if (productIndex !== -1) {
      if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity -= 1
        
        // 更新全局购物车数据
        app.globalData.cart = cart
        
        // 重新加载购物车数据
        this.loadCartData()
        
        // 显示操作成功提示
        wx.showToast({
          title: '数量已减少',
          icon: 'none',
          duration: 1000
        })
      } else {
        // 询问是否删除商品
        wx.showModal({
          title: '提示',
          content: '确定要删除该商品吗？',
          success: (res) => {
            if (res.confirm) {
              this.removeFromCart(e)
            }
          }
        })
      }
    }
  },
  
  // 从购物车移除商品
  removeFromCart: function(e) {
    const productId = e.currentTarget.dataset.id
    const cart = app.globalData.cart
    
    // 查找商品并移除
    const productIndex = cart.findIndex(item => item.id === productId)
    if (productIndex !== -1) {
      const removedProduct = cart.splice(productIndex, 1)[0]
      
      // 更新全局购物车数据
      app.globalData.cart = cart
      
      // 重新加载购物车数据
      this.loadCartData()
      
      // 显示操作成功提示
      wx.showToast({
        title: '已从购物车移除',
        icon: 'success',
        duration: 1500
      })
      
      console.log(removedProduct.name + '已从购物车移除')
    }
  },
  
  // 结算
  checkout: function() {
    if (this.data.cart.length === 0) {
      wx.showToast({
        title: '购物车为空，无法结算',
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    // 显示结算成功提示
    wx.showModal({
      title: '结算成功',
      content: '您的订单已提交，我们会尽快为您处理！',
      showCancel: false,
      success: (res) => {
        if (res.confirm) {
          // 清空购物车
          app.globalData.cart = []
          
          // 重新加载购物车数据
          this.loadCartData()
          
          // 返回首页
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    })
  },
  
  // 去购物
  goShopping: function() {
    wx.switchTab({
      url: '/pages/product/product'
    })
  },
  
  // 导航到首页
  navigateToHome: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})