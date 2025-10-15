import { Users, Mail, TrendingUp, DollarSign, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const fundMetrics = {
  targetRaise: 25000000,
  raised: 19200000,
  softCommitments: 3500000,
  hardCommitments: 15700000,
};

const commitmentBreakdown = [
  { name: 'Hard Commitments', value: 15700000, color: '#3b82f6' },
  { name: 'Soft Commitments', value: 3500000, color: '#06b6d4' },
  { name: 'Remaining', value: 5800000, color: '#cbd5e1' },
];

const investorPipeline = [
  {
    id: 1,
    name: 'John Smith',
    company: 'Smith Family Office',
    stage: 'Hot',
    lastContact: '2 days ago',
    estimatedCommitment: 500000,
    probability: 'high',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    company: 'Johnson Investments',
    stage: 'Warm',
    lastContact: '1 week ago',
    estimatedCommitment: 750000,
    probability: 'medium',
  },
  {
    id: 3,
    name: 'Michael Chen',
    company: 'Chen Capital Partners',
    stage: 'Hot',
    lastContact: '3 days ago',
    estimatedCommitment: 1000000,
    probability: 'high',
  },
  {
    id: 4,
    name: 'Emily Davis',
    company: 'Davis Wealth Management',
    stage: 'Cold',
    lastContact: '3 weeks ago',
    estimatedCommitment: 300000,
    probability: 'low',
  },
  {
    id: 5,
    name: 'Robert Taylor',
    company: 'Taylor Holdings',
    stage: 'Warm',
    lastContact: '5 days ago',
    estimatedCommitment: 600000,
    probability: 'medium',
  },
];

const recentCommunications = [
  {
    id: 1,
    type: 'update',
    title: 'Investor Update: August 2025',
    recipients: 24,
    date: '3 days ago',
    status: 'sent',
  },
  {
    id: 2,
    type: 'inquiry',
    title: 'New investor inquiry received from John Smith',
    recipients: 1,
    date: '1 week ago',
    status: 'responded',
  },
  {
    id: 3,
    type: 'update',
    title: 'Q2 2025 Performance Report',
    recipients: 24,
    date: '2 weeks ago',
    status: 'sent',
  },
  {
    id: 4,
    type: 'meeting',
    title: 'Investment Committee Meeting Scheduled',
    recipients: 8,
    date: '3 weeks ago',
    status: 'completed',
  },
];

const quarterlyPerformance = [
  { quarter: 'Q1 2024', returns: 4.2 },
  { quarter: 'Q2 2024', returns: 5.1 },
  { quarter: 'Q3 2024', returns: 4.8 },
  { quarter: 'Q4 2024', returns: 5.5 },
  { quarter: 'Q1 2025', returns: 5.9 },
  { quarter: 'Q2 2025', returns: 6.2 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function InvestorRelationsTab() {
  const percentRaised = (fundMetrics.raised / fundMetrics.targetRaise) * 100;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-slate-900 mb-2">Capital Dashboard</h1>
        <p className="text-sm text-slate-600">Manage fundraising and investor communications</p>
      </div>

      {/* Fund Progress */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900">Fund I - Capital Raise Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm text-slate-600 mb-1">Total Raised</div>
                <div className="text-4xl text-slate-900">{formatCurrency(fundMetrics.raised)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-600 mb-1">Target</div>
                <div className="text-2xl text-slate-700">{formatCurrency(fundMetrics.targetRaise)}</div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Progress</span>
                <span className="text-2xl text-blue-600">{percentRaised.toFixed(1)}%</span>
              </div>
              <Progress value={percentRaised} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-sm text-slate-600 mb-1">Hard Commitments</div>
                <div className="text-xl text-blue-600">{formatCurrency(fundMetrics.hardCommitments)}</div>
              </div>
              <div className="p-4 rounded-lg bg-cyan-50 border border-cyan-100">
                <div className="text-sm text-slate-600 mb-1">Soft Commitments</div>
                <div className="text-xl text-cyan-600">{formatCurrency(fundMetrics.softCommitments)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commitment Breakdown Chart */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Commitment Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={commitmentBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {commitmentBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {commitmentBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-slate-600">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quarterly Performance */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Quarterly Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={quarterlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="quarter" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Bar dataKey="returns" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Investor Pipeline */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-900">Investor Pipeline</CardTitle>
            <Badge className="bg-blue-50 text-blue-600 border-blue-200">
              Synced from Cloze CRM
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 text-slate-600">Name</th>
                  <th className="text-left py-3 text-slate-600">Company</th>
                  <th className="text-center py-3 text-slate-600">Stage</th>
                  <th className="text-right py-3 text-slate-600">Est. Commitment</th>
                  <th className="text-right py-3 text-slate-600">Last Contact</th>
                  <th className="text-center py-3 text-slate-600">Probability</th>
                </tr>
              </thead>
              <tbody>
                {investorPipeline.map((investor) => (
                  <tr key={investor.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 text-slate-900">{investor.name}</td>
                    <td className="py-4 text-slate-700">{investor.company}</td>
                    <td className="text-center py-4">
                      <Badge
                        variant="secondary"
                        className={
                          investor.stage === 'Hot'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : investor.stage === 'Warm'
                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }
                      >
                        {investor.stage}
                      </Badge>
                    </td>
                    <td className="text-right py-4 text-green-600">{formatCurrency(investor.estimatedCommitment)}</td>
                    <td className="text-right py-4 text-slate-600">{investor.lastContact}</td>
                    <td className="text-center py-4">
                      <Badge
                        variant="secondary"
                        className={
                          investor.probability === 'high'
                            ? 'bg-green-50 text-green-700'
                            : investor.probability === 'medium'
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-slate-100 text-slate-600'
                        }
                      >
                        {investor.probability}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Communications */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900">Recent Communications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCommunications.map((comm) => (
              <div
                key={comm.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  {comm.type === 'update' && <Mail className="w-5 h-5 text-blue-600" />}
                  {comm.type === 'inquiry' && <Users className="w-5 h-5 text-cyan-600" />}
                  {comm.type === 'meeting' && <Calendar className="w-5 h-5 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-sm text-slate-900">{comm.title}</div>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>{comm.recipients} {comm.recipients === 1 ? 'recipient' : 'recipients'}</span>
                    <span>•</span>
                    <span>{comm.date}</span>
                    <span>•</span>
                    <Badge
                      variant="secondary"
                      className={
                        comm.status === 'sent' || comm.status === 'completed'
                          ? 'bg-green-50 text-green-700 text-xs'
                          : 'bg-blue-50 text-blue-700 text-xs'
                      }
                    >
                      {comm.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
