import type {
  Department,
  Recommendation,
  RTIRequest,
  Draft,
  ActivitySummary,
  UserProfile,
} from '@/types';

const monthlyTrend = [
  { month: 'Feb', responseDays: 24, filed: 142, answered: 118 },
  { month: 'Mar', responseDays: 22, filed: 168, answered: 145 },
  { month: 'Apr', responseDays: 21, filed: 155, answered: 138 },
  { month: 'May', responseDays: 19, filed: 178, answered: 161 },
  { month: 'Jun', responseDays: 18, filed: 192, answered: 176 },
  { month: 'Jul', responseDays: 18, filed: 205, answered: 188 },
  { month: 'Aug', responseDays: 17, filed: 188, answered: 174 },
];

export const departments: Department[] = [
  {
    id: 'municipal',
    name: 'Municipal Administration',
    shortName: 'Municipal',
    description:
      'Local civic services including roads, sanitation, water supply, street lighting, and urban planning.',
    parentAuthority: 'Municipal Corporation / Urban Local Body',
    pio: {
      name: 'Public Information Officer',
      title: 'Municipal Corporation — RTI Cell',
      address: 'Municipal Corporation Office, Civic Centre, New Delhi',
    },
    transparency: {
      avgResponseDays: 18,
      answeredWithin30DaysPct: 87,
      denialRatePct: 6,
      trend: 'improving',
      monthly: monthlyTrend,
    },
  },
  {
    id: 'education',
    name: 'Department of Education',
    shortName: 'Education',
    description:
      'Public schools, curriculum, teacher appointments, education policy, and scholarship disbursement.',
    parentAuthority: 'Ministry of Education / State Education Department',
    pio: {
      name: 'Public Information Officer',
      title: 'Directorate of Education',
      address: 'Directorate of Education, Secretariat, New Delhi',
    },
    transparency: {
      avgResponseDays: 22,
      answeredWithin30DaysPct: 78,
      denialRatePct: 11,
      trend: 'stable',
      monthly: monthlyTrend.map((m) => ({
        ...m,
        responseDays: m.responseDays + 4,
        answered: Math.round(m.answered * 0.9),
      })),
    },
  },
  {
    id: 'police',
    name: 'Police Department',
    shortName: 'Police',
    description:
      'Law enforcement, FIR status, crime statistics, traffic enforcement, and public safety.',
    parentAuthority: 'State Police Headquarters',
    pio: {
      name: 'Public Information Officer',
      title: 'Office of the Commissioner of Police',
      address: 'Police Headquarters, New Delhi',
    },
    transparency: {
      avgResponseDays: 26,
      answeredWithin30DaysPct: 64,
      denialRatePct: 18,
      trend: 'declining',
      monthly: monthlyTrend.map((m) => ({
        ...m,
        responseDays: m.responseDays + 7,
        answered: Math.round(m.answered * 0.7),
      })),
    },
  },
  {
    id: 'health',
    name: 'Department of Health & Family Welfare',
    shortName: 'Health',
    description:
      'Public hospitals, health schemes, drug licensing, sanitation standards, and medical infrastructure.',
    parentAuthority: 'Ministry of Health & Family Welfare',
    pio: {
      name: 'Public Information Officer',
      title: 'Directorate of Health Services',
      address: 'Directorate of Health Services, Nirman Bhavan, New Delhi',
    },
    transparency: {
      avgResponseDays: 20,
      answeredWithin30DaysPct: 81,
      denialRatePct: 9,
      trend: 'improving',
      monthly: monthlyTrend.map((m) => ({
        ...m,
        responseDays: m.responseDays + 2,
        answered: Math.round(m.answered * 0.85),
      })),
    },
  },
  {
    id: 'transport',
    name: 'Transport Department',
    shortName: 'Transport',
    description:
      'Driving licences, vehicle registration, public transit, road permits, and transport policy.',
    parentAuthority: 'State Transport Authority',
    pio: {
      name: 'Public Information Officer',
      title: 'State Transport Authority',
      address: 'Transport Authority Office, New Delhi',
    },
    transparency: {
      avgResponseDays: 23,
      answeredWithin30DaysPct: 74,
      denialRatePct: 13,
      trend: 'stable',
      monthly: monthlyTrend.map((m) => ({
        ...m,
        responseDays: m.responseDays + 5,
        answered: Math.round(m.answered * 0.8),
      })),
    },
  },
];

export const rtiRequests: RTIRequest[] = [
  {
    id: 'RTI-001',
    subject: 'Road repair status — Sector 12 main road',
    departmentId: 'municipal',
    departmentName: 'Municipal Administration',
    filedDate: '2026-08-10',
    responseDeadline: '2026-09-09',
    status: 'awaiting',
    timeline: [
      { label: 'Application filed', date: '10 Aug 2026', done: true },
      { label: 'Application acknowledged', date: '12 Aug 2026', done: true },
      { label: 'Awaiting response', current: true, done: false },
      { label: 'Response deadline', date: '09 Sep 2026', done: false },
      { label: 'First Appeal if necessary', done: false },
    ],
  },
  {
    id: 'RTI-002',
    subject: 'Scholarship disbursement for 2025-26',
    departmentId: 'education',
    departmentName: 'Department of Education',
    filedDate: '2026-07-15',
    responseDeadline: '2026-08-14',
    status: 'responded',
    timeline: [
      { label: 'Application filed', date: '15 Jul 2026', done: true },
      { label: 'Application acknowledged', date: '17 Jul 2026', done: true },
      { label: 'Response received', date: '02 Aug 2026', done: true },
      { label: 'Closed', done: true },
    ],
  },
  {
    id: 'RTI-003',
    subject: 'FIR registration statistics — Q1 2026',
    departmentId: 'police',
    departmentName: 'Police Department',
    filedDate: '2026-07-28',
    responseDeadline: '2026-08-27',
    status: 'first_appeal',
    timeline: [
      { label: 'Application filed', date: '28 Jul 2026', done: true },
      { label: 'Response deadline passed', date: '27 Aug 2026', done: true },
      { label: 'First Appeal filed', current: true, done: false },
      { label: 'First Appeal decision', done: false },
    ],
  },
  {
    id: 'RTI-004',
    subject: 'Public hospital equipment procurement',
    departmentId: 'health',
    departmentName: 'Department of Health & Family Welfare',
    filedDate: '2026-06-20',
    responseDeadline: '2026-07-20',
    status: 'closed',
    timeline: [
      { label: 'Application filed', date: '20 Jun 2026', done: true },
      { label: 'Response received', date: '12 Jul 2026', done: true },
      { label: 'Closed', done: true },
    ],
  },
];

export const drafts: Draft[] = [
  {
    id: 'DRAFT-001',
    subject: 'Status of street lighting in Ward 7',
    departmentId: 'municipal',
    departmentName: 'Municipal Administration',
    pioName: 'Public Information Officer, Municipal Corporation',
    pioAddress: 'Municipal Corporation Office, Civic Centre, New Delhi',
    applicantName: 'Aarav Sharma',
    applicantAddress: 'B-42, Green Park, New Delhi - 110016',
    summary: 'Requesting details on the installation, maintenance, and operational status of street lights in Ward 7.',
    keyInfo: [
      'Ward 7 covers approximately 3.2 km of arterial roads',
      'Multiple resident complaints logged since Jan 2026',
      'Budget allocation for FY 2025-26 street lighting',
    ],
    questions: [
      'How many street lights are currently non-functional in Ward 7 as of the date of this application?',
      'What is the scheduled maintenance cycle for street lighting in Ward 7?',
      'What was the total budget allocated for street lighting maintenance in Ward 7 for FY 2025-26?',
      'On what date were the most recent repairs carried out on street lights in Ward 7?',
    ],
    updatedAt: '2026-08-11',
  },
];

export const activity: ActivitySummary = {
  active: 2,
  drafts: 1,
  upcomingDeadlines: 1,
  completed: 1,
};

export const user: UserProfile = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  location: 'New Delhi, Delhi',
};

export function recommendDepartments(query: string): Recommendation[] {
  const q = query.toLowerCase();
  const rules: { deptId: string; keywords: string[] }[] = [
    { deptId: 'municipal', keywords: ['road', 'street', 'pothole', 'garbage', 'sewage', 'water', 'sanitation', 'light', 'park', 'drainage', 'municipal', 'ward'] },
    { deptId: 'education', keywords: ['school', 'teacher', 'education', 'scholarship', 'curriculum', 'student', 'college', 'exam'] },
    { deptId: 'police', keywords: ['fir', 'police', 'crime', 'complaint', 'traffic', 'safety', 'arrest', 'investigation'] },
    { deptId: 'health', keywords: ['hospital', 'health', 'medicine', 'doctor', 'clinic', 'drug', 'vaccine', 'medical'] },
    { deptId: 'transport', keywords: ['driving', 'licence', 'license', 'vehicle', 'registration', 'transport', 'bus', 'transit', 'permit'] },
  ];

  const scored = rules
    .map((r) => {
      const hits = r.keywords.filter((k) => q.includes(k)).length;
      return { deptId: r.deptId, hits };
    })
    .filter((s) => s.hits > 0)
    .sort((a, b) => b.hits - a.hits);

  if (scored.length === 0) {
    return departments.slice(0, 3).map((d, i) => ({
      department: d,
      confidence: [78, 54, 41][i],
      reasons: ['No specific keywords matched — showing commonly requested departments.'],
      level: (['high', 'medium', 'low'] as const)[i] ?? 'low',
    }));
  }

  const top = scored[0];
  const baseConfidence = Math.min(95, 70 + top.hits * 8);

  return scored.slice(0, 4).map((s, i) => {
    const dept = departments.find((d) => d.id === s.deptId)!;
    const confidence = i === 0 ? baseConfidence : Math.max(30, baseConfidence - i * 18);
    const level = confidence >= 80 ? 'high' : confidence >= 55 ? 'medium' : 'low';
    return {
      department: dept,
      confidence,
      reasons: buildReasons(dept, s.hits, i),
      level,
    };
  });
}

function buildReasons(dept: Department, hits: number, index: number): string[] {
  const reasons: string[] = [];
  if (index === 0) {
    reasons.push(`Your query appears related to ${dept.description.split('.')[0].toLowerCase()}.`);
    reasons.push(`${hits} keyword${hits > 1 ? 's' : ''} in your description matched this department's domain.`);
  } else {
    reasons.push(`Partially related to ${dept.shortName.toLowerCase()} services.`);
    reasons.push('Listed as an alternative in case your request overlaps jurisdictions.');
  }
  return reasons;
}

export function getDepartment(id: string): Department | undefined {
  return departments.find((d) => d.id === id);
}

export function getRTI(id: string): RTIRequest | undefined {
  return rtiRequests.find((r) => r.id === id);
}

export function getDraft(id: string): Draft | undefined {
  return drafts.find((d) => d.id === id);
}
