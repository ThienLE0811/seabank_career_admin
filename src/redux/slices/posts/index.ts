import { Post } from "#/lib/openapi";
import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createPostsTableData,
  deletePostsTableData,
  fetchPostsTableData,
  getPostsById,
  updatePostsTableData,
} from "./action";
import { IResponseFetchData, PostsState } from "./data";

const initialState: PostsState = {
  postsListData: {
    data: [],
    total: 0,
  },
  modalPostsDetailOpen: false,
  modalPostsFormOpen: false,
  currentPosts: {},
  currentPostDetail: {},
  currentIdPosts: undefined,
  selectedRows: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    showModalPostsForm(state) {
      state.modalPostsFormOpen = true;
    },
    hideModalPostsForm(state) {
      state.modalPostsFormOpen = false;
      state.currentPosts = undefined;
      state.currentIdPosts = undefined;
    },
    showModalPostsDetail(state) {
      state.modalPostsDetailOpen = true;
    },
    hideModalPostsDetail(state) {
      state.modalPostsDetailOpen = false;

      state.currentPostDetail = undefined;
    },
    setCurrentIdPosts(state, action) {
      state.currentIdPosts = action.payload;
    },
    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsTableData.pending, (state) => {})
      .addCase(fetchPostsTableData.fulfilled, (state, action) => {
        state.postsListData = action.payload;
      })
      .addCase(getPostsById.fulfilled, (state, action) => {
        state.currentPosts = action.payload;
        state.currentPostDetail = action.payload;
      })

      .addCase(deletePostsTableData.fulfilled, (state, action) => {
        const deletedIds = action.payload || [];
        state.postsListData = {
          ...state.postsListData,
          data: state.postsListData.data.filter(
            (value) => !deletedIds.ids.includes(value.id)
          ),
        };
      })
      .addCase(createPostsTableData.fulfilled, (state, action) => {
        const Ids = action.payload;
        console.log("action payload:: ", action.payload);
        state.postsListData = {
          ...state.postsListData,
          data: [...state.postsListData.data, Ids].sort((a, b) => b.id - a.id),
        };
      })
      .addCase(updatePostsTableData.fulfilled, (state, action) => {
        const updatedPost = action.payload || {};
        const { id: newId } = updatedPost;
        const updatedData = state.postsListData.data.map((post) =>
          post.id === newId
            ? { ...updatedPost, createdTime: post.createdTime }
            : post
        );
        state.postsListData = {
          ...state.postsListData,
          data: updatedData,
        };
      });
  },

  // extraReducers: {
  //   [fetchPostsTableData.pending.type]: (state: PostsState) => {

  //   },
  //   [fetchPostsTableData.fulfilled.type]: (
  //     state: PostsState,
  //     action: PayloadAction<IResponseFetchData<Post>>
  //   ) => {

  //       state.postsListData = action.payload;

  //   },
  //   [fetchPostsTableData.rejected.type]: (state: PostsState) => {
  //   },

  // },
});

const { actions, reducer } = postsSlice;

export const {
  setSelectedRows,
  setCurrentIdPosts,
  showModalPostsForm,
  hideModalPostsForm,
  showModalPostsDetail,
  hideModalPostsDetail,
} = actions;
export default reducer;
