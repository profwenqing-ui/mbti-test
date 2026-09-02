'use client';

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { getMBTIType, type MBTIType } from '@/data/mbti-types';
import { getRelations, getRelationLevelColor, getRelationLevelLabel } from '@/data/mbti-relations';
import html2canvas from 'html2canvas';

// 统计数据类型
interface StatsData {
  totalTests: number;
  typeCounts: Record<string, number>;
}

interface ScoreMap {
  e: number; i: number;
  s: number; n: number;
  t: number; f: number;
  j: number; p: number;
}

const STORAGE_KEY = 'mbti_stats';

function getStats(): StatsData {
  if (typeof window === 'undefined') return { totalTests: 0, typeCounts: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { totalTests: 0, typeCounts: {} };
  } catch {
    return { totalTests: 0, typeCounts: {} };
  }
}

function saveResult(typeCode: string) {
  const stats = getStats();
  stats.totalTests += 1;
  stats.typeCounts[typeCode] = (stats.typeCounts[typeCode] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

// 维度配置
const DIMENSIONS = [
  { key: 'EI', label: '能量来源', left: 'E 外向', right: 'I 内向', leftColor: '#C4908E', rightColor: '#C4908E' },
  { key: 'SN', label: '信息获取', left: 'S 实感', right: 'N 直觉', leftColor: '#7B9AAF', rightColor: '#7B9AAF' },
  { key: 'TF', label: '决策方式', left: 'T 理性', right: 'F 感性', leftColor: '#9B8EC4', rightColor: '#9B8EC4' },
  { key: 'JP', label: '生活态度', left: 'J 计划', right: 'P 灵活', leftColor: '#7EA685', rightColor: '#7EA685' },
];

function parseScoresFromURL(): ScoreMap {
  if (typeof window === 'undefined') {
    return { e: 0, i: 0, s: 0, n: 0, t: 0, f: 0, j: 0, p: 0 };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    e: Number(params.get('e')) || 0,
    i: Number(params.get('i')) || 0,
    s: Number(params.get('s')) || 0,
    n: Number(params.get('n')) || 0,
    t: Number(params.get('t')) || 0,
    f: Number(params.get('f')) || 0,
    j: Number(params.get('j')) || 0,
    p: Number(params.get('p')) || 0,
  };
}

function getTypeCodeFromURL(): string {
  if (typeof window === 'undefined') return 'INTJ';
  return new URLSearchParams(window.location.search).get('type') || 'INTJ';
}

function ResultContent() {
  const [typeCode, setTypeCode] = useState('INTJ');
  const [scores, setScores] = useState<ScoreMap>({ e: 0, i: 0, s: 0, n: 0, t: 0, f: 0, j: 0, p: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTypeCode(getTypeCodeFromURL());
    setScores(parseScoresFromURL());
    setMounted(true);
  }, []);

  const mbtiType = getMBTIType(typeCode);
  const [stats, setStats] = useState<StatsData>({ totalTests: 0, typeCounts: {} });
  const [selectedRelation, setSelectedRelation] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showRelations, setShowRelations] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mounted && typeCode) {
      saveResult(typeCode);
      setStats(getStats());
    }
  }, [mounted, typeCode]);

  const handleShare = useCallback(async () => {
    if (!shareCardRef.current) return;
    setCapturing(true);
    try {
      await new Promise((r) => setTimeout(r, 100));
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: '#FAF9F6',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
      });
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png', 1.0)
      );
      if (!blob) return;

      if (navigator.share && navigator.canShare) {
        const file = new File([blob], `MBTI-${typeCode}.png`, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: `我是${typeCode}型人格` });
          return;
        }
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MBTI-${typeCode}.png`;
      a.click();
      URL.revokeObjectURL(url);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (e) {
      console.error('截图分享失败', e);
    } finally {
      setCapturing(false);
    }
  }, [typeCode]);

  const relations = useMemo(() => getRelations(typeCode), [typeCode]);

  // 计算维度百分比
  const dimensionPercentages = useMemo(() => {
    const eiTotal = scores.e + scores.i;
    const snTotal = scores.s + scores.n;
    const tfTotal = scores.t + scores.f;
    const jpTotal = scores.j + scores.p;

    const typeChar = typeCode.split('');

    return [
      {
        key: 'EI',
        leftPercent: eiTotal > 0 ? Math.round((scores.e / eiTotal) * 100) : 50,
        rightPercent: eiTotal > 0 ? Math.round((scores.i / eiTotal) * 100) : 50,
        dominant: typeChar[0],
      },
      {
        key: 'SN',
        leftPercent: snTotal > 0 ? Math.round((scores.s / snTotal) * 100) : 50,
        rightPercent: snTotal > 0 ? Math.round((scores.n / snTotal) * 100) : 50,
        dominant: typeChar[1],
      },
      {
        key: 'TF',
        leftPercent: tfTotal > 0 ? Math.round((scores.t / tfTotal) * 100) : 50,
        rightPercent: tfTotal > 0 ? Math.round((scores.f / tfTotal) * 100) : 50,
        dominant: typeChar[2],
      },
      {
        key: 'JP',
        leftPercent: jpTotal > 0 ? Math.round((scores.j / jpTotal) * 100) : 50,
        rightPercent: jpTotal > 0 ? Math.round((scores.p / jpTotal) * 100) : 50,
        dominant: typeChar[3],
      },
    ];
  }, [scores, typeCode]);

  const getDimensionColor = (key: string) => {
    const dim = DIMENSIONS.find((d) => d.key === key);
    return dim?.leftColor || '#D4A574';
  };

  // 类型统计排序
  const sortedTypes = useMemo(
    () =>
      Object.entries(stats.typeCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 8),
    [stats]
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-[#2D2A26]/50 animate-pulse text-sm">加载中...</div>
      </div>
    );
  }

  if (!mbtiType) return null;

  const typeColor = mbtiType.color;
  const dominantTraits = mbtiType.strengths.slice(0, 4);

  // 获取维度倾向文本
  const getDimensionTendency = (dimKey: string, dominant: string) => {
    switch (dimKey) {
      case 'EI': return dominant === 'E' ? '外向 · 从社交中获取能量' : '内向 · 从独处中获取能量';
      case 'SN': return dominant === 'S' ? '实感 · 关注具体细节' : '直觉 · 关注整体模式';
      case 'TF': return dominant === 'T' ? '理性 · 以逻辑做决策' : '感性 · 以价值做决策';
      case 'JP': return dominant === 'J' ? '计划 · 喜欢有序安排' : '灵活 · 喜欢随性而为';
      default: return '';
    }
  };

  return (
    <>
      {/* 成功提示 Toast */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#2D2A26] text-white px-6 py-3 rounded-full text-sm shadow-lg animate-fade-in">
          已保存到相册 ✓
        </div>
      )}

      <main className="min-h-screen bg-[#FAF9F6] py-6 md:py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto transition-all duration-500" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(1.5rem)' }}>
          {/* ===== 顶部人格标识 ===== */}
          <div className="text-center mb-8 md:mb-12">
            {/* 形象图 */}
            <div className="relative mx-auto mb-4 md:mb-6 w-28 h-28 md:w-40 md:h-40">
              <div
                className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transition-all duration-500"
                style={{ backgroundColor: `${typeColor}15` }}
              >
                {!imgLoaded && (
                  <div className="w-full h-full flex items-center justify-center animate-pulse bg-[#2D2A26]/5">
                    <span className="text-[#2D2A26]/20 text-2xl">?</span>
                  </div>
                )}
                <img
                  src={`/mbti-${typeCode.toLowerCase()}.png`}
                  alt={typeCode}
                  className={`w-full h-full object-contain transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgLoaded(true)}
                />
              </div>
              {/* 类型角标 */}
              <div
                className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold shadow-md"
                style={{ backgroundColor: typeColor }}
              >
                {typeCode}
              </div>
            </div>

            {/* 标题 */}
            <h1 className="text-3xl md:text-5xl font-bold text-[#2D2A26] tracking-tight mb-2">
              {typeCode}
            </h1>
            <p className="text-lg md:text-xl font-medium" style={{ color: typeColor }}>
              {mbtiType.nickname}
            </p>
            {mbtiType.altNickname && (
              <p className="text-sm md:text-base text-[#2D2A26]/40 mt-1">
                又称「{mbtiType.altNickname}」
              </p>
            )}
            <p className="text-sm md:text-base text-[#2D2A26]/50 mt-2 max-w-md mx-auto leading-relaxed">
              {mbtiType.title}
            </p>
          </div>

          {/* ===== 性格描述 ===== */}
          <section className="mb-6 md:mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-[#2D2A26]/5">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1 h-4 md:h-5 rounded-full bg-[#D4A574]" />
                <h2 className="text-base md:text-lg font-semibold text-[#2D2A26]">性格特征</h2>
              </div>
              <p className="text-sm md:text-base text-[#2D2A26]/70 leading-relaxed whitespace-pre-line">
                {mbtiType.description}
              </p>
            </div>
          </section>

          {/* ===== 维度倾向分析 ===== */}
          <section className="mb-6 md:mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-[#2D2A26]/5">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1 h-4 md:h-5 rounded-full bg-[#D4A574]" />
                <h2 className="text-base md:text-lg font-semibold text-[#2D2A26]">维度倾向分析</h2>
              </div>
              <div className="space-y-4 md:space-y-5">
                {dimensionPercentages.map((dim) => {
                  const dimColor = getDimensionColor(dim.key);
                  const dimConfig = DIMENSIONS.find((d) => d.key === dim.key)!;
                  return (
                    <div key={dim.key}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs md:text-sm font-medium text-[#2D2A26]/60">{dimConfig.label}</span>
                        <span className="text-xs text-[#2D2A26]/40">{dim.leftPercent}% - {dim.rightPercent}%</span>
                      </div>
                      <div className="relative h-6 md:h-7 bg-[#2D2A26]/5 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                          style={{ width: `${dim.leftPercent}%`, backgroundColor: dim.dominant === dimConfig.left[0] ? dimColor : `${dimColor}40` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-medium">
                          <span style={{ color: dim.leftPercent > 50 ? '#fff' : dimColor }}>{dimConfig.left}</span>
                          <span style={{ color: dim.rightPercent > 50 ? '#fff' : dimColor }}>{dimConfig.right}</span>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-[#2D2A26]/50 mt-1">
                        {getDimensionTendency(dim.key, dim.dominant)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ===== 优势与成长 ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <section>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-[#2D2A26]/5 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg">✨</span>
                  <h2 className="text-base md:text-lg font-semibold text-[#2D2A26]">优势</h2>
                </div>
                <ul className="space-y-2">
                  {mbtiType.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm md:text-base text-[#2D2A26]/70">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: typeColor }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-[#2D2A26]/5 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg">🌱</span>
                  <h2 className="text-base md:text-lg font-semibold text-[#2D2A26]">成长方向</h2>
                </div>
                <ul className="space-y-2">
                  {mbtiType.weaknesses.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm md:text-base text-[#2D2A26]/70">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: typeColor }} />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* ===== 适合职业 ===== */}
          <section className="mb-6 md:mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-[#2D2A26]/5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg">💼</span>
                <h2 className="text-base md:text-lg font-semibold text-[#2D2A26]">适合职业</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {mbtiType.careers.map((c, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs md:text-sm font-medium"
                    style={{ backgroundColor: `${typeColor}15`, color: typeColor }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ===== 代表人物 ===== */}
          <section className="mb-6 md:mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-[#2D2A26]/5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg">👤</span>
                <h2 className="text-base md:text-lg font-semibold text-[#2D2A26]">代表人物</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {mbtiType.famousPeople.map((f, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs md:text-sm bg-[#2D2A26]/5 text-[#2D2A26]/70"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ===== 人格关系图谱 ===== */}
          <section className="mb-6 md:mb-8">
            <button
              onClick={() => setShowRelations(!showRelations)}
              className="w-full bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-[#2D2A26]/5 text-left transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🔮</span>
                  <h2 className="text-base md:text-lg font-semibold text-[#2D2A26]">人格关系图谱</h2>
                </div>
                <svg
                  className={`w-5 h-5 text-[#2D2A26]/40 transition-transform duration-300 ${showRelations ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-[#2D2A26]/40 mt-2">点击展开 · 探索你的类型与其他类型的关系</p>
            </button>
            {showRelations && (
              <div className="mt-2 bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-[#2D2A26]/5 animate-fade-in">
                {/* 图例 */}
                <div className="flex flex-wrap gap-3 md:gap-4 mb-5 pb-4 border-b border-[#2D2A26]/5">
                  {[
                    { level: 'perfect', label: '灵魂伴侣', color: '#C4908E' },
                    { level: 'good', label: '知己搭档', color: '#7B9AAF' },
                    { level: 'balanced', label: '互补成长', color: '#7EA685' },
                    { level: 'challenge', label: '挑战启发', color: '#9B8EC4' },
                  ].map((item) => (
                    <div key={item.level} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-[#2D2A26]/50">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relations.map((rel) => {
                    const relType = getMBTIType(rel.type);
                    const levelColor = getRelationLevelColor(rel.level);
                    const levelLabel = getRelationLevelLabel(rel.level);
                    const isSelected = selectedRelation === rel.type;
                    return (
                      <div key={rel.type}>
                        <button
                          onClick={() => setSelectedRelation(isSelected ? null : rel.type)}
                          className="w-full text-left p-3.5 md:p-4 rounded-xl border transition-all duration-200 hover:shadow-sm active:scale-[0.98]"
                          style={{
                            borderColor: isSelected ? levelColor : `${levelColor}30`,
                            backgroundColor: isSelected ? `${levelColor}08` : 'transparent',
                          }}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm md:text-base text-[#2D2A26]">{rel.type}</span>
                              <span className="text-xs text-[#2D2A26]/50">{relType?.nickname || ''}</span>
                            </div>
                            <span
                              className="text-[10px] md:text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ backgroundColor: `${levelColor}20`, color: levelColor }}
                            >
                              {levelLabel}
                            </span>
                          </div>
                          {isSelected && rel.desc && (
                            <p className="text-xs md:text-sm text-[#2D2A26]/60 mt-2 leading-relaxed border-t border-[#2D2A26]/5 pt-2">
                              {rel.desc}
                            </p>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* ===== 测试数据统计 ===== */}
          <section className="mb-6 md:mb-8">
            <button
              onClick={() => setShowStats(!showStats)}
              className="w-full bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-[#2D2A26]/5 text-left transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">📊</span>
                  <h2 className="text-base md:text-lg font-semibold text-[#2D2A26]">测试数据统计</h2>
                </div>
                <svg
                  className={`w-5 h-5 text-[#2D2A26]/40 transition-transform duration-300 ${showStats ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-[#2D2A26]/40 mt-2">点击展开 · 查看累计测试数据</p>
            </button>
            {showStats && (
              <div className="mt-2 bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-[#2D2A26]/5 animate-fade-in">
                <div className="text-center mb-5">
                  <span className="text-2xl md:text-3xl font-bold text-[#2D2A26]">{stats.totalTests}</span>
                  <span className="text-sm md:text-base text-[#2D2A26]/50 ml-2">人次已完成测试</span>
                </div>
                {sortedTypes.length > 0 ? (
                  <div className="space-y-3">
                    {sortedTypes.map(([type, count], idx) => {
                      const pct = stats.totalTests > 0 ? Math.round((count / stats.totalTests) * 100) : 0;
                      const t = getMBTIType(type);
                      const isActive = type === typeCode;
                      return (
                        <div key={type} className="flex items-center gap-3">
                          <span className="w-5 text-xs text-[#2D2A26]/40 text-right flex-shrink-0">{idx + 1}</span>
                          <div className="flex items-center gap-2 w-16 md:w-20 flex-shrink-0">
                            <span
                              className={`text-xs md:text-sm font-bold ${isActive ? 'text-[#2D2A26]' : 'text-[#2D2A26]/60'}`}
                              style={isActive ? { color: typeColor } : {}}
                            >
                              {type}
                            </span>
                            <span className="text-[10px] md:text-xs text-[#2D2A26]/40 truncate">{t?.nickname || ''}</span>
                          </div>
                          <div className="flex-1 h-4 md:h-5 bg-[#2D2A26]/5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${pct}%`, backgroundColor: isActive ? typeColor : '#D4A57460' }}
                            />
                          </div>
                          <span className="w-10 text-right text-xs md:text-sm text-[#2D2A26]/50 flex-shrink-0">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-sm text-[#2D2A26]/40">暂无数据，快来第一个测试吧！</p>
                )}
              </div>
            )}
          </section>

          {/* ===== 操作按钮 ===== */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pb-4 md:pb-0">
            <button
              onClick={handleShare}
              disabled={capturing}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 md:px-6 md:py-3.5 bg-[#D4A574] text-white rounded-full text-sm md:text-base font-medium hover:bg-[#D4A574]/90 active:scale-[0.97] hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              {capturing ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  生成中...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  一键截图分享
                </>
              )}
            </button>
            <Link
              href="/test"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 md:px-6 md:py-3.5 bg-[#2D2A26] text-white rounded-full text-sm md:text-base font-medium hover:bg-[#2D2A26]/90 active:scale-[0.97] hover:shadow-lg transition-all duration-200"
            >
              重新测试
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 md:px-6 md:py-3.5 bg-white/60 text-[#2D2A26] rounded-full text-sm md:text-base font-medium border border-[#2D2A26]/10 hover:bg-white active:scale-[0.97] hover:shadow-md transition-all duration-200"
            >
              返回首页
            </Link>
          </div>
        </div>

        {/* ===== 隐藏的分享卡片 (用于截图) ===== */}
        <div ref={shareCardRef} className="fixed -left-[9999px] top-0">
          <div className="w-[375px] bg-[#FAF9F6] p-8 rounded-3xl" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {/* 装饰 */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: typeColor }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${typeColor}60` }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${typeColor}30` }} />
              <span className="ml-auto text-[10px] text-[#2D2A26]/30 tracking-widest uppercase">16Personality</span>
            </div>

            {/* 头像 */}
            <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden shadow-md" style={{ backgroundColor: `${typeColor}15` }}>
              <img
                src={`/mbti-${typeCode.toLowerCase()}.png`}
                alt={typeCode}
                className="w-full h-full object-contain"
              />
            </div>

            {/* 类型 */}
            <div className="text-center mb-4">
              <h2 className="text-5xl font-bold text-[#2D2A26] tracking-tight mb-1">{typeCode}</h2>
              <p className="text-lg font-medium" style={{ color: typeColor }}>{mbtiType.nickname}</p>
              {mbtiType.altNickname && (
                <p className="text-sm text-[#2D2A26]/40 mt-1">又称「{mbtiType.altNickname}」</p>
              )}
              <p className="text-sm text-[#2D2A26]/50 mt-2 leading-relaxed px-4">{mbtiType.title}</p>
            </div>

            {/* 分隔线 */}
            <div className="border-t border-[#2D2A26]/10 my-4" />

            {/* 特征摘要 */}
            <div className="mb-4">
              <p className="text-xs text-[#2D2A26]/60 font-medium mb-2">性格特征</p>
              <div className="flex flex-wrap gap-1.5">
                {dominantTraits.map((trait, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${typeColor}12`, color: typeColor }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* 维度倾向简表 */}
            <div className="space-y-2.5 mb-4">
              {dimensionPercentages.map((dim) => {
                const dimConfig = DIMENSIONS.find((d) => d.key === dim.key)!;
                return (
                  <div key={dim.key}>
                    <div className="flex justify-between text-[10px] text-[#2D2A26]/40 mb-1">
                      <span>{dimConfig.label}</span>
                    </div>
                    <div className="h-2 bg-[#2D2A26]/8 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${dim.leftPercent}%`, backgroundColor: typeColor }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 底部 */}
            <div className="text-center text-[10px] text-[#2D2A26]/25 pt-4 border-t border-[#2D2A26]/8">
              扫码测试 · 发现你的性格类型
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function ResultPage() {
  return <ResultContent />;
}