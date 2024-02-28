import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchAccountTableData } from "./action";
import { IResponseFetchData, AccountState } from "./data";

const initialState: AccountState = {
  accountInfo: {},
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountInfo(state, action) {
      state.accountInfo = action.payload;
    },
  },
  // extraReducers: {
  //   [accountLoginData.pending.type]: (state: AccountState) => {

  //   },
  //   [accountLoginData.fulfilled.type]: (
  //     state: AccountState,
  //     action: PayloadAction<IResponseFetchData<accountInfo>>
  //   ) => {
  //     notification.success({
  //     message: `Lấy dữ liệu thành công`,
  //   });
  //   console.log("payload::: ",action)
  //     state.accountInfo = action.payload
  //   },
  //   [accountLoginData.rejected.type]: (state: AccountState) => {
  //     notification.error({
  //     message: `Lỗi không lấy được dữ liệu khi đăng nhập`,
  //   });
  //   },
  // },
});

const { actions, reducer } = accountSlice;
export const { setAccountInfo } = actions;
export default reducer;
