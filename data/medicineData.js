const MEDICINE_IMAGE = {
  common: '/images/medicine/medicine-common.png',
  health: '/images/medicine/medicine-health.png',
  seasonal: '/images/medicine/medicine-seasonal.png',
  prescription: '/images/medicine/medicine-prescription.png',
  fallback: '/images/medicine/medicine-default.png'
}

const MEDICINE_DETAILS = {
  common: {
    1: {
      id: 1,
      name: '人参',
      latinName: 'Ginseng',
      image: MEDICINE_IMAGE.common,
      brief: '名贵的中药材，被称为“百草之王”，常用于补气养生。',
      effects: '大补元气、补脾益肺、生津安神',
      properties: '味甘微苦，性微温。归脾、肺、心经。',
      usage: '煎服 3-9g；体虚明显者遵医嘱调整剂量。',
      cautions: '实热证、感冒发热期慎用，不宜与浓茶同服。'
    },
    2: {
      id: 2,
      name: '黄芪',
      latinName: 'Astragali Radix',
      image: MEDICINE_IMAGE.common,
      brief: '常用补气药材，适合体虚乏力人群日常调理。',
      effects: '补气升阳、固表止汗、利水消肿',
      properties: '味甘，性微温。归脾、肺经。',
      usage: '煎服 9-30g，日常食疗可少量代茶饮。',
      cautions: '阴虚阳亢、湿热偏盛者慎用。'
    },
    3: {
      id: 3,
      name: '当归',
      latinName: 'Angelicae Sinensis Radix',
      image: MEDICINE_IMAGE.common,
      brief: '常见补血活血药材，常用于体虚血亏调理。',
      effects: '补血活血、调经止痛、润肠通便',
      properties: '味甘辛，性温。归肝、心、脾经。',
      usage: '煎服 6-12g，可与红枣等搭配食疗。',
      cautions: '大便溏泄者慎用，孕期请遵医嘱。'
    },
    4: {
      id: 4,
      name: '枸杞',
      latinName: 'Lycii Fructus',
      image: MEDICINE_IMAGE.common,
      brief: '药食同源代表，适合日常保健养生。',
      effects: '滋补肝肾、益精明目',
      properties: '味甘，性平。归肝、肾经。',
      usage: '6-12g 泡水或煮粥；长期少量更稳定。',
      cautions: '外感发热、脾虚湿重者慎用。'
    }
  },
  health: {
    101: {
      id: 101,
      name: '冬虫夏草',
      latinName: 'Cordyceps',
      image: MEDICINE_IMAGE.health,
      brief: '传统滋补药材，常见于体弱人群调养方案。',
      effects: '补肾益肺、止咳平喘',
      properties: '味甘，性平。归肺、肾经。',
      usage: '煎服 3-9g，或粉末冲服，具体遵医嘱。',
      cautions: '儿童、孕妇及发热期人群慎用。'
    },
    102: {
      id: 102,
      name: '鹿茸',
      latinName: 'Cornu Cervi Pantotrichum',
      image: MEDICINE_IMAGE.health,
      brief: '温补药材，常用于肾阳不足相关调理。',
      effects: '补肾壮阳、益精血、强筋骨',
      properties: '味甘咸，性温。归肾、肝经。',
      usage: '研末冲服 1-2g，循序渐进使用。',
      cautions: '阴虚火旺、高血压未控者慎用。'
    },
    103: {
      id: 103,
      name: '阿胶',
      latinName: 'Colla Corii Asini',
      image: MEDICINE_IMAGE.health,
      brief: '经典补血滋阴药材，适合体虚血少人群。',
      effects: '补血滋阴、润燥止血',
      properties: '味甘，性平。归肺、肝、肾经。',
      usage: '烊化兑服 3-9g，餐后服用更温和。',
      cautions: '脾胃虚弱、消化不良者慎用。'
    },
    104: {
      id: 104,
      name: '何首乌',
      latinName: 'Polygoni Multiflori Radix',
      image: MEDICINE_IMAGE.health,
      brief: '常见滋补药材，分生首乌与制首乌。',
      effects: '补肝肾、益精血、乌须发',
      properties: '味苦甘涩，性微温。归肝、肾经。',
      usage: '煎服 6-12g，长期使用需专业指导。',
      cautions: '肝功能异常者慎用，避免自行长期大剂量服用。'
    }
  },
  seasonal: {
    201: {
      id: 201,
      name: '菊花',
      latinName: 'Chrysanthemi Flos',
      image: MEDICINE_IMAGE.seasonal,
      brief: '秋季常用药材，常见于清热明目类茶饮。',
      effects: '疏风清热、平肝明目',
      properties: '味甘苦，性微寒。归肺、肝经。',
      usage: '5-10g 泡水代茶饮或入汤剂。',
      cautions: '脾胃虚寒、易腹泻者慎用。'
    },
    202: {
      id: 202,
      name: '薄荷',
      latinName: 'Menthae Haplocalycis Herba',
      image: MEDICINE_IMAGE.seasonal,
      brief: '夏季常用清凉药材，适合风热初起不适。',
      effects: '疏散风热、清利头目、利咽',
      properties: '味辛，性凉。归肺、肝经。',
      usage: '3-6g，煎煮宜后下，或少量泡饮。',
      cautions: '体虚多汗人群不宜长期服用。'
    },
    203: {
      id: 203,
      name: '生姜',
      latinName: 'Zingiberis Rhizoma Recens',
      image: MEDICINE_IMAGE.seasonal,
      brief: '冬季常见调理食材，药食同源代表。',
      effects: '解表散寒、温中止呕',
      properties: '味辛，性微温。归肺、脾、胃经。',
      usage: '3-10g，可煮汤或煮水饮用。',
      cautions: '阴虚内热、口干咽痛者慎用。'
    },
    204: {
      id: 204,
      name: '金银花',
      latinName: 'Lonicerae Japonicae Flos',
      image: MEDICINE_IMAGE.seasonal,
      brief: '春季常用清热解毒药材，常用于代茶饮。',
      effects: '清热解毒、疏散风热',
      properties: '味甘，性寒。归肺、心、胃经。',
      usage: '6-15g，泡饮或煎服均可。',
      cautions: '脾胃虚寒者不宜长期大量服用。'
    }
  },
  prescription: {
    301: {
      id: 301,
      name: '四君子汤',
      latinName: 'Sijunzi Decoction',
      image: MEDICINE_IMAGE.prescription,
      brief: '经典补气方，常用于脾胃气虚调理。',
      effects: '益气健脾',
      properties: '核心药味：人参、白术、茯苓、甘草。',
      usage: '传统煎煮服用，剂量需由中医师辨证确定。',
      cautions: '实热、阴虚火旺者需辨证后使用。'
    },
    302: {
      id: 302,
      name: '四物汤',
      latinName: 'Siwu Decoction',
      image: MEDICINE_IMAGE.prescription,
      brief: '经典补血方，强调养血与调血并重。',
      effects: '补血调血',
      properties: '核心药味：当归、川芎、白芍、熟地黄。',
      usage: '建议在中医师指导下按体质使用。',
      cautions: '出血急性期或热证明显者慎用。'
    },
    303: {
      id: 303,
      name: '六味地黄丸',
      latinName: 'Liuwei Dihuang Pill',
      image: MEDICINE_IMAGE.prescription,
      brief: '常见滋阴补肾方剂，应用广泛。',
      effects: '滋阴补肾',
      properties: '核心药味：熟地黄、山茱萸、山药等。',
      usage: '按说明或医嘱服用，关注疗程与体感变化。',
      cautions: '脾虚便溏者慎用。'
    },
    304: {
      id: 304,
      name: '补中益气汤',
      latinName: 'Buzhong Yiqi Decoction',
      image: MEDICINE_IMAGE.prescription,
      brief: '补气升阳代表方剂，常用于气虚下陷证。',
      effects: '补中益气、升阳举陷',
      properties: '核心药味：黄芪、人参、白术、当归等。',
      usage: '需辨证使用，不建议自行长期服用。',
      cautions: '阴虚发热、实热内盛者忌用。'
    }
  }
}

const MEDICINE_CATEGORY_ORDER = ['common', 'health', 'seasonal', 'prescription']

function getMedicineListByCategory(category) {
  const categoryData = MEDICINE_DETAILS[category] || {}
  return Object.values(categoryData)
    .sort((a, b) => a.id - b.id)
    .map(item => ({
      id: item.id,
      name: item.name,
      latinName: item.latinName,
      brief: item.brief,
      effects: item.effects,
      image: item.image || MEDICINE_IMAGE.fallback
    }))
}

function getMedicineDetail(category, id) {
  const categoryData = MEDICINE_DETAILS[category]
  if (categoryData && categoryData[id]) {
    return categoryData[id]
  }

  for (const key of MEDICINE_CATEGORY_ORDER) {
    if (MEDICINE_DETAILS[key] && MEDICINE_DETAILS[key][id]) {
      return MEDICINE_DETAILS[key][id]
    }
  }

  return null
}

module.exports = {
  MEDICINE_IMAGE,
  MEDICINE_DETAILS,
  MEDICINE_CATEGORY_ORDER,
  getMedicineListByCategory,
  getMedicineDetail
}
