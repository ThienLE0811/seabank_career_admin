import { SortOrder } from "antd/es/table/interface";
import { Category } from "#/lib/openapi";
export interface CategoryState {
  categoryListData:
    | {
        items: any[];
        total: number;
      }
    | any;
  modalCategoryFormOpen: boolean;
  drawerCategoryDetailOpen: boolean;
  currentCategory?: Category | any;
  currentCategoryDetail?: Category | any;
  loadingForm: boolean;
  selectedRows: [];
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
