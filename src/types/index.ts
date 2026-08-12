export type RTIStatus =
  | 'draft'
  | 'filed'
  | 'acknowledged'
  | 'awaiting'
  | 'responded'
  | 'denied'
  | 'first_appeal'
  | 'closed';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface Department {
  id: string;
  name: string;
  shortName: string;
  description: string;
  parentAuthority: string;
  pio?: PIO;
  transparency: TransparencyMetrics;
}

export interface PIO {
  name: string;
  title: string;
  address: string;
}

export interface TransparencyMetrics {
  avgResponseDays: number;
  answeredWithin30DaysPct: number;
  denialRatePct: number;
  trend: 'improving' | 'stable' | 'declining';
  monthly: { month: string; responseDays: number; filed: number; answered: number }[];
}

export interface Recommendation {
  department: Department;
  confidence: number;
  reasons: string[];
  level: ConfidenceLevel;
}

export interface RTIRequest {
  id: string;
  subject: string;
  departmentId: string;
  departmentName: string;
  filedDate: string;
  responseDeadline: string;
  status: RTIStatus;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  label: string;
  date?: string;
  done: boolean;
  current?: boolean;
}

export interface Draft {
  id: string;
  subject: string;
  departmentId: string;
  departmentName: string;
  pioName: string;
  pioAddress: string;
  applicantName: string;
  applicantAddress: string;
  summary: string;
  keyInfo: string[];
  questions: string[];
  updatedAt: string;
}

export interface ActivitySummary {
  active: number;
  drafts: number;
  upcomingDeadlines: number;
  completed: number;
}

export interface UserProfile {
  name: string;
  email: string;
  location: string;
}
