'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { getMBTIType, type MBTIType } from '@/data/mbti-types';

function ResultContent() {
  const searchParams = useSearchParams();
  const typeCode = searchParams.get('type') || 'INTJ';
  const [mbtiType, setMbtiType] = useState<MBTIType | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMbtiType(getMBTIType(typeCode));
    setMounted(true);
  }, [typeCode]);

  if (!mbtiType) return null;

  return (
    <main className="min-h-screen bg-[#FAF9F6] py-12 px-6">
      <div
        className={`max-w-3xl mx-auto transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* 结果头部 */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ backgroundColor: mbtiType.color + '15' }}
          >
            <span className="text-4xl">{mbtiType.emoji}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#2D2A26] mb-3 tracking-tight">
            {mbtiType.code}
          </h1>
          <p
            className="text-xl font-medium mb-2"
            style={{ color: mbtiType.color }}
          >
            {mbtiType.nickname}
          </p>
          <p className="text-[#2D2A26]/60 text-lg">{mbtiType.title}</p>
        </div>

        {/* 描述 */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-[#2D2A26]/5">
          <h2 className="text-lg font-semibold text-[#2D2A26] mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full" style={{ backgroundColor: mbtiType.color }} />
            性格特征
          </h2>
          <p className="text-[#2D2A26]/70 leading-relaxed text-lg">
            {mbtiType.description}
          </p>
        </div>

        {/* 优势与成长 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-[#2D2A26]/5">
            <h3 className="text-base font-semibold text-[#2D2A26] mb-4 flex items-center gap-2">
              <span className="text-lg">💪</span>
              你的优势
            </h3>
            <ul className="space-y-2">
              {mbtiType.strengths.map((s, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-[#2D2A26]/70"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: mbtiType.color }}
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-[#2D2A26]/5">
            <h3 className="text-base font-semibold text-[#2D2A26] mb-4 flex items-center gap-2">
              <span className="text-lg">🌱</span>
              成长方向
            </h3>
            <ul className="space-y-2">
              {mbtiType.weaknesses.map((w, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-[#2D2A26]/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D2A26]/20" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 适合的职业 */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-[#2D2A26]/5">
          <h2 className="text-lg font-semibold text-[#2D2A26] mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full" style={{ backgroundColor: mbtiType.color }} />
            适合的职业方向
          </h2>
          <div className="flex flex-wrap gap-3">
            {mbtiType.careers.map((career, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm border"
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

        {/* 代表人物 */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-[#2D2A26]/5">
          <h2 className="text-lg font-semibold text-[#2D2A26] mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full" style={{ backgroundColor: mbtiType.color }} />
            同类型的知名人物
          </h2>
          <div className="flex flex-wrap gap-3">
            {mbtiType.famousPeople.map((person, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm bg-[#2D2A26]/5 text-[#2D2A26]/70"
              >
                {person}
              </span>
            ))}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/test"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2D2A26] text-white rounded-full font-medium hover:bg-[#2D2A26]/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            重新测试
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/60 text-[#2D2A26] rounded-full font-medium border border-[#2D2A26]/10 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
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
          <div className="text-[#2D2A26]/50">加载中...</div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
