// login.js
Page({
  data: {
    phoneNumber: '',
    password: '',
    isLoading: false,
    showLoginTip: false,
    showPassword: false,
    phoneError: '',
    passwordError: '',
    errorMsg: ''
  },
  
  // 返回上一页
  onBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  
  // 监听手机号输入
  onPhoneInput(e) {
    const phoneNumber = e.detail.value;
    this.setData({
      phoneNumber,
      phoneError: '' // 清除错误信息
    });
    // 自动验证手机号格式
    this.validatePhone(phoneNumber);
  },
  
  // 监听密码输入
  onPasswordInput(e) {
    const password = e.detail.value;
    this.setData({
      password,
      passwordError: '' // 清除错误信息
    });
    // 自动验证密码格式
    this.validatePassword(password);
  },
  
  // 切换密码可见性
  togglePasswordVisibility() {
    this.setData({
      showPassword: !this.data.showPassword
    });
  },
  
  // 验证手机号
  validatePhone(phoneNumber) {
    // 简单的手机号格式验证
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneNumber) {
      this.setData({ phoneError: '请输入手机号码' });
      return false;
    }
    if (!phoneRegex.test(phoneNumber)) {
      this.setData({ phoneError: '请输入正确的手机号码' });
      return false;
    }
    this.setData({ phoneError: '' });
    return true;
  },
  
  // 验证密码
  validatePassword(password) {
    if (!password) {
      this.setData({ passwordError: '请输入密码' });
      return false;
    }
    if (password.length < 6) {
      this.setData({ passwordError: '密码长度不能少于6位' });
      return false;
    }
    this.setData({ passwordError: '' });
    return true;
  },
  
  // 忘记密码
  onForgotPassword() {
    wx.showModal({
      title: '忘记密码',
      content: '请联系管理员重置密码',
      showCancel: false
    });
  },

  getWechatCode() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          if (res.code) {
            resolve(res.code);
          } else {
            reject(new Error('未获取到登录 code'));
          }
        },
        fail: reject
      });
    });
  },

  // 微信一键登录
  onWechatLogin() {
    this.setData({
      isLoading: true,
      errorMsg: '',
      showLoginTip: false
    });

    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: async profileRes => {
        try {
          const code = await this.getWechatCode();
          const app = getApp();
          const profile = profileRes.userInfo || {};
          const userInfo = {
            name: profile.nickName || '微信用户',
            nickName: profile.nickName || '微信用户',
            avatar: profile.avatarUrl || '/images/tabbar/mine_normal.png',
            avatarUrl: profile.avatarUrl || '/images/tabbar/mine_normal.png',
            gender: profile.gender || 0,
            province: profile.province || '',
            city: profile.city || '',
            country: profile.country || '',
            phoneNumber: '',
            maskedPhone: '未绑定手机号',
            loginType: 'wechat',
            loginCode: code
          };

          app.globalData.isLoggedIn = true;
          app.globalData.userInfo = userInfo;
          app.globalData.wechatCode = code;
          app.globalData.wechatCodeTime = Date.now();

          wx.setStorageSync('isLoggedIn', true);
          wx.setStorageSync('userInfo', userInfo);

          wx.showToast({
            title: '微信登录成功',
            icon: 'success',
            duration: 1200,
            success: () => {
              setTimeout(() => {
                wx.navigateBack({ delta: 1 });
              }, 1200);
            }
          });
        } catch (err) {
          this.setData({
            errorMsg: '微信登录失败，请稍后重试'
          });
        } finally {
          this.setData({
            isLoading: false
          });
        }
      },
      fail: () => {
        this.setData({
          isLoading: false,
          errorMsg: '您已取消微信授权'
        });
      }
    });
  },
  
  // 登录处理
  onLogin() {
    const { phoneNumber, password } = this.data;
    
    // 清除之前的错误信息
    this.setData({
      errorMsg: '',
      showLoginTip: false
    });
    
    // 验证输入
    const isPhoneValid = this.validatePhone(phoneNumber);
    const isPasswordValid = this.validatePassword(password);
    
    if (!isPhoneValid || !isPasswordValid) {
      return;
    }
    
    // 显示加载状态
    this.setData({
      isLoading: true
    });
    
    // 模拟登录请求
    setTimeout(() => {
      // 假设登录成功
      const success = true; // 这里可以替换为真实的登录逻辑
      
      if (success) {
        // 获取全局App实例
        const app = getApp();

        const maskedPhone = phoneNumber.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
        const userInfo = {
          phoneNumber: phoneNumber,
          name: `用户${phoneNumber.slice(-4)}`,
          nickName: `用户${phoneNumber.slice(-4)}`,
          avatar: '/images/tabbar/mine_normal.png',
          avatarUrl: '/images/tabbar/mine_normal.png',
          maskedPhone: maskedPhone
        };
        
        // 保存登录状态到本地存储
        wx.setStorageSync('isLoggedIn', true);
        wx.setStorageSync('userInfo', userInfo);
        
        // 更新全局数据
        app.globalData.isLoggedIn = true;
        app.globalData.userInfo = userInfo;
        
        // 显示登录成功提示
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500,
          success: () => {
            // 延迟返回上一页
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 1500);
          }
        });
      } else {
        // 登录失败
        this.setData({
          errorMsg: '账号或密码错误，请重新输入',
          showLoginTip: true
        });
      }
      
      // 隐藏加载状态
      this.setData({
        isLoading: false
      });
    }, 2000);
  }
});
