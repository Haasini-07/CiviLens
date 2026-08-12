import type {
  Department,
  Recommendation,
  RTIRequest,
  Draft,
  ActivitySummary,
  UserProfile,
} from '@/types';
import {
  departments,
  rtiRequests,
  drafts,
  activity,
  user,
  recommendDepartments,
  getDepartment,
  getRTI,
  getDraft,
} from './mockData';

function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const api = {
  listDepartments: (): Promise<Department[]> => delay(departments),
  recommend: (query: string): Promise<Recommendation[]> => delay(recommendDepartments(query), 700),
  listRTIs: (): Promise<RTIRequest[]> => delay(rtiRequests),
  getRTI: (id: string): Promise<RTIRequest | undefined> => delay(getRTI(id)),
  listDrafts: (): Promise<Draft[]> => delay(drafts),
  getDraft: (id: string): Promise<Draft | undefined> => delay(getDraft(id)),
  getActivity: (): Promise<ActivitySummary> => delay(activity, 200),
  getDepartment: (id: string): Promise<Department | undefined> => delay(getDepartment(id)),
  getUser: (): Promise<UserProfile> => delay(user, 200),
};
