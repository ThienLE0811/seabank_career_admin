// import api from "@/services/api";
import {
  CreateRecruitmentRequest,
  GetDetailRecruitmentResponse,
  GetListRecruitmentRequest,
  RecruitmentData,
  RecruitmentTemplate,
  UpdateRecruitmentRequest,
} from "#/lib/openapi";
import request from "#/lib/request";
import { recruitmentApi } from "#/services/api";
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

export const getListRecruitment = createAsyncThunk<
  IResponseFetchData<Recruitment>,
  GetListRecruitmentRequest
>(
  "recruitments/getListRecruitment",
  async ({ start, limit, states, keywords, isExpired }) => {
    try {
      const response = await recruitmentApi.getListRecruitment({
        start,
        limit,
        states,
        keywords,
        isExpired,
      });

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
  }
);

// export const getDetailRecruitment = createAsyncThunk<
//   GetDetailRecruitmentResponse,
//   number
// >("recruitmentsTemplate/getDetailRecruitmentTemplate", async (id) => {
//   try {
//     const response = await recruitmentApi.getDetailRecruitment(id);
//     console.log("===res:: ", response);

//     if (isApiSuccess(response)) {
//       return Promise.resolve(getDataApi(response));
//     } else {
//       notification.error({ message: "Lỗi không lấy được dữ liệu" });
//       return Promise.reject();
//     }
//   }
// );

export const getDetailRecruitment = createAsyncThunk<
  GetDetailRecruitmentResponse,
  number
>("recruitments/getDetailRecruitment", async (id) => {
  try {
    const response = await recruitmentApi.getDetailRecruitment(id);
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

export const updateRecruitment = createAsyncThunk<
  RecruitmentData,
  UpdateRecruitmentRequest
>("recruitments/updateRecruitment", async (params) => {
  try {
    const response = await recruitmentApi.updateRecruitment(params);
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

export const createRecruitment = createAsyncThunk<
  RecruitmentData,
  CreateRecruitmentRequest
>("recruitments/createRecruitment ", async (params) => {
  try {
    const response = await recruitmentApi.createRecruitment(params);
    console.log("response::: ", params);
    if (isApiSuccess(response)) {
      notification.success({ message: "Tạo mới thành công" });
      return Promise.resolve(params);
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

export const deleteJobManagerTableData = createAsyncThunk<
  any,
  IRequestUpdateData<PostsInfo>
>("recruitments/deleteRecruitmentsTableData", async (params) => {
  const { record, caseId } = params;
  // const formatRecord = formatRequestRecord(record);
  try {
    const { data, success } = { data: [], success: true };
    if (success) {
      notification.success({ message: "Sửa dữ liệu thành công" });
      return Promise.resolve({
        data: record,
      });
    } else {
      notification.error({ message: `Lỗi không sửa được bản ghi` });
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
