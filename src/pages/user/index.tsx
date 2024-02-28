import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { ActionType, PageContainer } from "@ant-design/pro-components";
import { useRef } from "react";

export default () => {
  const actionRef = useRef<ActionType>();
  const dispatch = useAppDispatch();
  const { postsListData, modalPostsDetailOpen, modalPostsFormOpen } =
    useAppSelector((state) => state.posts);

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
