// MBTI 人格类型关系：兼容性、匹配与互补
export interface Relation {
  type: string;      // 目标类型
  label: string;     // 关系标签
  desc: string;      // 关系描述
  level: 'perfect' | 'good' | 'balanced' | 'challenge';
}

// 为每种类型定义与其他类型的关系
export const typeRelations: Record<string, Relation[]> = {
  INTJ: [
    { type: 'ENFP', label: '灵魂伴侣', desc: 'INTJ的理性与ENFP的热情完美互补，彼此激发成长', level: 'perfect' },
    { type: 'ENTP', label: '智性搭档', desc: '智力上的绝佳对手，棋逢对手般的思维碰撞', level: 'good' },
    { type: 'INTP', label: '同类知己', desc: '相似的思维方式，深度交流无压力', level: 'good' },
    { type: 'ESFP', label: '互补挑战', desc: '截然不同的视角，学会欣赏生活的当下之美', level: 'balanced' },
    { type: 'ESTJ', label: '高效盟友', desc: '目标导向的强强联合，但需注意沟通方式', level: 'balanced' },
    { type: 'ENFJ', label: '成长导师', desc: 'ENFJ的温暖能融化INTJ的防御，带来情感成长', level: 'good' },
  ],
  INTP: [
    { type: 'ENFJ', label: '灵魂伴侣', desc: 'INTP的逻辑与ENFJ的共情力形成完美互补', level: 'perfect' },
    { type: 'ENTP', label: '疯狂发明家', desc: '两个思维发散者，一起探索无限可能', level: 'good' },
    { type: 'INTJ', label: '同类知己', desc: '相似的思维方式，深度交流无压力', level: 'good' },
    { type: 'ESFJ', label: '互补挑战', desc: '学会从理论走向实践，关注现实中的温暖', level: 'balanced' },
    { type: 'ISTJ', label: '理性联盟', desc: '一个探索理论，一个落地执行，完美配合', level: 'balanced' },
    { type: 'INFJ', label: '深度共鸣', desc: '抽象思维与直觉洞察的深层对话', level: 'good' },
  ],
  ENTJ: [
    { type: 'INFP', label: '灵魂伴侣', desc: 'ENTJ的果断与INFP的深度，彼此完整彼此成就', level: 'perfect' },
    { type: 'INTJ', label: '战略同盟', desc: '两个战略家联手，没有什么不能实现', level: 'good' },
    { type: 'ENTP', label: '创新双核', desc: '大胆想法+高效执行，所向披靡', level: 'good' },
    { type: 'ISFP', label: '互补挑战', desc: '慢下来感受生活，发现计划外的美好', level: 'balanced' },
    { type: 'ESTJ', label: '效率先锋', desc: '务实与远见的结合，执行力拉满', level: 'balanced' },
    { type: 'ENFJ', label: '领袖共鸣', desc: '同为领导者，但ENFJ带来更多人文关怀', level: 'good' },
  ],
  ENTP: [
    { type: 'INFJ', label: '灵魂伴侣', desc: 'ENTP的活力与INFJ的深度，彼此是最完整的拼图', level: 'perfect' },
    { type: 'INTJ', label: '智性搭档', desc: '棋逢对手，智力上的绝佳火花', level: 'good' },
    { type: 'INTP', label: '疯狂发明家', desc: '两个思维发散者，一起探索无限可能', level: 'good' },
    { type: 'ISFJ', label: '互补挑战', desc: '学会扎根现实，发现稳定中的温暖', level: 'balanced' },
    { type: 'ESTP', label: '冒险搭档', desc: '一起探索未知，享受思维的冒险', level: 'balanced' },
    { type: 'ENFP', label: '双倍能量', desc: '两个充满活力的灵魂，快乐加倍', level: 'good' },
  ],
  INFJ: [
    { type: 'ENTP', label: '灵魂伴侣', desc: 'INFJ的深度与ENTP的活力，彼此是最完整的拼图', level: 'perfect' },
    { type: 'ENFP', label: '理想主义同盟', desc: '共同追求意义，一起让世界变得更美好', level: 'good' },
    { type: 'INTJ', label: '深度共鸣', desc: '相似的洞察力，深层次的理解无需言语', level: 'good' },
    { type: 'ESTP', label: '互补挑战', desc: '活在当下的勇气，是INFJ最好的学习', level: 'balanced' },
    { type: 'INFP', label: '灵魂共鸣', desc: '深度的情感共鸣，互相理解彼此的理想', level: 'good' },
    { type: 'ENFJ', label: '温暖相遇', desc: '两个理想主义者，共同温暖这个世界', level: 'good' },
  ],
  INFP: [
    { type: 'ENTJ', label: '灵魂伴侣', desc: 'INFP的深度与ENTJ的果断，彼此完整彼此成就', level: 'perfect' },
    { type: 'ENFJ', label: '理想主义同盟', desc: '共同追求意义，互相支持和理解', level: 'good' },
    { type: 'INFJ', label: '灵魂共鸣', desc: '深度的情感共鸣，互相理解彼此的理想', level: 'good' },
    { type: 'ESTJ', label: '互补挑战', desc: '学会直面现实，在规则中找到自由', level: 'balanced' },
    { type: 'ISFP', label: '艺术共鸣', desc: '对美和真实的共同追求，温柔而深刻', level: 'good' },
    { type: 'ENFP', label: '双倍理想', desc: '两个理想主义者，一起做梦一起行动', level: 'good' },
  ],
  ENFJ: [
    { type: 'INTP', label: '灵魂伴侣', desc: 'ENFJ的共情力与INTP的逻辑形成完美互补', level: 'perfect' },
    { type: 'INFP', label: '理想主义同盟', desc: '共同追求意义，互相支持和理解', level: 'good' },
    { type: 'INFJ', label: '温暖相遇', desc: '两个理想主义者，共同温暖这个世界', level: 'good' },
    { type: 'ISTP', label: '互补挑战', desc: '学会放手，享受当下的自由与随性', level: 'balanced' },
    { type: 'ENTJ', label: '领袖共鸣', desc: '同为领导者，但ENFJ带来更多人文关怀', level: 'good' },
    { type: 'ESFJ', label: '温暖同盟', desc: '一起关心他人，温暖加倍', level: 'good' },
  ],
  ENFP: [
    { type: 'INTJ', label: '灵魂伴侣', desc: 'ENFP的热情与INTJ的理性完美互补，彼此激发成长', level: 'perfect' },
    { type: 'INFJ', label: '理想主义同盟', desc: '共同追求意义，一起让世界变得更美好', level: 'good' },
    { type: 'ENTP', label: '双倍能量', desc: '两个充满活力的灵魂，快乐加倍', level: 'good' },
    { type: 'ISTJ', label: '互补挑战', desc: '学会专注和坚持，发现稳定中的安全感', level: 'balanced' },
    { type: 'INFP', label: '双倍理想', desc: '两个理想主义者，一起做梦一起行动', level: 'good' },
    { type: 'ESFP', label: '快乐加倍', desc: '一起享受生活每一刻，自由奔放', level: 'good' },
  ],
  ISTJ: [
    { type: 'ESFP', label: '灵魂伴侣', desc: 'ISTJ的稳重与ESFP的活力，让彼此的生活更完整', level: 'perfect' },
    { type: 'ESTJ', label: '效率同盟', desc: '共同的务实态度，可靠的合作伙伴', level: 'good' },
    { type: 'ISFJ', label: '同类知己', desc: '相似的价值观，安稳踏实的相处', level: 'good' },
    { type: 'ENFP', label: '互补挑战', desc: '学会拥抱变化，发现生活中的可能性', level: 'balanced' },
    { type: 'INTJ', label: '理性联盟', desc: '一个落地执行，一个探索理论，完美配合', level: 'balanced' },
    { type: 'ISTP', label: '务实搭档', desc: '务实直爽，互相尊重彼此的独立', level: 'good' },
  ],
  ISFJ: [
    { type: 'ESTP', label: '灵魂伴侣', desc: 'ISFJ的温柔与ESTP的冒险精神，让彼此的世界更宽广', level: 'perfect' },
    { type: 'ESFJ', label: '温暖同盟', desc: '相似的关怀方式，一起创造温暖', level: 'good' },
    { type: 'ISTJ', label: '同类知己', desc: '相似的价值观，安稳踏实的相处', level: 'good' },
    { type: 'ENTP', label: '互补挑战', desc: '学会接受变化，发现新视角的乐趣', level: 'balanced' },
    { type: 'INFJ', label: '深度共鸣', desc: '相似的安静与温柔，深层次的理解', level: 'good' },
    { type: 'ISFP', label: '温柔共鸣', desc: '安静温和的相处，彼此滋养', level: 'good' },
  ],
  ESTJ: [
    { type: 'ISFP', label: '灵魂伴侣', desc: 'ESTJ的务实与ISFP的艺术感，让生活既有秩序又有美', level: 'perfect' },
    { type: 'ISTJ', label: '效率同盟', desc: '共同的务实态度，可靠的合作伙伴', level: 'good' },
    { type: 'ENTJ', label: '效率先锋', desc: '务实与远见的结合，执行力拉满', level: 'good' },
    { type: 'INFP', label: '互补挑战', desc: '学会关注情感，发现内心的柔软', level: 'balanced' },
    { type: 'ESFJ', label: '务实搭档', desc: '相似的价值观，高效的团队合作', level: 'good' },
    { type: 'INTJ', label: '高效盟友', desc: '目标导向的强强联合，但需注意沟通方式', level: 'balanced' },
  ],
  ESFJ: [
    { type: 'ISTP', label: '灵魂伴侣', desc: 'ESFJ的温暖与ISTP的独立，彼此的世界更加完整', level: 'perfect' },
    { type: 'ISFJ', label: '温暖同盟', desc: '相似的关怀方式，一起创造温暖', level: 'good' },
    { type: 'ENFJ', label: '温暖同盟', desc: '一起关心他人，温暖加倍', level: 'good' },
    { type: 'INTP', label: '互补挑战', desc: '学会欣赏独处的价值，给彼此空间', level: 'balanced' },
    { type: 'ESTJ', label: '务实搭档', desc: '相似的价值观，高效的团队合作', level: 'good' },
    { type: 'ESFP', label: '快乐搭档', desc: '一起享受生活，传递快乐', level: 'good' },
  ],
  ISTP: [
    { type: 'ESFJ', label: '灵魂伴侣', desc: 'ISTP的独立与ESFJ的温暖，让彼此的世界更加完整', level: 'perfect' },
    { type: 'ESTP', label: '冒险搭档', desc: '一起探索世界，享受动手的乐趣', level: 'good' },
    { type: 'ISFP', label: '艺术共鸣', desc: '相似的独立与对美的感知', level: 'good' },
    { type: 'ENFJ', label: '互补挑战', desc: '学会表达情感，发现内心深处的温柔', level: 'balanced' },
    { type: 'ISTJ', label: '务实搭档', desc: '务实直爽，互相尊重彼此的独立', level: 'good' },
    { type: 'INTJ', label: '理性共鸣', desc: '理性分析问题的能力，深度交流', level: 'balanced' },
  ],
  ISFP: [
    { type: 'ESTJ', label: '灵魂伴侣', desc: 'ISFP的艺术感与ESTJ的务实，让生活既有秩序又有美', level: 'perfect' },
    { type: 'ISTP', label: '艺术共鸣', desc: '相似的独立与对美的感知', level: 'good' },
    { type: 'INFP', label: '艺术共鸣', desc: '对美和真实的共同追求，温柔而深刻', level: 'good' },
    { type: 'ENTJ', label: '互补挑战', desc: '学会规划未来，发现自己的潜能', level: 'balanced' },
    { type: 'ISFJ', label: '温柔共鸣', desc: '安静温和的相处，彼此滋养', level: 'good' },
    { type: 'ESFP', label: '艺术搭档', desc: '一起感受美，创造美', level: 'good' },
  ],
  ESTP: [
    { type: 'ISFJ', label: '灵魂伴侣', desc: 'ESTP的冒险精神与ISFJ的温柔，让彼此的世界更宽广', level: 'perfect' },
    { type: 'ISTP', label: '冒险搭档', desc: '一起探索世界，享受动手的乐趣', level: 'good' },
    { type: 'ENTP', label: '冒险搭档', desc: '一起探索未知，享受思维的冒险', level: 'balanced' },
    { type: 'INFJ', label: '互补挑战', desc: '学会深度思考，发现内心的深度', level: 'balanced' },
    { type: 'ESFP', label: '快乐搭档', desc: '一起享受生活，活在当下', level: 'good' },
    { type: 'ESTJ', label: '行动同盟', desc: '一起行动，把事情做成', level: 'good' },
  ],
  ESFP: [
    { type: 'ISTJ', label: '灵魂伴侣', desc: 'ESFP的活力与ISTJ的稳重，让彼此的生活更完整', level: 'perfect' },
    { type: 'ESTP', label: '快乐搭档', desc: '一起享受生活，活在当下', level: 'good' },
    { type: 'ENFP', label: '快乐加倍', desc: '一起享受生活每一刻，自由奔放', level: 'good' },
    { type: 'INTJ', label: '互补挑战', desc: '学会规划未来，发现深度思考的价值', level: 'balanced' },
    { type: 'ESFJ', label: '快乐搭档', desc: '一起享受生活，传递快乐', level: 'good' },
    { type: 'ISFP', label: '艺术搭档', desc: '一起感受美，创造美', level: 'good' },
  ],
};

// 获取某类型的关系数据
export function getRelations(typeCode: string): Relation[] {
  return typeRelations[typeCode] || [];
}

// 根据关系等级获取颜色
export function getRelationLevelColor(level: string): string {
  const colors: Record<string, string> = {
    perfect: '#D4A574',
    good: '#7B9AAF',
    balanced: '#9B8EC4',
    challenge: '#C4908E',
  };
  return colors[level] || '#2D2A26';
}

// 根据关系等级获取标签
export function getRelationLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    perfect: '灵魂伴侣',
    good: '知己搭档',
    balanced: '互补成长',
    challenge: '挑战启发',
  };
  return labels[level] || '';
}