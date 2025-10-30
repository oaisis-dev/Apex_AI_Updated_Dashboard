import { useState } from 'react';
import { Bell, User, HelpCircle } from 'lucide-react';
import DashboardTab from './components/tabs/DashboardTab';
import AcquisitionsTab from './components/tabs/AcquisitionsTab';
import UnderwritingTab from './components/tabs/UnderwritingTab';
import AssetManagementTab from './components/tabs/AssetManagementTab';
import InvestorRelationsTab from './components/tabs/InvestorRelationsTab';
import IntegrationsTab from './components/tabs/IntegrationsTab';
import apexLogo from 'figma:asset/abc35a65dfe1f34d2736048577fab56eb84d5e42.png';

type TabType = 'dashboard' | 'acquisitions' | 'underwriting' | 'asset-management' | 'investor-relations' | 'integrations';

const tabs = [
  { id: 'dashboard' as TabType, label: 'Dashboard', subtitle: 'Portfolio Overview' },
  { id: 'acquisitions' as TabType, label: 'Acquisitions', subtitle: 'Deal Sourcing & CRM' },
  { id: 'underwriting' as TabType, label: 'Underwriting', subtitle: 'Deal Analysis' },
  { id: 'asset-management' as TabType, label: 'Asset Management', subtitle: 'Portfolio Operations' },
  { id: 'investor-relations' as TabType, label: 'Investor Relations', subtitle: 'Capital Raising & Reporting' },
  { id: 'integrations' as TabType, label: 'Integrations', subtitle: 'System Connectivity Hub' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src={apexLogo} alt="Apex AI" className="h-10 w-auto" />
              <div className="h-8 w-px bg-slate-300" />
              <div>
                <div className="text-slate-900 tracking-wide">APEX OS</div>
                <div className="text-xs text-slate-500">Command Center</div>
              </div>
            </div>

            {/* Right Menu */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors relative">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <HelpCircle className="w-5 h-5 text-slate-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <User className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex gap-1">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`relative px-6 py-3 rounded-t-lg transition-all flex-1 ${
        activeTab === tab.id
          ? 'bg-blue-50 text-blue-600'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
      }`}
    >
      <div className="flex flex-col items-start">
        <span className="text-sm">{tab.label}</span>
        <span className="text-xs opacity-60">{tab.subtitle}</span>
      </div>
      {activeTab === tab.id && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
      )}
    </button>
  ))}
</nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-6">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'acquisitions' && <AcquisitionsTab />}
        {activeTab === 'underwriting' && <UnderwritingTab />}
        {activeTab === 'asset-management' && <AssetManagementTab />}
        {activeTab === 'investor-relations' && <InvestorRelationsTab />}
        {activeTab === 'integrations' && <IntegrationsTab />}
      </main>

      {/* AI Assistant Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group">
        <img src={apexLogo} alt="AI Assistant" className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}
