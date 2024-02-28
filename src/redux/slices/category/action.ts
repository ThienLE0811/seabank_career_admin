// import api from "@/services/api";
import {
  CategoryRequestBody,
  CategoryRequestUpdateBody,
  DeleteCategoryRequest,
  GetDetailCategoryResponse,
  GetListCategoryRequest,
  PostsApi,
} from "#/lib/openapi";
import request from "#/lib/request";
import { categoryApi, postsApi } from "#/services/api";
// import services from "#/services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import type {
  IRequestCreateData,
  IRequestFetchTableData,
  IRequestUpdateData,
  IResponseFetchData,
} from "./data";
import { getDataApi, getErrorApi, isApiSuccess } from "#/utils";
import message from "antd";

export const fetchCategoryTableData = createAsyncThunk<
  IResponseFetchData<GetDetailCategoryResponse>,
  GetListCategoryRequest
>("category/fetchCategoryTableData", async ({ start, limit }) => {
  try {
    const response = await categoryApi.adminCmsServiceV1CategoriesGetListPost({
      start,
      limit,
    });

    if (isApiSuccess(response)) {
      return Promise.resolve(getDataApi(response));
    } else {
      notification.error({
        message: getErrorApi(response) || "Lỗi không lấy được dữ liệu",
      });
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

export const getCategoryById = createAsyncThunk<
  GetDetailCategoryResponse,
  number
>("posts/getPostsById", async (id) => {
  try {
    const response = await categoryApi.getDetailCategory(id);

    if (isApiSuccess(response)) {
      return Promise.resolve(getDataApi(response));
    } else {
      notification.error(
        { message: getErrorApi(response).message } || "Lấy dữ liệu thất bại"
      );
      return Promise.reject();
    }
  } catch (error) {
    notification.error({ message: "Lấy dữ liệu thất bại" });
    return Promise.reject();
  }
});

export const createCategoryTableData = createAsyncThunk<
  any,
  CategoryRequestBody
>("category/createCategoryTableData", async (params) => {
  try {
    const response = await categoryApi.adminCmsServiceV1CategoriesPost(params);

    if (isApiSuccess(response)) {
      console.log("123");
      notification.success({ message: "Thêm mới thành công" });
      return Promise.resolve(getDataApi(response));
    } else {
      notification.error(
        { message: getErrorApi(response).message } || "Thêm mới thất bại"
      );
      return Promise.reject();
    }
  } catch (error) {
    notification.error({ message: "Cập nhật thất bại" });
    return Promise.reject();
  }
});

export const updateCategoryTableData = createAsyncThunk<
  any,
  CategoryRequestUpdateBody
>("category/updateCategoryTableData", async (params) => {
  try {
    const response = await categoryApi.adminCmsServiceV1CategoriesPut(params);
    console.log("response:: ", isApiSuccess(response));

    if (isApiSuccess(response)) {
      notification.success({ message: "Cập nhật thành công" });

      return Promise.resolve(getDataApi(response));
    } else {
      notification.error(
        { message: getErrorApi(response).message } || "Cập nhật thất bại"
      );
      return Promise.reject();
    }
  } catch (error) {
    notification.error({ message: "Cập nhật thất bại" });
    return Promise.reject();
  }
});

export const deleteCategoryTableData = createAsyncThunk<
  any,
  DeleteCategoryRequest
>("posts/deleteCategoryTableData", async (id) => {
  try {
    const response = await categoryApi.deleteCategory(id);
    if (isApiSuccess(response)) {
      notification.success({ message: "Xóa dữ liệu thành công" });
      return Promise.resolve(id);
    } else {
      notification.error(
        {
          message: getErrorApi(response).message,
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
