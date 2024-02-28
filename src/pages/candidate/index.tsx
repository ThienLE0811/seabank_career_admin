import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import request from "#/lib/request";
import { CategoriesApi } from "#/lib/openapi";
import { ActionType, PageContainer } from "@ant-design/pro-components";
import { useRef } from "react";

export default () => {
  const actionRef = useRef<ActionType>();
  const dispatch = useAppDispatch();
  const { postsListData, modalPostsDetailOpen, modalPostsFormOpen } =
    useAppSelector((state) => state.posts);
  // const configuration = createConfiguration({ baseServer: request });
  // const apiInstance = new CategoriesApi({
  //   basePath: "http://localhost:200",
  //   isJsonMime: "application/json",
  // });
  // apiInstance.deleteCategory(123);

  return (
    <PageContainer
      childrenContentStyle={{
        padding: 12,
      }}
      breadcrumbRender={false}
      title={false}
      footer={[]}
    ></PageContainer>
  );
};
