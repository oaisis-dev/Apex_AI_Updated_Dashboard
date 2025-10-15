import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface KPICardProps {
  title: string;
  value: string;
  trend?: {
    direction: 'up' | 'down';
    value: string;
    label: string;
  };
  insight?: string;
  sources?: {
    name: string;
    logo: string;
  }[];
  type: 'radial' | 'sparkline' | 'dual-ring' | 'bar';
  data?: number[];
  currentValue?: number;
  targetValue?: number;
  color?: 'green' | 'blue' | 'purple';
}

export default function KPICard({
  title,
  value,
  trend,
  insight,
  sources = [],
  type,
  data = [],
  currentValue = 0,
  targetValue = 100,
  color = 'blue',
}: KPICardProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100);
  }, []);

  const colorMap = {
    green: {
      primary: '#00C48C',
      gradient: 'from-emerald-500 to-green-500',
      light: '#00C48C20',
      border: '#00C48C40',
    },
    blue: {
      primary: '#2A68FF',
      gradient: 'from-blue-500 to-cyan-500',
      light: '#2A68FF20',
      border: '#2A68FF40',
    },
    purple: {
      primary: '#8B5CF6',
      gradient: 'from-purple-500 to-pink-500',
      light: '#8B5CF640',
      border: '#8B5CF640',
    },
  };

  const colors = colorMap[color];
  const percentage = (currentValue / targetValue) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative w-full h-[160px] bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(42,104,255,0.12)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(180deg, ${colors.light} 0%, rgba(0,0,0,0) 100%)`,
        }}
      />

      {/* Animated data pulse */}
      <div className="absolute top-0 right-0 w-2 h-2 m-3">
        <motion.div
          className="w-2 h-2 rounded-full bg-blue-500"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative h-full p-5 flex flex-col">
        {/* Header with Title and Visualization */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs uppercase tracking-wider text-slate-500 mb-1.5">
              {title}
            </div>
            <div className="text-3xl text-slate-900">{value}</div>
          </div>

          {/* Visualization based on type */}
          <div className="ml-3 flex-shrink-0">
            {type === 'radial' && (
              <svg width="60" height="60" viewBox="0 0 60 60" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="30"
                  cy="30"
                  r="24"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="4"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="30"
                  cy="30"
                  r="24"
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 24}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                  animate={{
                    strokeDashoffset: animated ? 2 * Math.PI * 24 * (1 - percentage / 100) : 2 * Math.PI * 24,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
            )}

            {type === 'dual-ring' && (
              <svg width="60" height="60" viewBox="0 0 60 60" className="transform -rotate-90">
                {/* Outer ring - current */}
                <circle
                  cx="30"
                  cy="30"
                  r="24"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="30"
                  cy="30"
                  r="24"
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 24}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                  animate={{
                    strokeDashoffset: animated ? 2 * Math.PI * 24 * (1 - currentValue / 100) : 2 * Math.PI * 24,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                {/* Inner ring - target */}
                <circle
                  cx="30"
                  cy="30"
                  r="18"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="30"
                  cy="30"
                  r="18"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 18 }}
                  animate={{
                    strokeDashoffset: animated ? 2 * Math.PI * 18 * (1 - targetValue / 100) : 2 * Math.PI * 18,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                />
              </svg>
            )}

            {type === 'sparkline' && data.length > 0 && (
              <svg width="70" height="36" viewBox="0 0 70 36" className="opacity-80">
                <motion.path
                  d={generateSparklinePath(data, 70, 36)}
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: animated ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
            )}

            {type === 'bar' && data.length > 0 && (
              <div className="flex items-end gap-1 h-[48px]">
                {data.map((value, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 bg-gradient-to-t ${colors.gradient} rounded-t`}
                    initial={{ height: 0 }}
                    animate={{ height: animated ? `${(value / Math.max(...data)) * 100}%` : 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Trend Indicator */}
        {trend && (
          <div className="mb-2 flex-shrink-0">
            <div
              className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                trend.direction === 'up'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {trend.direction === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{trend.value}</span>
              <span className="text-slate-500">{trend.label}</span>
            </div>
          </div>
        )}

        {/* AI Insight */}
        {insight && (
          <div className="text-xs text-slate-600 italic mb-2 line-clamp-2 flex-shrink-0">
            <span className="text-blue-600 not-italic">AI Insight:</span> {insight}
          </div>
        )}

        {/* Data Sources */}
        {sources.length > 0 && (
          <div className="mt-auto pt-2 flex items-center gap-1.5 opacity-40 group-hover:opacity-60 transition-opacity flex-shrink-0">
            <span className="text-[10px] text-slate-500 uppercase tracking-wide whitespace-nowrap">Data from</span>
            {sources.map((source, index) => (
              <img
                key={index}
                src={source.logo}
                alt={source.name}
                className="h-3.5 w-auto object-contain flex-shrink-0"
                title={source.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 2px ${colors.border}`,
        }}
      />
    </motion.div>
  );
}

// Helper function to generate sparkline path
function generateSparklinePath(data: number[], width: number, height: number): string {
  if (data.length === 0) return '';

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  return `M ${points.join(' L ')}`;
}
