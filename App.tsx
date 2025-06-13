
import React, { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
import { APP_TITLE, TAB_OPTIONS, INITIAL_BUYERS, INITIAL_STATUSES, INITIAL_REGIONS, INITIAL_COUNTRIES, INITIAL_SOURCING_MANAGERS_PL, INITIAL_REASONS, FIRESTORE_COLLECTIONS, COLOR_PALETTE } from './constants';
import { Ticket, Buyer, Status, DropdownOption, DropdownListType } from './types';
import * as firebaseService from './services/firebaseService';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import ReportsPage from './pages/ReportsPage';
import BinPage from './pages/BinPage'; // Import the new BinPage

interface AppContextType {
  tickets: Ticket[];
  buyers: Buyer[];
  statuses: Status[];
  regions: DropdownOption[];
  countries: DropdownOption[];
  sourcingManagersPL: DropdownOption[];
  reasons: DropdownOption[];
  fetchTickets: () => Promise<void>; // Fetches active tickets
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

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TAB_OPTIONS[0]);
  const [tickets, setTickets] = useState<Ticket[]>([]); // Active tickets
  const [buyers, setBuyers] = useState<Buyer[]>(INITIAL_BUYERS);
  const [statuses, setStatuses] = useState<Status[]>(INITIAL_STATUSES);
  const [regions, setRegions] = useState<DropdownOption[]>(INITIAL_REGIONS);
  const [countries, setCountries] = useState<DropdownOption[]>(INITIAL_COUNTRIES);
  const [sourcingManagersPL, setSourcingManagersPL] = useState<DropdownOption[]>(INITIAL_SOURCING_MANAGERS_PL);
  const [reasons, setReasons] = useState<DropdownOption[]>(INITIAL_REASONS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (fetchFn: () => Promise<any>, setDataFn: (data: any) => void, dataKey?: string) => {
    try {
      const data = await fetchFn();
      setDataFn(data);
      if (dataKey) console.log(`Fetched ${dataKey}:`, data);
    } catch (err) {
      console.error(`Error fetching ${dataKey || 'data'}:`, err);
      setError(`Failed to load ${dataKey || 'data'}. Please try again later.`);
      if(dataKey === 'tickets') setDataFn([]);
    }
  }, []);

  const fetchTickets = useCallback(async () => { // Fetches active (non-deleted) tickets
    await fetchData(firebaseService.getTickets, setTickets, 'tickets');
  }, [fetchData]);
  
  const fetchBuyers = useCallback(async () => {
    await fetchData(() => firebaseService.getItems<Buyer>(FIRESTORE_COLLECTIONS.BUYERS, INITIAL_BUYERS), setBuyers, 'buyers');
  }, [fetchData]);

  const fetchStatuses = useCallback(async () => {
     await fetchData(() => firebaseService.getItems<Status>(FIRESTORE_COLLECTIONS.STATUSES, INITIAL_STATUSES), setStatuses, 'statuses');
  }, [fetchData]);

  const fetchDropdownOptions = useCallback(async (listType: DropdownListType) => {
    let initialData: DropdownOption[] = [];
    let setDataFn: (data: DropdownOption[]) => void;
    
    switch(listType) {
      case DropdownListType.Regions: 
        initialData = INITIAL_REGIONS; setDataFn = setRegions; break;
      case DropdownListType.Countries: 
        initialData = INITIAL_COUNTRIES; setDataFn = setCountries; break;
      case DropdownListType.SourcingManagersPL: 
        initialData = INITIAL_SOURCING_MANAGERS_PL; setDataFn = setSourcingManagersPL; break;
      case DropdownListType.Reasons: 
        initialData = INITIAL_REASONS; setDataFn = setReasons; break;
      default: return;
    }
    await fetchData(() => firebaseService.getDropdownOptions(listType)
        .then(data => data.length > 0 ? data : initialData) 
        .catch(() => initialData), 
    setDataFn, listType);
  }, [fetchData]);


  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchTickets(),
          fetchBuyers(),
          fetchStatuses(),
          fetchDropdownOptions(DropdownListType.Regions),
          fetchDropdownOptions(DropdownListType.Countries),
          fetchDropdownOptions(DropdownListType.SourcingManagersPL),
          fetchDropdownOptions(DropdownListType.Reasons),
        ]);
      } catch (err) {
        // Error already handled
      } finally {
        setIsLoading(false);
      }
    };
    loadAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

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
        return <DashboardPage />;
      case 'Settings':
        return <SettingsPage />;
      case 'Reports':
        return <ReportsPage />;
      case 'Bin':
        return <BinPage />; // Render BinPage
      default:
        return <DashboardPage />;
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
                    // Use Tailwind classes for red color defined in tailwind.config
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
