import React, { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
import { APP_TITLE, TAB_OPTIONS, INITIAL_BUYERS, INITIAL_STATUSES, INITIAL_REGIONS, INITIAL_COUNTRIES, INITIAL_SOURCING_MANAGERS_PL, INITIAL_REASONS, FIRESTORE_COLLECTIONS, COLOR_PALETTE } from './constants';
import { Ticket, Buyer, Status, DropdownOption, DropdownListType } from './types';
// import * as firebaseService from './services/firebaseService'; // CANCELLATO - CAUSAVA ERRORE

// --- INIZIO BLOCCO TEMPORANEO ---
// Siccome non possiamo parlare con il database, creiamo dei dati finti.
const datiFinti = {
  tickets: [
    { id: 'T1', prNumber: 'PR001', poNumber: 'PO101', buyerId: 'B1', statusId: 'S1', region: 'Europe', country: 'Portugal', sourcingManager: 'SM1', rejectionReason: '', lastUpdate: new Date().toISOString(), isDeleted: false },
    { id: 'T2', prNumber: 'PR002', poNumber: 'PO102', buyerId: 'B2', statusId: 'S2', region: 'Europe', country: 'Spain', sourcingManager: 'SM2', rejectionReason: '', lastUpdate: new Date().toISOString(), isDeleted: false },
  ],
  buyers: INITIAL_BUYERS,
  statuses: INITIAL_STATUSES,
  regions: INITIAL_REGIONS,
  countries: INITIAL_COUNTRIES,
  sourcingManagersPL: INITIAL_SOURCING_MANAGERS_PL,
  reasons: INITIAL_REASONS,
};
// --- FINE BLOCCO TEMPORANEO ---


interface AppContextType {
  tickets: Ticket[];
  buyers: Buyer[];
  statuses: Status[];
  regions: DropdownOption[];
  countries: DropdownOption[];
  sourcingManagersPL: DropdownOption[];
  reasons: DropdownOption[];
  fetchTickets: () => Promise<void>; 
  fetchBuyers: () => Promise<void>;
  fetchStatuses: () => Promise<void>;
  fetchDropdownOptions: (listType: DropdownListType) => Promise<void>;
  isLoading: boolean;
  getBuyerName: (buyerId: string) => string;
  getStatus: (statusId: string) => Status | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const PaginaTemporanea = ({ nomePagina }: { nomePagina: string }) => (
  <div className="p-8 text-center">
    <h2 className="text-2xl font-bold">{nomePagina}</h2>
    <p className="mt-2 text-gray-600">Questa sezione è in costruzione. I dati mostrati sono solo un esempio.</p>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TAB_OPTIONS[0]);
  const [tickets, setTickets] = useState<Ticket[]>([]); 
  const [buyers, setBuyers] = useState<Buyer[]>(INITIAL_BUYERS);
  const [statuses, setStatuses] = useState<Status[]>(INITIAL_STATUSES);
  const [regions, setRegions] = useState<DropdownOption[]>(INITIAL_REGIONS);
  const [countries, setCountries] = useState<DropdownOption[]>(INITIAL_COUNTRIES);
  const [sourcingManagersPL, setSourcingManagersPL] = useState<DropdownOption[]>(INITIAL_SOURCING_MANAGERS_PL);
  const [reasons, setReasons] = useState<DropdownOption[]>(INITIAL_REASONS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- INIZIO BLOCCO MODIFICATO ---
  // Abbiamo rimosso le chiamate al database e usiamo i dati finti.
  const fetchTickets = useCallback(async () => { setTickets(datiFinti.tickets); }, []);
  const fetchBuyers = useCallback(async () => { setBuyers(datiFinti.buyers); }, []);
  const fetchStatuses = useCallback(async () => { setStatuses(datiFinti.statuses); }, []);
  const fetchDropdownOptions = useCallback(async (listType: DropdownListType) => {
    if (listType === DropdownListType.Regions) setRegions(datiFinti.regions);
    if (listType === DropdownListType.Countries) setCountries(datiFinti.countries);
    if (listType === DropdownListType.SourcingManagersPL) setSourcingManagersPL(datiFinti.sourcingManagersPL);
    if (listType === DropdownListType.Reasons) setReasons(datiFinti.reasons);
  }, []);
  // --- FINE BLOCCO MODIFICATO ---

  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      setError(null);
      await Promise.all([
        fetchTickets(),
        fetchBuyers(),
        fetchStatuses(),
        fetchDropdownOptions(DropdownListType.Regions),
        fetchDropdownOptions(DropdownListType.Countries),
        fetchDropdownOptions(DropdownListType.SourcingManagersPL),
        fetchDropdownOptions(DropdownListType.Reasons),
      ]);
      setIsLoading(false);
    };
    loadAllData();
  }, [fetchTickets, fetchBuyers, fetchStatuses, fetchDropdownOptions]); 

  const getBuyerName = useCallback((buyerId: string): string => {
    const buyer = buyers.find(b => b.id === buyerId);
    return buyer ? `${buyer.firstName} ${buyer.lastName}` : 'Unknown Buyer';
  }, [buyers]);

  const getStatus = useCallback((statusId: string): Status | undefined => {
    return statuses.find(s => s.id === statusId);
  }, [statuses]);

  const contextValue: AppContextType = useMemo(() => ({
    tickets, buyers, statuses, regions, countries, sourcingManagersPL, reasons,
    fetchTickets, fetchBuyers, fetchStatuses, fetchDropdownOptions,
    isLoading, getBuyerName, getStatus
  }), [
    tickets, buyers, statuses, regions, countries, sourcingManagersPL, reasons,
    fetchTickets, fetchBuyers, fetchStatuses, fetchDropdownOptions,
    isLoading, getBuyerName, getStatus
  ]);

  const renderActiveTab = () => {
    if (isLoading) {
      return <div className="p-8 text-center text-gray-500">Loading application data...</div>;
    }
    if (error) {
       return <div className="p-8 text-center text-red-500 bg-red-100 border border-red-500 rounded-md">{error}</div>;
    }
    switch (activeTab) {
      case 'Dashboard':
        return <PaginaTemporanea nomePagina="Dashboard" />;
      case 'Settings':
        return <PaginaTemporanea nomePagina="Settings" />;
      case 'Reports':
        return <PaginaTemporanea nomePagina="Reports" />;
      case 'Bin':
        return <PaginaTemporanea nomePagina="Bin" />;
      default:
        return <PaginaTemporanea nomePagina="Dashboard" />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-neutral-bg flex flex-col">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-3">
            <h1 className="text-2xl font-semibold text-primary-action">{APP_TITLE}</h1>
          </div>
          <nav className="bg-gray-100">
            <div className="container mx-auto px-4 flex">
              {TAB_OPTIONS.map(tab => {
                const isActive = activeTab === tab;
                let tabStyle = 'text-gray-600 hover:text-gray-800 hover:bg-gray-200';
                if (isActive) {
                  if (tab === 'Bin') {
                    tabStyle = `border-b-2 border-rejected-item text-rejected-item`; 
                  } else {
                    tabStyle = 'border-b-2 border-primary-action text-primary-action';
                  }
                }
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-4 text-sm font-medium focus:outline-none transition-colors duration-150 ease-in-out ${tabStyle}`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </nav>
        </header>
        <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 bg-white shadow-lg my-4 rounded-md">
          {renderActiveTab()}
        </main>
        <footer className="text-center py-4 text-sm text-gray-500 bg-gray-100">
          © {new Date().getFullYear()} Lisbon Procurement Productivity Tool.
        </footer>
      </div>
    </AppContext.Provider>
  );
};

export default App;
