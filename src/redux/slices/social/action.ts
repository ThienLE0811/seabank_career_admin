// import api from "@/services/api";
import request from "#/lib/request";
// import services from "#/services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import type {
  IRequestCreateData,
  IRequestFetchTableData,
  IRequestUpdateData,
  IResponseFetchData,
} from "./data";

export const fetchSocialTableData = createAsyncThunk<
  IResponseFetchData<PostsInfo>,
  IRequestFetchTableData
>("posts/updatePostsTableData", async (params, { signal }) => {
  try {
    const { data, success, total } = await request
      .get("/dataMock/jobList.json", {
        params,
      })
      .then((response) => ({
        data: response.data,
        total: response.data.length,
        success: true,
      }));

    if (success) {
      return Promise.resolve({
        data,
        total: total ?? 0,
        success,
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
});

// export const createPostsTableData = createAsyncThunk<
//   any,
//   IRequestCreateData<PostsInfo>
// >("posts/updatePostsTableData", async (params) => {
//   try {
//     const { record, caseId } = params;
//     // const formatRecord = formatRequestRecord(record);
//     const { data, success } = await services.auth.logout();
//     if (success) {
//       // const id: number = data[0];
//       const id = 0;
//       notification.success({ message: "Tạo dữ liệu thành công" });
//       return Promise.resolve({
//         data: record,
//         id,
//       });
//     } else {
//       notification.error({ message: `Lỗi không tạo được bản ghi` });
//       return Promise.reject();
//     }
//   } catch (error) {
//     notification.error({
//       message: `Lỗi không tạo được bản ghi`,
//       //   description: error?.toString(),
//     });
//     return Promise.reject();
//   }
// });

export const updatePostsTableData = createAsyncThunk<
  any,
  IRequestUpdateData<PostsInfo>
>("posts/updatePostsTableData", async (params) => {
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
