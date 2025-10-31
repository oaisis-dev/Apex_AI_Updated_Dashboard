import { useState } from 'react';
import { TrendingUp, TrendingDown, Home, Wrench, DollarSign, Users, AlertCircle, CheckCircle, Calendar, FileText, Download, Filter, Search, ChevronDown, Building2, BarChart3, Clock, Zap, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart, Area } from 'recharts';

const properties = [
  { id: 1, name: 'Lakeview Apartments', location: 'Charlotte, NC', units: 124, occupancy: 93.5 },
  { id: 2, name: 'College Park Apts', location: 'Raleigh, NC', units: 86, occupancy: 97.2 },
  { id: 3, name: 'Indian Trail Property', location: 'Indian Trail, NC', units: 142, occupancy: 96.8 },
  { id: 4, name: 'Main Street Complex', location: 'Durham, NC', units: 98, occupancy: 98.5 },
  { id: 5, name: 'Oak Avenue Residences', location: 'Greensboro, NC', units: 156, occupancy: 95.8 },
];

// Budget vs Actual Data
const budgetActualData = [
  { month: 'Jan', actual: 285000, budget: 280000 },
  { month: 'Feb', actual: 292000, budget: 285000 },
  { month: 'Mar', actual: 298000, budget: 290000 },
  { month: 'Apr', actual: 295000, budget: 295000 },
  { month: 'May', actual: 308000, budget: 300000 },
  { month: 'Jun', actual: 315000, budget: 305000 },
  { month: 'Jul', actual: 322000, budget: 310000 },
  { month: 'Aug', actual: 318000, budget: 315000 },
];

// T12 P&L Line Items
const t12PLData = [
  { category: 'Gross Potential Rent', amount: 3650000, budget: 3580000 },
  { category: 'Vacancy Loss', amount: -182500, budget: -179000 },
  { category: 'Other Income', amount: 125000, budget: 120000 },
  { category: 'Total Revenue', amount: 3592500, budget: 3521000, isTotal: true },
  { category: 'Payroll', amount: -485000, budget: -475000 },
  { category: 'Repairs & Maintenance', amount: -325000, budget: -310000 },
  { category: 'Utilities', amount: -215000, budget: -220000 },
  { category: 'Property Tax', amount: -285000, budget: -285000 },
  { category: 'Insurance', amount: -125000, budget: -120000 },
  { category: 'Management Fee', amount: -125000, budget: -123000 },
  { category: 'Marketing', amount: -45000, budget: -48000 },
  { category: 'Total Operating Expenses', amount: -1605000, budget: -1581000, isTotal: true },
  { category: 'Net Operating Income', amount: 1987500, budget: 1940000, isTotal: true, highlight: true },
];

// Lease Expiration Schedule
const leaseExpirations = [
  { id: 1, tenant: 'Johnson, Sarah', unit: '2A', expiration: '2025-11-15', currentRent: 1450, marketRent: 1525, status: 'pending' },
  { id: 2, tenant: 'Martinez, Carlos', unit: '5B', expiration: '2025-11-22', currentRent: 1650, marketRent: 1700, status: 'renewal-sent' },
  { id: 3, tenant: 'Chen, Wei', unit: '3C', expiration: '2025-12-01', currentRent: 2100, marketRent: 2150, status: 'pending' },
  { id: 4, tenant: 'Anderson, Emily', unit: '1D', expiration: '2025-12-08', currentRent: 1350, marketRent: 1450, status: 'pending' },
  { id: 5, tenant: 'Williams, Robert', unit: '4A', expiration: '2025-12-15', currentRent: 1850, marketRent: 1925, status: 'renewal-sent' },
  { id: 6, tenant: 'Davis, Jennifer', unit: '6C', expiration: '2026-01-05', currentRent: 1550, marketRent: 1625, status: 'pending' },
  { id: 7, tenant: 'Brown, Michael', unit: '2B', expiration: '2026-01-12', currentRent: 1750, marketRent: 1800, status: 'pending' },
  { id: 8, tenant: 'Taylor, Lisa', unit: '3A', expiration: '2026-01-20', currentRent: 2050, marketRent: 2125, status: 'pending' },
];

// Rent Roll Data
const rentRoll = [
  { unit: '1A', tenant: 'Smith, John', sqFt: 850, rent: 1425, leaseStart: '2024-03-01', leaseEnd: '2025-03-01', status: 'occupied' },
  { unit: '1B', tenant: 'Jones, Mary', sqFt: 950, rent: 1650, leaseStart: '2024-06-15', leaseEnd: '2025-06-15', status: 'occupied' },
  { unit: '1C', tenant: 'Vacant', sqFt: 875, rent: 0, leaseStart: '-', leaseEnd: '-', status: 'vacant' },
  { unit: '2A', tenant: 'Johnson, Sarah', sqFt: 850, rent: 1450, leaseStart: '2024-11-15', leaseEnd: '2025-11-15', status: 'occupied' },
  { unit: '2B', tenant: 'Brown, Michael', sqFt: 1100, rent: 1750, leaseStart: '2025-01-12', leaseEnd: '2026-01-12', status: 'occupied' },
  { unit: '2C', tenant: 'Miller, David', sqFt: 925, rent: 1575, leaseStart: '2024-08-20', leaseEnd: '2025-08-20', status: 'occupied' },
  { unit: '3A', tenant: 'Taylor, Lisa', sqFt: 1250, rent: 2050, leaseStart: '2025-01-20', leaseEnd: '2026-01-20', status: 'occupied' },
  { unit: '3B', tenant: 'Vacant', sqFt: 900, rent: 0, leaseStart: '-', leaseEnd: '-', status: 'vacant' },
];

// Work Order Log
const workOrders = [
  { id: 'WO-2451', property: 'Lakeview Apartments', unit: '3B', category: 'HVAC', priority: 'high', status: 'in-progress', created: '2025-10-28', assignedTo: 'HVAC Pro Inc.', cost: 450 },
  { id: 'WO-2450', property: 'College Park Apts', unit: '1A', category: 'Plumbing', priority: 'high', status: 'in-progress', created: '2025-10-27', assignedTo: 'Quick Plumbing', cost: 225 },
  { id: 'WO-2449', property: 'Main Street Complex', unit: 'Common', category: 'Landscaping', priority: 'low', status: 'completed', created: '2025-10-25', assignedTo: 'Green Team', cost: 180 },
  { id: 'WO-2448', property: 'Indian Trail Property', unit: '5C', category: 'Electrical', priority: 'medium', status: 'completed', created: '2025-10-24', assignedTo: 'Bright Electric', cost: 320 },
  { id: 'WO-2447', property: 'Oak Avenue Residences', unit: '2B', category: 'Appliance', priority: 'medium', status: 'scheduled', created: '2025-10-24', assignedTo: 'Fix-It Fast', cost: 275 },
  { id: 'WO-2446', property: 'Lakeview Apartments', unit: '4A', category: 'Plumbing', priority: 'high', status: 'overdue', created: '2025-10-20', assignedTo: 'Quick Plumbing', cost: 380 },
  { id: 'WO-2445', property: 'College Park Apts', unit: 'Roof', category: 'Structural', priority: 'medium', status: 'in-progress', created: '2025-10-23', assignedTo: 'Roof Masters', cost: 1250 },
  { id: 'WO-2444', property: 'Main Street Complex', unit: '1C', category: 'HVAC', priority: 'low', status: 'completed', created: '2025-10-22', assignedTo: 'HVAC Pro Inc.', cost: 195 },
];

// Maintenance Cost by Category
const maintenanceByCategoryData = [
  { category: 'HVAC', cost: 8450, count: 12 },
  { category: 'Plumbing', cost: 6820, count: 18 },
  { category: 'Electrical', cost: 4250, count: 8 },
  { category: 'Appliance', cost: 3680, count: 14 },
  { category: 'Structural', cost: 5420, count: 6 },
  { category: 'Landscaping', cost: 2180, count: 9 },
];

// Rent Growth Tracking
const rentGrowthData = [
  { month: 'May', newLeases: 4.2, renewals: 3.1 },
  { month: 'Jun', newLeases: 4.8, renewals: 3.5 },
  { month: 'Jul', newLeases: 5.1, renewals: 3.8 },
  { month: 'Aug', newLeases: 4.5, renewals: 3.2 },
  { month: 'Sep', newLeases: 4.9, renewals: 3.6 },
  { month: 'Oct', newLeases: 5.3, renewals: 4.1 },
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
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [activeSection, setActiveSection] = useState('financials');

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-slate-900 mb-2">Portfolio Operations</h1>
          <p className="text-sm text-slate-600">Detailed operational insights and reporting across your portfolio</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-300 text-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md hover:shadow-lg">
            <FileText className="w-4 h-4 mr-2" />
            Reporting Center
          </Button>
        </div>
      </div>

      {/* Property Selector */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-600" />
              <Label className="text-sm text-slate-700">Property Filter:</Label>
            </div>
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties (Portfolio View)</SelectItem>
                <SelectItem value="custom">Custom Group...</SelectItem>
                <Separator className="my-2" />
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.id.toString()}>
                    {property.name} - {property.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Period:</span>
              <Select defaultValue="ytd">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mtd">Month to Date</SelectItem>
                  <SelectItem value="qtd">Quarter to Date</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                  <SelectItem value="t12">Trailing 12 Months</SelectItem>
                  <SelectItem value="custom">Custom Range...</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200 h-auto p-1">
          <TabsTrigger value="financials" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 flex flex-col items-center gap-1 py-3">
            <DollarSign className="w-5 h-5" />
            <span>Detailed Financials</span>
          </TabsTrigger>
          <TabsTrigger value="leasing" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 flex flex-col items-center gap-1 py-3">
            <Users className="w-5 h-5" />
            <span>Leasing Deep Dive</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 flex flex-col items-center gap-1 py-3">
            <Wrench className="w-5 h-5" />
            <span>Maintenance Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="reporting" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 flex flex-col items-center gap-1 py-3">
            <FileText className="w-5 h-5" />
            <span>Reporting Center</span>
          </TabsTrigger>
        </TabsList>

        {/* DETAILED FINANCIALS TAB */}
        <TabsContent value="financials" className="space-y-6 mt-6">
          {/* Budget vs Actual Chart */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Budget vs Actual - NOI Performance</CardTitle>
                  <CardDescription>Year-to-date comparison with drill-down capability</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Drill Down by Line Item
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={budgetActualData}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
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
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                  <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="url(#colorActual)" />
                  <Line type="monotone" dataKey="budget" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" />
                  <Bar dataKey="actual" fill="#3b82f6" opacity={0} />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-500"></div>
                  <span className="text-slate-600">Actual NOI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 border-t-2 border-dashed border-slate-400"></div>
                  <span className="text-slate-600">Budgeted NOI</span>
                </div>
                <div className="flex-1" />
                <div className="text-slate-700">
                  YTD Variance: <span className="text-green-600">+$98,500 (+3.2%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* T12 P&L View */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Trailing 12-Month P&L</CardTitle>
                  <CardDescription>Detailed income statement with budget comparison</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export to Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-300 bg-slate-50">
                      <th className="text-left py-3 px-4 text-slate-700">Line Item</th>
                      <th className="text-right py-3 px-4 text-slate-700">T12 Actual</th>
                      <th className="text-right py-3 px-4 text-slate-700">T12 Budget</th>
                      <th className="text-right py-3 px-4 text-slate-700">Variance</th>
                      <th className="text-right py-3 px-4 text-slate-700">Variance %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t12PLData.map((item, index) => {
                      const variance = item.amount - item.budget;
                      const variancePercent = ((variance / Math.abs(item.budget)) * 100).toFixed(1);
                      const isPositiveVariance = item.category.includes('Revenue') || item.category.includes('NOI') || item.category.includes('Income') 
                        ? variance > 0 
                        : variance < 0;
                      
                      return (
                        <tr 
                          key={index} 
                          className={`border-b border-slate-100 ${
                            item.isTotal ? 'bg-slate-50' : ''
                          } ${item.highlight ? 'bg-green-50' : ''}`}
                        >
                          <td className={`py-3 px-4 ${item.isTotal ? 'text-slate-900' : 'text-slate-700'} ${item.isTotal ? '' : 'pl-8'}`}>
                            {item.category}
                          </td>
                          <td className={`text-right py-3 px-4 ${item.isTotal ? 'text-slate-900' : 'text-slate-700'}`}>
                            {formatCurrency(item.amount)}
                          </td>
                          <td className={`text-right py-3 px-4 text-slate-600`}>
                            {formatCurrency(item.budget)}
                          </td>
                          <td className={`text-right py-3 px-4 ${isPositiveVariance ? 'text-green-600' : 'text-red-600'}`}>
                            {variance > 0 ? '+' : ''}{formatCurrency(variance)}
                          </td>
                          <td className={`text-right py-3 px-4 ${isPositiveVariance ? 'text-green-600' : 'text-red-600'}`}>
                            {variance > 0 ? '+' : ''}{variancePercent}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LEASING DEEP DIVE TAB */}
        <TabsContent value="leasing" className="space-y-6 mt-6">
          {/* Lease Expiration Schedule */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Lease Expiration Schedule</CardTitle>
                  <CardDescription>Upcoming expirations with renewal opportunity analysis</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="90">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">Next 30 Days</SelectItem>
                      <SelectItem value="60">Next 60 Days</SelectItem>
                      <SelectItem value="90">Next 90 Days</SelectItem>
                      <SelectItem value="180">Next 6 Months</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Expiration Date</TableHead>
                    <TableHead className="text-right">Current Rent</TableHead>
                    <TableHead className="text-right">Market Rent</TableHead>
                    <TableHead className="text-right">Increase Potential</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaseExpirations.map((lease) => {
                    const increase = lease.marketRent - lease.currentRent;
                    const increasePercent = ((increase / lease.currentRent) * 100).toFixed(1);
                    return (
                      <TableRow key={lease.id}>
                        <TableCell className="text-slate-900">{lease.tenant}</TableCell>
                        <TableCell className="text-slate-700">{lease.unit}</TableCell>
                        <TableCell className="text-slate-700">
                          {new Date(lease.expiration).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right text-slate-700">${lease.currentRent}</TableCell>
                        <TableCell className="text-right text-slate-700">${lease.marketRent}</TableCell>
                        <TableCell className="text-right text-green-600">
                          ${increase} (+{increasePercent}%)
                        </TableCell>
                        <TableCell>
                          {lease.status === 'renewal-sent' ? (
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200">Renewal Sent</Badge>
                          ) : (
                            <Badge variant="outline" className="border-slate-300">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            Send Renewal
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Rent Roll View */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Current Rent Roll</CardTitle>
                  <CardDescription>Active tenants, rents, and lease terms</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Search units or tenants..." className="pl-9 w-[250px]" />
                  </div>
                  <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead className="text-right">Sq Ft</TableHead>
                    <TableHead className="text-right">Monthly Rent</TableHead>
                    <TableHead className="text-right">$/SF</TableHead>
                    <TableHead>Lease Start</TableHead>
                    <TableHead>Lease End</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rentRoll.map((unit) => {
                    const pricePerSF = unit.rent > 0 ? (unit.rent / unit.sqFt).toFixed(2) : '-';
                    return (
                      <TableRow key={unit.unit} className={unit.status === 'vacant' ? 'bg-red-50' : ''}>
                        <TableCell className="text-slate-900">{unit.unit}</TableCell>
                        <TableCell className={unit.status === 'vacant' ? 'text-red-700' : 'text-slate-700'}>
                          {unit.tenant}
                        </TableCell>
                        <TableCell className="text-right text-slate-700">{unit.sqFt}</TableCell>
                        <TableCell className="text-right text-slate-900">
                          {unit.rent > 0 ? `$${unit.rent}` : '-'}
                        </TableCell>
                        <TableCell className="text-right text-slate-700">
                          {pricePerSF !== '-' ? `$${pricePerSF}` : '-'}
                        </TableCell>
                        <TableCell className="text-slate-700">{unit.leaseStart}</TableCell>
                        <TableCell className="text-slate-700">{unit.leaseEnd}</TableCell>
                        <TableCell>
                          {unit.status === 'occupied' ? (
                            <Badge className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Occupied
                            </Badge>
                          ) : (
                            <Badge className="bg-red-50 text-red-700 border-red-200">
                              <Home className="w-3 h-3 mr-1" />
                              Vacant
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Rent Growth Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-900">Rent Growth Analysis</CardTitle>
                <CardDescription>New leases vs. renewals (6-month trend)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={rentGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                      formatter={(value) => `${value}%`}
                    />
                    <Line type="monotone" dataKey="newLeases" stroke="#3b82f6" strokeWidth={2} name="New Leases" />
                    <Line type="monotone" dataKey="renewals" stroke="#10b981" strokeWidth={2} name="Renewals" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-900">Vacancy Loss Analysis</CardTitle>
                <CardDescription>Impact on revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-2">Physical Vacancy Rate</div>
                    <div className="text-2xl text-slate-900 mb-2">4.2%</div>
                    <Progress value={4.2} className="h-2 mb-1" />
                    <div className="text-xs text-slate-500">2 vacant units / 48 total</div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-2">Economic Vacancy (incl. concessions)</div>
                    <div className="text-2xl text-slate-900 mb-2">5.8%</div>
                    <Progress value={5.8} className="h-2 mb-1" />
                    <div className="text-xs text-slate-500">Including rent concessions & bad debt</div>
                  </div>

                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <div className="text-xs text-slate-600 mb-2">Annual Revenue Loss</div>
                    <div className="text-2xl text-red-700">$182,500</div>
                    <div className="text-xs text-slate-500 mt-1">5.8% of gross potential rent</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* MAINTENANCE ANALYTICS TAB */}
        <TabsContent value="maintenance" className="space-y-6 mt-6">
          {/* Work Order Log */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Work Order Log</CardTitle>
                  <CardDescription>Filterable by status, priority, property, and date</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all-status">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-status">All Statuses</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-priority">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-priority">All Priorities</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>WO #</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workOrders.map((wo) => (
                    <TableRow key={wo.id}>
                      <TableCell className="text-slate-900">{wo.id}</TableCell>
                      <TableCell className="text-slate-700">{wo.property}</TableCell>
                      <TableCell className="text-slate-700">{wo.unit}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-slate-300">{wo.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {wo.priority === 'high' && (
                          <Badge className="bg-red-500 text-white">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            High
                          </Badge>
                        )}
                        {wo.priority === 'medium' && (
                          <Badge className="bg-yellow-500 text-white">Medium</Badge>
                        )}
                        {wo.priority === 'low' && (
                          <Badge className="bg-blue-500 text-white">Low</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {wo.status === 'in-progress' && (
                          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                            <Clock className="w-3 h-3 mr-1" />
                            In Progress
                          </Badge>
                        )}
                        {wo.status === 'scheduled' && (
                          <Badge className="bg-purple-50 text-purple-700 border-purple-200">Scheduled</Badge>
                        )}
                        {wo.status === 'completed' && (
                          <Badge className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        {wo.status === 'overdue' && (
                          <Badge className="bg-red-50 text-red-700 border-red-200">
                            <XCircle className="w-3 h-3 mr-1" />
                            Overdue
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-700">{wo.created}</TableCell>
                      <TableCell className="text-slate-700">{wo.assignedTo}</TableCell>
                      <TableCell className="text-right text-slate-900">${wo.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Maintenance Cost Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-900">Maintenance Cost by Category</CardTitle>
                <CardDescription>Year-to-date spend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={maintenanceByCategoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="category" stroke="#64748b" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Bar dataKey="cost" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-900">Key Maintenance Metrics</CardTitle>
                <CardDescription>Performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="text-xs text-slate-600 mb-2">Cost per Unit (YTD)</div>
                    <div className="text-2xl text-blue-700 mb-1">$485</div>
                    <div className="text-xs text-slate-500">Total portfolio average</div>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                    <div className="text-xs text-slate-600 mb-2">Avg Cost per Work Order</div>
                    <div className="text-2xl text-purple-700 mb-1">$358</div>
                    <div className="text-xs text-green-600">↓ 8% vs. last year</div>
                  </div>

                  <div className="p-4 rounded-lg bg-cyan-50 border border-cyan-200">
                    <div className="text-xs text-slate-600 mb-2">Avg Response Time</div>
                    <div className="text-2xl text-cyan-700 mb-1">2.3 days</div>
                    <div className="text-xs text-green-600">↓ 0.5 days vs. target</div>
                  </div>

                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <div className="text-xs text-slate-600 mb-2">Completion Rate</div>
                    <div className="text-2xl text-green-700 mb-1">94.2%</div>
                    <div className="text-xs text-slate-500">Within SLA timeframe</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preventative Maintenance Schedule */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Preventative Maintenance Schedule</CardTitle>
                  <CardDescription>Scheduled PM tasks and tracking</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Full Calendar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Wrench className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-900 mb-1">HVAC Filter Replacement - All Properties</div>
                    <div className="text-xs text-slate-600">Quarterly maintenance • Due: Nov 15, 2025</div>
                  </div>
                  <Badge className="bg-green-50 text-green-700 border-green-200">On Schedule</Badge>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <Home className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-900 mb-1">Fire Extinguisher Inspection - Lakeview</div>
                    <div className="text-xs text-slate-600">Annual inspection • Due: Nov 22, 2025</div>
                  </div>
                  <Badge className="bg-green-50 text-green-700 border-green-200">On Schedule</Badge>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg border border-red-200 bg-red-50">
                  <div className="p-3 rounded-lg bg-red-100">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-900 mb-1">Roof Inspection - College Park</div>
                    <div className="text-xs text-slate-600">Semi-annual inspection • Due: Oct 30, 2025</div>
                  </div>
                  <Badge className="bg-red-500 text-white">Overdue</Badge>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="p-3 rounded-lg bg-cyan-100">
                    <Zap className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-900 mb-1">Generator Testing - Main Street Complex</div>
                    <div className="text-xs text-slate-600">Monthly test • Due: Nov 1, 2025</div>
                  </div>
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200">Upcoming</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* REPORTING CENTER TAB */}
        <TabsContent value="reporting" className="space-y-6 mt-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Standard Operational Reports</CardTitle>
              <CardDescription>Generate and download comprehensive property reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-50">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900 mb-1">Detailed Rent Roll</div>
                      <div className="text-xs text-slate-600">Complete tenant listing with lease details</div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-red-50">
                      <DollarSign className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900 mb-1">Delinquency Aging Report</div>
                      <div className="text-xs text-slate-600">Outstanding balances by aging period</div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-green-50">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900 mb-1">Budget vs Actual Report</div>
                      <div className="text-xs text-slate-600">Financial performance comparison</div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-purple-50">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900 mb-1">Trailing 12-Month P&L</div>
                      <div className="text-xs text-slate-600">Comprehensive income statement</div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-orange-50">
                      <Home className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900 mb-1">Occupancy Report</div>
                      <div className="text-xs text-slate-600">Historical and current occupancy trends</div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-cyan-50">
                      <Wrench className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900 mb-1">Maintenance Summary</div>
                      <div className="text-xs text-slate-600">Work order history and cost analysis</div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-yellow-50">
                      <Calendar className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900 mb-1">Lease Expiration Report</div>
                      <div className="text-xs text-slate-600">Upcoming renewals and expirations</div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-indigo-50">
                      <Users className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900 mb-1">Tenant Roster</div>
                      <div className="text-xs text-slate-600">Contact information and emergency contacts</div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-pink-50">
                      <FileText className="w-5 h-5 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900 mb-1">Custom Report Builder</div>
                      <div className="text-xs text-slate-600">Build your own custom report</div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Create Custom
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h4 className="text-sm text-slate-900 mb-4">Scheduled Reports</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-sm text-slate-900">Monthly Financial Package</div>
                        <div className="text-xs text-slate-600">Auto-generated on 5th of each month</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit Schedule</Button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-sm text-slate-900">Weekly Occupancy Summary</div>
                        <div className="text-xs text-slate-600">Auto-generated every Monday</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit Schedule</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
