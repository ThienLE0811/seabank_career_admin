import { DeleteMediaFileDetail, FileUpload, Post } from "#/lib/openapi";
import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteMediaFiles, fetchMediaListData } from "./action";
import { MediaState } from "./data";

const initialState: MediaState = {
  mediaListData: {
    data: [],
    total: 0,
  },
  showDetailMediaFile: false,
  currentMediaFile: undefined,
  showModalUploadMedia: false,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setShowDetailMeidaFile(state, action: PayloadAction<boolean>) {
      state.showDetailMediaFile = action.payload;
    },
    setCurrentMediaFile(state, action: PayloadAction<FileUpload | undefined>) {
      state.currentMediaFile = action.payload;
    },
    setShowModalUploadMedia(state, action) {
      state.showModalUploadMedia = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaListData.pending, (state) => {})
      .addCase(fetchMediaListData.fulfilled, (state, action) => {
        state.mediaListData = action.payload;
      })
      .addCase(deleteMediaFiles.fulfilled, (state, action) => {
        const deletedIds: Array<DeleteMediaFileDetail> | any =
          action.payload.items || [];

        state.mediaListData = {
          ...state.mediaListData,
          data: state.mediaListData.data.filter(
            (value) =>
              !deletedIds.some(
                (deletedItem: any) => deletedItem.id === value.id
              )
          ),
        };
      });
  },
});

const { actions, reducer } = mediaSlice;

export const {
  setShowDetailMeidaFile,
  setCurrentMediaFile,
  setShowModalUploadMedia,
} = actions;
export default reducer;
