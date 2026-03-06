Page({
  data: {
    activeCategory: 'common',
    knowledgeData: {
      common: [
        {
          id: 1,
          title: '高血压患者的日常注意事项',
          brief: '高血压患者应注意饮食清淡，适量运动，定期监测血压...',
          image: '/images/service1.png',
          source: '健康医疗中心'
        },
        {
          id: 2,
          title: '糖尿病的预防与控制',
          brief: '合理饮食，适量运动，定期检查血糖是预防糖尿病的关键...',
          image: '/images/service2.png',
          source: '糖尿病防治中心'
        },
        {
          id: 3,
          title: '正确的洗手方法',
          brief: '洗手是预防传染病最有效的方法之一，掌握正确的洗手步骤...',
          image: '/images/service1.png',
          source: '疾病预防控制中心'
        }
      ],
      senior: [
        {
          id: 101,
          title: '老年人如何保持心理健康',
          brief: '老年人应保持积极乐观的心态，多参加社交活动，培养兴趣爱好...',
          image: '/images/service2.png',
          source: '老年心理健康协会'
        },
        {
          id: 102,
          title: '老年人跌倒的预防',
          brief: '改善家居环境，穿着合适的鞋子，进行平衡训练可以有效预防跌倒...',
          image: '/images/service1.png',
          source: '老年医学研究所'
        },
        {
          id: 103,
          title: '老年人合理用药指南',
          brief: '老年人用药需特别注意剂量和药物相互作用，应在医生指导下用药...',
          image: '/images/service2.png',
          source: '老年药学协会'
        }
      ],
      firstaid: [
        {
          id: 201,
          title: '心肺复苏术(CPR)的正确操作',
          brief: '掌握心肺复苏术可以在紧急情况下挽救生命，包括胸外按压和人工呼吸...',
          image: '/images/service1.png',
          source: '急救中心'
        },
        {
          id: 202,
          title: '常见外伤的处理方法',
          brief: '不同类型的外伤需要不同的处理方法，正确的止血和包扎很重要...',
          image: '/images/service2.png',
          source: '急救培训中心'
        },
        {
          id: 203,
          title: '中暑的预防与急救',
          brief: '高温天气注意防暑降温，出现中暑症状应及时采取急救措施...',
          image: '/images/service1.png',
          source: '急救医学协会'
        }
      ],
      nutrition: [
        {
          id: 301,
          title: '合理膳食金字塔',
          brief: '了解膳食金字塔的结构，合理搭配饮食，保持营养均衡...',
          image: '/images/service2.png',
          source: '营养学会'
        },
        {
          id: 302,
          title: '老年人的营养需求',
          brief: '老年人由于生理变化，对营养的需求有其特殊性，应注意补充...',
          image: '/images/service1.png',
          source: '老年营养学研究中心'
        },
        {
          id: 303,
          title: '常见食物的营养价值',
          brief: '了解常见食物的营养价值，有助于合理安排日常饮食...',
          image: '/images/service2.png',
          source: '营养科普中心'
        }
      ]
    },
    currentKnowledge: []
  },
  
  onLoad: function() {
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: '医学知识科普'
    })
    
    // 默认显示常见健康知识
    this.setCurrentKnowledge('common')
  },
  
  // 切换知识分类
  switchCategory: function(e) {
    const category = e.currentTarget.dataset.category
    
    this.setData({
      activeCategory: category
    })
    
    // 更新当前显示的知识列表
    this.setCurrentKnowledge(category)
  },
  
  // 设置当前显示的知识列表
  setCurrentKnowledge: function(category) {
    this.setData({
      currentKnowledge: this.data.knowledgeData[category]
    })
  },
  
  // 查看知识详情
  viewKnowledgeDetail: function(e) {
    const knowledgeId = e.currentTarget.dataset.id
    const knowledge = this.data.currentKnowledge.find(item => item.id === knowledgeId)
    
    if (knowledge) {
      wx.navigateTo({
        url: `/pages/knowledgeDetail/knowledgeDetail?id=${knowledgeId}&category=${this.data.activeCategory}`
      })
    }
  },
  
  // 返回上一页
  navigateBack: function() {
    wx.navigateBack()
  }
})