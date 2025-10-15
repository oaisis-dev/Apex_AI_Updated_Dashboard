import { TrendingUp, TrendingDown, Home, Wrench, DollarSign, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const portfolioMetrics = [
  { label: 'Portfolio Occupancy', value: '96.3%', target: 95, current: 96.3, trend: '+2.1%', up: true, icon: Home },
  { label: 'Total NOI vs Budget', value: '+4.2%', target: 0, current: 4.2, trend: 'On Track', up: true, icon: DollarSign },
  { label: 'Work Orders Open', value: '32', target: 40, current: 32, trend: '28 Resolved', up: true, icon: Wrench },
  { label: 'Avg. Days to Lease', value: '18', target: 25, current: 18, trend: '-3 days', up: true, icon: Users },
];

const properties = [
  {
    id: 1,
    name: 'Lakeview Apartments',
    location: 'Charlotte, NC',
    units: 124,
    occupancy: 93.5,
    noi: 425000,
    budget: 410000,
    workOrders: 8,
    status: 'attention',
  },
  {
    id: 2,
    name: 'College Park Apts',
    location: 'Raleigh, NC',
    units: 86,
    occupancy: 97.2,
    noi: 312000,
    budget: 295000,
    workOrders: 3,
    status: 'good',
  },
  {
    id: 3,
    name: 'Indian Trail Property',
    location: 'Indian Trail, NC',
    units: 142,
    occupancy: 96.8,
    noi: 485000,
    budget: 475000,
    workOrders: 12,
    status: 'attention',
  },
  {
    id: 4,
    name: 'Main Street Complex',
    location: 'Durham, NC',
    units: 98,
    occupancy: 98.5,
    noi: 368000,
    budget: 355000,
    workOrders: 5,
    status: 'good',
  },
  {
    id: 5,
    name: 'Oak Avenue Residences',
    location: 'Greensboro, NC',
    units: 156,
    occupancy: 95.8,
    noi: 542000,
    budget: 520000,
    workOrders: 4,
    status: 'good',
  },
];

const aiAlerts = [
  {
    id: 1,
    severity: 'high',
    title: 'High probability of HVAC failure at Indian Trail property',
    property: 'Indian Trail Property',
    details: 'Predictive maintenance model indicates 78% probability of system failure in next 30 days based on age and usage patterns.',
    icon: AlertCircle,
  },
  {
    id: 2,
    severity: 'high',
    title: 'R&M spend up 25% QoQ at College Park Apts',
    property: 'College Park Apts',
    details: 'Repair and maintenance costs have increased significantly. Recommend budget review and vendor analysis.',
    icon: TrendingUp,
  },
  {
    id: 3,
    severity: 'medium',
    title: 'Occupancy trending below target at Lakeview',
    property: 'Lakeview Apartments',
    details: 'Current occupancy at 93.5% vs 95% target. Consider marketing campaign or rental concessions.',
    icon: TrendingDown,
  },
];

const maintenanceByProperty = [
  { property: 'Lakeview', amount: 28500 },
  { property: 'College Park', amount: 19200 },
  { property: 'Indian Trail', amount: 32400 },
  { property: 'Main Street', amount: 15800 },
  { property: 'Oak Avenue', amount: 21600 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function AssetManagementTab() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-slate-900 mb-2">Operational Overview</h1>
        <p className="text-sm text-slate-600">Monitor portfolio performance and operational health</p>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioMetrics.map((metric, index) => (
          <Card key={index} className="bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-blue-50">
                  <metric.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className={`text-xs ${metric.up ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.trend}
                </div>
              </div>
              <div className="text-2xl text-slate-900 mb-2">{metric.value}</div>
              <div className="text-sm text-slate-600 mb-3">{metric.label}</div>
              <Progress value={(metric.current / metric.target) * 100} className="h-1.5" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Performance Table */}
        <Card className="bg-white border-slate-200 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-slate-900">Property Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 text-slate-600">Property</th>
                    <th className="text-right py-3 text-slate-600">Units</th>
                    <th className="text-right py-3 text-slate-600">Occupancy</th>
                    <th className="text-right py-3 text-slate-600">NOI</th>
                    <th className="text-right py-3 text-slate-600">vs Budget</th>
                    <th className="text-right py-3 text-slate-600">Work Orders</th>
                    <th className="text-right py-3 text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => {
                    const budgetVariance = ((property.noi - property.budget) / property.budget) * 100;
                    return (
                      <tr key={property.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4">
                          <div className="text-slate-900">{property.name}</div>
                          <div className="text-xs text-slate-500">{property.location}</div>
                        </td>
                        <td className="text-right py-4 text-slate-700">{property.units}</td>
                        <td className="text-right py-4">
                          <span className={property.occupancy >= 96 ? 'text-green-600' : property.occupancy >= 94 ? 'text-yellow-600' : 'text-red-600'}>
                            {property.occupancy}%
                          </span>
                        </td>
                        <td className="text-right py-4 text-slate-700">{formatCurrency(property.noi)}</td>
                        <td className="text-right py-4">
                          <span className={budgetVariance >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {budgetVariance > 0 ? '+' : ''}{budgetVariance.toFixed(1)}%
                          </span>
                        </td>
                        <td className="text-right py-4 text-slate-700">{property.workOrders}</td>
                        <td className="text-right py-4">
                          <Badge
                            variant="secondary"
                            className={
                              property.status === 'good'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            }
                          >
                            {property.status === 'good' ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <AlertCircle className="w-3 h-3 mr-1" />
                            )}
                            {property.status === 'good' ? 'Good' : 'Attention'}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* AI Alerts Feed */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              AI Operational Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
                    <alert.icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        alert.severity === 'high'
                          ? 'text-red-600'
                          : alert.severity === 'medium'
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                      }`}
                    />
                    <div className="flex-1">
                      <div className="text-sm text-slate-900 mb-1">{alert.title}</div>
                      <div className="text-xs text-slate-600 mb-2">{alert.property}</div>
                      <div className="text-xs text-slate-500 leading-relaxed">{alert.details}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Spending Chart */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900">Maintenance Spend by Property (This Month)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceByProperty}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="property" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
                formatter={(value) => formatCurrency(Number(value))}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
