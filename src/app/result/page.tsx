'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { getMBTIType, type MBTIType } from '@/data/mbti-types';
import { getRelations, getRelationLevelColor, getRelationLevelLabel } from '@/data/mbti-relations';

// 统计数据类型
interface StatsData {
  totalTests: number;
  typeCounts: Record<string, number>;
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

function ResultContent() {
  const searchParams = useSearchParams();
  const typeCode = searchParams.get('type') || 'INTJ';
  const scores = {
    e: Number(searchParams.get('e')) || 0,
    i: Number(searchParams.get('i')) || 0,
    s: Number(searchParams.get('s')) || 0,
    n: Number(searchParams.get('n')) || 0,
    t: Number(searchParams.get('t')) || 0,
    f: Number(searchParams.get('f')) || 0,
    j: Number(searchParams.get('j')) || 0,
    p: Number(searchParams.get('p')) || 0,
  };

  const mbtiType = getMBTIType(typeCode);
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<StatsData>({ totalTests: 0, typeCounts: {} });
  const [selectedRelation, setSelectedRelation] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showRelations, setShowRelations] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const relations = getRelations(typeCode);

  // 计算维度百分比
  const dimensionPercentages = (() => {
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
  })();

  useEffect(() => {
    saveResult(typeCode);
    setStats(getStats());
    setMounted(true);
  }, [typeCode]);

  if (!mbtiType) return null;

  // 类型统计排序
  const sortedTypes = Object.entries(stats.typeCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  return (
    <main className="min-h-screen bg-[#FAF9F6] py-6 md:py-12 px-4 md:px-6">
      <div
        className={`max-w-3xl mx-auto transition-all duration-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* ===== 结果头部 ===== */}
        <div className="text-center mb-8 md:mb-12">
          {/* 形象图 - 手机端更小 */}
          <div className="relative w-28 h-28 md:w-40 md:h-40 mx-auto mb-4 md:mb-6 rounded-2xl overflow-hidden shadow-lg"
            style={{ backgroundColor: mbtiType.color + '15' }}
          >
            <img
              src={mbtiType.imageUrl}
              alt={mbtiType.code}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="eager"
              onLoad={() => setImgLoaded(true)}
              sizes="(max-width: 768px) 112px, 160px"
            />
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl md:text-4xl">{mbtiType.emoji}</span>
              </div>
            )}
            <div
              className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{ backgroundColor: mbtiType.color + '60' }}
            >
              <span className="text-sm md:text-lg">{mbtiType.emoji}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#2D2A26] mb-1 md:mb-2 tracking-tight">
            {mbtiType.code}
          </h1>
          <p
            className="text-lg md:text-xl font-medium mb-1"
            style={{ color: mbtiType.color }}
          >
            {mbtiType.nickname}
          </p>
          <p className="text-xs md:text-sm text-[#2D2A26]/40 mb-2 md:mb-3">
            又称「{mbtiType.altNickname}」
          </p>
          <p className="text-sm md:text-lg text-[#2D2A26]/60 px-2">{mbtiType.title}</p>
        </div>

        {/* ===== 维度得分可视化 ===== */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 mb-5 md:mb-8 border border-[#2D2A26]/5">
          <h2 className="text-base md:text-lg font-semibold text-[#2D2A26] mb-4 md:mb-6 flex items-center gap-2">
            <span className="w-1 h-4 md:h-5 rounded-full bg-[#D4A574]" />
            维度倾向分析
          </h2>
          <div className="space-y-3 md:space-y-5">
            {dimensionPercentages.map((dim) => {
              const config = DIMENSIONS.find((d) => d.key === dim.key)!;
              const isLeftDominant = dim.dominant === config.key[0];
              const leftPct = isLeftDominant ? Math.max(dim.leftPercent, 52) : Math.min(dim.leftPercent, 48);
              const rightPct = isLeftDominant ? Math.min(dim.rightPercent, 48) : Math.max(dim.rightPercent, 52);

              return (
                <div key={dim.key}>
                  <div className="flex justify-between text-xs text-[#2D2A26]/50 mb-1">
                    <span style={{ color: config.leftColor }}>{config.left}</span>
                    <span style={{ color: config.rightColor }}>{config.right}</span>
                  </div>
                  <div className="relative h-6 md:h-8 bg-[#2D2A26]/5 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full rounded-l-full transition-all duration-700 ease-out"
                      style={{
                        width: `${leftPct}%`,
                        backgroundColor: config.leftColor + '40',
                      }}
                    />
                    <div
                      className="absolute right-0 top-0 h-full rounded-r-full transition-all duration-700 ease-out"
                      style={{
                        width: `${rightPct}%`,
                        backgroundColor: config.rightColor + '40',
                      }}
                    />
                    <div
                      className="absolute top-0 h-full w-0.5 md:w-1 rounded-full transition-all duration-700 ease-out"
                      style={{
                        left: `${leftPct}%`,
                        backgroundColor: isLeftDominant ? config.leftColor : config.rightColor,
                        boxShadow: '0 0 4px rgba(0,0,0,0.1)',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-3 md:px-4 text-xs md:text-sm font-medium">
                      <span style={{ color: config.leftColor, opacity: leftPct > 30 ? 1 : 0.5 }}>
                        {isLeftDominant ? `${leftPct}%` : ''}
                      </span>
                      <span className="text-[#2D2A26] text-xs font-bold">{dim.dominant}</span>
                      <span style={{ color: config.rightColor, opacity: rightPct > 30 ? 1 : 0.5 }}>
                        {!isLeftDominant ? `${rightPct}%` : ''}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== 性格特征 ===== */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 mb-5 md:mb-8 border border-[#2D2A26]/5">
          <h2 className="text-base md:text-lg font-semibold text-[#2D2A26] mb-3 md:mb-4 flex items-center gap-2">
            <span className="w-1 h-4 md:h-5 rounded-full" style={{ backgroundColor: mbtiType.color }} />
            性格特征
          </h2>
          <p className="text-sm md:text-lg text-[#2D2A26]/70 leading-relaxed">
            {mbtiType.description}
          </p>
        </div>

        {/* ===== 优势与成长 ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5 md:mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-6 border border-[#2D2A26]/5">
            <h3 className="text-sm md:text-base font-semibold text-[#2D2A26] mb-3 md:mb-4 flex items-center gap-2">
              <span className="text-base md:text-lg">💪</span>
              你的优势
            </h3>
            <ul className="space-y-1.5 md:space-y-2">
              {mbtiType.strengths.map((s, i) => (
                <li key={i} className="flex items-center gap-2 text-sm md:text-base text-[#2D2A26]/70">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: mbtiType.color }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-6 border border-[#2D2A26]/5">
            <h3 className="text-sm md:text-base font-semibold text-[#2D2A26] mb-3 md:mb-4 flex items-center gap-2">
              <span className="text-base md:text-lg">🌱</span>
              成长方向
            </h3>
            <ul className="space-y-1.5 md:space-y-2">
              {mbtiType.weaknesses.map((w, i) => (
                <li key={i} className="flex items-center gap-2 text-sm md:text-base text-[#2D2A26]/70">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#2D2A26]/20" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== 适合的职业 ===== */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 mb-5 md:mb-8 border border-[#2D2A26]/5">
          <h2 className="text-base md:text-lg font-semibold text-[#2D2A26] mb-3 md:mb-4 flex items-center gap-2">
            <span className="w-1 h-4 md:h-5 rounded-full" style={{ backgroundColor: mbtiType.color }} />
            适合的职业方向
          </h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {mbtiType.careers.map((career, i) => (
              <span
                key={i}
                className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm border"
                style={{
                  borderColor: mbtiType.color + '30',
                  color: mbtiType.color,
                  backgroundColor: mbtiType.color + '08',
                }}
              >
                {career}
              </span>
            ))}
          </div>
        </div>

        {/* ===== 代表人物 ===== */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 mb-5 md:mb-8 border border-[#2D2A26]/5">
          <h2 className="text-base md:text-lg font-semibold text-[#2D2A26] mb-3 md:mb-4 flex items-center gap-2">
            <span className="w-1 h-4 md:h-5 rounded-full" style={{ backgroundColor: mbtiType.color }} />
            同类型的知名人物
          </h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {mbtiType.famousPeople.map((person, i) => (
              <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm bg-[#2D2A26]/5 text-[#2D2A26]/70">
                {person}
              </span>
            ))}
          </div>
        </div>

        {/* ===== 趣味交互：人格关系图谱 ===== */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 mb-5 md:mb-8 border border-[#2D2A26]/5">
          <button
            onClick={() => setShowRelations(!showRelations)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="text-base md:text-lg font-semibold text-[#2D2A26] flex items-center gap-2">
              <span className="w-1 h-4 md:h-5 rounded-full bg-[#D4A574]" />
              人格关系图谱
            </h2>
            <span className={`text-[#2D2A26]/30 transition-transform duration-300 ${showRelations ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          {showRelations && (
            <div className="mt-4 md:mt-6 space-y-3 md:space-y-4 animate-in fade-in duration-300">
              <p className="text-xs md:text-sm text-[#2D2A26]/50 mb-3 md:mb-4">
                看看你的性格类型与其他类型有哪些奇妙关系？
              </p>

              <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6 text-xs">
                {[
                  { level: 'perfect', label: '灵魂伴侣' },
                  { level: 'good', label: '知己搭档' },
                  { level: 'balanced', label: '互补成长' },
                  { level: 'challenge', label: '挑战启发' },
                ].map((item) => (
                  <div key={item.level} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: getRelationLevelColor(item.level) }} />
                    <span className="text-[#2D2A26]/60 text-xs">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                {relations.map((rel) => {
                  const isSelected = selectedRelation === rel.type;
                  const relType = getMBTIType(rel.type);
                  return (
                    <div
                      key={rel.type}
                      onClick={() => setSelectedRelation(isSelected ? null : rel.type)}
                      className="p-3 md:p-4 rounded-xl md:rounded-2xl border cursor-pointer transition-all duration-200 active:scale-[0.98]"
                      style={{
                        borderColor: isSelected
                          ? getRelationLevelColor(rel.level)
                          : '#2D2A26' + '10',
                        backgroundColor: isSelected
                          ? getRelationLevelColor(rel.level) + '08'
                          : 'transparent',
                      }}
                    >
                      <div className="flex items-center gap-2 md:gap-3 mb-1">
                        <span className="text-xl md:text-2xl">{relType.emoji}</span>
                        <div className="min-w-0">
                          <div className="text-sm md:text-base font-semibold text-[#2D2A26] truncate">
                            {rel.type} {relType.nickname}
                          </div>
                          <span
                            className="text-xs font-medium"
                            style={{ color: getRelationLevelColor(rel.level) }}
                          >
                            {rel.label}
                          </span>
                        </div>
                        <span
                          className="ml-auto w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: getRelationLevelColor(rel.level) }}
                        />
                      </div>
                      {isSelected && (
                        <p className="text-xs md:text-sm text-[#2D2A26]/60 mt-2 pl-9 md:pl-11 animate-in fade-in duration-200">
                          {rel.desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ===== 数据统计 ===== */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 mb-5 md:mb-8 border border-[#2D2A26]/5">
          <button
            onClick={() => setShowStats(!showStats)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="text-base md:text-lg font-semibold text-[#2D2A26] flex items-center gap-2">
              <span className="w-1 h-4 md:h-5 rounded-full bg-[#D4A574]" />
              📊 测试数据统计
            </h2>
            <span className={`text-[#2D2A26]/30 transition-transform duration-300 ${showStats ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          {showStats && (
            <div className="mt-4 md:mt-6 animate-in fade-in duration-300">
              <div className="text-center mb-4 md:mb-6">
                <div className="text-2xl md:text-3xl font-bold text-[#2D2A26]">{stats.totalTests}</div>
                <div className="text-xs md:text-sm text-[#2D2A26]/50">累计测试人数</div>
              </div>

              {sortedTypes.length > 0 && (
                <div className="space-y-2 md:space-y-3">
                  {sortedTypes.map(([type, count]) => {
                    const t = getMBTIType(type);
                    const pct = stats.totalTests > 0
                      ? Math.round((count / stats.totalTests) * 100)
                      : 0;
                    return (
                      <div key={type} className="flex items-center gap-2 md:gap-3">
                        <span className="text-sm md:text-base w-6 md:w-8 text-center">{t.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between text-xs mb-0.5 md:mb-1">
                            <span className="text-[#2D2A26] font-medium text-xs md:text-sm">{type}</span>
                            <span className="text-[#2D2A26]/50 text-xs">{count}人 ({pct}%)</span>
                          </div>
                          <div className="h-1.5 md:h-2 bg-[#2D2A26]/5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: t.color,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {sortedTypes.length === 0 && (
                <p className="text-center text-xs md:text-sm text-[#2D2A26]/40">
                  还没有统计数据，快来成为第一个测试者吧！
                </p>
              )}

              <p className="mt-3 md:mt-4 text-xs text-[#2D2A26]/30 text-center">
                * 数据仅保存在本地浏览器中
              </p>
            </div>
          )}
        </div>

        {/* ===== 操作按钮 ===== */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pb-4 md:pb-0">
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
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
          <div className="text-[#2D2A26]/50 animate-pulse text-sm">加载中...</div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}