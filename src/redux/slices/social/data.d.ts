import { SortOrder } from "antd/es/table/interface";
export interface SocialState {
  socialListData: {
    data: any[];
    total: number;
  };
  modalSocialFormOpen: boolean;
  modalSocialDetailOpen: boolean;
}

export interface IRequestFetchTableData {
  params: {
    pageSize?: number;
    current?: number;
    keyword?: string;
  };
  sort: Record<string, SortOrder>;
  filter: Record<string, (string | number)[] | null>;
}
export interface IResponseFetchData<T> {
  data: T[];
  total: number;
  success: boolean;
}

export interface IRequestCreateData<T> {
  record: T;
  caseId: string;
}

export interface IRequestUpdateData<T> {
  record: T;
  caseId: string;
}

export interface IRequestDeleteOneData {
  id: string | number;
  caseId: string;
}

export interface IResponseDeleteOneData {
  id: string | number;
}

export interface IRequestDeleteManyData {
  caseId: string;
}
