import { Plus, Filter, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

type DealStage = 'sourcing' | 'underwriting' | 'loi' | 'psa' | 'closed';

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
  },
  {
    id: 3,
    address: '789 Pine Boulevard',
    city: 'Durham',
    state: 'NC',
    units: 82,
    yearBuilt: 2020,
    askingPrice: 11800000,
    stage: 'underwriting',
    status: 'on-track',
    daysInStage: 8,
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
  },
  {
    id: 6,
    address: '987 Birch Court',
    city: 'Winston-Salem',
    state: 'NC',
    units: 142,
    yearBuilt: 2016,
    askingPrice: 16500000,
    stage: 'psa',
    status: 'on-track',
    daysInStage: 15,
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
  },
];

const stages: { id: DealStage; label: string; color: string }[] = [
  { id: 'sourcing', label: 'Sourcing', color: 'bg-slate-700' },
  { id: 'underwriting', label: 'Underwriting', color: 'bg-blue-600' },
  { id: 'loi', label: 'LOI Submitted', color: 'bg-cyan-600' },
  { id: 'psa', label: 'PSA Executed', color: 'bg-purple-600' },
  { id: 'closed', label: 'Closed', color: 'bg-green-600' },
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
  const getDealsForStage = (stage: DealStage) => deals.filter(deal => deal.stage === stage);

  return (
    <div className="space-y-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-slate-900 mb-2">Deal Flow Pipeline</h1>
          <p className="text-sm text-slate-600">Track and manage acquisition opportunities</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md hover:shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add New Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-5 gap-4">
        {stages.map((stage) => {
          const stageDeals = getDealsForStage(stage.id);
          const totalValue = stageDeals.reduce((sum, deal) => sum + deal.askingPrice, 0);
          return (
            <Card key={stage.id} className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-4">
                <div className={`w-full h-1 rounded-full ${stage.color} mb-3`}></div>
                <div className="text-sm text-slate-600 mb-1">{stage.label}</div>
                <div className="text-2xl text-slate-900 mb-1">{stageDeals.length}</div>
                <div className="text-xs text-slate-500">{formatCurrency(totalValue)}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageDeals = getDealsForStage(stage.id);
          return (
            <div key={stage.id} className="flex-shrink-0 w-[320px]">
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
                    className="bg-white border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <CardContent className="p-4">
                      {/* Status Badge */}
                      <div className="flex items-start justify-between mb-3">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            deal.status === 'on-track'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : deal.status === 'at-risk'
                              ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                              : 'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          {deal.status === 'on-track' ? 'On Track' : deal.status === 'at-risk' ? 'At Risk' : 'Delayed'}
                        </Badge>
                        <span className="text-xs text-slate-500">{deal.daysInStage}d</span>
                      </div>

                      {/* Property Info */}
                      <h4 className="text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {deal.address}
                      </h4>
                      
                      <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{deal.city}, {deal.state}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>{deal.units} Units</span>
                          <span className="text-xs">Built {deal.yearBuilt}</span>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                          <DollarSign className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-slate-900">{formatCurrency(deal.askingPrice)}</span>
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
    </div>
  );
}
