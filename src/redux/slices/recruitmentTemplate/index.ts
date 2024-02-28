import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRecruitmentTemplate,
  deleteRecruitmentTemplates,
  fetchRecruitmentsTemplateTableData,
  getDetailRecruitmentTemplate,
  updateRecruitmentTemplate,
} from "./action";
import { IResponseFetchData, recruitmentsState } from "./data";
import { RecruitmentTemplate } from "#/lib/openapi";

const initialState: recruitmentsState = {
  recruitmentsListData: {
    data: [],
    total: 0,
  },
  modalRecruitmentsDetailOpen: false,
  modalRecruitmentsTemplateFormOpen: false,
  drawerRecruitmentTemplateDetail: false,
  loadingTable: false,
  currentRecruitmentTemplateDetail: undefined,
  currentRecruitmentTemplate: undefined,
  checkCreateRecruitmentTemplate: false,
};

const recruitmentsTemplateSlice = createSlice({
  name: "recruitmentsTemplate",
  initialState,
  reducers: {
    showModalRecruitmentsTemplateForm(state) {
      state.modalRecruitmentsTemplateFormOpen = true;
    },
    hideModalRecruitmentsTemplateForm(state) {
      state.modalRecruitmentsTemplateFormOpen = false;
      state.currentRecruitmentTemplate = undefined;
      state.checkCreateRecruitmentTemplate = false;
    },
    showModalRecruitmentsDetail(state) {
      state.modalRecruitmentsDetailOpen = true;
    },
    hideModalRecruitmentsDetail(state) {
      state.modalRecruitmentsDetailOpen = false;
    },
    showDrawerRecruitmentTemplateDetail(state) {
      state.drawerRecruitmentTemplateDetail = true;
    },
    hideDrawerRecruitmentTemplateDetail(state) {
      state.drawerRecruitmentTemplateDetail = false;
      state.currentRecruitmentTemplateDetail = undefined;
      state.currentRecruitmentTemplate = undefined;
    },

    setCurrentRecruitmentTemplate(
      state,
      action: PayloadAction<RecruitmentTemplate | any>
    ) {
      state.currentRecruitmentTemplate = action.payload;
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
      .addCase(fetchRecruitmentsTemplateTableData.pending, (state) => {
        state.loadingTable = true;
      })
      .addCase(fetchRecruitmentsTemplateTableData.rejected, (state) => {
        state.loadingTable = true;
      })
      .addCase(
        fetchRecruitmentsTemplateTableData.fulfilled,
        (state, action) => {
          state.loadingTable = false;
          state.recruitmentsListData = action.payload;
        }
      )
      .addCase(getDetailRecruitmentTemplate.fulfilled, (state, action) => {
        state.currentRecruitmentTemplate = action.payload;
        state.currentRecruitmentTemplateDetail = action.payload;
      })
      .addCase(updateRecruitmentTemplate.fulfilled, (state, action) => {
        const index = state.recruitmentsListData.data.findIndex(
          (val: RecruitmentTemplate) => val.id === action.payload.id
        );
        console.log("index update: ", index);

        if (index > -1) {
          state.recruitmentsListData.data[index] = action.payload;
        }
      })

      .addCase(createRecruitmentTemplate.fulfilled, (state, action) => {
        state.recruitmentsListData.data?.unshift(action.payload);
      })

      .addCase(deleteRecruitmentTemplates.fulfilled, (state, action) => {
        console.log("action.payload:: ", action.payload);
        const deletedIds = action.payload || [];
        console.log("deletedIds", deletedIds);
        state.recruitmentsListData = {
          ...state.recruitmentsListData,
          data: state.recruitmentsListData.data.filter(
            (value) => !deletedIds.ids.includes(value.id)
          ),
        };
      });
  },
});

const { actions, reducer } = recruitmentsTemplateSlice;
export const {
  showModalRecruitmentsTemplateForm,
  hideModalRecruitmentsTemplateForm,
  showModalRecruitmentsDetail,
  hideModalRecruitmentsDetail,
  showDrawerRecruitmentTemplateDetail,
  hideDrawerRecruitmentTemplateDetail,
  setCurrentRecruitmentTemplate,
} = actions;
export default reducer;
