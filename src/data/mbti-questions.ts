export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  options: {
    label: string;
    value: string; // 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'
  }[];
}

export const questions: Question[] = [
  // === E/I 维度 (8题) ===
  {
    id: 1,
    text: '在一个热闹的聚会上，你通常会？',
    dimension: 'EI',
    options: [
      { label: '主动和不同的人聊天，享受社交氛围', value: 'E' },
      { label: '找一两个熟悉的人深入交流', value: 'I' },
    ],
  },
  {
    id: 2,
    text: '工作了一整天后，你更倾向于？',
    dimension: 'EI',
    options: [
      { label: '和朋友出去吃饭放松', value: 'E' },
      { label: '独自待着安静地休息', value: 'I' },
    ],
  },
  {
    id: 3,
    text: '面对一个新想法时，你通常会？',
    dimension: 'EI',
    options: [
      { label: '立刻找人讨论，在交流中完善想法', value: 'E' },
      { label: '先自己仔细想清楚再分享', value: 'I' },
    ],
  },
  {
    id: 4,
    text: '你更喜欢哪种工作方式？',
    dimension: 'EI',
    options: [
      { label: '团队协作，头脑风暴', value: 'E' },
      { label: '独立专注，深度思考', value: 'I' },
    ],
  },
  {
    id: 5,
    text: '在社交场合中，你通常是？',
    dimension: 'EI',
    options: [
      { label: '主动开启话题，活跃气氛', value: 'E' },
      { label: '等待别人来搭话，或安静倾听', value: 'I' },
    ],
  },
  {
    id: 6,
    text: '你的朋友圈子是？',
    dimension: 'EI',
    options: [
      { label: '广泛而多样，认识很多不同圈子的人', value: 'E' },
      { label: '小而深，有几个非常亲密的朋友', value: 'I' },
    ],
  },
  {
    id: 7,
    text: '打电话给朋友这件事，你觉得？',
    dimension: 'EI',
    options: [
      { label: '很自然，想到什么就直接打了', value: 'E' },
      { label: '有时会犹豫，先发条消息看看', value: 'I' },
    ],
  },
  {
    id: 8,
    text: '长时间独处后，你会？',
    dimension: 'EI',
    options: [
      { label: '觉得无聊，想出去见见人', value: 'E' },
      { label: '感到充实满足，享受独处的时光', value: 'I' },
    ],
  },

  // === S/N 维度 (7题) ===
  {
    id: 9,
    text: '阅读一本书时，你更关注？',
    dimension: 'SN',
    options: [
      { label: '具体的事实、细节和数据', value: 'S' },
      { label: '隐含的意义、象征和可能性', value: 'N' },
    ],
  },
  {
    id: 10,
    text: '描述一件事时，你倾向于？',
    dimension: 'SN',
    options: [
      { label: '按时间顺序，详细还原经过', value: 'S' },
      { label: '跳跃式叙述，强调关联和意义', value: 'N' },
    ],
  },
  {
    id: 11,
    text: '你更信任？',
    dimension: 'SN',
    options: [
      { label: '亲身经验和可验证的事实', value: 'S' },
      { label: '直觉和灵感，即使说不清原因', value: 'N' },
    ],
  },
  {
    id: 12,
    text: '面对一个问题时，你首先会？',
    dimension: 'SN',
    options: [
      { label: '回顾过去的经验，寻找可行的解决方案', value: 'S' },
      { label: '想象各种可能性，寻找创新的突破口', value: 'N' },
    ],
  },
  {
    id: 13,
    text: '你更喜欢哪种类型的课程或书籍？',
    dimension: 'SN',
    options: [
      { label: '实用性强的，能直接应用', value: 'S' },
      { label: '理论性的，能启发思考', value: 'N' },
    ],
  },
  {
    id: 14,
    text: '别人评价你时，更可能说？',
    dimension: 'SN',
    options: [
      { label: '你很务实，脚踏实地', value: 'S' },
      { label: '你很有想象力，想法独特', value: 'N' },
    ],
  },
  {
    id: 15,
    text: '在日常生活中，你更注意到？',
    dimension: 'SN',
    options: [
      { label: '当下正在发生的具体事物', value: 'S' },
      { label: '事物之间隐藏的联系和模式', value: 'N' },
    ],
  },

  // === T/F 维度 (8题) ===
  {
    id: 16,
    text: '做决定时，你更看重？',
    dimension: 'TF',
    options: [
      { label: '逻辑分析和客观事实', value: 'T' },
      { label: '个人价值观和对他人的影响', value: 'F' },
    ],
  },
  {
    id: 17,
    text: '朋友向你倾诉烦恼时，你通常会？',
    dimension: 'TF',
    options: [
      { label: '帮他分析问题，提供解决方案', value: 'T' },
      { label: '先共情安慰，让他感到被理解', value: 'F' },
    ],
  },
  {
    id: 18,
    text: '在团队中出现分歧时，你认为？',
    dimension: 'TF',
    options: [
      { label: '应该坚持最合理、最高效的方案', value: 'T' },
      { label: '应该照顾每个人的感受，寻求共识', value: 'F' },
    ],
  },
  {
    id: 19,
    text: '你更欣赏哪种品质？',
    dimension: 'TF',
    options: [
      { label: '公正客观，不偏不倚', value: 'T' },
      { label: '善解人意，温暖体贴', value: 'F' },
    ],
  },
  {
    id: 20,
    text: '被批评时，你的第一反应是？',
    dimension: 'TF',
    options: [
      { label: '分析批评是否合理，有道理就接受', value: 'T' },
      { label: '先感到受伤，需要时间消化情绪', value: 'F' },
    ],
  },
  {
    id: 21,
    text: '你认为好的领导应该？',
    dimension: 'TF',
    options: [
      { label: '制定清晰的规则和标准，赏罚分明', value: 'T' },
      { label: '关心团队成员的成长和感受', value: 'F' },
    ],
  },
  {
    id: 22,
    text: '在辩论中，你更倾向于？',
    dimension: 'TF',
    options: [
      { label: '据理力争，追求真理和正确性', value: 'T' },
      { label: '注意措辞，避免伤害对方感情', value: 'F' },
    ],
  },
  {
    id: 23,
    text: '你觉得哪种反馈更有价值？',
    dimension: 'TF',
    options: [
      { label: '直接指出问题，即使听起来刺耳', value: 'T' },
      { label: '委婉地提出建议，顾及对方感受', value: 'F' },
    ],
  },

  // === J/P 维度 (7题) ===
  {
    id: 24,
    text: '对于日程安排，你更喜欢？',
    dimension: 'JP',
    options: [
      { label: '提前规划好，按计划执行', value: 'J' },
      { label: '保持灵活，随机应变', value: 'P' },
    ],
  },
  {
    id: 25,
    text: '你的桌面/房间通常是？',
    dimension: 'JP',
    options: [
      { label: '整洁有序，东西各有其位', value: 'J' },
      { label: '看似凌乱，但我知道东西在哪', value: 'P' },
    ],
  },
  {
    id: 26,
    text: '面对截止日期，你通常？',
    dimension: 'JP',
    options: [
      { label: '提前完成，留出检查时间', value: 'J' },
      { label: '在截止前才迸发灵感，压线完成', value: 'P' },
    ],
  },
  {
    id: 27,
    text: '出去旅行时，你更倾向于？',
    dimension: 'JP',
    options: [
      { label: '做好详细攻略，预订好一切', value: 'J' },
      { label: '只定大方向，到了再随性探索', value: 'P' },
    ],
  },
  {
    id: 28,
    text: '开始一项新任务时，你通常？',
    dimension: 'JP',
    options: [
      { label: '先列出清单，按步骤逐一完成', value: 'J' },
      { label: '先做最感兴趣的部分，其他随缘', value: 'P' },
    ],
  },
  {
    id: 29,
    text: '当计划被突然改变时，你的反应是？',
    dimension: 'JP',
    options: [
      { label: '感到不安和烦躁，希望能恢复原计划', value: 'J' },
      { label: '觉得无所谓，甚至有点兴奋', value: 'P' },
    ],
  },
  {
    id: 30,
    text: '你做决定的速度通常是？',
    dimension: 'JP',
    options: [
      { label: '快速决定，不喜欢悬而未决', value: 'J' },
      { label: '保持开放，收集更多信息再决定', value: 'P' },
    ],
  },
];
