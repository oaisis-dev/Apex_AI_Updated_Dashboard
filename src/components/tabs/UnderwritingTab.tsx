import { useState } from 'react';
import { FileText, TrendingUp, PieChart as PieChartIcon, Settings, Zap, Upload, Download, Bot, MapPin, Users, Briefcase, TrendingDown, DollarSign, Home, Calculator, BarChart3, Activity, FileSpreadsheet, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, ExternalLink, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Area } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';

const recentProjects = [
  { id: 1, name: '789 Pine Boulevard - Durham', status: 'In Progress', lastModified: '2 hours ago', irr: 16.8 },
  { id: 2, name: '321 Elm Drive - Greensboro', status: 'Complete', lastModified: '1 day ago', irr: 18.2 },
  { id: 3, name: '654 Cedar Lane - Asheville', status: 'In Progress', lastModified: '3 days ago', irr: 15.4 },
  { id: 4, name: '147 Willow Way - Cary', status: 'Complete', lastModified: '5 days ago', irr: 19.1 },
];

// Pro Forma Cash Flow Data (Year by Year)
const proFormaData = [
  { year: 'Year 1', revenue: 2850000, opex: 1425000, noi: 1425000, debtService: 850000, capex: 150000, leveredCF: 425000, unleveredCF: 1275000 },
  { year: 'Year 2', revenue: 2993000, opex: 1468000, noi: 1525000, debtService: 850000, capex: 100000, leveredCF: 575000, unleveredCF: 1425000 },
  { year: 'Year 3', revenue: 3143000, opex: 1512000, noi: 1631000, debtService: 850000, capex: 120000, leveredCF: 661000, unleveredCF: 1511000 },
  { year: 'Year 4', revenue: 3300000, opex: 1557000, noi: 1743000, debtService: 850000, capex: 180000, leveredCF: 713000, unleveredCF: 1563000 },
  { year: 'Year 5', revenue: 3465000, opex: 1604000, noi: 1861000, debtService: 850000, capex: 200000, leveredCF: 811000, unleveredCF: 1661000 },
];

// Sources & Uses Data
const sourcesData = [
  { category: 'Equity', amount: 5500000, percentage: 35 },
  { category: 'Senior Debt', amount: 8625000, percentage: 55 },
  { category: 'Mezzanine Debt', amount: 1575000, percentage: 10 },
];

const usesData = [
  { category: 'Purchase Price', amount: 14200000 },
  { category: 'Closing Costs', amount: 350000 },
  { category: 'Immediate CapEx', amount: 650000 },
  { category: 'Reserves', amount: 300000 },
  { category: 'Financing Fees', amount: 200000 },
];

// Sensitivity Analysis Data
const sensitivityMatrix = [
  { exitCap: '4.5%', rentGrowth2: '21.8%', rentGrowth3: '19.5%', rentGrowth4: '17.8%', rentGrowth5: '16.2%' },
  { exitCap: '5.0%', rentGrowth2: '19.2%', rentGrowth3: '17.5%', rentGrowth4: '16.1%', rentGrowth5: '14.8%' },
  { exitCap: '5.5%', rentGrowth2: '17.1%', rentGrowth3: '15.8%', rentGrowth4: '14.7%', rentGrowth5: '13.6%' },
  { exitCap: '6.0%', rentGrowth2: '15.3%', rentGrowth3: '14.3%', rentGrowth4: '13.5%', rentGrowth5: '12.6%' },
  { exitCap: '6.5%', rentGrowth2: '13.8%', rentGrowth3: '12.9%', rentGrowth4: '12.3%', rentGrowth5: '11.7%' },
];

// Market Data - Demographics
const populationTrend = [
  { year: '2019', population: 287500 },
  { year: '2020', population: 294200 },
  { year: '2021', population: 301800 },
  { year: '2022', population: 309500 },
  { year: '2023', population: 318100 },
  { year: '2024', population: 326800 },
  { year: '2025', population: 335600 },
];

const incomeTrend = [
  { year: '2020', income: 58200 },
  { year: '2021', income: 61500 },
  { year: '2022', income: 64800 },
  { year: '2023', income: 68200 },
  { year: '2024', income: 71800 },
  { year: '2025', income: 75400 },
];

const capitalStackPie = [
  { name: 'Equity', value: 35, color: '#3b82f6' },
  { name: 'Senior Debt', value: 55, color: '#06b6d4' },
  { name: 'Mezzanine', value: 10, color: '#8b5cf6' },
];

export default function UnderwritingTab() {
  const [selectedProject, setSelectedProject] = useState(recentProjects[0]);
  const [expandedSections, setExpandedSections] = useState({
    assumptions: true,
    proForma: true,
    metrics: true,
    sensitivity: false,
    sourcesUses: false,
    marketData: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-slate-900 mb-2">Underwriting Workspace</h1>
          <p className="text-sm text-slate-600">Comprehensive financial analysis and market due diligence</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-50 text-blue-600 border-blue-200 px-3 py-1">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            Cactus AI Connected
          </Badge>
          <Button variant="outline" className="border-slate-300 text-slate-700">
            <Download className="w-4 h-4 mr-2" />
            Export Analysis
          </Button>
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
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedProject.id === project.id
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedProject(project)}
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
                    <span className="text-slate-500">IRR: {project.irr}%</span>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Spreadsheet Integration */}
            <div className="space-y-3">
              <div className="text-sm text-slate-900 mb-2">Underwriting File</div>
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-xs text-green-700">
                  Durham_Underwriting_v3.xlsx
                </AlertDescription>
              </Alert>
              <Button variant="outline" size="sm" className="w-full border-slate-300 text-slate-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload New File
              </Button>
              <div className="text-xs text-slate-500 text-center">
                Auto-extracts metrics from .xlsx files
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Analysis Area - Single Scrollable Page */}
        <div className="lg:col-span-3">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-6 pr-4">
              {/* SECTION 1: ASSUMPTIONS */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection('assumptions')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50">
                        <Calculator className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-slate-900">Assumptions</CardTitle>
                        <CardDescription>Acquisition, financing, operations, and exit inputs</CardDescription>
                      </div>
                    </div>
                    {expandedSections.assumptions ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </CardHeader>
                {expandedSections.assumptions && (
                  <CardContent>
                    <Tabs defaultValue="acquisition" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 bg-slate-100">
                        <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
                        <TabsTrigger value="financing">Financing</TabsTrigger>
                        <TabsTrigger value="operations">Operations</TabsTrigger>
                        <TabsTrigger value="exit">Exit</TabsTrigger>
                      </TabsList>

                      <TabsContent value="acquisition" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-slate-600">Purchase Price</Label>
                            <Input defaultValue="$14,200,000" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Closing Costs</Label>
                            <Input defaultValue="$350,000" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Immediate CapEx</Label>
                            <Input defaultValue="$650,000" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Reserves</Label>
                            <Input defaultValue="$300,000" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Total Units</Label>
                            <Input defaultValue="144" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Purchase Price / Unit</Label>
                            <Input defaultValue="$98,611" className="mt-1" disabled />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="financing" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-slate-600">LTV Ratio</Label>
                            <Input defaultValue="65%" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Loan Amount</Label>
                            <Input defaultValue="$8,625,000" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Interest Rate</Label>
                            <Input defaultValue="6.25%" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Loan Term</Label>
                            <Input defaultValue="30 years" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Amortization</Label>
                            <Input defaultValue="30 years" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Financing Fees</Label>
                            <Input defaultValue="$200,000" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Mezzanine Debt</Label>
                            <Input defaultValue="$1,575,000" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Mezz Interest Rate</Label>
                            <Input defaultValue="12.0%" className="mt-1" />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="operations" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-slate-600">Rent Growth (Annual)</Label>
                            <Input defaultValue="3.5%" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Vacancy Rate</Label>
                            <Input defaultValue="5.0%" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">OpEx Growth (Annual)</Label>
                            <Input defaultValue="3.0%" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Current OpEx Ratio</Label>
                            <Input defaultValue="50%" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Management Fee</Label>
                            <Input defaultValue="3.5%" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Annual CapEx Reserve</Label>
                            <Input defaultValue="$300/unit" className="mt-1" />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="exit" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-slate-600">Hold Period</Label>
                            <Input defaultValue="5 years" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Exit Cap Rate</Label>
                            <Input defaultValue="5.5%" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Disposition Costs</Label>
                            <Input defaultValue="2.0%" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-slate-600">Projected Exit NOI</Label>
                            <Input defaultValue="$1,861,000" className="mt-1" disabled />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                )}
              </Card>

              {/* SECTION 2: PRO FORMA / CASH FLOW */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection('proForma')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-50">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-slate-900">Pro Forma Cash Flow</CardTitle>
                        <CardDescription>Year-by-year financial projections</CardDescription>
                      </div>
                    </div>
                    {expandedSections.proForma ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </CardHeader>
                {expandedSections.proForma && (
                  <CardContent>
                    <div className="mb-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={proFormaData}>
                          <defs>
                            <linearGradient id="colorNOI" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
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
                          <Area type="monotone" dataKey="noi" stroke="#3b82f6" fill="url(#colorNOI)" />
                          <Bar dataKey="leveredCF" fill="#10b981" />
                          <Line type="monotone" dataKey="debtService" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="text-left py-3 px-3 text-slate-600">Item</th>
                            <th className="text-right py-3 px-3 text-slate-600">Year 1</th>
                            <th className="text-right py-3 px-3 text-slate-600">Year 2</th>
                            <th className="text-right py-3 px-3 text-slate-600">Year 3</th>
                            <th className="text-right py-3 px-3 text-slate-600">Year 4</th>
                            <th className="text-right py-3 px-3 text-slate-600">Year 5</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 px-3 text-slate-900">Gross Revenue</td>
                            {proFormaData.map((year, i) => (
                              <td key={i} className="text-right py-3 px-3 text-slate-700">
                                ${(year.revenue / 1000000).toFixed(2)}M
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 px-3 text-slate-900">Operating Expenses</td>
                            {proFormaData.map((year, i) => (
                              <td key={i} className="text-right py-3 px-3 text-slate-700">
                                ${(year.opex / 1000000).toFixed(2)}M
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-slate-200 bg-blue-50">
                            <td className="py-3 px-3 text-slate-900">NOI</td>
                            {proFormaData.map((year, i) => (
                              <td key={i} className="text-right py-3 px-3 text-blue-700">
                                ${(year.noi / 1000000).toFixed(2)}M
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 px-3 text-slate-900">Debt Service</td>
                            {proFormaData.map((year, i) => (
                              <td key={i} className="text-right py-3 px-3 text-red-600">
                                -${(year.debtService / 1000000).toFixed(2)}M
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 px-3 text-slate-900">CapEx</td>
                            {proFormaData.map((year, i) => (
                              <td key={i} className="text-right py-3 px-3 text-red-600">
                                -${(year.capex / 1000).toFixed(0)}K
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-slate-200 bg-green-50">
                            <td className="py-3 px-3 text-slate-900">Levered Cash Flow</td>
                            {proFormaData.map((year, i) => (
                              <td key={i} className="text-right py-3 px-3 text-green-700">
                                ${(year.leveredCF / 1000).toFixed(0)}K
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 px-3 text-slate-900">Unlevered Cash Flow</td>
                            {proFormaData.map((year, i) => (
                              <td key={i} className="text-right py-3 px-3 text-slate-700">
                                ${(year.unleveredCF / 1000000).toFixed(2)}M
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* SECTION 3: KEY METRICS & RETURNS */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection('metrics')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-50">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-slate-900">Key Metrics & Returns</CardTitle>
                        <CardDescription>Calculated investment performance indicators</CardDescription>
                      </div>
                    </div>
                    {expandedSections.metrics ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </CardHeader>
                {expandedSections.metrics && (
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <CardContent className="p-4">
                          <div className="text-xs text-slate-600 mb-1">Levered IRR</div>
                          <div className="text-3xl text-blue-700 mb-1">17.5%</div>
                          <div className="text-xs text-green-600 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Above Target (15%)
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
                        <CardContent className="p-4">
                          <div className="text-xs text-slate-600 mb-1">Equity Multiple</div>
                          <div className="text-3xl text-cyan-700 mb-1">2.4x</div>
                          <div className="text-xs text-slate-500">5-Year Hold</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <CardContent className="p-4">
                          <div className="text-xs text-slate-600 mb-1">Avg CoC Return</div>
                          <div className="text-3xl text-purple-700 mb-1">8.7%</div>
                          <div className="text-xs text-slate-500">Average Annual</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <CardContent className="p-4">
                          <div className="text-xs text-slate-600 mb-1">NPV @ 12%</div>
                          <div className="text-3xl text-green-700 mb-1">$2.8M</div>
                          <div className="text-xs text-slate-500">Positive Value</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-xs text-slate-600 mb-2">Peak Equity</div>
                        <div className="text-xl text-slate-900">$5.5M</div>
                        <div className="text-xs text-slate-500 mt-1">At Acquisition</div>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-xs text-slate-600 mb-2">Avg DSCR</div>
                        <div className="text-xl text-slate-900">1.68x</div>
                        <div className="text-xs text-green-600 mt-1">Healthy Coverage</div>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-xs text-slate-600 mb-2">LTV / LTC</div>
                        <div className="text-xl text-slate-900">65% / 57%</div>
                        <div className="text-xs text-slate-500 mt-1">Conservative</div>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-xs text-slate-600 mb-2">Operating Expense Ratio</div>
                        <div className="text-xl text-slate-900">50.0%</div>
                        <div className="text-xs text-slate-500 mt-1">Within Target</div>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-xs text-slate-600 mb-2">Breakeven Occupancy</div>
                        <div className="text-xl text-slate-900">82.5%</div>
                        <div className="text-xs text-green-600 mt-1">Strong Buffer</div>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-xs text-slate-600 mb-2">Return on Cost</div>
                        <div className="text-xl text-slate-900">9.6%</div>
                        <div className="text-xs text-slate-500 mt-1">Year 1</div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* SECTION 4: SENSITIVITY ANALYSIS */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection('sensitivity')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-50">
                        <Activity className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <CardTitle className="text-slate-900">Sensitivity Analysis</CardTitle>
                        <CardDescription>IRR sensitivity to exit cap rate and rent growth</CardDescription>
                      </div>
                    </div>
                    {expandedSections.sensitivity ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </CardHeader>
                {expandedSections.sensitivity && (
                  <CardContent>
                    <div className="mb-4 text-sm text-slate-600">
                      IRR Sensitivity Matrix (Exit Cap Rate vs. Annual Rent Growth)
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border border-slate-200">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-200">
                            <th className="py-3 px-4 text-left text-slate-700">Exit Cap</th>
                            <th className="py-3 px-4 text-center text-slate-700">2.0% Growth</th>
                            <th className="py-3 px-4 text-center text-slate-700">3.0% Growth</th>
                            <th className="py-3 px-4 text-center text-slate-700">4.0% Growth</th>
                            <th className="py-3 px-4 text-center text-slate-700">5.0% Growth</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sensitivityMatrix.map((row, index) => (
                            <tr key={index} className="border-b border-slate-100">
                              <td className="py-3 px-4 text-slate-900">{row.exitCap}</td>
                              <td className={`py-3 px-4 text-center ${
                                parseFloat(row.rentGrowth2) >= 15 ? 'bg-green-50 text-green-700' : 
                                parseFloat(row.rentGrowth2) >= 12 ? 'bg-yellow-50 text-yellow-700' : 
                                'bg-red-50 text-red-700'
                              }`}>
                                {row.rentGrowth2}
                              </td>
                              <td className={`py-3 px-4 text-center ${
                                parseFloat(row.rentGrowth3) >= 15 ? 'bg-green-50 text-green-700' : 
                                parseFloat(row.rentGrowth3) >= 12 ? 'bg-yellow-50 text-yellow-700' : 
                                'bg-red-50 text-red-700'
                              }`}>
                                {row.rentGrowth3}
                              </td>
                              <td className={`py-3 px-4 text-center ${
                                parseFloat(row.rentGrowth4) >= 15 ? 'bg-green-50 text-green-700' : 
                                parseFloat(row.rentGrowth4) >= 12 ? 'bg-yellow-50 text-yellow-700' : 
                                'bg-red-50 text-red-700'
                              }`}>
                                {row.rentGrowth4}
                              </td>
                              <td className={`py-3 px-4 text-center ${
                                parseFloat(row.rentGrowth5) >= 15 ? 'bg-green-50 text-green-700' : 
                                parseFloat(row.rentGrowth5) >= 12 ? 'bg-yellow-50 text-yellow-700' : 
                                'bg-red-50 text-red-700'
                              }`}>
                                {row.rentGrowth5}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 flex items-center gap-6 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-50 border border-green-200"></div>
                        <span className="text-slate-600">Strong (≥15%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-yellow-50 border border-yellow-200"></div>
                        <span className="text-slate-600">Acceptable (12-15%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-50 border border-red-200"></div>
                        <span className="text-slate-600">Below Target (&lt;12%)</span>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* SECTION 5: SOURCES & USES */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection('sourcesUses')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-50">
                        <DollarSign className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <CardTitle className="text-slate-900">Sources & Uses</CardTitle>
                        <CardDescription>Capital stack breakdown</CardDescription>
                      </div>
                    </div>
                    {expandedSections.sourcesUses ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </CardHeader>
                {expandedSections.sourcesUses && (
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Sources */}
                      <div>
                        <h4 className="text-sm text-slate-900 mb-4">Sources of Funds</h4>
                        <div className="space-y-3 mb-4">
                          {sourcesData.map((source, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-700">{source.category}</span>
                                <span className="text-slate-900">${(source.amount / 1000000).toFixed(2)}M</span>
                              </div>
                              <Progress value={source.percentage} className="h-2" />
                              <div className="text-xs text-slate-500">{source.percentage}% of total</div>
                            </div>
                          ))}
                        </div>
                        <div className="pt-3 border-t border-slate-200">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-900">Total Sources</span>
                            <span className="text-slate-900">
                              ${(sourcesData.reduce((sum, s) => sum + s.amount, 0) / 1000000).toFixed(2)}M
                            </span>
                          </div>
                        </div>

                        {/* Capital Stack Visualization */}
                        <div className="mt-6">
                          <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                              <Pie
                                data={capitalStackPie}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                {capitalStackPie.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Uses */}
                      <div>
                        <h4 className="text-sm text-slate-900 mb-4">Uses of Funds</h4>
                        <div className="space-y-3 mb-4">
                          {usesData.map((use, index) => (
                            <div key={index} className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                              <span className="text-sm text-slate-700">{use.category}</span>
                              <span className="text-sm text-slate-900">${(use.amount / 1000000).toFixed(2)}M</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-3 border-t border-slate-200">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-900">Total Uses</span>
                            <span className="text-slate-900">
                              ${(usesData.reduce((sum, u) => sum + u.amount, 0) / 1000000).toFixed(2)}M
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* SECTION 6: MARKET DUE DILIGENCE */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection('marketData')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-50">
                        <MapPin className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <CardTitle className="text-slate-900">Market Due Diligence</CardTitle>
                        <CardDescription>Demographics, comps, and economic trends</CardDescription>
                      </div>
                    </div>
                    {expandedSections.marketData ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </CardHeader>
                {expandedSections.marketData && (
                  <CardContent>
                    {/* Data Integration Options */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-blue-100">
                              <Activity className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm text-slate-900 mb-1">API Integration</div>
                              <div className="text-xs text-slate-600">ESRI, Census data auto-updated</div>
                              <Badge className="mt-2 bg-green-500 text-white text-xs">Active</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-purple-50 border-purple-200">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-purple-100">
                              <Bot className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                              <div className="text-sm text-slate-900 mb-1">RPA Automation</div>
                              <div className="text-xs text-slate-600">CoStar comps via bot</div>
                              <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                                <Play className="w-3 h-3 mr-1" />
                                Run CoStar Bot
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-orange-50 border-orange-200">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-orange-100">
                              <FileSpreadsheet className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                              <div className="text-sm text-slate-900 mb-1">Manual Upload</div>
                              <div className="text-xs text-slate-600">Import market reports</div>
                              <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                                <Upload className="w-3 h-3 mr-1" />
                                Upload File
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Tabs defaultValue="demographics" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 bg-slate-100">
                        <TabsTrigger value="demographics">Demographics</TabsTrigger>
                        <TabsTrigger value="comps">Comps Data</TabsTrigger>
                        <TabsTrigger value="economic">Economic</TabsTrigger>
                      </TabsList>

                      <TabsContent value="demographics" className="space-y-6 mt-4">
                        {/* Population Trend */}
                        <div>
                          <h4 className="text-sm text-slate-900 mb-3">Population Growth Trend</h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={populationTrend}>
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
                                dataKey="population"
                                stroke="#06b6d4"
                                strokeWidth={2}
                                dot={{ fill: '#06b6d4', r: 4 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                          <div className="mt-2 text-xs text-slate-600">
                            <Badge className="bg-blue-500 text-white">API Source: ESRI Demographics</Badge>
                          </div>
                        </div>

                        {/* Median Income Trend */}
                        <div>
                          <h4 className="text-sm text-slate-900 mb-3">Median Household Income Trend</h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={incomeTrend}>
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
                              <Bar dataKey="income" fill="#10b981" />
                            </BarChart>
                          </ResponsiveContainer>
                          <div className="mt-2 text-xs text-slate-600">
                            <Badge className="bg-blue-500 text-white">API Source: US Census Bureau</Badge>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="comps" className="space-y-4 mt-4">
                        <Alert className="bg-purple-50 border-purple-200">
                          <Bot className="w-4 h-4 text-purple-600" />
                          <AlertDescription className="text-sm text-slate-700">
                            <div className="mb-2">CoStar RPA Bot Status: Ready</div>
                            <div className="text-xs text-slate-600 mb-3">
                              Bot will log into your CoStar account, run rent & sales comp reports for this property, 
                              and extract key metrics automatically.
                            </div>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                              <Play className="w-4 h-4 mr-2" />
                              Run Automated CoStar Comps
                            </Button>
                          </AlertDescription>
                        </Alert>

                        {/* Extracted Comp Data */}
                        <div className="grid grid-cols-2 gap-4">
                          <Card className="bg-slate-50 border-slate-200">
                            <CardContent className="p-4">
                              <div className="text-xs text-slate-600 mb-2">Avg. Rent Comp (3-Mile)</div>
                              <div className="text-2xl text-slate-900 mb-1">$1.42/SF</div>
                              <div className="text-xs text-green-600">+2.3% YoY</div>
                              <div className="text-xs text-slate-500 mt-2">Based on 12 comps</div>
                            </CardContent>
                          </Card>

                          <Card className="bg-slate-50 border-slate-200">
                            <CardContent className="p-4">
                              <div className="text-xs text-slate-600 mb-2">Avg. Sales Comp</div>
                              <div className="text-2xl text-slate-900 mb-1">$105K/Unit</div>
                              <div className="text-xs text-green-600">+8.1% YoY</div>
                              <div className="text-xs text-slate-500 mt-2">Based on 7 sales</div>
                            </CardContent>
                          </Card>

                          <Card className="bg-slate-50 border-slate-200">
                            <CardContent className="p-4">
                              <div className="text-xs text-slate-600 mb-2">Submarket Vacancy</div>
                              <div className="text-2xl text-slate-900 mb-1">4.2%</div>
                              <div className="text-xs text-green-600">Tightening</div>
                              <div className="text-xs text-slate-500 mt-2">Q3 2025</div>
                            </CardContent>
                          </Card>

                          <Card className="bg-slate-50 border-slate-200">
                            <CardContent className="p-4">
                              <div className="text-xs text-slate-600 mb-2">Market Rent Growth</div>
                              <div className="text-2xl text-slate-900 mb-1">3.8%</div>
                              <div className="text-xs text-slate-600">Trailing 12mo</div>
                              <div className="text-xs text-slate-500 mt-2">Projected: 3.2%</div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="mt-4">
                          <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Full CoStar Report
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="economic" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Card className="bg-slate-50 border-slate-200">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <TrendingDown className="w-5 h-5 text-green-600" />
                                <div>
                                  <div className="text-xs text-slate-600 mb-1">Unemployment Rate</div>
                                  <div className="text-2xl text-slate-900 mb-1">3.2%</div>
                                  <div className="text-xs text-green-600">↓ 0.3% vs last year</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-slate-50 border-slate-200">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <Briefcase className="w-5 h-5 text-blue-600" />
                                <div>
                                  <div className="text-xs text-slate-600 mb-1">Job Growth</div>
                                  <div className="text-2xl text-slate-900 mb-1">+2.8%</div>
                                  <div className="text-xs text-blue-600">Strong expansion</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Major Employers */}
                        <div>
                          <h4 className="text-sm text-slate-900 mb-3">Major Employers (5-Mile Radius)</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                              <div className="flex items-center gap-3">
                                <Users className="w-4 h-4 text-slate-400" />
                                <div>
                                  <div className="text-sm text-slate-900">Duke Health System</div>
                                  <div className="text-xs text-slate-600">Healthcare</div>
                                </div>
                              </div>
                              <span className="text-sm text-slate-700">18,500 employees</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                              <div className="flex items-center gap-3">
                                <Users className="w-4 h-4 text-slate-400" />
                                <div>
                                  <div className="text-sm text-slate-900">IBM</div>
                                  <div className="text-xs text-slate-600">Technology</div>
                                </div>
                              </div>
                              <span className="text-sm text-slate-700">11,200 employees</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                              <div className="flex items-center gap-3">
                                <Users className="w-4 h-4 text-slate-400" />
                                <div>
                                  <div className="text-sm text-slate-900">Fidelity Investments</div>
                                  <div className="text-xs text-slate-600">Financial Services</div>
                                </div>
                              </div>
                              <span className="text-sm text-slate-700">8,700 employees</span>
                            </div>
                          </div>
                        </div>

                        {/* Recent Economic News */}
                        <div>
                          <h4 className="text-sm text-slate-900 mb-3">Recent Economic News</h4>
                          <Alert className="bg-blue-50 border-blue-200">
                            <AlertCircle className="w-4 h-4 text-blue-600" />
                            <AlertDescription className="text-sm text-slate-700">
                              <div className="mb-1">AI-Summarized Market Intelligence:</div>
                              <div className="text-xs text-slate-600">
                                • Amazon announced 2,500-person fulfillment center expansion (Q2 2025)<br/>
                                • Apple expanding RTP campus by 3,000 jobs over next 3 years<br/>
                                • Durham City Council approved $150M infrastructure improvements
                              </div>
                            </AlertDescription>
                          </Alert>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                )}
              </Card>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
