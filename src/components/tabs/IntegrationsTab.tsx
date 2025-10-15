import { CheckCircle2, Plus, Settings } from 'lucide-react';
import clozeLogo from 'figma:asset/a7527c2ffcd63d1d23c86f0c1b2e787691a99b83.png';
import pipedriveLogo from 'figma:asset/0f14331594aa1b5cbd5ffa8d178bb7615caf3a4b.png';
import appfolioLogo from 'figma:asset/3a6d81a31ad558228c2d8de51413df7a7c90efb5.png';
import doorloopLogo from 'figma:asset/c8d0e617f2b2251b93f584474cf99dd9fa87098d.png';
import buildiumLogo from 'figma:asset/b58997a0e41dd5eed97be0187b5469bb8439b4e9.png';
import juniperLogo from 'figma:asset/0fb73de739c5020a7d70ae4b190938565c3ce8af.png';
import procoreLogo from 'figma:asset/911f60244bad086bb335239728cca7c9081079d7.png';
import argusLogo from 'figma:asset/7fbff98986f7c8749c5649405143444a8f5168d1.png';
import quickbooksLogo from 'figma:asset/a11d79feecd4efd1298811d8281b3c6a77a02bd4.png';
import sageLogo from 'figma:asset/a9c0dd26545861ad70530bee804e60656603080c.png';
import freshbooksLogo from 'figma:asset/8d3fcb19791902490ecf8794884c56c97cceddf5.png';
import xeroLogo from 'figma:asset/c5c9db699f9cdc2bb9214db4080b789c38b6137a.png';
import yardiLogo from 'figma:asset/f701910789c4112525b32e8913b34edb26c312a8.png';
import hubspotLogo from 'figma:asset/45b14fbc5d9d285583aba52e4948e3ff8c3bd2b4.png';
import salesforceLogo from 'figma:asset/a9e29c405d23fc9bc8da5ecc990feae4f3ebec58.png';

interface Integration {
  id: string;
  name: string;
  category: string;
  connected: boolean;
  logo?: string;
  logoType?: 'image' | 'emoji';
}

const integrations: Integration[] = [
  // CRM
  {
    id: 'cloze',
    name: 'Cloze',
    category: 'CRM',
    connected: true,
    logo: clozeLogo,
    logoType: 'image',
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'CRM',
    connected: false,
    logo: salesforceLogo,
    logoType: 'image',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'CRM',
    connected: false,
    logo: hubspotLogo,
    logoType: 'image',
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    category: 'CRM',
    connected: false,
    logo: pipedriveLogo,
    logoType: 'image',
  },
  
  // Property Management
  {
    id: 'appfolio',
    name: 'AppFolio',
    category: 'Property Management',
    connected: true,
    logo: appfolioLogo,
    logoType: 'image',
  },
  {
    id: 'doorloop',
    name: 'DoorLoop',
    category: 'Property Management',
    connected: false,
    logo: doorloopLogo,
    logoType: 'image',
  },
  {
    id: 'buildium',
    name: 'Buildium',
    category: 'Property Management',
    connected: false,
    logo: buildiumLogo,
    logoType: 'image',
  },
  {
    id: 'yardi',
    name: 'Yardi',
    category: 'Property Management',
    connected: false,
    logo: yardiLogo,
    logoType: 'image',
  },
  
  // Underwriting
  {
    id: 'cactus',
    name: 'Cactus AI',
    category: 'Underwriting',
    connected: true,
    logo: '🌵',
    logoType: 'emoji',
  },
  {
    id: 'juniper',
    name: 'Juniper Square',
    category: 'Underwriting',
    connected: false,
    logo: juniperLogo,
    logoType: 'image',
  },
  {
    id: 'procore',
    name: 'Procore',
    category: 'Underwriting',
    connected: false,
    logo: procoreLogo,
    logoType: 'image',
  },
  {
    id: 'argus',
    name: 'ARGUS',
    category: 'Underwriting',
    connected: false,
    logo: argusLogo,
    logoType: 'image',
  },
  
  // Bookkeeping
  {
    id: 'quickbooks',
    name: 'QuickBooks Online',
    category: 'Bookkeeping',
    connected: true,
    logo: quickbooksLogo,
    logoType: 'image',
  },
  {
    id: 'xero',
    name: 'Xero',
    category: 'Bookkeeping',
    connected: false,
    logo: xeroLogo,
    logoType: 'image',
  },
  {
    id: 'freshbooks',
    name: 'FreshBooks',
    category: 'Bookkeeping',
    connected: false,
    logo: freshbooksLogo,
    logoType: 'image',
  },
  {
    id: 'sage',
    name: 'Sage',
    category: 'Bookkeeping',
    connected: false,
    logo: sageLogo,
    logoType: 'image',
  },
];

const categories = [
  {
    id: 'CRM',
    title: 'CRM Integrations',
  },
  {
    id: 'Property Management',
    title: 'Property Management Integrations',
  },
  {
    id: 'Underwriting',
    title: 'Underwriting & Investment Tools',
  },
  {
    id: 'Bookkeeping',
    title: 'Accounting & Bookkeeping',
  },
];

export default function IntegrationsTab() {
  const getIntegrationsForCategory = (category: string) => {
    return integrations.filter((int) => int.category === category);
  };

  const connectedCount = integrations.filter((int) => int.connected).length;

  return (
    <div className="space-y-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-slate-900 mb-3">Integrations Hub</h1>
        <p className="text-slate-600 mb-6">
          Connect your preferred applications and unify your data across systems.
        </p>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">{connectedCount} Connected</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
            <span className="text-sm text-slate-700">{integrations.length - connectedCount} Available</span>
          </div>
        </div>
      </div>

      {/* Integration Categories */}
      <div className="space-y-10">
        {categories.map((category) => {
          const categoryIntegrations = getIntegrationsForCategory(category.id);

          return (
            <div key={category.id}>
              {/* Section Header */}
              <h2 className="text-lg text-slate-900 mb-6">{category.title}</h2>

              {/* Integration Cards Row */}
              <div className="flex gap-6 overflow-x-auto pb-2">
                {categoryIntegrations.map((integration) => (
                  <div
                    key={integration.id}
                    className={`flex-shrink-0 w-[200px] h-[160px] rounded-xl border transition-all duration-200 ${
                      integration.connected
                        ? 'bg-white border-green-200 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(34,197,94,0.15)] hover:-translate-y-0.5'
                        : 'bg-[#F8FAFB] border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(42,104,255,0.12)] hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="h-full flex flex-col items-center justify-between p-5">
                      {/* Logo Container */}
                      <div className="flex-1 flex items-center justify-center w-full">
                        {integration.logoType === 'image' ? (
                          <img
                            src={integration.logo}
                            alt={integration.name}
                            className="max-w-[70%] max-h-[80px] object-contain"
                          />
                        ) : (
                          <div className="text-5xl">{integration.logo}</div>
                        )}
                      </div>

                      {/* App Name */}
                      <div className="text-center mb-3">
                        <div className="text-sm text-slate-700 uppercase tracking-wide" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                          {integration.name}
                        </div>
                      </div>

                      {/* Status Badge / Button */}
                      <div className="w-full">
                        {integration.connected ? (
                          <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-green-50 border border-green-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-xs text-green-700">Connected</span>
                          </div>
                        ) : (
                          <button className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-slate-600 text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 flex items-center justify-center gap-1.5 group">
                            <Plus className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                            <span>Connect</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
