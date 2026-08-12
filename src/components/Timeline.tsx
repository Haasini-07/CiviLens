import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  Legend,
  Area,
  AreaChart,
} from 'recharts';

interface TrendData {
  month: string;
  responseDays: number;
  filed: number;
  answered: number;
}

const tooltipStyle = {
  borderRadius: '0.75rem',
  border: '1px solid #E2E8F0',
  boxShadow: '0 10px 30px -10px rgba(15,23,42,0.18)',
  fontSize: '0.8125rem',
  padding: '0.625rem 0.875rem',
};

const labelStyle = {
  color: '#64748B',
  fontWeight: 600,
  marginBottom: '0.25rem',
};

export function ResponseTrendChart({ data }: { data: TrendData[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="respGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
        <RTooltip contentStyle={tooltipStyle} labelStyle={labelStyle} />
        <Area
          type="monotone"
          dataKey="responseDays"
          name="Avg response (days)"
          stroke="#2563EB"
          strokeWidth={2.5}
          fill="url(#respGrad)"
          dot={{ r: 3, fill: '#2563EB', strokeWidth: 0 }}
          activeDot={{ r: 5, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function FilingVolumeChart({ data }: { data: TrendData[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -16, bottom: 0 }} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
        <RTooltip contentStyle={tooltipStyle} labelStyle={labelStyle} cursor={{ fill: '#F8FAFC' }} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" iconSize={8} />
        <Bar dataKey="filed" name="Filed" fill="#BFDBFE" radius={[4, 4, 0, 0]} />
        <Bar dataKey="answered" name="Answered" fill="#2563EB" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MiniTrendChart({ data }: { data: TrendData[] }) {
  return (
    <ResponsiveContainer width="100%" height={60}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
        <Line
          type="monotone"
          dataKey="responseDays"
          stroke="#2563EB"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
