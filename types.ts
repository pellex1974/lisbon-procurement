
export interface Buyer {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Status {
  id: string;
  name: string;
  color: string; // Hex color code or Tailwind color class
}

export interface Modification {
  timestamp: string; // ISO string
  userId: string; // buyerId who made the change
  action: "Created" | "Updated" | "Deleted" | "Restored" | "AttachmentAdded" | "AttachmentDeleted";
  fieldName?: keyof Omit<Ticket, 'id' | 'history' | 'creationDate' | 'completionDate' | 'isDeleted' | 'deletedTimestamp' | 'attachments'> | 'completionDate' | 'attachmentName'; // Name of the field that changed or attachment name
  oldValue?: string; // Previous value, if action is "Updated"
  newValue?: string; // New value, if action is "Updated"
}

export interface Attachment {
  id: string;
  ticketId: string;
  fileName: string;
  fileType: string;
  fileSize: number; // in bytes
  uploadDate: string; // ISO string
  storagePath: string; // Simulated path or URL
}

export interface Ticket {
  id: string;
  region: string;
  country: string;
  buyerId: string; // Store buyer ID, fetch buyer details separately
  sourcingManagerPL: string;
  poNumber: string;
  prNumber: string;
  statusId: string; // Store status ID
  reason: string;
  comments: string; // 'Note' field in modal
  creationDate: string; // ISO string
  completionDate?: string; // ISO string, for solved/completed tickets
  history: Modification[];
  isDeleted?: boolean;
  deletedTimestamp?: string; // ISO string
  attachments?: Attachment[];
}

export interface DropdownOption {
  id: string;
  value: string;
  label: string;
}

export enum DropdownListType {
  Regions = "Regions",
  Countries = "Countries",
  SourcingManagersPL = "Sourcing Managers / PL",
  Reasons = "Reasons",
}

export interface FirestoreDoc {
  id: string;
  [key: string]: any;
}

// Data for charts
export interface BarChartData {
  name: string;
  value: number;
}

export interface LineChartDataPoint {
  date: string; // or number for time series
  value: number;
}

export interface PieChartData {
  name: string;
  value: number;
  fill: string; // color for pie slice
}

export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
  retrievedContext?: {
    uri?: string;
    title?: string;
  };
}
