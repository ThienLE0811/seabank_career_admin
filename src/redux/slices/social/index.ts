import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSocialTableData} from "./action";
import { IResponseFetchData, SocialState } from "./data";

const initialState: SocialState= {
  socialListData: {
    data: [],
    total: 0,
  },
  modalSocialDetailOpen: false,
  modalSocialFormOpen: false,
  
};

const socialSlice = createSlice({
  name: "socials",
  initialState,
  reducers: {
    showModalSocialForm(state) {
      state.modalSocialFormOpen= true;
    },
    hideModalSocialForm(state) {
      state.modalSocialFormOpen = false;
    },
    showModalSocialDetail(state) {
      state.modalSocialDetailOpen = true;
    },
    hideModalSocialDetail(state) {
      state.modalSocialDetailOpen = false;
    },
  },
  extraReducers: {
    [fetchSocialTableData.pending.type]: (state: SocialState) => {},
    [fetchSocialTableData.fulfilled.type]: (
      state: SocialState,
      action: PayloadAction<IResponseFetchData<PostsInfo>>
    ) => {
      state.socialListData = action.payload;
    },
    [fetchSocialTableData.rejected.type]: (state: SocialState) => {},
  },
});

const { actions, reducer } = socialSlice;
export const {
  showModalSocialForm,
  hideModalSocialForm,
  showModalSocialDetail,
  hideModalSocialDetail,
} = actions;
export default reducer;
