// import api from "@/services/api";
import message from "#/hooks/message";
import {
  DeleteMediaFileRequest,
  DeleteMediaFileResponse,
  DeleteMediaFileResponseAllOfData,
  GetDetailPostResponse,
  PostRequestBody,
  PostRequestUpdateBody,
} from "#/lib/openapi";
import request from "#/lib/request";
import { mediaApi, postsApi } from "#/services/api";
import { getDataApi, getErrorApi, isApiSuccess } from "#/utils";
// import services from "#/services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";

type GetListMediaProps = {
  start?: number;
  limit?: number;
};

export const fetchMediaListData = createAsyncThunk<any, GetListMediaProps>(
  "posts/getMediaListData",
  async ({ start, limit }) => {
    console.log("dữ liệu:: ", start, limit);
    try {
      // postsApi.adminCmsPostsGetListV2Post({start: 0, limit: 50})
      const response = await mediaApi.getMediaFiles(start, limit);
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
  }
);

export const deleteMediaFiles = createAsyncThunk<
  // DeleteMediaFileResponse,
  DeleteMediaFileResponseAllOfData,
  DeleteMediaFileRequest
>("posts/deleteMediaFiles", async ({ ids }) => {
  try {
    const response = await mediaApi.deleteMediaFiles({ ids });

    if (isApiSuccess(response)) {
      notification.success({ message: "Xóa file thành công" });
      return Promise.resolve({
        items: getDataApi(response).items,
      });
    } else {
      notification.error({ message: getErrorApi(response).message });
      return Promise.reject();
    }
  } catch (error) {
    return Promise.reject();
  }
});
