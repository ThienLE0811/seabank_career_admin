import { Banners, Post } from "#/lib/openapi";
import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createBanners,
  deleteBanners,
  fetchBannerTableData,
  getBannerById,
  updateBanners,
} from "./action";
import { BannerState } from "./data";

const initialState: BannerState = {
  bannerListData: {
    data: [],
    total: 0,
  },
  drawerBannerDetailOpen: false,
  modalBannerFormOpen: false,
  currentBanner: undefined,
  currentBannerDetail: undefined,
  selectedRows: [],
  loadingFormBanner: false,
  modalVideo: false,
  currentIdBanner: undefined,
  mimeTypeBanner: "",
  nameBanner: "",
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    showModalBannerForm(state) {
      state.modalBannerFormOpen = true;
    },
    hideModalBannerForm(state) {
      state.modalBannerFormOpen = false;
      state.mimeTypeBanner = undefined;
      state.currentBanner = undefined;
      state.currentIdBanner = undefined;
      state.nameBanner = undefined;
    },
    showDrawerBannerDetail(state) {
      state.drawerBannerDetailOpen = true;
    },
    hideDrawerBannerDetail(state) {
      state.drawerBannerDetailOpen = false;
      state.currentBannerDetail = undefined;
    },
    setCurrentBanner(state, action) {
      state.currentBanner = action.payload;
    },
    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },
    showModalVideo(state) {
      state.modalVideo = true;
    },
    hideModalVideo(state) {
      state.modalVideo = false;
    },
    setCurrentIdBanner(state, action: PayloadAction<number>) {
      state.currentIdBanner = action.payload;
    },
    setMimeTypeBanner(state, action: PayloadAction<string>) {
      state.mimeTypeBanner = action.payload;
    },
    setNameBanner(state, action: PayloadAction<string>) {
      state.nameBanner = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerTableData.pending, (state) => {})
      .addCase(fetchBannerTableData.fulfilled, (state, action) => {
        state.bannerListData = action.payload;
      })
      .addCase(getBannerById.pending, (state) => {
        state.loadingFormBanner = true;
      })
      .addCase(getBannerById.fulfilled, (state, action) => {
        state.currentBanner = action.payload;
        state.currentBannerDetail = action.payload;
        state.loadingFormBanner = false;
      })
      .addCase(updateBanners.fulfilled, (state, action) => {
        // state.modalBannerFormOpen = false;
        // state.currentBanner = undefined;

        const index = state.bannerListData.data.findIndex(
          (val: Banners) => val.id === action.payload?.id
        );
        console.log("index update: ", index);

        if (index > -1) {
          state.bannerListData.data[index] = action.payload;
        }
      })
      .addCase(createBanners.fulfilled, (state, action) => {
        state.modalBannerFormOpen = false;
        state.currentBanner = undefined;
        state.bannerListData.data?.unshift(action.payload);
      })
      .addCase(deleteBanners.fulfilled, (state, action) => {
        const deletedIds = action.payload || [];
        console.log("deletedIds", deletedIds);
        state.bannerListData = {
          ...state.bannerListData,
          data: state.bannerListData.data.filter(
            (value: any) => !deletedIds.ids.includes(value.id.toString())
          ),
        };
      });
    //   .addCase(createPostsTableData.fulfilled, (state, action) => {
    //     const Ids = action.payload;
    //     state.postsListData = {
    //       ...state.postsListData,
    //       data: [...state.postsListData.data, Ids].sort((a, b) => b.id - a.id),
    //     };
    //   })
  },
});

const { actions, reducer } = bannerSlice;

export const {
  setSelectedRows,
  setCurrentBanner,
  showModalBannerForm,
  hideModalBannerForm,
  showDrawerBannerDetail,
  hideDrawerBannerDetail,
  showModalVideo,
  hideModalVideo,
  setCurrentIdBanner,
  setMimeTypeBanner,
  setNameBanner,
} = actions;
export default reducer;
