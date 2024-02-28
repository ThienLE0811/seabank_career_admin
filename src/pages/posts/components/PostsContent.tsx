import Editor from "#/components/Editor";
import {
  EditOutlined,
  FireOutlined,
  GithubOutlined,
  GlobalOutlined,
  HomeOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import {
  DefaultFooter,
  FooterToolbar,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Button, Card, Col, Divider, Row, Space } from "antd";
import classes from "#/pages/posts/posts.module.css";
import { Post, PostRequestBody } from "#/lib/openapi";
import { useRef } from "react";
interface PostsFormProps {
  initialValues?: Post;
  onCancel?: () => void;
}

const PostsContent: React.FC<PostsFormProps> = ({ onCancel }) => {
  const [formRef] = ProForm.useForm();

  const handleSubmit = async (values: PostRequestBody) => {};
  const initialValues = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
  };

  console.log("init::: ", initialValues);

  return (
    // <ProForm
    //   form={formRef}
    //   initialValues={initialValues || {}}
    //   grid
    //   onFinish={handleSubmit}
    //   submitter={{
    //     searchConfig: {
    //       submitText: "Xác nhận",
    //     },
    //     resetButtonProps: false,
    //     render({ form }, dom) {
    //       return (
    //         <div className={classes.submitFootbar}>
    //           <Button danger onClick={onCancel}>
    //             Đóng
    //           </Button>
    //           {dom}
    //         </div>
    //       );
    //     },
    //   }}
    // >
    //   <Row style={{ flex: 1 }} gutter={16}>
    //     <Col sm={24} lg={18}>
    //       <ProFormText
    //         label="Tiêu đề"
    //         name="title"
    //         placeholder="Nhập tiêu đề bài viết"
    //         // initialValue={aliasPosts}
    //         required
    //         rules={[
    //           {
    //             required: true,
    //             message: "Tiêu đề không được bỏ trống",
    //           },
    //           {
    //             max: 300,
    //             message: "Tiêu đề không vượt quá 300 ký tự",
    //           },
    //         ]}
    //       />
    //       <ProFormText
    //         label=""
    //         name="alias"
    //         // initialValue={aliasPosts}
    //         placeholder="Nhập đường dẫn bài viết"
    //         required
    //         rules={[
    //           {
    //             required: true,
    //             message: "Tiêu đề không được bỏ trống",
    //           },
    //           {
    //             max: 160,
    //             message: "Tiêu đề không vượt quá 300 ký tự",
    //           },
    //         ]}
    //       />
    //     </Col>
    //   </Row>
    // </ProForm>
    <ProForm initialValues={initialValues}>
      <ProFormText name="firstName" label="First Name" />
      <ProFormText name="lastName" label="Last Name" />
      <ProFormText name="age" label="Age" />
    </ProForm>
  );
};

export default PostsContent;
