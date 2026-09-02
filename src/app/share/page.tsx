'use client';

import { useState } from 'react';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';

const APP_URL = 'https://d2eb77d3-85b6-4928-b987-808209b9c974.dev.coze.site';

export default function SharePage() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(APP_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = APP_URL;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MBTI 16型人格测试',
          text: '来测测你的MBTI人格类型，发现真实的自己！',
          url: APP_URL,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4">
      {/* 宣传卡片 */}
      <div className="w-full max-w-[400px] bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* 顶部装饰区 - 简约设计，不遮挡下方内容 */}
        <div className="relative h-32 bg-gradient-to-br from-[#D4A574]/15 via-[#FAF9F6] to-[#7B9AAF]/5 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#D4A574]/10" />
          <div className="absolute top-6 left-10 w-12 h-12 rounded-full bg-[#C4908E]/8" />
          <div className="absolute top-3 right-28 w-5 h-5 rounded-full bg-[#7EA685]/8" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <div className="text-[#2D2A26] text-[10px] tracking-[0.3em] mb-1 font-sans">
              DISCOVER YOURSELF
            </div>
            <h1 className="text-[#2D2A26] text-3xl font-bold tracking-tight">
              MBTI
              <span className="text-[#D4A574]"> 人格测试</span>
            </h1>
            <p className="text-[#2D2A26]/60 text-xs mt-1">
              30道题，发现真实的自己
            </p>
          </div>
        </div>

        <div className="px-8 pb-8">
          {/* 二维码区域 - 独立卡片，不重叠 */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-2xl shadow-md p-5">
              <QRCodeCanvas
                value={APP_URL}
                size={180}
                bgColor="#FAF9F6"
                fgColor="#2D2A26"
                level="M"
                includeMargin={false}
                className="block"
              />
            </div>
          </div>

          <p className="text-center text-[#2D2A26]/50 text-xs mb-6">
            扫码或长按识别二维码，立即开始测试
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF9F6]">
              <div className="w-8 h-8 rounded-full bg-[#D4A574]/15 flex items-center justify-center text-sm flex-shrink-0">
                🧠
              </div>
              <div>
                <div className="text-[#2D2A26] text-sm font-medium">30道精选题</div>
                <div className="text-[#2D2A26]/50 text-xs">覆盖4大维度，科学解析你的性格</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF9F6]">
              <div className="w-8 h-8 rounded-full bg-[#7B9AAF]/15 flex items-center justify-center text-sm flex-shrink-0">
                📊
              </div>
              <div>
                <div className="text-[#2D2A26] text-sm font-medium">深度人格分析</div>
                <div className="text-[#2D2A26]/50 text-xs">优势、成长方向、适合职业全解析</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF9F6]">
              <div className="w-8 h-8 rounded-full bg-[#C4908E]/15 flex items-center justify-center text-sm flex-shrink-0">
                📸
              </div>
              <div>
                <div className="text-[#2D2A26] text-sm font-medium">一键分享</div>
                <div className="text-[#2D2A26]/50 text-xs">生成精美卡片，分享到朋友圈</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full py-3.5 rounded-xl bg-[#2D2A26] text-white text-center text-sm font-medium
                         hover:bg-[#2D2A26]/90 transition-all duration-300 active:scale-[0.98]"
            >
              开始测试 →
            </Link>
            <button
              onClick={handleShare}
              className="w-full py-3 rounded-xl border border-[#D4A574]/30 text-[#D4A574] text-sm font-medium
                         hover:bg-[#D4A574]/5 transition-all duration-300 active:scale-[0.98]"
            >
              {copied ? '✅ 链接已复制！' : '📤 分享给好友'}
            </button>
          </div>

          <p className="text-center text-[#2D2A26]/30 text-xs mt-6">
            适合大一新生 · 舞蹈 · 视觉传达 · 环境设计
          </p>
        </div>
      </div>
    </div>
  );
}