import { useState } from 'react';
import { Users, Mail, TrendingUp, DollarSign, Calendar, ExternalLink, FileText, Download, Filter, Search, Eye, CheckCircle2, Clock, XCircle, Send, Building2, Target, Zap, Phone, Tag, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Separator } from '../ui/separator';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

// Document Repository Data
const documents = [
  { id: 1, type: 'Quarterly Report', name: 'Q3 2025 Investor Report', investor: 'All Investors', property: 'Fund I', date: '2025-10-15', size: '2.4 MB' },
  { id: 2, type: 'Distribution Notice', name: 'October 2025 Distribution', investor: 'All Investors', property: 'Lakeview Apartments', date: '2025-10-01', size: '186 KB' },
  { id: 3, type: 'K-1', name: '2024 K-1 Tax Documents', investor: 'All Investors', property: 'Fund I', date: '2025-03-15', size: '1.8 MB' },
  { id: 4, type: 'Capital Call', name: 'Capital Call Notice - Series B', investor: 'Series B Investors', property: 'Fund I', date: '2025-09-20', size: '245 KB' },
  { id: 5, type: 'Subscription Docs', name: 'Fund I Subscription Agreement', investor: 'New Investors', property: 'Fund I', date: '2025-08-10', size: '3.1 MB' },
  { id: 6, type: 'Quarterly Report', name: 'Q2 2025 Investor Report', investor: 'All Investors', property: 'Fund I', date: '2025-07-15', size: '2.2 MB' },
  { id: 7, type: 'Distribution Notice', name: 'July 2025 Distribution', investor: 'All Investors', property: 'College Park Apts', date: '2025-07-01', size: '192 KB' },
  { id: 8, type: 'Quarterly Report', name: 'Q1 2025 Investor Report', investor: 'All Investors', property: 'Fund I', date: '2025-04-15', size: '2.3 MB' },
];

// Investor-Specific Data (Example: John Smith)
const investorPerformance = {
  name: 'John Smith',
  entity: 'Smith Family Office LLC',
  totalInvested: 2500000,
  currentValue: 3125000,
  totalDistributions: 485000,
  unrealizedGain: 625000,
  realizedGain: 485000,
  cocReturn: 19.4,
  equityMultiple: 1.44,
  irr: 16.8,
};

const investorDistributionHistory = [
  { date: '2025-10-01', property: 'Lakeview Apartments', type: 'Operating Distribution', amount: 42500 },
  { date: '2025-07-01', property: 'College Park Apts', type: 'Operating Distribution', amount: 38200 },
  { date: '2025-04-01', property: 'Lakeview Apartments', type: 'Operating Distribution', amount: 41800 },
  { date: '2025-01-01', property: 'Fund I Annual', type: 'Operating Distribution', amount: 95000 },
  { date: '2024-10-01', property: 'Lakeview Apartments', type: 'Operating Distribution', amount: 39500 },
  { date: '2024-07-15', property: 'Indian Trail (Exit)', type: 'Capital Distribution', amount: 227000 },
];

const capitalAccountSummary = {
  initialContribution: 2500000,
  additionalContributions: 0,
  distributions: -485000,
  unrealizedGainLoss: 625000,
  currentBalance: 2640000,
};

// Aggregate Capital Accounts (Internal View)
const aggregateCapitalAccounts = [
  { investor: 'Smith Family Office LLC', contributed: 2500000, distributed: -485000, unrealizedGL: 625000, balance: 2640000 },
  { investor: 'Johnson Investments', contributed: 1800000, distributed: -320000, unrealizedGL: 412000, balance: 1892000 },
  { investor: 'Chen Capital Partners', contributed: 3200000, distributed: -598000, unrealizedGL: 875000, balance: 3477000 },
  { investor: 'Davis Wealth Management', contributed: 1200000, distributed: -215000, unrealizedGL: 285000, balance: 1270000 },
  { investor: 'Taylor Holdings', contributed: 2100000, distributed: -385000, unrealizedGL: 518000, balance: 2233000 },
];

// Investor CRM Data
const investorCRM = [
  { id: 1, name: 'Robert Williams', email: 'robert@williamsgroup.com', phone: '(555) 234-5678', status: 'Active', lastContact: '2025-10-28', tags: ['High Net Worth', 'Repeat Investor'], segment: 'Tier 1' },
  { id: 2, name: 'Lisa Anderson', email: 'lisa@andersoncap.com', phone: '(555) 345-6789', status: 'Active', lastContact: '2025-10-25', tags: ['Family Office'], segment: 'Tier 1' },
  { id: 3, name: 'David Martinez', email: 'david.martinez@email.com', phone: '(555) 456-7890', status: 'Prospect', lastContact: '2025-10-20', tags: ['Accredited', 'First-Time'], segment: 'Tier 2' },
  { id: 4, name: 'Jennifer Lee', email: 'jlee@leecapital.com', phone: '(555) 567-8901', status: 'Active', lastContact: '2025-10-15', tags: ['Institutional'], segment: 'Tier 1' },
  { id: 5, name: 'Michael Brown', email: 'mbrown@brownwealth.com', phone: '(555) 678-9012', status: 'Prospect', lastContact: '2025-10-10', tags: ['High Net Worth'], segment: 'Tier 2' },
  { id: 6, name: 'Sarah Thompson', email: 'sarah@thompsoninv.com', phone: '(555) 789-0123', status: 'Inactive', lastContact: '2025-08-15', tags: ['Past Investor'], segment: 'Tier 3' },
  { id: 7, name: 'James Wilson', email: 'james.wilson@email.com', phone: '(555) 890-1234', status: 'Prospect', lastContact: '2025-10-22', tags: ['Accredited'], segment: 'Tier 2' },
];

// Fundraising Dashboard Data
const fundRaiseProgress = {
  dealName: 'Fund II - Multifamily Value-Add',
  target: 35000000,
  committed: 26500000,
  funded: 18200000,
};

const committedInvestors = [
  { name: 'Smith Family Office LLC', amount: 3000000, status: 'Funded', docsStatus: 'Complete' },
  { name: 'Chen Capital Partners', amount: 4500000, status: 'Funded', docsStatus: 'Complete' },
  { name: 'Johnson Investments', amount: 2500000, status: 'Docs Signed', docsStatus: 'Signed' },
  { name: 'Lee Capital', amount: 3200000, status: 'Funded', docsStatus: 'Complete' },
  { name: 'Anderson Capital', amount: 2800000, status: 'Docs Sent', docsStatus: 'Pending' },
  { name: 'Williams Group', amount: 3500000, status: 'Funded', docsStatus: 'Complete' },
  { name: 'Brown Wealth Management', amount: 2000000, status: 'Docs Signed', docsStatus: 'Signed' },
  { name: 'Taylor Holdings', amount: 2500000, status: 'Docs Sent', docsStatus: 'Pending' },
  { name: 'Martinez Investment Group', amount: 1500000, status: 'Committed', docsStatus: 'Not Sent' },
  { name: 'Thompson Investments', amount: 1000000, status: 'Committed', docsStatus: 'Not Sent' },
];

// Investor Pipeline (Kanban Stages)
const pipelineStages = ['Identified', 'Contacted', 'Pitched', 'Soft Commit', 'Hard Commit', 'Funded'];

const pipelineData = [
  { id: 1, name: 'Alice Cooper', company: 'Cooper Ventures', email: 'alice@coopervc.com', amount: 1200000, stage: 'Pitched', lastActivity: '2 days ago' },
  { id: 2, name: 'Tom Harrison', company: 'Harrison Holdings', email: 'tom@harrisonhold.com', amount: 800000, stage: 'Contacted', lastActivity: '5 days ago' },
  { id: 3, name: 'Nancy Green', company: 'Green Capital', email: 'nancy@greencap.com', amount: 2500000, stage: 'Soft Commit', lastActivity: '1 day ago' },
  { id: 4, name: 'Peter Zhang', company: 'Zhang Family Office', email: 'peter@zhangfo.com', amount: 1500000, stage: 'Hard Commit', lastActivity: '3 hours ago' },
  { id: 5, name: 'Emma Watson', company: 'Watson Wealth', email: 'emma@watsonwealth.com', amount: 900000, stage: 'Identified', lastActivity: '1 week ago' },
  { id: 6, name: 'Oliver King', company: 'King Investments', email: 'oliver@kinginv.com', amount: 1800000, stage: 'Pitched', lastActivity: '4 days ago' },
  { id: 7, name: 'Sophia Martin', company: 'Martin Capital', email: 'sophia@martincap.com', amount: 2200000, stage: 'Soft Commit', lastActivity: '2 days ago' },
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
  const [activeSection, setActiveSection] = useState('reporting');
  const [selectedInvestor, setSelectedInvestor] = useState('all');
  const [selectedPipelineStage, setSelectedPipelineStage] = useState<string | null>(null);

  const percentCommitted = (fundRaiseProgress.committed / fundRaiseProgress.target) * 100;
  const percentFunded = (fundRaiseProgress.funded / fundRaiseProgress.target) * 100;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-slate-900 mb-2">Investor Hub</h1>
          <p className="text-sm text-slate-600">Manage communications, reporting, and capital raising activities</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-50 text-blue-600 border-blue-200 px-3 py-1">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            CRM Connected
          </Badge>
          <Button variant="outline" className="border-slate-300 text-slate-700">
            <Mail className="w-4 h-4 mr-2" />
            Send Update
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md hover:shadow-lg">
            <Users className="w-4 h-4 mr-2" />
            Add Investor
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white border border-slate-200 h-auto p-1">
          <TabsTrigger value="reporting" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 flex items-center gap-2 py-3">
            <FileText className="w-5 h-5" />
            <span>Reporting & Existing Investors</span>
          </TabsTrigger>
          <TabsTrigger value="capital-raising" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 flex items-center gap-2 py-3">
            <Target className="w-5 h-5" />
            <span>Capital Raising & Investor CRM</span>
          </TabsTrigger>
        </TabsList>

        {/* SECTION 1: REPORTING & EXISTING INVESTORS */}
        <TabsContent value="reporting" className="space-y-6 mt-6">
          {/* Document Repository */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Document Repository</CardTitle>
                  <CardDescription>Secure, organized access to investor documents</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all-type">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-type">All Document Types</SelectItem>
                      <SelectItem value="quarterly">Quarterly Reports</SelectItem>
                      <SelectItem value="distribution">Distribution Notices</SelectItem>
                      <SelectItem value="capital-call">Capital Calls</SelectItem>
                      <SelectItem value="k1">K-1s</SelectItem>
                      <SelectItem value="subscription">Subscription Docs</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-property">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-property">All Properties/Funds</SelectItem>
                      <SelectItem value="fund1">Fund I</SelectItem>
                      <SelectItem value="lakeview">Lakeview Apartments</SelectItem>
                      <SelectItem value="college">College Park Apts</SelectItem>
                      <SelectItem value="indian">Indian Trail Property</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Investor Group</TableHead>
                    <TableHead>Property/Fund</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <Badge variant="outline" className="border-slate-300">{doc.type}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-900">{doc.name}</TableCell>
                      <TableCell className="text-slate-700">{doc.investor}</TableCell>
                      <TableCell className="text-slate-700">{doc.property}</TableCell>
                      <TableCell className="text-slate-600">{doc.date}</TableCell>
                      <TableCell className="text-slate-600">{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm" className="h-7 px-2">
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 px-2">
                            <Download className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Investor Selector for Dashboard View */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-600" />
                  <Label className="text-sm text-slate-700">Select Investor:</Label>
                </div>
                <Select value={selectedInvestor} onValueChange={setSelectedInvestor}>
                  <SelectTrigger className="w-[350px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Investors (Aggregate View)</SelectItem>
                    <Separator className="my-2" />
                    <SelectItem value="smith">Smith Family Office LLC</SelectItem>
                    <SelectItem value="johnson">Johnson Investments</SelectItem>
                    <SelectItem value="chen">Chen Capital Partners</SelectItem>
                    <SelectItem value="davis">Davis Wealth Management</SelectItem>
                    <SelectItem value="taylor">Taylor Holdings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Investor-Specific Dashboard View */}
          {selectedInvestor !== 'all' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-blue-50">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl text-slate-900">{investorPerformance.name}</h2>
                  <p className="text-sm text-slate-600">{investorPerformance.entity}</p>
                </div>
              </div>

              {/* Performance Highlights */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900">Performance Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                      <div className="text-xs text-slate-600 mb-1">Total Invested</div>
                      <div className="text-2xl text-blue-700">{formatCurrency(investorPerformance.totalInvested)}</div>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                      <div className="text-xs text-slate-600 mb-1">Current Value</div>
                      <div className="text-2xl text-green-700">{formatCurrency(investorPerformance.currentValue)}</div>
                      <div className="text-xs text-green-600 mt-1">
                        +{formatCurrency(investorPerformance.unrealizedGain)}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                      <div className="text-xs text-slate-600 mb-1">Total Distributions</div>
                      <div className="text-2xl text-purple-700">{formatCurrency(investorPerformance.totalDistributions)}</div>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200">
                      <div className="text-xs text-slate-600 mb-1">CoC Return</div>
                      <div className="text-2xl text-cyan-700">{investorPerformance.cocReturn}%</div>
                      <div className="text-xs text-slate-500 mt-1">Annualized</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-xs text-slate-600 mb-2">Equity Multiple</div>
                      <div className="text-xl text-slate-900">{investorPerformance.equityMultiple}x</div>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-xs text-slate-600 mb-2">IRR</div>
                      <div className="text-xl text-slate-900">{investorPerformance.irr}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Distribution History */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Distribution History</CardTitle>
                    <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Property</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {investorDistributionHistory.map((dist, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-slate-700">{dist.date}</TableCell>
                          <TableCell className="text-slate-700">{dist.property}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={dist.type.includes('Capital') ? 'border-green-300 text-green-700' : 'border-blue-300 text-blue-700'}
                            >
                              {dist.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-green-600">{formatCurrency(dist.amount)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Capital Account Summary */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900">Capital Account Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 rounded-lg bg-slate-50">
                      <span className="text-slate-700">Initial Contribution</span>
                      <span className="text-slate-900">{formatCurrency(capitalAccountSummary.initialContribution)}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-slate-50">
                      <span className="text-slate-700">Additional Contributions</span>
                      <span className="text-slate-900">{formatCurrency(capitalAccountSummary.additionalContributions)}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-slate-50">
                      <span className="text-slate-700">Total Distributions</span>
                      <span className="text-red-600">{formatCurrency(capitalAccountSummary.distributions)}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-slate-50">
                      <span className="text-slate-700">Unrealized Gain/Loss</span>
                      <span className="text-green-600">+{formatCurrency(capitalAccountSummary.unrealizedGainLoss)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <span className="text-slate-900">Current Capital Account Balance</span>
                      <span className="text-blue-700 text-xl">{formatCurrency(capitalAccountSummary.currentBalance)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Aggregate Capital Accounts View (Internal) */}
          {selectedInvestor === 'all' && (
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-900">Aggregate Capital Accounts</CardTitle>
                    <CardDescription>Internal view - Fund I capital account balances</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investor</TableHead>
                      <TableHead className="text-right">Contributed</TableHead>
                      <TableHead className="text-right">Distributed</TableHead>
                      <TableHead className="text-right">Unrealized G/L</TableHead>
                      <TableHead className="text-right">Current Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aggregateCapitalAccounts.map((account, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-slate-900">{account.investor}</TableCell>
                        <TableCell className="text-right text-slate-700">{formatCurrency(account.contributed)}</TableCell>
                        <TableCell className="text-right text-red-600">{formatCurrency(account.distributed)}</TableCell>
                        <TableCell className="text-right text-green-600">+{formatCurrency(account.unrealizedGL)}</TableCell>
                        <TableCell className="text-right text-blue-700">{formatCurrency(account.balance)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-slate-50 border-t-2 border-slate-300">
                      <TableCell className="text-slate-900">Total</TableCell>
                      <TableCell className="text-right text-slate-900">
                        {formatCurrency(aggregateCapitalAccounts.reduce((sum, acc) => sum + acc.contributed, 0))}
                      </TableCell>
                      <TableCell className="text-right text-red-600">
                        {formatCurrency(aggregateCapitalAccounts.reduce((sum, acc) => sum + acc.distributed, 0))}
                      </TableCell>
                      <TableCell className="text-right text-green-600">
                        +{formatCurrency(aggregateCapitalAccounts.reduce((sum, acc) => sum + acc.unrealizedGL, 0))}
                      </TableCell>
                      <TableCell className="text-right text-blue-700">
                        {formatCurrency(aggregateCapitalAccounts.reduce((sum, acc) => sum + acc.balance, 0))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* SECTION 2: CAPITAL RAISING & INVESTOR CRM */}
        <TabsContent value="capital-raising" className="space-y-6 mt-6">
          {/* Fundraising Dashboard */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">{fundRaiseProgress.dealName}</CardTitle>
              <CardDescription>Active capital raise progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Total Committed</div>
                    <div className="text-4xl text-slate-900">{formatCurrency(fundRaiseProgress.committed)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-600 mb-1">Target</div>
                    <div className="text-2xl text-slate-700">{formatCurrency(fundRaiseProgress.target)}</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Commitment Progress</span>
                    <span className="text-2xl text-blue-600">{percentCommitted.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentCommitted} className="h-3 mb-1" />
                  <div className="text-xs text-slate-500">
                    {formatCurrency(fundRaiseProgress.target - fundRaiseProgress.committed)} remaining to target
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Funding Progress</span>
                    <span className="text-2xl text-green-600">{percentFunded.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentFunded} className="h-3 mb-1" />
                  <div className="text-xs text-slate-500">
                    {formatCurrency(fundRaiseProgress.funded)} funded • {formatCurrency(fundRaiseProgress.committed - fundRaiseProgress.funded)} pending
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="text-sm text-slate-600 mb-1">Committed</div>
                    <div className="text-xl text-blue-600">{formatCurrency(fundRaiseProgress.committed)}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                    <div className="text-sm text-slate-600 mb-1">Funded</div>
                    <div className="text-xl text-green-600">{formatCurrency(fundRaiseProgress.funded)}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-sm text-slate-600 mb-1">Remaining</div>
                    <div className="text-xl text-slate-700">{formatCurrency(fundRaiseProgress.target - fundRaiseProgress.committed)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Committed Investors List */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Committed Investors</CardTitle>
              <CardDescription>Track funding status and documentation progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Investor</TableHead>
                    <TableHead className="text-right">Commitment Amount</TableHead>
                    <TableHead>Funding Status</TableHead>
                    <TableHead>Docs Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {committedInvestors.map((investor, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-slate-900">{investor.name}</TableCell>
                      <TableCell className="text-right text-slate-900">{formatCurrency(investor.amount)}</TableCell>
                      <TableCell>
                        {investor.status === 'Funded' && (
                          <Badge className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Funded
                          </Badge>
                        )}
                        {investor.status === 'Docs Signed' && (
                          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                            <Clock className="w-3 h-3 mr-1" />
                            Docs Signed
                          </Badge>
                        )}
                        {investor.status === 'Docs Sent' && (
                          <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            <Send className="w-3 h-3 mr-1" />
                            Docs Sent
                          </Badge>
                        )}
                        {investor.status === 'Committed' && (
                          <Badge variant="outline" className="border-slate-300">Committed</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {investor.docsStatus === 'Complete' && (
                          <Badge className="bg-green-500 text-white">Complete</Badge>
                        )}
                        {investor.docsStatus === 'Signed' && (
                          <Badge className="bg-blue-500 text-white">Signed</Badge>
                        )}
                        {investor.docsStatus === 'Pending' && (
                          <Badge className="bg-yellow-500 text-white">Pending</Badge>
                        )}
                        {investor.docsStatus === 'Not Sent' && (
                          <Badge className="bg-slate-400 text-white">Not Sent</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Investor CRM View */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Investor CRM</CardTitle>
                  <CardDescription>Manage potential and current investor relationships</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Search investors..." className="pl-9 w-[250px]" />
                  </div>
                  <Select defaultValue="all-status">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-status">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge className="bg-blue-50 text-blue-600 border-blue-200 px-3 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    Synced from CRM
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Segment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investorCRM.map((contact) => (
                    <TableRow key={contact.id} className="cursor-pointer hover:bg-slate-50">
                      <TableCell className="text-slate-900">{contact.name}</TableCell>
                      <TableCell>
                        <div className="text-sm text-slate-700">{contact.email}</div>
                        <div className="text-xs text-slate-500">{contact.phone}</div>
                      </TableCell>
                      <TableCell>
                        {contact.status === 'Active' && (
                          <Badge className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                        )}
                        {contact.status === 'Prospect' && (
                          <Badge className="bg-blue-50 text-blue-700 border-blue-200">Prospect</Badge>
                        )}
                        {contact.status === 'Inactive' && (
                          <Badge variant="outline" className="border-slate-300">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600">{contact.lastContact}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {contact.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="border-slate-300 text-xs">
                              <Tag className="w-2.5 h-2.5 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            contact.segment === 'Tier 1' ? 'border-purple-300 text-purple-700' :
                            contact.segment === 'Tier 2' ? 'border-blue-300 text-blue-700' :
                            'border-slate-300 text-slate-700'
                          }
                        >
                          {contact.segment}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                          Open CRM
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Investor Pipeline (Kanban) */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Investor Pipeline (Kanban View)</CardTitle>
              <CardDescription>Track potential investors through the investment journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-4">
                {pipelineStages.map((stage) => {
                  const stageInvestors = pipelineData.filter(inv => inv.stage === stage);
                  const stageTotal = stageInvestors.reduce((sum, inv) => sum + inv.amount, 0);
                  
                  return (
                    <div key={stage} className="space-y-3">
                      <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                        <div className="text-xs text-slate-700 mb-1">{stage}</div>
                        <div className="text-lg text-slate-900">{stageInvestors.length}</div>
                        <div className="text-xs text-slate-600 mt-1">{formatCurrency(stageTotal)}</div>
                      </div>
                      <div className="space-y-2">
                        {stageInvestors.map((investor) => (
                          <div 
                            key={investor.id} 
                            className="p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                          >
                            <div className="text-sm text-slate-900 mb-1">{investor.name}</div>
                            <div className="text-xs text-slate-600 mb-2">{investor.company}</div>
                            <div className="text-sm text-green-600 mb-2">{formatCurrency(investor.amount)}</div>
                            <div className="text-xs text-slate-500">{investor.lastActivity}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
