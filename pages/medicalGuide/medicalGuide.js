// medicalGuide.js
Page({
  data: {
    guideSteps: [
      { id: 1, title: '预约挂号', desc: '通过小程序或电话预约您需要的科室和医生' },
      { id: 2, title: '准备资料', desc: '准备好身份证、医保卡和既往病历等资料' },
      { id: 3, title: '医院报到', desc: '提前30分钟到达医院，在自助机或导诊台刷卡报到' },
      { id: 4, title: '候诊就医', desc: '在候诊区等待叫号，听到叫号后前往相应诊室' },
      { id: 5, title: '检查取药', desc: '根据医生建议进行检查或凭处方到药房取药' }
    ],
    hospitalTips: [
      { id: 1, title: '老年优先窗口', desc: '多数医院设有老年人优先窗口，可优先办理挂号、缴费等业务' },
      { id: 2, title: '轮椅借用', desc: '医院入口处通常提供免费轮椅借用服务，需押身份证或押金' },
      { id: 3, title: '志愿者服务', desc: '医院大厅有志愿者可提供引导和帮助，可主动寻求协助' },
      { id: 4, title: '就医时间选择', desc: '建议选择工作日上午8:00-10:00，人相对较少' },
      { id: 5, title: '突发情况', desc: '如遇身体不适，可向附近工作人员求助或前往急诊' }
    ],
    commonDepartments: [
      { id: 1, name: '内科', desc: '常见疾病、慢性病诊治' },
      { id: 2, name: '外科', desc: '外伤、手术相关疾病' },
      { id: 3, name: '骨科', desc: '关节、骨骼相关疾病' },
      { id: 4, name: '心内科', desc: '心脏、高血压等疾病' },
      { id: 5, name: '神经内科', desc: '头晕、中风等神经系统疾病' },
      { id: 6, name: '眼科', desc: '视力问题、白内障等' },
      { id: 7, name: '耳鼻喉科', desc: '耳朵、鼻子、喉咙相关疾病' },
      { id: 8, name: '口腔科', desc: '牙齿、口腔相关问题' }
    ]
  },
  onLoad: function() {
    console.log('Medical guide page loaded');
    wx.setNavigationBarTitle({
      title: '就医指导'
    })
    console.log('Guide steps data:', this.data.guideSteps);
    console.log('Hospital tips data:', this.data.hospitalTips);
    console.log('Common departments data:', this.data.commonDepartments);
  },
  onShow: function() {
    console.log('Medical guide page shown');
  },
  // 返回上一页
  onBackTap: function() {
    console.log('Back button tapped');
    wx.navigateBack()
  }
})