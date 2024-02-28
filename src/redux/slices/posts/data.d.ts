import { Post } from "#/lib/openapi";
import { SortOrder } from "antd/es/table/interface";
export interface PostsState {
  postsListData: {
    data: any[];
    total: number;
  };
  modalPostsFormOpen: boolean;
  modalPostsDetailOpen: boolean;
  currentPosts?: Post | any;
  currentPostDetail?: Post | any;
  currentIdPosts?: number;
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

export interface IRequestFetchDetailData {
  postId: number;
}

export interface IResponseFetchData<T> {
  data: T[];
  total: number;
  success: boolean;
}

export interface IRequestCreateData {
  title: string;
  /**
   *
   * @type {string}
   * @memberof PostRequestBody
   */
  alias: string;
  /**
   *
   * @type {string}
   * @memberof PostRequestBody
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof PostRequestBody
   */
  content: string;
  /**
   *
   * @type {string}
   * @memberof PostRequestBody
   */
  state: string;
  /**
   *
   * @type {number}
   * @memberof PostRequestBody
   */
  ordering?: number;
  /**
   *
   * @type {boolean}
   * @memberof PostRequestBody
   */
  stick?: boolean;
  /**
   *
   * @type {Array<number>}
   * @memberof PostRequestBody
   */
  categoriesId?: Array<number>;
  /**
   *
   * @type {string}
   * @memberof PostRequestBody
   */
  thumbImage?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof PostRequestBody
   */
  postTags?: Array<string>;
  /**
   *
   * @type {boolean}
   * @memberof PostRequestBody
   */
  feature?: boolean;
  /**
   *
   * @type {number}
   * @memberof PostRequestBody
   */
  featureOrdering?: number;
  /**
   *
   * @type {string}
   * @memberof PostRequestBody
   */
  bannerImage?: string;
  id: number;
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

export interface IResponseManyData {
  id: number[];
}

export interface IRequestDeleteManyData {
  // caseId: string;
  id: Array<number>;
}
