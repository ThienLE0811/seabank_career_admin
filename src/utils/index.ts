import {
  Category,
  GetListRecruitmentRequest,
  GetListRecruitmentTemplateRequest,
} from "#/lib/openapi";

import { categoryApi } from "#/services/api";

import { masterDataApi } from "#/services/api";

import { ApiGetPostRequest, Banners, Post } from "#/lib/openapi";

import { MenuDataItem } from "@ant-design/pro-layout";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import { RouteObject } from "react-router";

type TypingGetMasterData = {
  type: string;
  formatSelect: boolean;
  cache: boolean;
};

export const newStructureRoutesProLayout = (
  props: RouteObject[] = []
): MenuDataItem =>
  props.map((routerObj) => ({
    ...routerObj,
    ...(routerObj?.children && {
      routes: routerObj.children.map((value) =>
        newStructureRoutesProLayout([value])
      ),
    }),
  }));

export const isApiSuccess = (response: AxiosResponse<any | any>) => {
  return response.data.success === true;
};

export const isApiFailed = (response: AxiosResponse<any | any>) => {
  return response.data.success === false;
};

/**
 *
 * @description: Trả về dữ liệu của api khi thành công
 *
 */
export const getDataApi = (response: AxiosResponse<any & any>) => {
  return response.data?.data || {};
};

export function getErrorApi(response: AxiosResponse<any>) {
  return response.data.error || {};
}

export const saveCredentialCookie = ({
  refreshToken,
  accessToken,
  expires,
  userId,
}: any) => {
  Cookies.set("refreshToken", refreshToken || "", {
    expires: 3000,
  });

  Cookies.set("access_token", accessToken || "", {
    expires: expires,
  });

  Cookies.set("userId", userId || "", {
    expires: 3000,
  });
};

export async function getMasterDataByTypeUtil(
  type: string,
  formatSelect: boolean,
  cache: boolean
): Promise<any[]> {
  {
    // try {
    //   const res = await masterDataApi.adminCareerServiceV1MasterdataGetListPost(
    //     { name: type }
    //   );
    //   console.log("res:: ", getDataApi(res).items);
    //   if (isApiSuccess(res)) {
    //     const value = getDataApi(res);
    //     const list = value?.items.map((value: any) => {
    //       return {
    //         value: value?.id,
    //         label: value?.name,
    //       };
    //     });

    //     return list;
    //   }
    //   return;
    // } catch (error) {}

    try {
      let masterData;
      async function getMasterDataByTypeServer(type: string): Promise<any[]> {
        const res =
          await masterDataApi.adminCareerServiceV1MasterdataGetListPost({
            name: type,
          });
        if (isApiSuccess(res)) return getDataApi(res).items;
        return [];
        // if (res.body?.status === "OK") return res.body.dataRes?.[type];
        // return [];
      }
      if (cache) {
        masterData = sessionStorage.getItem(
          `masterData::career::website::${type}`
        );
        masterData === "undefined" && (masterData = "[]");
        if (
          masterData &&
          Array.isArray(JSON.parse(masterData)) &&
          JSON.parse(masterData).length > 0
        ) {
          masterData = JSON.parse(masterData);
        } else {
          masterData = await getMasterDataByTypeServer(type);
        }
      } else {
        masterData = await getMasterDataByTypeServer(type);
      }
      sessionStorage.setItem(
        `masterData::career::website::${type}`,
        JSON.stringify(masterData)
      );
      return formatSelect
        ? masterData?.map?.((value: any) => {
            return { label: value?.name, value: value?.id };
          })
        : masterData;
    } catch (error) {
      return [];
    }
  }
}
export function typeGetListPostsByTab(tab: string) {
  switch (tab) {
    case "publish":
      return "getListPublish";

    case "unpublish":
      return "getListUnpublish";
    default:
      return "getListPublish";
  }
}

export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function readFileToUnit8Array(file: File) {
  return new Promise((resolve, reject) => {
    // Create file reader
    const reader = new FileReader();

    // Register event listeners
    //@ts-ignore
    reader.addEventListener("loadend", (e: any) =>
      resolve(new Uint8Array(e.target.result))
    );
    reader.addEventListener("error", reject);

    // Read file
    reader.readAsArrayBuffer(file);
  });
}

export const fieldDateRangePropsCustom = {
  format: "DD/MM/YYYY",
  ranges: {
    "Hôm nay": [moment().startOf("d"), moment().endOf("d")],
    "Hôm qua": [
      moment().subtract(1, "d").startOf("d"),
      moment().subtract(1, "d").endOf("d"),
    ],
    "Tuần này": [moment().startOf("week").startOf("d"), moment().endOf("d")],
    "Tuần trước": [
      moment().subtract(1, "w").startOf("week").startOf("d"),
      moment().subtract(1, "w").endOf("week").endOf("d"),
    ],
    "Tháng này": [moment().startOf("month").startOf("d"), moment().endOf("d")],
    "Tháng trước": [
      moment().subtract(1, "M").startOf("month").startOf("d"),
      moment().subtract(1, "M").endOf("month").endOf("d"),
    ],
  },
};

export function fieldPropsFilter() {
  const disabledDate = (current: any) => {
    // Kiểm tra nếu ngày hiện tại lớn hơn ngày hiện tại sẽ disable
    return current && current > moment().endOf("d");
  };

  return {
    ...fieldDateRangePropsCustom,
    disabledDate: disabledDate,
  };
}

export function fieldPropsDataDisableStart() {
  const disabledDate = (current: any) => {
    return current && current < moment().startOf("d");
  };

  return {
    ...fieldDateRangePropsCustom,
    disabledDate: disabledDate,
  };
}

export function requestPayloadCategory({
  params,
  sort,
  filter,
}: ProTableRequest): ApiGetPostRequest {
  return {
    start: params?.current - 1 || 0,
    limit: params?.pageSize,
  };
}

export function requestPayloadRecruitmentTemplate({
  params,
  sort,
  filter,
}: ProTableRequest): GetListRecruitmentTemplateRequest {
  return {
    start: params?.current - 1 || 0,
    limit: params?.pageSize,
    keywords: params?.keyword,
    industry: params?.industry,
    departments: params?.departments,
  };
}

export function requestPayloadRecruitmentManager({
  params,
  sort,
  filter,
  activeTab,
}: ProTableRequest): GetListRecruitmentRequest | any {
  return {
    start: params?.current - 1 || 0,
    limit: params?.pageSize,
    states: [activeTab],
    keywords: params?.keyword,
    industry: params?.industry,
    isExpired: params?.isExpired,
  };
}

export function requestPayloadPosts({
  params,
  sort,
  filter,
  activeTab,
}: ProTableRequest): ApiGetPostRequest | any {
  const transformStartDate = moment(
    params?.createdTime?.at(0),
    "DD/MM/YYYY"
  ).valueOf();
  const transformEndDate = moment(
    params?.createdTime?.at(1),
    "DD/MM/YYYY"
  ).valueOf();

  return {
    start: params?.current - 1 || 0,
    limit: params?.pageSize,
    keywords: params?.keyword,
    state: activeTab,
    stick:
      params?.stick === "true"
        ? true
        : params?.stick === "false"
        ? false
        : undefined,
    startDate: transformStartDate,
    endDate: transformEndDate,
    categories: params?.categories,
  };
}

export function requestPayloadBanner({
  params,
  sort,
  filter,
  activeTab,
}: ProTableBannerRequest): BannerTableRequest {
  console.log("params1:: ", params);
  console.log("sort1: ", sort);
  console.log("filter1: ", filter);

  return {
    keywords: params?.keyword,
    _public: activeTab as any,
  };
}

export function hanldeReloadTablePosts({
  listTable,
  activeTab,
  actionRef,
}: HanldeReloadTable) {
  const someAreTable = listTable.every(
    (value: Post) => value?.state === activeTab
  );

  console.log("check:: ", someAreTable);
  if (!someAreTable) {
    actionRef?.current?.reload();
  }
}

export async function getListCategory({ start, limit }: GetListCategoryProps) {
  try {
    const res = await categoryApi.adminCmsServiceV1CategoriesGetListPost({
      start,
      limit,
    });

    if (isApiSuccess(res)) {
      const response = getDataApi(res);
      const list = response?.items.map((value: Category) => {
        return {
          value: value?.id,
          label: value?.title,
        };
      });
      console.log("list:: ", list);
      return list;
    } else {
      return Promise.reject();
    }
  } catch (error) {}
}

export function hanldeReloadTableBanner({
  listTable,
  activeTab,
  actionRef,
}: HanldeReloadTable) {
  console.log("listTable", listTable);
  const tranformActiveTab = activeTab === "true" ? true : false;
  console.log("tranformActiveTab:: ", tranformActiveTab);

  const someAreTable = listTable.every(
    (value: Banners | any) => value?.publicBanner === tranformActiveTab
  );

  console.log("check:: ", someAreTable);
  if (!someAreTable) {
    actionRef?.current?.reload();
  }
}
