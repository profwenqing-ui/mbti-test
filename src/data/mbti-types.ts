export interface MBTIType {
  code: string;
  nickname: string;
  altNickname: string; // 网络常用别称
  title: string;
  color: string;
  emoji: string;
  imageUrl: string; // 形象图路径
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  famousPeople: string[];
}

export const mbtiTypes: Record<string, MBTIType> = {
  INTJ: {
    code: 'INTJ',
    nickname: '建筑师',
    altNickname: '战略家',
    title: '富有想象力和战略性的思想家',
    color: '#6B5CA5',
    emoji: '🏛️',
    imageUrl: '/mbti-intj.png',
    description:
      'INTJ 是富有想象力和战略性的思想家，他们对一切都有清晰的计划。他们通常对自己和他人都有很高的标准，追求效率和卓越。他们善于将复杂的理论转化为可执行的计划，是天生的系统构建者。',
    strengths: ['战略思维', '独立自主', '意志坚定', '追求知识', '高标准'],
    weaknesses: ['可能显得傲慢', '对情感表达不擅长', '过度追求完美', '不耐烦'],
    careers: ['科学家', '系统架构师', '投资分析师', '战略顾问', '大学教授'],
    famousPeople: ['尼古拉·特斯拉', '埃隆·马斯克', '克里斯托弗·诺兰'],
  },
  INTP: {
    code: 'INTP',
    nickname: '逻辑学家',
    altNickname: '思想家',
    title: '具有创造力的发明家',
    color: '#9B8EC4',
    emoji: '🔬',
    imageUrl: '/mbti-intp.png',
    description:
      'INTP 是富有创造力的思考者，他们对知识有着永不满足的渴望。他们喜欢分析模式、探索理论和寻找事物的底层逻辑。他们常常沉浸在自己的思维世界中，追求对万物本质的理解。',
    strengths: ['逻辑分析', '创造力强', '客观公正', '思维开放', '热爱探索'],
    weaknesses: ['容易脱离现实', '可能忽略他人感受', '过度思考', '难以付诸行动'],
    careers: ['哲学家', '数学家', '软件工程师', '研究员', '数据科学家'],
    famousPeople: ['爱因斯坦', '达尔文', '笛卡尔'],
  },
  ENTJ: {
    code: 'ENTJ',
    nickname: '指挥官',
    altNickname: '领导者',
    title: '大胆、富有想象力的领导者',
    color: '#4A7C59',
    emoji: '👑',
    imageUrl: '/mbti-entj.png',
    description:
      'ENTJ 是天生的领导者，他们大胆、富有想象力且意志坚强。他们善于发现低效的流程并加以改进，享受制定长期战略。他们充满自信，善于推动事情向前发展。',
    strengths: ['领导力强', '高效执行', '战略眼光', '自信果断', '善于规划'],
    weaknesses: ['可能过于强势', '缺乏耐心', '对情感不够敏感', '固执己见'],
    careers: ['CEO', '律师', '项目经理', '企业家', '管理顾问'],
    famousPeople: ['史蒂夫·乔布斯', '玛格丽特·撒切尔', '拿破仑'],
  },
  ENTP: {
    code: 'ENTP',
    nickname: '辩论家',
    altNickname: '发明家',
    title: '聪明好奇的思想者',
    color: '#D4874D',
    emoji: '⚡',
    imageUrl: '/mbti-entp.png',
    description:
      'ENTP 是聪明的思想者，他们喜欢智力上的挑战，享受辩论和头脑风暴。他们精力充沛、思维敏捷，总能从不同角度看问题。他们是创新的先驱，不喜欢被传统束缚。',
    strengths: ['思维敏捷', '适应力强', '善于创新', '魅力十足', '知识渊博'],
    weaknesses: ['容易厌倦', '可能好争论', '难以专注', '可能忽略细节'],
    careers: ['企业家', '发明家', '记者', '创意总监', '风险投资人'],
    famousPeople: ['本杰明·富兰克林', '马克·吐温', '托马斯·爱迪生'],
  },
  INFJ: {
    code: 'INFJ',
    nickname: '提倡者',
    altNickname: '引路人',
    title: '安静而神秘的理想主义者',
    color: '#7B9AAF',
    emoji: '🌙',
    imageUrl: '/mbti-infj.png',
    description:
      'INFJ 是安静而神秘的，同时也是鼓舞人心的、不知疲倦的理想主义者。他们是最稀有的人格类型，拥有深刻的洞察力。他们追求有意义的生活，渴望帮助他人实现潜能。',
    strengths: ['洞察力强', '富有同理心', '有原则', '有创造力', '致力于理想'],
    weaknesses: ['过于理想化', '容易疲惫', '过于追求完美', '回避冲突'],
    careers: ['心理咨询师', '作家', '教师', '人力资源', '社会工作者'],
    famousPeople: ['马丁·路德·金', '甘地', '荣格'],
  },
  INFP: {
    code: 'INFP',
    nickname: '调停者',
    altNickname: '哲学家',
    title: '诗意、善良的利他主义者',
    color: '#C4908E',
    emoji: '🦋',
    imageUrl: '/mbti-infp.png',
    description:
      'INFP 是诗意、善良的利他主义者，他们总是热衷于为正义事业提供帮助。他们内心世界丰富，对美和真实有着深切的追求。他们是理想主义者，始终相信人性中善良的一面。',
    strengths: ['理想主义', '同理心强', '创造力丰富', '开放包容', '热情奉献'],
    weaknesses: ['过于敏感', '容易自我批评', '不切实际', '容易情绪化'],
    careers: ['作家', '艺术家', '心理咨询师', '社工', '音乐家'],
    famousPeople: ['莎士比亚', '托尔金', '威廉·布莱克'],
  },
  ENFJ: {
    code: 'ENFJ',
    nickname: '主人公',
    altNickname: '教育家',
    title: '富有魅力的鼓舞人心的领导者',
    color: '#D4A574',
    emoji: '🌟',
    imageUrl: '/mbti-enfj.png',
    description:
      'ENFJ 是富有魅力且鼓舞人心的领导者，他们能够吸引听众。他们天生善于理解他人，具有强烈的责任感去帮助他人成长。他们是天生的教师，善于激发他人的潜能。',
    strengths: ['天生的领导力', '善解人意', '可靠负责', '有魅力', '善于沟通'],
    weaknesses: ['过于理想化', '过于无私', '难以做出艰难决定', '过于敏感'],
    careers: ['教师', '培训师', '市场营销', '政治家', '公关经理'],
    famousPeople: ['奥巴马', '奥普拉·温弗瑞', '曼德拉'],
  },
  ENFP: {
    code: 'ENFP',
    nickname: '竞选者',
    altNickname: '激励者',
    title: '热情、有创造力、善于社交的自由精灵',
    color: '#E8A87C',
    emoji: '🎪',
    imageUrl: '/mbti-enfp.png',
    description:
      'ENFP 是热情、有创造力、善于社交的自由精灵，他们总能找到理由微笑。他们充满活力和好奇心，善于发现生活中的可能性。他们关心他人的感受，喜欢帮助他人找到潜能。',
    strengths: ['热情洋溢', '创造力强', '善于沟通', '乐观积极', '好奇心强'],
    weaknesses: ['容易分心', '过度思考', '容易焦虑', '难以集中注意力'],
    careers: ['记者', '演员', '广告创意', '顾问', '创业者'],
    famousPeople: ['罗宾·威廉姆斯', '沃尔特·迪士尼', '罗伯特·唐尼'],
  },
  ISTJ: {
    code: 'ISTJ',
    nickname: '物流师',
    altNickname: '监督者',
    title: '务实、注重事实的个体',
    color: '#5B7B7A',
    emoji: '📋',
    imageUrl: '/mbti-istj.png',
    description:
      'ISTJ 是务实、注重事实的个体，他们的坚定和可靠令人信赖。他们重视传统和秩序，以严谨的态度对待工作和生活。他们是组织的骨干，确保一切按计划运行。',
    strengths: ['可靠负责', '有条理', '注重细节', '忠诚正直', '意志坚定'],
    weaknesses: ['过于固执', '不善于表达情感', '对变化抗拒', '过于自责'],
    careers: ['会计师', '审计师', '军官', '法官', '系统管理员'],
    famousPeople: ['沃伦·巴菲特', '安格拉·默克尔', '乔治·华盛顿'],
  },
  ISFJ: {
    code: 'ISFJ',
    nickname: '守卫者',
    altNickname: '守护者',
    title: '温暖、尽职的保护者',
    color: '#8FA3B0',
    emoji: '🛡️',
    imageUrl: '/mbti-isfj.png',
    description:
      'ISFJ 是非常专注而温暖的保护者，他们时刻准备着保护所爱的人。他们勤奋、体贴，具有强烈的责任感。他们是沉默的英雄，在幕后默默付出，确保身边的人得到照顾。',
    strengths: ['可靠支持', '善于观察', '耐心细致', '忠诚奉献', '善于倾听'],
    weaknesses: ['过于谦虚', '过于自我牺牲', '不善于处理冲突', '过于压抑情感'],
    careers: ['护士', '教师', '行政助理', '社工', '图书管理员'],
    famousPeople: ['碧昂丝', '泰勒·斯威夫特', '凯特·米德尔顿'],
  },
  ESTJ: {
    code: 'ESTJ',
    nickname: '总经理',
    altNickname: '管理者',
    title: '出色的管理者',
    color: '#6B8E6B',
    emoji: '📊',
    imageUrl: '/mbti-estj.png',
    description:
      'ESTJ 是天生的组织者和管理者，他们相信秩序和规则的力量。他们果断、务实，善于建立和维护社会秩序。他们是社区和组织的支柱，确保一切井然有序。',
    strengths: ['组织能力强', '忠诚负责', '果断直接', '意志坚定', '诚实坦率'],
    weaknesses: ['不够灵活', '过于固执', '不善于表达情感', '过于注重社会地位'],
    careers: ['企业管理者', '军官', '法官', '学校校长', '财务经理'],
    famousPeople: ['亨利·福特', '杰克·韦尔奇', '索尼娅·索托马约尔'],
  },
  ESFJ: {
    code: 'ESFJ',
    nickname: '执政官',
    altNickname: '关怀者',
    title: '关怀他人、善于社交的人',
    color: '#C4908E',
    emoji: '🤝',
    imageUrl: '/mbti-esfj.png',
    description:
      'ESFJ 是极其关怀他人的人，他们善于社交，受人欢迎。他们总是乐于助人，对他人有着敏锐的感知力。他们是社区的粘合剂，善于营造和谐的氛围。',
    strengths: ['善于照顾他人', '忠诚体贴', '善于合作', '受人欢迎', '实际务实'],
    weaknesses: ['过于在意他人看法', '不善于处理批评', '过于控制', '缺乏灵活性'],
    careers: ['医生', '护士', '教师', '人力资源', '活动策划'],
    famousPeople: ['泰勒·斯威夫特', '詹妮弗·加纳', '比尔·克林顿'],
  },
  ISTP: {
    code: 'ISTP',
    nickname: '鉴赏家',
    altNickname: '工匠',
    title: '大胆而实际的实验者',
    color: '#7B8E6B',
    emoji: '🔧',
    imageUrl: '/mbti-istp.png',
    description:
      'ISTP 是大胆而实际的实验者，他们善于使用各种工具。他们具有强烈的好奇心和动手能力，喜欢探索事物的运作原理。他们是冷静的危机处理者，在压力下依然保持理性。',
    strengths: ['乐观积极', '创造力强', '务实有效', '善于处理危机', '独立自主'],
    weaknesses: ['固执己见', '不善于表达情感', '容易冒险', '不善于承诺'],
    careers: ['工程师', '飞行员', '消防员', '运动员', '技术人员'],
    famousPeople: ['克林特·伊斯特伍德', '布鲁斯·李', '迈克尔·乔丹'],
  },
  ISFP: {
    code: 'ISFP',
    nickname: '探险家',
    altNickname: '艺术家',
    title: '灵活、有魅力的艺术家',
    color: '#B08EA3',
    emoji: '🎨',
    imageUrl: '/mbti-isfp.png',
    description:
      'ISFP 是灵活、有魅力的艺术家，他们随时准备着探索和体验新事物。他们安静但友好，敏感但坚强。他们活在当下，用独特的视角欣赏生活中的美。',
    strengths: ['迷人魅力', '善于感知美', '善于想象', '好奇心强', '热情洋溢'],
    weaknesses: ['容易紧张', '竞争激烈', '容易冲动', '容易自我怀疑'],
    careers: ['艺术家', '设计师', '音乐家', '摄影师', '兽医'],
    famousPeople: ['鲍勃·迪伦', '迈克尔·杰克逊', '碧昂丝'],
  },
  ESTP: {
    code: 'ESTP',
    nickname: '企业家',
    altNickname: '冒险家',
    title: '聪明、精力充沛、善于观察的人',
    color: '#D4874D',
    emoji: '🎯',
    imageUrl: '/mbti-estp.png',
    description:
      'ESTP 是聪明、精力充沛且善于观察的人，他们喜欢冒险和生活在边缘。他们善于发现机会，行动力强，享受每一刻。他们是天生的问题解决者，擅长在压力下做出快速决策。',
    strengths: ['大胆果断', '理性客观', '善于观察', '社交能力强', '直接坦率'],
    weaknesses: ['缺乏耐心', '冒险倾向', '不善于规划', '可能忽略他人感受'],
    careers: ['企业家', '销售', '运动员', '急救人员', '股票交易员'],
    famousPeople: ['唐纳德·特朗普', '麦当娜', '欧内斯特·海明威'],
  },
  ESFP: {
    code: 'ESFP',
    nickname: '表演者',
    altNickname: '演艺家',
    title: '自发性强、精力充沛的表演者',
    color: '#E8A87C',
    emoji: '🎭',
    imageUrl: '/mbti-esfp.png',
    description:
      'ESFP 是自发性强、精力充沛、热情洋溢的表演者。他们生活在当下，享受每一刻。他们善于活跃气氛，让身边的人感到快乐。他们是天生的表演者，无论走到哪里都是焦点。',
    strengths: ['大胆创新', '独创性', '审美能力', '善于观察', '善于实践'],
    weaknesses: ['敏感', '容易厌倦', '注意力不集中', '容易焦虑'],
    careers: ['演员', '主持人', '活动策划', '导游', '公关'],
    famousPeople: ['玛丽莲·梦露', '埃尔维斯·普雷斯利', '威尔·史密斯'],
  },
};

export function getMBTIType(code: string): MBTIType {
  return mbtiTypes[code] || mbtiTypes['INTJ'];
}