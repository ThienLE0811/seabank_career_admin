import { Category } from "#/lib/openapi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createCategoryTableData,
  deleteCategoryTableData,
  fetchCategoryTableData,
  getCategoryById,
  updateCategoryTableData,
} from "./action";
import { IResponseFetchData, CategoryState } from "./data";

const initialState: CategoryState = {
  categoryListData: {
    items: [],
    total: 0,
  },
  drawerCategoryDetailOpen: false,
  modalCategoryFormOpen: false,
  currentCategory: undefined,
  currentCategoryDetail: undefined,
  loadingForm: false,
  selectedRows: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    showModalCategoryForm(state) {
      state.modalCategoryFormOpen = true;
    },
    hideModalCategoryForm(state) {
      state.modalCategoryFormOpen = false;
      state.currentCategory = undefined;
    },
    showModalCategoryDetail(state) {
      state.drawerCategoryDetailOpen = true;
    },
    hideModalCategoryDetail(state) {
      state.drawerCategoryDetailOpen = false;
      state.currentCategoryDetail = undefined;
      state.currentCategory = undefined;
    },
    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },
    clearStateCategory(state) {
      state.categoryListData = {
        items: [],
        total: 0,
      };
      state.selectedRows = [];
      state.currentCategory = undefined;
      state.currentCategoryDetail = undefined;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryTableData.pending, (state) => {})
      .addCase(fetchCategoryTableData.fulfilled, (state, action) => {
        state.categoryListData = action.payload;
      })
      .addCase(getCategoryById.pending, (state) => {
        state.loadingForm = true;
      })
      .addCase(getCategoryById.rejected, (state) => {
        state.loadingForm = true;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.currentCategory = action.payload;
        state.currentCategoryDetail = action.payload;
        state.loadingForm = false;
        // state.currentPostDetail = action.payload;
      })
      .addCase(updateCategoryTableData.fulfilled, (state, action) => {
        state.currentCategory = undefined;

        const index = state.categoryListData.items.findIndex(
          (val: Category) => val.id === action.payload.id
        );
        console.log("index update: ", index);

        if (index > -1) {
          state.categoryListData.items[index] = action.payload;
        }
      })
      .addCase(createCategoryTableData.fulfilled, (state, action) => {
        state.categoryListData.items?.unshift(action.payload);
      })
      .addCase(deleteCategoryTableData.fulfilled, (state, action) => {
        const deletedIds = action.payload || [];
        console.log("deletedIds", deletedIds);
        state.categoryListData = {
          ...state.categoryListData,
          items: state.categoryListData.items.filter(
            (value: any) => !deletedIds.ids.includes(value.id)
          ),
        };
      });
  },
  // extraReducers: {
  //   [fetchCategoryTableData.pending.type]: (state: CategoryState) => {},
  //   [fetchCategoryTableData.fulfilled.type]: (
  //     state: CategoryState,
  //     action: PayloadAction<IResponseFetchData<CategoryInfo>>
  //   ) => {
  //     state.categoryListData = action.payload;
  //   },
  //   [fetchCategoryTableData.rejected.type]: (state: CategoryState) => {},
  // },
});

const { actions, reducer } = categorySlice;
export const {
  showModalCategoryForm,
  hideModalCategoryForm,
  showModalCategoryDetail,
  hideModalCategoryDetail,
  setSelectedRows,
  clearStateCategory,
} = actions;
export default reducer;
