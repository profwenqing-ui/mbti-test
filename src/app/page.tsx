'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-4 py-8 md:p-6">
      <div
        className={`max-w-2xl w-full text-center transition-all duration-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* 装饰元素 */}
        <div className="mb-6 md:mb-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#D4A574]/20 to-[#9B8EC4]/20 flex items-center justify-center">
              <span className="text-3xl md:text-4xl">✨</span>
            </div>
            <div className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#C4908E]/30 animate-pulse" />
            <div className="absolute -bottom-1 -left-3 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#7B9AAF]/30 animate-pulse delay-300" />
          </div>
        </div>

        {/* 标题 */}
        <h1 className="text-3xl md:text-5xl font-bold text-[#2D2A26] mb-3 md:mb-4 tracking-tight">
          MBTI 人格测试
        </h1>
        <p className="text-base md:text-lg text-[#2D2A26]/60 mb-1 md:mb-2">
          探索你的性格密码
        </p>
        <p className="text-xs md:text-sm text-[#2D2A26]/40 mb-8 md:mb-12 max-w-md mx-auto leading-relaxed px-2 md:px-0">
          通过 30 道精心设计的题目，发现你的 MBTI 人格类型
          <br />
          了解你的思维方式、行为偏好与成长方向
        </p>

        {/* 维度说明 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-8 md:mb-12">
          {[
            { label: '能量来源', pair: 'E / I', color: '#C4908E' },
            { label: '信息获取', pair: 'S / N', color: '#7B9AAF' },
            { label: '决策方式', pair: 'T / F', color: '#9B8EC4' },
            { label: '生活态度', pair: 'J / P', color: '#7EA685' },
          ].map((item) => (
            <div
              key={item.pair}
              className="bg-white/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-[#2D2A26]/5 hover:shadow-md active:scale-[0.97] transition-all duration-200"
            >
              <div
                className="text-[10px] md:text-xs font-medium mb-0.5 md:mb-1"
                style={{ color: item.color }}
              >
                {item.label}
              </div>
              <div className="text-base md:text-lg font-semibold text-[#2D2A26]">
                {item.pair}
              </div>
            </div>
          ))}
        </div>

        {/* 开始按钮 */}
        <Link
          href="/test"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 bg-[#2D2A26] text-white rounded-full text-base md:text-lg font-medium hover:bg-[#2D2A26]/90 active:scale-[0.97] hover:shadow-lg transition-all duration-200"
        >
          开始测试
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
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

        <p className="mt-4 md:mt-6 text-[10px] md:text-xs text-[#2D2A26]/30">
          约需 5-8 分钟 · 共 30 题
        </p>

        <div className="mt-6 md:mt-8 pt-4 md:pt-5 border-t border-[#2D2A26]/5">
          <Link
            href="/share"
            className="inline-flex items-center gap-1.5 text-xs text-[#D4A574] hover:text-[#D4A574]/80 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            分享给好友
          </Link>
        </div>
      </div>
    </main>
  );
}
