import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import postsSlice from "./slices/posts";

import categorySlice from "./slices/category";
import socialSlice from "./slices/social";
import accountSlice from "./slices/account";

import recruitmentsSlice from "./slices/recruitment";
import recruitmentsTemplateSlice from "./slices/recruitmentTemplate";

import bannerSlice from "./slices/banner";
import mediaSlice from "./slices/media";

const rootReducer = combineReducers({
  posts: postsSlice,
  category: categorySlice,
  account: accountSlice,

  recruitments: recruitmentsSlice,
  recruitmentsTemplate: recruitmentsTemplateSlice,

  banner: bannerSlice,
  media: mediaSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
        ignoredPaths: [],
      },
    }).concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
