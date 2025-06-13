
import { Status, DropdownOption } from './types';

export const APP_TITLE = "Lisbon Procurement Productivity Tool";

export const TAB_OPTIONS = ["Dashboard", "Settings", "Reports", "Bin"];

export const FIRESTORE_COLLECTIONS = {
  TICKETS: 'tickets',
  BUYERS: 'buyers',
  STATUSES: 'statuses',
  REGIONS: 'regions',
  COUNTRIES: 'countries',
  SOURCING_MANAGERS_PL: 'sourcingManagersPL',
  REASONS: 'reasons',
};

// Colors matching Tailwind config in index.html for programmatic use
export const COLOR_PALETTE = {
  positive: '#4CAF50', // Green
  primaryAction: '#4CAF50',
  specificAction: '#FF9800', // Orange
  missingItem: '#FF9800',
  pendingItem: '#FFC107', // Yellow
  parkedItem: '#FFC107',
  presentationReport: '#FFEB3B', // Yellow
  negativeAction: '#F44336', // Red
  rejectedItem: '#F44336',
  cancelledItem: '#F44336',
  binTabActive: '#F44336', // Red for Bin tab
  neutralBorder: '#9E9E9E', // Gray
  neutralBg: '#F5F5F5',
  secondaryButtonText: '#212121',
  white: '#FFFFFF',
  black: '#000000',
};

export const INITIAL_STATUSES: Status[] = [
  { id: 'parked', name: 'Parked', color: COLOR_PALETTE.parkedItem },
  { id: 'pending', name: 'Pending', color: COLOR_PALETTE.pendingItem },
  { id: 'rejected', name: 'Rejected', color: COLOR_PALETTE.rejectedItem },
  { id: 'solved', name: 'Solved', color: COLOR_PALETTE.positive },
  { id: 'ptdd_missing', name: 'PTDD Missing', color: COLOR_PALETTE.missingItem },
  { id: 'po_pdf_missing', name: "PO's PDF Missing", color: COLOR_PALETTE.missingItem },
  { id: 'completed', name: 'Completed', color: COLOR_PALETTE.positive },
  { id: 'cancelled', name: 'Cancelled', color: COLOR_PALETTE.cancelledItem },
];

export const INITIAL_BUYERS: Array<{ id: string, firstName: string, lastName: string }> = [
  { id: 'ana_t', firstName: 'Ana', lastName: 'T.' },
  { id: 'andre_r', firstName: 'André', lastName: 'R.' },
  { id: 'jenny_w', firstName: 'Jenny', lastName: 'W.' },
  { id: 'laura_v', firstName: 'Laura', lastName: 'V.' },
  { id: 'marco_p', firstName: 'Marco', lastName: 'P.' },
  { id: 'naira_r', firstName: 'Naira', lastName: 'R.' },
  { id: 'rita_c', firstName: 'Rita', lastName: 'C.' },
  { id: 'zaklina_o', firstName: 'Zaklina', lastName: 'O.' },
];

export const INITIAL_REGIONS: DropdownOption[] = [
  { id: 'europe', value: 'Europe', label: 'Europe' },
  { id: 'latam', value: 'Latam', label: 'Latam' },
];

export const INITIAL_COUNTRIES: DropdownOption[] = [
  "Austria", "Belgium", "Chile", "Colombia", "Dach- Aachen Site", "Dach- DE Commercial", 
  "Dach- DE HQ", "Dach IT&TELCO", "Denmark", "Ecuador Commercial", "Ecuador Tecnandina", 
  "Espanha", "Finland", "France", "Ireland", "Italy Commercial", "Italy Origgio", 
  "Mexico", "Netherlands", "Panama", "Peru", "Portugal", "Switzerland", "United Kingdom"
].map(c => ({ id: c.toLowerCase().replace(/[\s-]/g, '_'), value: c, label: c }));

export const INITIAL_SOURCING_MANAGERS_PL: DropdownOption[] = [
  "Alessia Cavalli", "Ana Tavares", "Andreas Ernst", "Anke Soltow", 
  "Anke Soltow / Patricia Urriola", "Carlos Mantilla", "Carlos Mantilla/Priyatham", 
  "Claudia Juarez", "Constantino Rivas", "Dirk Eschweiler", "Dirk S./Mark U", 
  "Dirk Sittart", "Edgar Puente", "Fabiana Guerra", "Gabriel Osorio", "Gema Rocha", 
  "João Rita", "Kumar Pidikiti", "Laura Wasser", "Laura Wasser/Carlos M.", 
  "Mark Uyterwijk", "Marton K. and Carlos", "Marton Kovacs", "Maurizio Lanzetta", 
  "n/a", "Patricia Urriola", "Priyatham Salimadugu", "Priyatham/Marton", 
  "Steffen Heiling", "Stephanie Nardin", "Uyterwijk, Mark", "Viviana Garcia"
].map(sm => ({ id: sm.toLowerCase().replace(/[\s/]/g, '_'), value: sm, label: sm }));

export const INITIAL_REASONS: DropdownOption[] = [
  "Account Assignment", "Amount", "Approvals", "Attachments", "Due Dilligence", 
  "iBuy Usage", "Payment terms", "PR Communication Template", "Pref. & Predef. Supplier", 
  "Quotation", "Vendor", "Wrong PR type"
].map(r => ({ id: r.toLowerCase().replace(/[\s]/g, '_'), value: r, label: r }));

// For PDF export features. This is a simplified representation.
export const PDF_REPORT_NOTE = "Note: This report includes a basic modification history. For a comprehensive audit trail, advanced system logging would be required.";
export const COPY_EMAIL_TEMPLATE = "Dear all,\n\nPR n.{PR_NUMBER} = PO n.{PO_NUMBER}\n\nPlease don't hesitate to contact for any further information.\n\nBest Regards.";

export const ICONS = {
  search: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>`,
  add: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>`,
  delete: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c-.34-.059-.68-.114-1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>`,
  copy: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125V7.5m0 0v1.875m0 0H9.375m0 0a1.125 1.125 0 0 1-1.125-1.125V7.5m0 0v1.875m0 0H9.375m0 0a1.125 1.125 0 0 1-1.125-1.125V7.5m0 0v1.875m0 0H9.375m0 0a1.125 1.125 0 0 1-1.125-1.125V7.5M7.5 15h3.375m0 0a1.125 1.125 0 0 1-1.125-1.125V7.5M7.5 15h3.375m0 0a1.125 1.125 0 0 1-1.125-1.125V7.5" /></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-3.75h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></svg>`,
  bin: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c-.34-.059-.68-.114-1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>`,
  restore: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>`,
  kpiTime: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`,
  kpiOldest: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>`,
  kpiCompleted: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`,
  activityCreate: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`,
  activityUpdateStatus: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>`,
  attachment: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.687 7.687a1.5 1.5 0 0 0 2.122 2.122l7.687-7.687-2.122-2.122Z" /></svg>`,
  upload: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>`,
};
