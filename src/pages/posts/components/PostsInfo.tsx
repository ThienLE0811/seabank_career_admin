import { Post } from "#/lib/openapi";
import ProDescriptions, {
  ProDescriptionsItemProps,
} from "@ant-design/pro-descriptions";
import { columns } from "./columnsDetailPosts";
import { Image } from "antd";
type PostsInfoProps = {
  //   visible: boolean;
  postId?: number;
  initialValues?: Post;
  //   onClose?: () => void;
};

const PostsInfo: React.FC<PostsInfoProps> = (props) => {
  const { postId, initialValues } = props;

  return (
    <>
      <ProDescriptions<Post & any>
        column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
        // loading={loadingUserInfo}
        // title={`${initialValues?.title}`}
        dataSource={initialValues}
        params={{
          postId,
        }}
        columns={columns as ProDescriptionsItemProps<Post>[]}
      />
      <Image src={initialValues?.thumbImage} width={"100%"} height={"100%"} />
    </>
  );
};

export default PostsInfo;
