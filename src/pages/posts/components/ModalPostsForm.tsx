import { Post, PostRequestBody } from "#/lib/openapi";
import { ModalForm } from "@ant-design/pro-components";
import { Modal, ModalProps } from "antd";
import PostsContent from "./PostsContent";
import PostsForm from "./PostsForm";

interface ModalPostsFormProps {
  modalProps?: ModalProps;
  postId?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}
const ModalPostsForm: React.FC<ModalPostsFormProps> = ({
  modalProps,
  postId,
  onSuccess,
  onCancel,
}) => {
  const title = postId ? "Sửa bài viết" : "Tạo mới bài viết";

  return (
    <Modal
      onCancel={onCancel}
      // onSuccess={onSuccess}
      width={"90%"}
      title={title}
      footer={false}
      {...modalProps}
      destroyOnClose
    >
      <PostsForm onCancel={onCancel} onSuccess={onSuccess} postId={postId} />
    </Modal>
  );
};

export default ModalPostsForm;
