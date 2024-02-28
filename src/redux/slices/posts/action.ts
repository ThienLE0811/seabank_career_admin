// import api from "@/services/api";
import {
  ApiGetPostRequest,
  GetDetailPostResponse,
  PostRequestBody,
  PostRequestUpdateBody,
  RequestDeleteBody,
} from "#/lib/openapi";
import request from "#/lib/request";
import { postsApi } from "#/services/api";
import { getDataApi, getErrorApi, isApiSuccess } from "#/utils";
// import services from "#/services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification, message } from "antd";
import type {
  IRequestCreateData,
  IRequestDeleteManyData,
  IRequestDeleteOneData,
  IRequestFetchDetailData,
  IRequestFetchTableData,
  IRequestUpdateData,
  IResponseDeleteOneData,
  IResponseFetchData,
  IResponseManyData,
} from "./data";

const createPostsData = createAsyncThunk(
  "posts/create",
  async (params: any, {}) => {
    return Promise.resolve();
  }
);

export const fetchPostsTableData = createAsyncThunk<
  IResponseFetchData<GetDetailPostResponse>,
  ApiGetPostRequest
  // IRequestFetchTableData
>(
  "posts/getPostsTableData",
  async ({
    start,
    limit,
    state,
    keywords,
    startDate,
    endDate,
    stick,
    categories,
  }) => {
    console.log("params:: ", start);
    console.log("limit: ", limit);
    console.log("keywords: ", keywords);

    try {
      const response = await postsApi.getListPost({
        start,
        limit,
        state,
        keywords,
        startDate,
        endDate,
        stick,
        categories,
        // state: "DRAFT",
      });
      // const response = await request.get("/dataMock/postsList.json");
      console.log("res:: ", response);
      if (isApiSuccess(response)) {
        return Promise.resolve({
          data: getDataApi(response).items,
          total: getDataApi(response).total ?? 0,
          success: true,
        });
      }
      // if (response) {
      //   return Promise.resolve({
      //     data: response?.data,
      //     total: getDataApi(response).total ?? 0,
      //     success: true,
      //   });
      // }
      else {
        notification.error({ message: getErrorApi(response).message });
        return Promise.reject();
      }
    } catch (error) {
      return Promise.reject();
    }
  }
);

export const createPostsTableData = createAsyncThunk<
  IRequestCreateData,
  PostRequestBody
>("posts/createPostsTableData", async (params) => {
  try {
    const response = await postsApi.createPost(params);

    if (isApiSuccess(response)) {
      notification.success({ message: "Thêm mới thành công" });
      return Promise.resolve(getDataApi(response));
    } else {
      notification.error(
        { message: getErrorApi(response).message } || "Thêm mới thất bại"
      );
      return Promise.reject();
    }
  } catch (error) {
    return Promise.reject();
  }
});

export const updatePostsTableData = createAsyncThunk<
  any,
  PostRequestUpdateBody
>("posts/updatePostsTableData", async (params) => {
  try {
    const response = await postsApi.updatePost(params);
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

export const getPostsById = createAsyncThunk<GetDetailPostResponse, number>(
  "posts/getPostsById",
  async (id) => {
    try {
      const response = await postsApi.getDetailPost(id);

      if (isApiSuccess(response)) {
        return Promise.resolve(getDataApi(response));
      } else {
        notification.error(
          {
            message: getErrorApi(response).message,
          } || "Lấy dữ liệu thất bại"
        );
        return Promise.reject();
      }
    } catch (error) {
      notification.error({ message: "Lấy dữ liệu thất bại" });
      return Promise.reject();
    }
  }
);

export const deletePostsTableData = createAsyncThunk<
  RequestDeleteBody | any,
  RequestDeleteBody
>("posts/deletePostsTableData", async (id) => {
  try {
    const response = await postsApi.deletePost(id);
    if (isApiSuccess(response)) {
      notification.success({ message: "Xóa dữ liệu thành công" });
      return Promise.resolve(id);
    } else {
      notification.error(
        {
          message:
            getErrorApi(response).errors.at(0).message ||
            getErrorApi(response).message,
        } || `Xóa dữ liệu không thành công`
      );
      return Promise.reject();
    }
  } catch (error) {
    notification.error({
      message: `Xóa dữ liệu không thành công`,
      //   description: error?.toString(),
    });
    return Promise.reject();
  }
});
