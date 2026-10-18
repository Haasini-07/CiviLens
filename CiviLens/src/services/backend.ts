const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
  } catch {
    throw new Error('Cannot reach the CiviLens backend. Start FastAPI in the backend terminal and try again.');
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail || `Backend request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export type Department = { id: string; name: string; short_name: string; parent_authority: string; description: string; authority_hint?: string };
export type Recommendation = { department: Department; confidence: number; reasons: string[]; level: string };
export type ChecklistItem = { complete: boolean; label: string; message: string };
export type GeneratedDraft = { title: string; content: string; drafting_engine?: 'gemini' | 'rule-based-fallback'; applicant_name: string; applicant_address: string; department_id: string; department_name: string; draft_type: 'rti' | 'complaint'; issue_description: string; checklist: Record<string, ChecklistItem>; recommendations: Recommendation[] };
export type SavedDraft = Omit<GeneratedDraft, 'recommendations'> & { recommendations?: Recommendation[]; id: string; created_at: string; updated_at: string };
export type RTIRecord = { id: string; applicant_name: string; subject: string; public_authority: string; department_id: string; filed_date: string; follow_up_date: string; reference_number: string; status: string; notes: string; reply_text: string; created_at: string; updated_at: string };

export const backend = {
  health: () => request<{ status: string; database: string }>('/health'),
  departments: () => request<Department[]>('/departments'),
  recommend: (description: string) => request<{ recommendations: Recommendation[]; checklist: Record<string, ChecklistItem>; disclaimer: string }>('/recommend', { method: 'POST', body: JSON.stringify({ description }) }),
  generateDraft: (payload: { applicant_name: string; applicant_address?: string; description: string; draft_type: 'rti' | 'complaint'; department_id?: string }) => request<GeneratedDraft>('/drafts/generate', { method: 'POST', body: JSON.stringify(payload) }),
  listDrafts: (search = '') => request<SavedDraft[]>(`/drafts?search=${encodeURIComponent(search)}`),
  createDraft: (payload: Pick<GeneratedDraft, 'title' | 'applicant_name' | 'applicant_address' | 'department_id' | 'draft_type' | 'issue_description' | 'content' | 'checklist'>) => request<SavedDraft>('/drafts', { method: 'POST', body: JSON.stringify(payload) }),
  updateDraft: (id: string, payload: Pick<GeneratedDraft, 'title' | 'applicant_name' | 'applicant_address' | 'department_id' | 'draft_type' | 'issue_description' | 'content' | 'checklist'>) => request<SavedDraft>(`/drafts/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteDraft: (id: string) => request<{ deleted: boolean }>(`/drafts/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  listRTIs: (search = '') => request<RTIRecord[]>(`/rtis?search=${encodeURIComponent(search)}`),
  createRTI: (payload: Omit<RTIRecord, 'id' | 'created_at' | 'updated_at'>) => request<RTIRecord>('/rtis', { method: 'POST', body: JSON.stringify(payload) }),
  updateRTI: (id: string, payload: Omit<RTIRecord, 'id' | 'created_at' | 'updated_at'>) => request<RTIRecord>(`/rtis/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteRTI: (id: string) => request<{ deleted: boolean }>(`/rtis/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  listAttachments: (id: string) => request<{id:string;rti_id:string;original_name:string;content_type:string;size_bytes:number;created_at:string}[]>(`/rtis/${encodeURIComponent(id)}/attachments`),
  uploadAttachment: async (id: string, file: File) => { const form = new FormData(); form.append('file', file); const response = await fetch(`${API_BASE}/rtis/${encodeURIComponent(id)}/attachments`, {method:'POST', body:form}); if(!response.ok){const body=await response.json().catch(()=>({})); throw new Error(body.detail || `Upload failed (${response.status})`);} return response.json() as Promise<{id:string;original_name:string}>; },
  attachmentUrl: (id:string, attachmentId:string) => `${API_BASE}/rtis/${encodeURIComponent(id)}/attachments/${encodeURIComponent(attachmentId)}/download`,
  analyzeReply: (reply_text: string) => request<{ signals: string[]; findings: string[]; next_steps: string[]; notice: string }>('/analyze-reply', { method: 'POST', body: JSON.stringify({ reply_text }) }),
  guidance: () => request<{ title: string; body: string }[]>('/guidance'),
  activity: () => request<{ active: number; drafts: number; upcoming_deadlines: number; completed: number }>('/activity'),
};
