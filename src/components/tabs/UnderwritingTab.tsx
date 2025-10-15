import { FileText, TrendingUp, PieChart as PieChartIcon, Settings, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const recentProjects = [
  { id: 1, name: '789 Pine Boulevard - Durham', status: 'In Progress', lastModified: '2 hours ago', irr: 16.8 },
  { id: 2, name: '321 Elm Drive - Greensboro', status: 'Complete', lastModified: '1 day ago', irr: 18.2 },
  { id: 3, name: '654 Cedar Lane - Asheville', status: 'In Progress', lastModified: '3 days ago', irr: 15.4 },
  { id: 4, name: '147 Willow Way - Cary', status: 'Complete', lastModified: '5 days ago', irr: 19.1 },
];

const noiProjection = [
  { year: 'Year 1', noi: 850000 },
  { year: 'Year 2', noi: 920000 },
  { year: 'Year 3', noi: 990000 },
  { year: 'Year 4', noi: 1065000 },
  { year: 'Year 5', noi: 1145000 },
];

const rentRoll = [
  { unitType: '1 Bed / 1 Bath', units: 48, avgRent: 1250, occupancy: 96 },
  { unitType: '2 Bed / 2 Bath', units: 64, avgRent: 1650, occupancy: 98 },
  { unitType: '3 Bed / 2 Bath', units: 32, avgRent: 2100, occupancy: 94 },
];

const capitalStack = [
  { name: 'Equity', value: 35, color: '#3b82f6' },
  { name: 'Senior Debt', value: 55, color: '#06b6d4' },
  { name: 'Mezzanine', value: 10, color: '#8b5cf6' },
];

const sensitivityData = [
  { scenario: 'Base Case', irr: 17.5, equity: 2.4, exitCap: 5.5 },
  { scenario: 'Optimistic', irr: 21.2, equity: 2.8, exitCap: 5.0 },
  { scenario: 'Conservative', irr: 14.1, equity: 2.1, exitCap: 6.0 },
];

export default function UnderwritingTab() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-slate-900 mb-2">Deal Analysis Workspace</h1>
          <p className="text-sm text-slate-600">Comprehensive underwriting and financial modeling</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-50 text-blue-600 border-blue-200 px-3 py-1">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            Cactus AI Connected
          </Badge>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md hover:shadow-lg">
            <FileText className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* Recent Projects Sidebar + Main Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Recent Projects */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 text-base">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer"
                >
                  <div className="text-sm text-slate-900 mb-2 line-clamp-2">{project.name}</div>
                  <div className="flex items-center justify-between text-xs">
                    <Badge
                      variant="secondary"
                      className={`${
                        project.status === 'Complete'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {project.status}
                    </Badge>
                    <span className="text-slate-500">{project.lastModified}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Analysis Area */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="model" className="w-full">
            <TabsList className="bg-white border border-slate-200 mb-6">
              <TabsTrigger value="inputs" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                Inputs
              </TabsTrigger>
              <TabsTrigger value="model" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                Model
              </TabsTrigger>
              <TabsTrigger value="outputs" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                Outputs
              </TabsTrigger>
              <TabsTrigger value="sensitivity" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                Sensitivity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900">Property Inputs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-4">
                      <div>
                        <label className="text-slate-600 text-xs mb-1 block">Purchase Price</label>
                        <div className="text-slate-900">$14,200,000</div>
                      </div>
                      <div>
                        <label className="text-slate-600 text-xs mb-1 block">Total Units</label>
                        <div className="text-slate-900">144</div>
                      </div>
                      <div>
                        <label className="text-slate-600 text-xs mb-1 block">Year Built</label>
                        <div className="text-slate-900">2021</div>
                      </div>
                      <div>
                        <label className="text-slate-600 text-xs mb-1 block">Current Occupancy</label>
                        <div className="text-slate-900">95.8%</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-slate-600 text-xs mb-1 block">Gross Scheduled Income</label>
                        <div className="text-slate-900">$2,650,000</div>
                      </div>
                      <div>
                        <label className="text-slate-600 text-xs mb-1 block">Operating Expenses</label>
                        <div className="text-slate-900">$1,450,000</div>
                      </div>
                      <div>
                        <label className="text-slate-600 text-xs mb-1 block">Cap Rate</label>
                        <div className="text-slate-900">5.75%</div>
                      </div>
                      <div>
                        <label className="text-slate-600 text-xs mb-1 block">Hold Period</label>
                        <div className="text-slate-900">5 Years</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="model" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">NOI Growth Projection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={noiProjection}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="year" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="noi"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Capital Stack</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center">
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={capitalStack}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {capitalStack.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                      {capitalStack.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-slate-700">{item.name}</span>
                          </div>
                          <span className="text-slate-600">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900">Rent Roll Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 text-slate-600">Unit Type</th>
                          <th className="text-right py-3 text-slate-600">Units</th>
                          <th className="text-right py-3 text-slate-600">Avg Rent</th>
                          <th className="text-right py-3 text-slate-600">Occupancy</th>
                          <th className="text-right py-3 text-slate-600">Monthly Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rentRoll.map((row, index) => (
                          <tr key={index} className="border-b border-slate-100">
                            <td className="py-3 text-slate-900">{row.unitType}</td>
                            <td className="text-right py-3 text-slate-700">{row.units}</td>
                            <td className="text-right py-3 text-slate-700">${row.avgRent}</td>
                            <td className="text-right py-3 text-slate-700">{row.occupancy}%</td>
                            <td className="text-right py-3 text-blue-600">
                              ${((row.units * row.avgRent * row.occupancy) / 100).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="outputs" className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="text-sm text-slate-600 mb-2">Levered IRR</div>
                    <div className="text-3xl text-blue-600 mb-1">17.5%</div>
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Above Target
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="text-sm text-slate-600 mb-2">Equity Multiple</div>
                    <div className="text-3xl text-cyan-600 mb-1">2.4x</div>
                    <div className="text-xs text-slate-500">5-Year Hold</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="text-sm text-slate-600 mb-2">Cash-on-Cash</div>
                    <div className="text-3xl text-purple-600 mb-1">8.2%</div>
                    <div className="text-xs text-slate-500">Year 1</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="text-sm text-slate-600 mb-2">Exit Cap Rate</div>
                    <div className="text-3xl text-green-600 mb-1">5.5%</div>
                    <div className="text-xs text-slate-500">Year 5</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sensitivity" className="space-y-6">
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900">Scenario Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 text-slate-600">Scenario</th>
                          <th className="text-right py-3 text-slate-600">IRR</th>
                          <th className="text-right py-3 text-slate-600">Equity Multiple</th>
                          <th className="text-right py-3 text-slate-600">Exit Cap Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sensitivityData.map((row, index) => (
                          <tr key={index} className="border-b border-slate-100">
                            <td className="py-4 text-slate-900">{row.scenario}</td>
                            <td className="text-right py-4">
                              <span className={
                                row.scenario === 'Optimistic' ? 'text-green-600' :
                                row.scenario === 'Conservative' ? 'text-yellow-600' :
                                'text-blue-600'
                              }>
                                {row.irr}%
                              </span>
                            </td>
                            <td className="text-right py-4 text-slate-700">{row.equity}x</td>
                            <td className="text-right py-4 text-slate-700">{row.exitCap}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
