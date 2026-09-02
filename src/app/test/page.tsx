'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/data/mbti-questions';

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const isAnswered = answers[currentQuestion.id] !== undefined;

  const handleSelect = (value: string) => {
    if (animating) return;

    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setAnimating(true);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // 计算结果
        const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        Object.values({ ...answers, [currentQuestion.id]: value }).forEach(
          (v) => {
            scores[v as keyof typeof scores]++;
          }
        );

        const result =
          (scores.E >= scores.I ? 'E' : 'I') +
          (scores.S >= scores.N ? 'S' : 'N') +
          (scores.T >= scores.F ? 'T' : 'F') +
          (scores.J >= scores.P ? 'J' : 'P');

        router.push(`/result?type=${result}`);
      }
      setAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentIndex > 0 && !animating) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setAnimating(false);
      }, 200);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] flex flex-col">
      {/* 顶部进度条 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#2D2A26]/5">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#2D2A26]/50">
              {currentIndex + 1} / {questions.length}
            </span>
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="text-sm text-[#2D2A26]/50 hover:text-[#2D2A26] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← 上一题
            </button>
          </div>
          <div className="h-1.5 bg-[#2D2A26]/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D4A574] to-[#9B8EC4] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 题目内容 */}
      <div className="flex-1 flex items-center justify-center p-6 pt-28 pb-12">
        <div
          className={`max-w-xl w-full transition-all duration-300 ${
            mounted ? 'opacity-100' : 'opacity-0'
          } ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
        >
          {/* 维度标签 */}
          <div className="mb-4">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: getDimensionColor(currentQuestion.dimension) + '20',
                color: getDimensionColor(currentQuestion.dimension),
              }}
            >
              {getDimensionLabel(currentQuestion.dimension)}
            </span>
          </div>

          {/* 题目 */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-8 leading-relaxed">
            {currentQuestion.text}
          </h2>

          {/* 选项 */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === option.value;
              return (
                <button
                  key={index}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-0.5 ${
                    isSelected
                      ? 'border-[#D4A574] bg-[#D4A574]/5 shadow-md'
                      : 'border-[#2D2A26]/10 bg-white/60 hover:border-[#D4A574]/50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-[#D4A574] text-white'
                          : 'bg-[#2D2A26]/5 text-[#2D2A26]/50'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-[#2D2A26] text-lg leading-relaxed">
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#FAF9F6] to-transparent pt-8 pb-6 pointer-events-none">
        <p className="text-center text-xs text-[#2D2A26]/30">
          请根据第一直觉选择，没有对错之分
        </p>
      </div>
    </main>
  );
}

function getDimensionColor(dimension: string): string {
  const colors: Record<string, string> = {
    EI: '#C4908E',
    SN: '#7B9AAF',
    TF: '#9B8EC4',
    JP: '#7EA685',
  };
  return colors[dimension] || '#D4A574';
}

function getDimensionLabel(dimension: string): string {
  const labels: Record<string, string> = {
    EI: '能量来源',
    SN: '信息获取',
    TF: '决策方式',
    JP: '生活态度',
  };
  return labels[dimension] || '';
}
