import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteJobManagerTableData,
  getDetailRecruitment,
  getListRecruitment,
} from "./action";
import { IResponseFetchData, recruitmentsState } from "./data";

const initialState: recruitmentsState = {
  recruitmentsListData: {
    items: [],
    total: 0,
  },
  modalRecruitmentsDetailOpen: false,
  modalRecruitmentFormOpen: false,
  showDrawerRecruitmentForm: false,
  loadingTable: false,
  currentRecruitment: undefined,
  currentRecruitmentDetail: undefined,
  checkMapData: false,
  checkCreateRecruitment: false,
  dataTitleDrawerRecruitment: undefined,
  drawerRecruitmentDetail: false,
};

const recruitmentsSlice = createSlice({
  name: "recruitments",
  initialState,
  reducers: {
    showModalRecruitmentsForm(state) {
      state.modalRecruitmentFormOpen = true;
      // state.checkMapData = false;
    },
    hideModalRecruitmentsForm(state) {
      state.modalRecruitmentFormOpen = false;

      state.currentRecruitment = undefined;
    },
    showDrawerRecruitmentsDetail(state) {
      state.drawerRecruitmentDetail = true;
    },
    hideDrawerRecruitmentsDetail(state) {
      state.drawerRecruitmentDetail = false;
      state.currentRecruitmentDetail = undefined;
      state.currentRecruitment = undefined;
    },
    showDrawerRecruitmentForms(state) {
      state.showDrawerRecruitmentForm = true;
    },
    hideDrawerRecruitmentForm(state) {
      state.showDrawerRecruitmentForm = false;
      state.checkMapData = false;
      state.currentRecruitment = undefined;
      state.checkCreateRecruitment = false;
      state.dataTitleDrawerRecruitment = undefined;
    },
    activeCheckMapData(state) {
      state.modalRecruitmentFormOpen = false;
      state.checkMapData = true;
      state.checkCreateRecruitment = true;
    },
    inActiveCheckMapData(state) {
      state.checkMapData = false;
    },
    setDataTitleDrawerRecruitment(state, action) {
      state.dataTitleDrawerRecruitment = action.payload;
    },
  },
  // extraReducers: {
  //   [fetchJobManagerTableData.pending.type]: (state: SocialState) => {},
  //   [fetchJobManagerTableData.fulfilled.type]: (
  //     state: SocialState,
  //     action: PayloadAction<IResponseFetchData<PostsInfo>>
  //   ) => {
  //     state.socialListData = action.payload;
  //   },
  //   [fetchJobManagerTableData.rejected.type]: (state: SocialState) => {},
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getListRecruitment.pending, (state) => {
        state.loadingTable = true;
      })
      .addCase(getListRecruitment.fulfilled, (state, action) => {
        console.log("action: ", action.payload);
        state.loadingTable = false;
        state.recruitmentsListData = action.payload;
      })
      .addCase(getListRecruitment.rejected, (state, action) => {
        state.loadingTable = false;
      })
      .addCase(getDetailRecruitment.fulfilled, (state, action) => {
        state.currentRecruitment = action.payload;
        state.currentRecruitmentDetail = action.payload;
      });

    // .addCase(deleteJobManagerTableData.fulfilled, (state, action) => {
    //   const deletedIds = action.payload || [];
    //   console.log("deletedIds:: ", deletedIds.id);
    //   state.recruitmentsListData = {
    //     ...state.recruitmentsListData,
    //     data: state.recruitmentsListData.data.filter(
    //       (value) => !deletedIds.id.includes(value.id)
    //     ),
    //   };
    //   console.log("logData:: ", state.recruitmentsListData.data);
    // });
  },
});

const { actions, reducer } = recruitmentsSlice;
export const {
  showModalRecruitmentsForm,
  hideModalRecruitmentsForm,
  showDrawerRecruitmentsDetail,
  hideDrawerRecruitmentsDetail,
  hideDrawerRecruitmentForm,
  showDrawerRecruitmentForms,
  activeCheckMapData,
  inActiveCheckMapData,
  setDataTitleDrawerRecruitment,
} = actions;
export default reducer;
