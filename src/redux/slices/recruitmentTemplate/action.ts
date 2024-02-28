// import api from "@/services/api";
import {
  CreateRecruitmentTemplateRequest,
  DeleteByIdsRequest,
  DeleteRecruitmentTemplatesResponse,
  GetDetailRecruitmentTemplateResponse,
  GetListRecruitmentTemplateRequest,
  RecruitmentTemplate,
  RecruitmentTemplateData,
  UpdateRecruitmentTemplateRequest,
  UpdateRecruitmentTemplateResponse,
} from "#/lib/openapi";
import request from "#/lib/request";
import { recruitmentApi, recruitmentTemplateApi } from "#/services/api";
import { getDataApi, getErrorApi, isApiSuccess } from "#/utils";
// import services from "#/services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import type {
  IRequestCreateData,
  IRequestFetchTableData,
  IRequestUpdateData,
  IResponseFetchData,
} from "./data";

export const fetchRecruitmentsTemplateTableData = createAsyncThunk<
  IResponseFetchData<RecruitmentTemplate>,
  GetListRecruitmentTemplateRequest
>(
  "recruitmentsTemplate/fetchRecruitmentsTemplateTableData",
  async ({ start, limit, keywords, departments, industry }) => {
    console.log("key:: ", keywords);
    try {
      const response = await recruitmentTemplateApi.getListRecruitmentTemplate({
        start,
        limit,
        keywords,
        departments,
        industry,
      });

      if (isApiSuccess(response)) {
        return Promise.resolve({
          data: getDataApi(response).items,
          total: getDataApi(response).total ?? 0,
          success: true,
        });
      } else {
        notification.error({ message: "Lỗi không lấy được dữ liệu" });
        return Promise.reject();
      }
    } catch (error) {
      notification.error({
        message: `Lỗi không lấy được dữ liệu`,
        //   description: error?.toString(),
      });
      return Promise.reject();
    }
  }
);

export const getDetailRecruitmentTemplate = createAsyncThunk<
  GetDetailRecruitmentTemplateResponse,
  number
>("recruitmentsTemplate/getDetailRecruitmentTemplate", async (id) => {
  try {
    const response = await recruitmentTemplateApi.getDetailRecruitmentTemplate(
      id
    );
    console.log("===res:: ", response);

    if (isApiSuccess(response)) {
      return Promise.resolve(getDataApi(response));
    } else {
      notification.error({ message: "Lỗi không lấy được dữ liệu" });
      return Promise.reject();
    }
  } catch (error) {
    notification.error({
      message: `Lỗi không lấy được dữ liệu`,
      //   description: error?.toString(),
    });
    return Promise.reject();
  }
});

export const updateRecruitmentTemplate = createAsyncThunk<
  RecruitmentTemplateData,
  UpdateRecruitmentTemplateRequest
>("recruitmentsTemplate/updateRecruitmentTemplate", async (params) => {
  try {
    const response = await recruitmentTemplateApi.updateRecruitmentTemplate(
      params
    );
    console.log("response::: ", params);
    if (isApiSuccess(response)) {
      notification.success({ message: "Cập nhật thành công" });
      return Promise.resolve(params);
    } else {
      notification.error(
        { message: getErrorApi(response).message } || "Cập nhật thất bại"
      );
      return Promise.reject();
    }
  } catch (error) {
    return Promise.reject();
  }
});

export const createRecruitmentTemplate = createAsyncThunk<
  RecruitmentTemplateData,
  CreateRecruitmentTemplateRequest
>("recruitmentsTemplate/createRecruitmentTemplate", async (params) => {
  try {
    const response = await recruitmentTemplateApi.createRecruitmentTemplate(
      params
    );
    console.log("response::: ", response);
    if (isApiSuccess(response)) {
      notification.success({ message: "Tạo mới thành công" });
      return Promise.resolve(getDataApi(response));
    } else {
      notification.error(
        { message: getErrorApi(response).message } || "Tạo mới thất bại"
      );
      return Promise.reject();
    }
  } catch (error) {
    return Promise.reject();
  }
});

export const deleteRecruitmentTemplates = createAsyncThunk<
  DeleteByIdsRequest,
  DeleteByIdsRequest
>("recruitments/deleteRecruitmentTemplates", async (params) => {
  try {
    const response = await recruitmentTemplateApi.deleteRecruitmentTemplates(
      params
    );

    console.log("res:: ", response);
    if (isApiSuccess(response)) {
      notification.success({ message: "Xóa việc làm thành công" });
      return Promise.resolve(params);
    } else {
      notification.error(
        { message: getErrorApi(response).message } ||
          "Xóa việc làm không thành công"
      );
      return Promise.reject();
    }
  } catch (error) {
    notification.error({
      message: `Lỗi không sửa được bản ghi`,
      //   description: error?.toString(),
    });
    return Promise.reject();
  }
});
