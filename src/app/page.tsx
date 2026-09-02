'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6">
      <div
        className={`max-w-2xl w-full text-center transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* 装饰元素 */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4A574]/20 to-[#9B8EC4]/20 flex items-center justify-center">
              <span className="text-4xl">✨</span>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#C4908E]/30 animate-pulse" />
            <div className="absolute -bottom-1 -left-3 w-4 h-4 rounded-full bg-[#7B9AAF]/30 animate-pulse delay-300" />
          </div>
        </div>

        {/* 标题 */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#2D2A26] mb-4 tracking-tight">
          MBTI 人格测试
        </h1>
        <p className="text-lg text-[#2D2A26]/60 mb-2">
          探索你的性格密码
        </p>
        <p className="text-sm text-[#2D2A26]/40 mb-12 max-w-md mx-auto leading-relaxed">
          通过 30 道精心设计的题目，发现你的 MBTI 人格类型
          <br />
          了解你的思维方式、行为偏好与成长方向
        </p>

        {/* 维度说明 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            { label: '能量来源', pair: 'E / I', color: '#C4908E' },
            { label: '信息获取', pair: 'S / N', color: '#7B9AAF' },
            { label: '决策方式', pair: 'T / F', color: '#9B8EC4' },
            { label: '生活态度', pair: 'J / P', color: '#7EA685' },
          ].map((item) => (
            <div
              key={item.pair}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#2D2A26]/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div
                className="text-xs font-medium mb-1"
                style={{ color: item.color }}
              >
                {item.label}
              </div>
              <div className="text-lg font-semibold text-[#2D2A26]">
                {item.pair}
              </div>
            </div>
          ))}
        </div>

        {/* 开始按钮 */}
        <Link
          href="/test"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D2A26] text-white rounded-full text-lg font-medium hover:bg-[#2D2A26]/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          开始测试
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>

        <p className="mt-6 text-xs text-[#2D2A26]/30">
          约需 5-8 分钟 · 共 30 题
        </p>
      </div>
    </main>
  );
}
