'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';

const APP_URL = 'https://d2eb77d3-85b6-4928-b987-808209b9c974.dev.coze.site';

export default function SharePage() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
    if (qrCanvasRef.current) {
      QRCode.toCanvas(qrCanvasRef.current, APP_URL, {
        width: 200,
        margin: 2,
        color: {
          dark: '#2D2A26',
          light: '#FAF9F6',
        },
      });
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(APP_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4">
      {/* 宣传卡片 */}
      <div className="w-full max-w-[400px] bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* 顶部装饰区 */}
        <div className="relative h-48 bg-gradient-to-br from-[#D4A574]/20 via-[#FAF9F6] to-[#7B9AAF]/10 overflow-hidden">
          {/* 装饰圆点 */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#D4A574]/10" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#7B9AAF]/10" />
          <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-[#C4908E]/10" />
          <div className="absolute top-4 right-20 w-8 h-8 rounded-full bg-[#9B8EC4]/10" />
          <div className="absolute bottom-12 right-12 w-12 h-12 rounded-full bg-[#7EA685]/10" />

          {/* 标题 */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <div className="text-[#2D2A26] text-xs tracking-[0.3em] mb-2 font-sans">
              DISCOVER YOURSELF
            </div>
            <h1 className="text-[#2D2A26] text-3xl font-bold tracking-tight">
              MBTI
              <span className="text-[#D4A574]"> 人格测试</span>
            </h1>
            <p className="text-[#2D2A26]/60 text-sm mt-2 max-w-[280px] leading-relaxed">
              30道题，发现真实的自己
            </p>
          </div>
        </div>

        {/* 主体内容 */}
        <div className="px-8 pb-8">
          {/* 二维码区域 */}
          <div className="flex justify-center -mt-12 mb-6">
            <div className="bg-white rounded-2xl shadow-md p-4">
              <canvas ref={qrCanvasRef} width={200} height={200} className="block" />
            </div>
          </div>

          {/* 扫码提示 */}
          <p className="text-center text-[#2D2A26]/50 text-xs mb-6">
            扫码或长按识别二维码，立即开始测试
          </p>

          {/* 特性介绍 */}
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

          {/* 按钮组 */}
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

          {/* 底部文字 */}
          <p className="text-center text-[#2D2A26]/30 text-xs mt-6">
            适合大一新生 · 舞蹈 · 视觉传达 · 环境设计
          </p>
        </div>
      </div>
    </div>
  );
}