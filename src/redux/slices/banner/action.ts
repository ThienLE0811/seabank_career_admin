import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "#/lib/request";
import { getDataApi, getErrorApi, isApiSuccess } from "#/utils";
import { notification } from "antd";
import { bannerApi } from "#/services/api";
import {
  ApiBaseRequestBody,
  Banners,
  CreateBannerRequest,
  CreateBannerResponse,
  DeleteBannerRequest,
  DeleteBannerResponse,
  GetBannerByIdResponse,
  GetListBannerResponse,
  UpdateBannerRequest,
  UpdateBannerResponse,
} from "#/lib/openapi";

export const fetchBannerTableData = createAsyncThunk<
  GetListBannerResponse,
  BannerTableRequest
>("posts/getBannerTableData", async ({ _public, keywords }) => {
  try {
    const response = await bannerApi.getListBanner(_public, keywords as any);

    console.log("res:: ", response);

    if (isApiSuccess(response)) {
      return Promise.resolve({
        data: getDataApi(response).items,
        total: getDataApi(response).total ?? 0,
        success: true,
      });
    } else {
      notification.error({ message: getErrorApi(response).message });
      return Promise.reject();
    }
  } catch (error) {
    return Promise.reject();
  }
});

export const createBanners = createAsyncThunk<
  CreateBannerResponse,
  CreateBannerRequest
>(
  "posts/createBanners",
  async ({
    name,
    fileUrl,
    targetUrl,
    mimeType,
    // ordering,
    content,
    duration,
  }) => {
    try {
      const response = await bannerApi.createBanner({
        name,
        fileUrl,
        targetUrl,
        // ordering,
        mimeType,
        content,
        duration,
      });

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
  }
);

export const updateBanners = createAsyncThunk<Banners, UpdateBannerRequest>(
  "posts/updateBanners",
  async ({
    name,
    fileUrl,
    targetUrl,
    publicBanner,
    // ordering,
    id,
    mimeType,
    content,
    duration,
  }) => {
    console.log("==id:: ", fileUrl);
    try {
      const response = await bannerApi.updateBanner({
        name,
        fileUrl,
        targetUrl,
        publicBanner,
        // ordering,
        id,
        mimeType,
        content,
        duration,
      });

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
      return Promise.reject();
    }
  }
);

export const getBannerById = createAsyncThunk<GetBannerByIdResponse, number>(
  "posts/getBannerById",
  async (id) => {
    console.log("id:: ", id);
    try {
      const response = await bannerApi.getBannerById(id);

      if (isApiSuccess(response)) {
        console.log("get:: ", isApiSuccess(response));
        return Promise.resolve(getDataApi(response));
      } else {
        notification.error(
          { message: getErrorApi(response).message } || "Lấy dữ liệu thất bại"
        );
        return Promise.reject();
      }
    } catch (error) {
      return Promise.reject();
    }
  }
);

export const deleteBanners = createAsyncThunk<
  DeleteBannerRequest | any,
  DeleteBannerRequest
>("posts/deleteBanners", async (id) => {
  try {
    const response = await bannerApi.deleteBanner(id);
    if (isApiSuccess(response)) {
      notification.success({ message: "Xóa dữ liệu thành công" });
      return Promise.resolve(id);
    } else {
      notification.error({ message: `Xóa dữ liệu không thành công` });
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
