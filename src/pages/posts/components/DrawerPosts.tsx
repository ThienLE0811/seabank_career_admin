import { GetDetailPostResponse, Post } from "#/lib/openapi";
import {
  ProCard,
  ProDescriptions,
  ProDescriptionsItemProps,
} from "@ant-design/pro-components";
import { Button, Drawer, Space, Tabs, TabsProps } from "antd";
import { useEffect } from "react";
import { columns } from "./columnsDetailPosts";
import "#/index.css";
import PostsInfo from "./PostsInfo";
import { useAppSelector } from "#/hooks/redux";

type DrawerDetailPosts = {
  visible: boolean;
  postId?: number;

  onClose?: () => void;
};
const DrawerDetailPosts: React.FC = () => {
  const { currentPostDetail } = useAppSelector((state) => state.posts);

  const tabItems: TabsProps["items"] = [
    {
      key: "content",
      label: "Nội dung",
      children: (
        <div
          dangerouslySetInnerHTML={{
            __html: currentPostDetail?.content || "-",
          }}
        />
      ),
    },
    {
      key: "info",
      label: "Thông tin",
      children: <PostsInfo initialValues={currentPostDetail} />,
    },
  ];

  return (
    <ProCard title={false} bodyStyle={{ padding: 0 }}>
      <Tabs defaultActiveKey="content" items={tabItems} />
    </ProCard>
  );
};

export default DrawerDetailPosts;
