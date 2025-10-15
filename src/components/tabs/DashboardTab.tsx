import { TrendingUp, TrendingDown, Home, DollarSign, Percent, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import KPICard from '../KPICard';
import appfolioLogo from 'figma:asset/3a6d81a31ad558228c2d8de51413df7a7c90efb5.png';
import quickbooksLogo from 'figma:asset/a11d79feecd4efd1298811d8281b3c6a77a02bd4.png';
import mapBackground from 'figma:asset/8634896c15c680d0efedceab288687e21d01cfb1.png';

// Sparkline data for NOI trend (last 12 months)
const noiSparklineData = [3.2, 3.5, 3.4, 3.8, 4.0, 3.9, 4.1, 4.3, 4.2, 4.4, 4.5, 4.7];

// Unit distribution data for bar chart (top 5 properties)
const unitDistributionData = [320, 285, 240, 220, 180];

const noiData = [
  { month: 'Jan', noi: 320000, budget: 310000 },
  { month: 'Feb', noi: 335000, budget: 315000 },
  { month: 'Mar', noi: 342000, budget: 320000 },
  { month: 'Apr', noi: 355000, budget: 325000 },
  { month: 'May', noi: 368000, budget: 330000 },
  { month: 'Jun', noi: 375000, budget: 335000 },
  { month: 'Jul', noi: 380000, budget: 340000 },
  { month: 'Aug', noi: 390000, budget: 345000 },
];

const propertyData = [
  { name: 'Multi-Family', value: 68, color: '#3b82f6' },
  { name: 'Student Housing', value: 22, color: '#06b6d4' },
  { name: 'Mixed-Use', value: 10, color: '#8b5cf6' },
];

const activities = [
  { id: 1, type: 'lease', message: 'New lease signed at 123 Main Street', time: '5 min ago', icon: CheckCircle2, color: 'text-green-400' },
  { id: 2, type: 'workorder', message: 'Work order created at 456 Oak Ave', time: '12 min ago', icon: Clock, color: 'text-blue-400' },
  { id: 3, type: 'investor', message: 'Investor commitment received: $250,000', time: '23 min ago', icon: DollarSign, color: 'text-cyan-400' },
  { id: 4, type: 'lease', message: 'Lease renewal confirmed at College Park Apts', time: '1 hour ago', icon: CheckCircle2, color: 'text-green-400' },
  { id: 5, type: 'alert', message: 'Quarterly inspection scheduled for Lakeview Property', time: '2 hours ago', icon: Clock, color: 'text-blue-400' },
];

const aiAlerts = [
  { id: 1, severity: 'high', message: 'HVAC maintenance trending 40% higher than normal', property: 'Indian Trail Apartments', icon: AlertTriangle },
  { id: 2, severity: 'medium', message: 'Occupancy below 95% at Lakeview Apartments', property: 'Lakeview Apartments', icon: TrendingDown },
  { id: 3, severity: 'low', message: 'Lease expiration spike in Q1 2026 - consider early renewals', property: 'Portfolio-wide', icon: Clock },
];

const properties = [
  { id: 1, name: 'Lakeview Apartments', lat: 35.2271, lng: -80.8431, units: 124, occupancy: 93.5 },
  { id: 2, name: 'College Park Apts', lat: 35.1374, lng: -80.7453, units: 86, occupancy: 97.2 },
  { id: 3, name: 'Indian Trail Property', lat: 35.0768, lng: -80.6698, units: 142, occupancy: 96.8 },
  { id: 4, name: 'Main Street Complex', lat: 35.2082, lng: -80.8304, units: 98, occupancy: 98.5 },
];

export default function DashboardTab() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Portfolio Occupancy Card */}
        <KPICard
          title="Portfolio Occupancy"
          value="96%"
          type="radial"
          currentValue={96}
          targetValue={100}
          color="green"
          trend={{
            direction: 'up',
            value: '+2.4%',
            label: 'vs last quarter',
          }}
          sources={[
            { name: 'AppFolio', logo: appfolioLogo },
          ]}
        />

        {/* Total Units Card */}
        <KPICard
          title="Total Units Across Portfolio"
          value="2,846"
          type="bar"
          data={unitDistributionData}
          color="blue"
          trend={{
            direction: 'up',
            value: '+14',
            label: 'new units this month',
          }}
          sources={[
            { name: 'AppFolio', logo: appfolioLogo },
          ]}
        />

        {/* Total NOI Card */}
        <KPICard
          title="Total NOI (Year-to-Date)"
          value="$12.47M"
          type="sparkline"
          data={noiSparklineData}
          color="blue"
          trend={{
            direction: 'up',
            value: '+4.2%',
            label: 'vs. budget',
          }}
          insight="NOI trending upward despite 5% higher R&M costs."
          sources={[
            { name: 'QuickBooks', logo: quickbooksLogo },
            { name: 'AppFolio', logo: appfolioLogo },
          ]}
        />

        {/* Avg. Cash-on-Cash Return Card */}
        <KPICard
          title="Avg. Cash-on-Cash Return"
          value="8.7%"
          type="dual-ring"
          currentValue={87}
          targetValue={95}
          color="purple"
          trend={{
            direction: 'up',
            value: '+0.5%',
            label: 'vs. prior quarter',
          }}
          insight="Strongest performer: College Park Apts (10.3%)"
          sources={[
            { name: 'QuickBooks', logo: quickbooksLogo },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <Card className="bg-white border-slate-200 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-slate-900">Portfolio Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-slate-200">
              {/* Satellite Map Background */}
              <div className="absolute inset-0">
                <img 
                  src={mapBackground} 
                  alt="Portfolio Map" 
                  className="w-full h-full object-cover"
                />
                {/* Subtle overlay for better pin visibility */}
                <div className="absolute inset-0 bg-slate-900/20"></div>
              </div>
              
              {/* Property Pins with Circuit Style */}
              {properties.map((property, index) => {
                const x = 150 + index * 150;
                const y = 120 + (index % 2) * 120;
                return (
                  <div
                    key={property.id}
                    className="absolute group cursor-pointer"
                    style={{ left: `${x}px`, top: `${y}px` }}
                  >
                    {/* Circuit Glow Effect */}
                    <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Pin */}
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)]">
                        <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
                      </div>
                      
                      {/* Info Card on Hover */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <div className="bg-white border border-slate-300 rounded-lg p-3 shadow-xl min-w-[200px]">
                          <div className="text-sm text-slate-900 mb-2">{property.name}</div>
                          <div className="text-xs text-slate-600 space-y-1">
                            <div>Units: {property.units}</div>
                            <div>Occupancy: {property.occupancy}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* AI Alerts Module */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              AI Predictive Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border transition-all hover:shadow-sm ${
                    alert.severity === 'high'
                      ? 'bg-red-50 border-red-200'
                      : alert.severity === 'medium'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex gap-3">
                    <alert.icon className={`w-5 h-5 flex-shrink-0 ${
                      alert.severity === 'high'
                        ? 'text-red-600'
                        : alert.severity === 'medium'
                        ? 'text-yellow-600'
                        : 'text-blue-600'
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm text-slate-900 mb-1">{alert.message}</div>
                      <div className="text-xs text-slate-600">{alert.property}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* NOI Performance Chart */}
        <Card className="bg-white border-slate-200 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-slate-900">NOI Performance vs Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={noiData}>
                <defs>
                  <linearGradient id="colorNoi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Area type="monotone" dataKey="budget" stroke="#94a3b8" fill="none" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="noi" stroke="#3b82f6" fillOpacity={1} fill="url(#colorNoi)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Portfolio Breakdown */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Portfolio Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={propertyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {propertyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {propertyData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-sm text-slate-600">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                <div className="p-2 rounded-lg bg-slate-50">
                  <activity.icon className={`w-4 h-4 ${activity.color.replace('400', '600')}`} />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-slate-900">{activity.message}</div>
                  <div className="text-xs text-slate-500 mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
