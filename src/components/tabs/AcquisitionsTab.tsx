import { useState } from 'react';
import { Plus, Filter, MapPin, Calendar, DollarSign, User, TrendingUp, Phone, Mail, FileText, MessageSquare, GripVertical, LayoutGrid, List, Target, Clock, BarChart3, Flame, Snowflake, Building2, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

type DealStage = 'sourcing' | 'initial-review' | 'underwriting' | 'loi' | 'due-diligence' | 'psa' | 'closed' | 'dead';
type ViewMode = 'kanban' | 'table';
type PipelineType = 'acquisitions' | 'home-sales';

interface Deal {
  id: number;
  address: string;
  city: string;
  state: string;
  units: number;
  yearBuilt: number;
  askingPrice: number;
  stage: DealStage;
  status: 'on-track' | 'at-risk' | 'delayed';
  daysInStage: number;
  assetClass: string;
  assignedTo: string;
  dateEntered: string;
  nextActionDue: string;
  estimatedIRR: number;
  equityMultiple: number;
  temperature: 'hot' | 'warm' | 'cold';
  broker: string;
  brokerPhone: string;
  brokerEmail: string;
  notes: string;
}

const deals: Deal[] = [
  {
    id: 1,
    address: '123 Maple Street',
    city: 'Charlotte',
    state: 'NC',
    units: 96,
    yearBuilt: 2018,
    askingPrice: 12500000,
    stage: 'sourcing',
    status: 'on-track',
    daysInStage: 5,
    assetClass: 'Multi-Family',
    assignedTo: 'Sarah Chen',
    dateEntered: '2025-10-26',
    nextActionDue: '2025-11-02',
    estimatedIRR: 16.2,
    equityMultiple: 2.1,
    temperature: 'hot',
    broker: 'Michael Roberts',
    brokerPhone: '(704) 555-0123',
    brokerEmail: 'mroberts@commercialre.com',
    notes: 'Strong value-add opportunity in growing Charlotte submarket. Seller motivated.',
  },
  {
    id: 2,
    address: '456 Oak Avenue',
    city: 'Raleigh',
    state: 'NC',
    units: 124,
    yearBuilt: 2015,
    askingPrice: 15200000,
    stage: 'sourcing',
    status: 'on-track',
    daysInStage: 12,
    assetClass: 'Student Housing',
    assignedTo: 'James Wilson',
    dateEntered: '2025-10-19',
    nextActionDue: '2025-11-05',
    estimatedIRR: 14.8,
    equityMultiple: 1.9,
    temperature: 'warm',
    broker: 'Lisa Anderson',
    brokerPhone: '(919) 555-0456',
    brokerEmail: 'landerson@studhousing.com',
    notes: 'Adjacent to NC State campus. High occupancy rates.',
  },
  {
    id: 3,
    address: '789 Pine Boulevard',
    city: 'Durham',
    state: 'NC',
    units: 82,
    yearBuilt: 2020,
    askingPrice: 11800000,
    stage: 'initial-review',
    status: 'on-track',
    daysInStage: 8,
    assetClass: 'Multi-Family',
    assignedTo: 'Sarah Chen',
    dateEntered: '2025-10-23',
    nextActionDue: '2025-11-01',
    estimatedIRR: 15.5,
    equityMultiple: 2.0,
    temperature: 'hot',
    broker: 'David Park',
    brokerPhone: '(919) 555-0789',
    brokerEmail: 'dpark@cbrealty.com',
    notes: 'Class A property in excellent condition. Minor repositioning needed.',
  },
  {
    id: 4,
    address: '321 Elm Drive',
    city: 'Greensboro',
    state: 'NC',
    units: 156,
    yearBuilt: 2017,
    askingPrice: 18900000,
    stage: 'underwriting',
    status: 'at-risk',
    daysInStage: 22,
    assetClass: 'Multi-Family',
    assignedTo: 'James Wilson',
    dateEntered: '2025-10-09',
    nextActionDue: '2025-10-28',
    estimatedIRR: 13.2,
    equityMultiple: 1.7,
    temperature: 'cold',
    broker: 'Jennifer Lee',
    brokerPhone: '(336) 555-0234',
    brokerEmail: 'jlee@marcusrealty.com',
    notes: 'Concerns about submarket rent growth. Underwriting challenged by high expenses.',
  },
  {
    id: 5,
    address: '654 Cedar Lane',
    city: 'Asheville',
    state: 'NC',
    units: 68,
    yearBuilt: 2019,
    askingPrice: 9200000,
    stage: 'loi',
    status: 'on-track',
    daysInStage: 4,
    assetClass: 'Mixed-Use',
    assignedTo: 'Sarah Chen',
    dateEntered: '2025-10-27',
    nextActionDue: '2025-11-03',
    estimatedIRR: 17.8,
    equityMultiple: 2.3,
    temperature: 'hot',
    broker: 'Thomas Wright',
    brokerPhone: '(828) 555-0567',
    brokerEmail: 'twright@avlcommercial.com',
    notes: 'Premium mountain location. Strong retail component. LOI submitted 10/27.',
  },
  {
    id: 6,
    address: '987 Birch Court',
    city: 'Winston-Salem',
    state: 'NC',
    units: 142,
    yearBuilt: 2016,
    askingPrice: 16500000,
    stage: 'due-diligence',
    status: 'on-track',
    daysInStage: 15,
    assetClass: 'Multi-Family',
    assignedTo: 'Emily Rodriguez',
    dateEntered: '2025-10-16',
    nextActionDue: '2025-11-06',
    estimatedIRR: 15.9,
    equityMultiple: 2.0,
    temperature: 'warm',
    broker: 'Robert Taylor',
    brokerPhone: '(336) 555-0890',
    brokerEmail: 'rtaylor@colliers.com',
    notes: 'In due diligence. Environmental Phase I ordered. Property inspection scheduled 11/4.',
  },
  {
    id: 7,
    address: '147 Willow Way',
    city: 'Cary',
    state: 'NC',
    units: 98,
    yearBuilt: 2021,
    askingPrice: 14200000,
    stage: 'psa',
    status: 'delayed',
    daysInStage: 35,
    assetClass: 'Multi-Family',
    assignedTo: 'James Wilson',
    dateEntered: '2025-09-26',
    nextActionDue: '2025-11-15',
    estimatedIRR: 14.5,
    equityMultiple: 1.9,
    temperature: 'warm',
    broker: 'Patricia Martinez',
    brokerPhone: '(919) 555-0345',
    brokerEmail: 'pmartinez@jll.com',
    notes: 'PSA signed. Financing delayed due to bank review process. Lender requesting additional documentation.',
  },
  {
    id: 8,
    address: '2500 College Drive',
    city: 'Chapel Hill',
    state: 'NC',
    units: 220,
    yearBuilt: 2014,
    askingPrice: 28500000,
    stage: 'closed',
    status: 'on-track',
    daysInStage: 0,
    assetClass: 'Student Housing',
    assignedTo: 'Sarah Chen',
    dateEntered: '2025-06-15',
    nextActionDue: 'N/A',
    estimatedIRR: 18.3,
    equityMultiple: 2.4,
    temperature: 'hot',
    broker: 'Kevin Brown',
    brokerPhone: '(919) 555-0678',
    brokerEmail: 'kbrown@studentproperties.com',
    notes: 'Closed 10/28/25. Acquisition went smoothly. Asset management transition in progress.',
  },
];

const stages: { id: DealStage; label: string; color: string }[] = [
  { id: 'sourcing', label: 'Sourcing', color: 'bg-slate-600' },
  { id: 'initial-review', label: 'Initial Review', color: 'bg-blue-600' },
  { id: 'underwriting', label: 'Underwriting', color: 'bg-cyan-600' },
  { id: 'loi', label: 'LOI Sent', color: 'bg-indigo-600' },
  { id: 'due-diligence', label: 'Due Diligence', color: 'bg-purple-600' },
  { id: 'psa', label: 'PSA Signed', color: 'bg-violet-600' },
  { id: 'closed', label: 'Closed', color: 'bg-green-600' },
  { id: 'dead', label: 'Dead', color: 'bg-red-600' },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function AcquisitionsTab() {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [pipelineType, setPipelineType] = useState<PipelineType>('acquisitions');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const getDealsForStage = (stage: DealStage) => deals.filter(deal => deal.stage === stage);
  
  const totalDeals = deals.filter(d => d.stage !== 'closed' && d.stage !== 'dead').length;
  const totalValue = deals.filter(d => d.stage !== 'closed' && d.stage !== 'dead').reduce((sum, deal) => sum + deal.askingPrice, 0);
  const avgTimeInStage = Math.round(deals.filter(d => d.stage !== 'closed' && d.stage !== 'dead').reduce((sum, deal) => sum + deal.daysInStage, 0) / totalDeals);
  
  // Calculate conversion rate (closed / (closed + dead))
  const closedDeals = deals.filter(d => d.stage === 'closed').length;
  const deadDeals = deals.filter(d => d.stage === 'dead').length;
  const conversionRate = closedDeals + deadDeals > 0 ? Math.round((closedDeals / (closedDeals + deadDeals)) * 100) : 0;

  const openDealDetail = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="space-y-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-slate-900 mb-2">Deal Pipeline</h1>
          <p className="text-sm text-slate-600">Manage the entire acquisitions funnel from sourcing to closing</p>
        </div>
        <div className="flex gap-3">
          {/* Pipeline Type Selector */}
          <Tabs value={pipelineType} onValueChange={(v) => setPipelineType(v as PipelineType)} className="w-auto">
            <TabsList className="bg-slate-100">
              <TabsTrigger value="acquisitions" className="gap-2">
                <Building2 className="w-4 h-4" />
                Property Acquisitions
              </TabsTrigger>
              <TabsTrigger value="home-sales" className="gap-2">
                <Home className="w-4 h-4" />
                Home Sales
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* View Toggle */}
          <div className="flex border border-slate-300 rounded-lg overflow-hidden bg-white">
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className={viewMode === 'kanban' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-slate-700 hover:bg-slate-50'}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className={viewMode === 'table' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-slate-700 hover:bg-slate-50'}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md hover:shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add New Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-slate-600">Total Deals in Pipeline</div>
                <div className="text-2xl text-slate-900">{totalDeals}</div>
                <div className="text-xs text-slate-500 mt-0.5">Active opportunities</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-50">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xs text-slate-600">Total Pipeline Value</div>
                <div className="text-2xl text-slate-900">{formatCurrency(totalValue / 1000000)}M</div>
                <div className="text-xs text-slate-500 mt-0.5">Aggregate deal value</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-xs text-slate-600">Avg. Time in Stage</div>
                <div className="text-2xl text-slate-900">{avgTimeInStage} <span className="text-sm">days</span></div>
                <div className="text-xs text-slate-500 mt-0.5">Pipeline velocity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-50">
                <BarChart3 className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <div className="text-xs text-slate-600">Conversion Rate</div>
                <div className="text-2xl text-slate-900">{conversionRate}%</div>
                <div className="text-xs text-slate-500 mt-0.5">{closedDeals} closed / {closedDeals + deadDeals} total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Value by Stage */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {stages.map((stage) => {
          const stageDeals = getDealsForStage(stage.id);
          const totalValue = stageDeals.reduce((sum, deal) => sum + deal.askingPrice, 0);
          return (
            <Card key={stage.id} className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-3">
                <div className={`w-full h-1 rounded-full ${stage.color} mb-2`}></div>
                <div className="text-xs text-slate-600 mb-1">{stage.label}</div>
                <div className="text-lg text-slate-900">{stageDeals.length}</div>
                <div className="text-xs text-slate-500">{formatCurrency(totalValue / 1000000)}M</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageDeals = getDealsForStage(stage.id);
            return (
              <div key={stage.id} className="flex-shrink-0 w-[340px]">
                {/* Column Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-900">{stage.label}</h3>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                      {stageDeals.length}
                    </Badge>
                  </div>
                  <div className={`w-full h-1 rounded-full ${stage.color}`}></div>
                </div>

                {/* Deal Cards */}
                <div className="space-y-3">
                  {stageDeals.map((deal) => (
                    <Card
                      key={deal.id}
                      className="bg-white border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-move group"
                      onClick={() => openDealDetail(deal)}
                    >
                      <CardContent className="p-4">
                        {/* Drag Handle & Temperature Tag */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex gap-2">
                            <GripVertical className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {deal.temperature === 'hot' && (
                              <Badge className="bg-red-500 text-white gap-1 text-xs">
                                <Flame className="w-3 h-3" />
                                Hot
                              </Badge>
                            )}
                            {deal.temperature === 'cold' && (
                              <Badge className="bg-blue-300 text-blue-900 gap-1 text-xs">
                                <Snowflake className="w-3 h-3" />
                                Cold
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-slate-500">{deal.daysInStage}d</span>
                        </div>

                        {/* Property Info */}
                        <h4 className="text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {deal.address}
                        </h4>
                        <div className="text-xs text-slate-500 mb-3">{deal.city}, {deal.state}</div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between text-slate-600">
                            <span>{deal.units} Units</span>
                            <Badge variant="outline" className="text-xs">{deal.assetClass}</Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-slate-900 pt-2 border-t border-slate-200">
                            <DollarSign className="w-3.5 h-3.5 text-green-600" />
                            <span>{formatCurrency(deal.askingPrice)}</span>
                          </div>

                          {/* Key Metrics */}
                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                            <div>
                              <div className="text-xs text-slate-500">Est. IRR</div>
                              <div className="text-sm text-slate-900">{deal.estimatedIRR}%</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500">EM</div>
                              <div className="text-sm text-slate-900">{deal.equityMultiple}x</div>
                            </div>
                          </div>

                          {/* Assigned To */}
                          <div className="flex items-center gap-2 pt-2 border-t border-slate-200 text-xs text-slate-600">
                            <User className="w-3.5 h-3.5" />
                            <span>{deal.assignedTo}</span>
                          </div>

                          {/* Next Action */}
                          <div className="flex items-center gap-2 text-xs">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-600">Next: {new Date(deal.nextActionDue).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Empty State */}
                  {stageDeals.length === 0 && (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                      <div className="text-sm text-slate-500">No deals in this stage</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Asset Class</TableHead>
                  <TableHead>Asking Price</TableHead>
                  <TableHead>Est. IRR</TableHead>
                  <TableHead>EM</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Days in Stage</TableHead>
                  <TableHead>Temp</TableHead>
                  <TableHead>Next Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => {
                  const stage = stages.find(s => s.id === deal.stage);
                  return (
                    <TableRow 
                      key={deal.id} 
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => openDealDetail(deal)}
                    >
                      <TableCell>
                        <div>
                          <div className="text-sm text-slate-900">{deal.address}</div>
                          <div className="text-xs text-slate-500">{deal.city}, {deal.state}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${stage?.color} text-white`}>
                          {stage?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-900">{deal.units}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{deal.assetClass}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-900">{formatCurrency(deal.askingPrice)}</TableCell>
                      <TableCell className="text-slate-900">{deal.estimatedIRR}%</TableCell>
                      <TableCell className="text-slate-900">{deal.equityMultiple}x</TableCell>
                      <TableCell className="text-slate-600 text-sm">{deal.assignedTo}</TableCell>
                      <TableCell className="text-slate-600">{deal.daysInStage}d</TableCell>
                      <TableCell>
                        {deal.temperature === 'hot' && (
                          <Badge className="bg-red-500 text-white gap-1 text-xs">
                            <Flame className="w-3 h-3" />
                          </Badge>
                        )}
                        {deal.temperature === 'warm' && (
                          <Badge className="bg-orange-400 text-white text-xs">
                            Warm
                          </Badge>
                        )}
                        {deal.temperature === 'cold' && (
                          <Badge className="bg-blue-300 text-blue-900 gap-1 text-xs">
                            <Snowflake className="w-3 h-3" />
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">{new Date(deal.nextActionDue).toLocaleDateString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Deal Detail Dialog - CRM Integration */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedDeal?.address}</DialogTitle>
            <DialogDescription>
              {selectedDeal?.city}, {selectedDeal?.state} • {selectedDeal?.assetClass}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[calc(90vh-120px)] pr-4">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
                <TabsTrigger value="files">Files & Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-slate-600">Property Address</Label>
                    <div className="text-sm text-slate-900 mt-1">{selectedDeal?.address}</div>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">City, State</Label>
                    <div className="text-sm text-slate-900 mt-1">{selectedDeal?.city}, {selectedDeal?.state}</div>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Units</Label>
                    <div className="text-sm text-slate-900 mt-1">{selectedDeal?.units}</div>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Year Built</Label>
                    <div className="text-sm text-slate-900 mt-1">{selectedDeal?.yearBuilt}</div>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Asking Price</Label>
                    <div className="text-sm text-slate-900 mt-1">{selectedDeal && formatCurrency(selectedDeal.askingPrice)}</div>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Asset Class</Label>
                    <div className="text-sm text-slate-900 mt-1">{selectedDeal?.assetClass}</div>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Current Stage</Label>
                    <div className="mt-1">
                      <Badge className={`${stages.find(s => s.id === selectedDeal?.stage)?.color} text-white`}>
                        {stages.find(s => s.id === selectedDeal?.stage)?.label}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Days in Stage</Label>
                    <div className="text-sm text-slate-900 mt-1">{selectedDeal?.daysInStage} days</div>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Date Entered Pipeline</Label>
                    <div className="text-sm text-slate-900 mt-1">{selectedDeal && new Date(selectedDeal.dateEntered).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Next Action Due</Label>
                    <div className="text-sm text-slate-900 mt-1">{selectedDeal && new Date(selectedDeal.nextActionDue).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Assigned To</Label>
                    <div className="text-sm text-slate-900 mt-1">{selectedDeal?.assignedTo}</div>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Temperature</Label>
                    <div className="mt-1">
                      {selectedDeal?.temperature === 'hot' && (
                        <Badge className="bg-red-500 text-white gap-1">
                          <Flame className="w-3 h-3" />
                          Hot
                        </Badge>
                      )}
                      {selectedDeal?.temperature === 'warm' && (
                        <Badge className="bg-orange-400 text-white">Warm</Badge>
                      )}
                      {selectedDeal?.temperature === 'cold' && (
                        <Badge className="bg-blue-300 text-blue-900 gap-1">
                          <Snowflake className="w-3 h-3" />
                          Cold
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm text-slate-900 mb-3">Key Financial Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="text-xs text-slate-600 mb-1">Estimated IRR</div>
                        <div className="text-2xl text-slate-900">{selectedDeal?.estimatedIRR}%</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-4">
                        <div className="text-xs text-slate-600 mb-1">Equity Multiple</div>
                        <div className="text-2xl text-slate-900">{selectedDeal?.equityMultiple}x</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contacts" className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm text-slate-900 mb-3">Broker Information</h4>
                  <Card className="bg-slate-50 border-slate-200">
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <Label className="text-xs text-slate-600">Name</Label>
                        <div className="text-sm text-slate-900 mt-1">{selectedDeal?.broker}</div>
                      </div>
                      <div>
                        <Label className="text-xs text-slate-600">Phone</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <a href={`tel:${selectedDeal?.brokerPhone}`} className="text-sm text-blue-600 hover:underline">
                            {selectedDeal?.brokerPhone}
                          </a>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-slate-600">Email</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <a href={`mailto:${selectedDeal?.brokerEmail}`} className="text-sm text-blue-600 hover:underline">
                            {selectedDeal?.brokerEmail}
                          </a>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="communication" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Log Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Log Email
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Create Task
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm text-slate-900 mb-3">Communication Log</h4>
                    <div className="space-y-3">
                      <Card className="bg-slate-50 border-slate-200">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-blue-100">
                              <Phone className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm text-slate-900">Call with {selectedDeal?.broker}</div>
                              <div className="text-xs text-slate-600 mt-1">Discussed pricing and timeline. Seller firm on price.</div>
                              <div className="text-xs text-slate-500 mt-2">Oct 28, 2025 • Sarah Chen</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-50 border-slate-200">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-green-100">
                              <Mail className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm text-slate-900">Email: Request for financials</div>
                              <div className="text-xs text-slate-600 mt-1">Sent request for T-12, rent roll, and historical CapEx.</div>
                              <div className="text-xs text-slate-500 mt-2">Oct 25, 2025 • Sarah Chen</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="files" className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm text-slate-900 mb-3">Notes</h4>
                  <Card className="bg-slate-50 border-slate-200">
                    <CardContent className="p-4">
                      <p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedDeal?.notes}</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="text-sm text-slate-900 mb-3">Documents</h4>
                  <div className="space-y-2">
                    <Card className="bg-white border-slate-200 hover:bg-slate-50 cursor-pointer">
                      <CardContent className="p-3 flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div className="flex-1">
                          <div className="text-sm text-slate-900">Offering Memorandum.pdf</div>
                          <div className="text-xs text-slate-500">2.4 MB • Uploaded Oct 20, 2025</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-slate-200 hover:bg-slate-50 cursor-pointer">
                      <CardContent className="p-3 flex items-center gap-3">
                        <FileText className="w-5 h-5 text-green-600" />
                        <div className="flex-1">
                          <div className="text-sm text-slate-900">Rent_Roll_Q3_2025.xlsx</div>
                          <div className="text-xs text-slate-500">156 KB • Uploaded Oct 22, 2025</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Button variant="outline" className="w-full mt-3" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}