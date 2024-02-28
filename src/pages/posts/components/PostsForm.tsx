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
  ProFormCaptcha,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  transformKeySubmitValue,
} from "@ant-design/pro-components";
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  message,
  notification,
  Row,
  Space,
  Typography,
  UploadFile,
} from "antd";
import classes from "#/pages/posts/posts.module.css";
import { GetDetailPostResponse, Post, PostRequestBody } from "#/lib/openapi";
import { useEffect, useRef, useState } from "react";
import { postsApi } from "#/services/api";
import {
  getDataApi,
  getErrorApi,
  getListCategory,
  isApiSuccess,
} from "#/utils";
import UpLoadFile from "#/components/UpLoadFile";
import { transform } from "framer-motion";
import {
  createPostsTableData,
  updatePostsTableData,
} from "#/redux/slices/posts/action";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import request from "#/lib/request";
import slugify from "slugify";

interface PostsFormProps {
  postId?: number;
  onCancel?: () => void;
  onSuccess?: () => void;
}

type CategoriesProps = {
  id?: number;
  title?: string;
};

const PostsForm: React.FC<PostsFormProps> = ({
  postId,
  onCancel,
  onSuccess,
}) => {
  const [formRef] = ProForm.useForm();
  const dispatch = useAppDispatch();
  const [contentEditor, setContentEditor] = useState<string>("");
  const { currentPosts } = useAppSelector((state) => state.posts);
  const { Paragraph } = Typography;
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    setSlug(
      slugify(title, {
        lower: true,
        strict: true,
        trim: true,
      })
    );
  }, [title]);

  const transformValues = (formValues: any) => {
    console.log("formValues:: ", formValues);

    const nameThumb =
      Array.isArray(formValues?.thumbImage) && formValues?.thumbImage.length > 0
        ? formValues.thumbImage.map((val: any) => val.name).toString()
        : formValues?.thumbImage;

    return {
      ...formValues,
      thumbImage: nameThumb || "",
      categories: formValues?.categories || [],
      description: formValues?.description || "",
      stick: formValues?.stick || true,
      state: formValues?.state || "ACTIVE",
      slug: formValues?.slug || slug,
    };
  };

  const handleSubmit = async (formValues: any) => {
    const transformedValues = transformValues(formValues);
    try {
      console.log("postID:: ", postId);
      const res = postId
        ? await dispatch(updatePostsTableData(transformedValues))
        : await dispatch(createPostsTableData(transformedValues));
      // đang dùng chung 1 interface cho cả tạo và sửa posts
      console.log("res:: ", res);
      if (res?.meta.requestStatus === "fulfilled") {
        onSuccess?.();
      }
    } catch (error) {
      message.error("Thao tác không thành công");
    }
  };

  return (
    <ProForm<Post>
      form={formRef}
      // initialValues={initialValues}

      grid
      request={async () => {
        if (!postId) {
          return {};
        }

        try {
          const data = await postsApi.getDetailPost(postId);
          // const data = await request.get("/dataMock/postsList.json");
          const detailPostsData: Post = getDataApi(data);
          if (isApiSuccess(data)) {
            setContentEditor(detailPostsData?.content || "");
            // dispatch(setCurrentPosts(detailPostsData));
            return detailPostsData;
          } else {
            message.error(getErrorApi(data).message || "Lấy dữ liệu thất bại");
            return Promise.reject();
          }
        } catch (error) {
          message.error("Lấy dữ liệu thất bại");
          return Promise.reject();
        }
      }}
      onFinish={handleSubmit}
      submitter={{
        searchConfig: {
          submitText: "Xác nhận",
        },
        resetButtonProps: false,
        // render({ form }, dom) {
        //   return (
        //     <div className={classes.submitFootbar}>
        //       <Button danger onClick={onCancel}>
        //         Đóng
        //       </Button>
        //       {dom}
        //     </div>
        //   );
        // },
        render: (_, dom) => {
          return (
            <FooterToolbar portalDom={false} style={{ width: "100%" }}>
              <Row justify="end" gutter={[12, 12]}>
                <Col>
                  <Button onClick={onCancel}>Hủy</Button>
                </Col>
                <Col>{dom}</Col>
              </Row>
            </FooterToolbar>
          );
        },
      }}
    >
      <Row style={{ flex: 1 }} gutter={16}>
        <Col sm={24} lg={18}>
          <ProFormText
            label="Tiêu đề"
            name="title"
            // colProps={{ xl: 10 }}
            placeholder="Nhập tiêu đề bài viết"
            required
            rules={[
              {
                required: true,
                message: "Tiêu đề không được bỏ trống",
              },
              {
                max: 200,
                message: "Tiêu đề không vượt quá 200 ký tự",
              },
            ]}
            // fieldProps={{
            //   autoSize: {
            //     maxRows: 3,
            //     minRows: 1,
            //   },
            // } }
            fieldProps={{
              onChange: (e) => {
                setTitle(e.target.value);
              },
            }}
            transform={(e: string) => {
              const value = e.trim();
              return { title: value };
            }}
          />
          <ProForm.Item
            label="Đường dẫn"
            name="slug"
            rules={[
              {
                required: slug ? false : true,
                message: "Vui lòng không bỏ trống",
              },
              {
                max: 200,
                message: "Đường dẫn không vượt quá 200 ký tự",
              },
              {
                pattern: /^[a-z0-9\-]+$/,
                message: "Chỉ cho phép chữ thường, số và dấu gạch ngang",
              },
            ]}
            style={{ padding: "0 8px" }}
            transform={(value) => {
              console.log("value slug:: ", value);
              console.log("slug: ", slug);
              const val = slug ? slug : value;
              return {
                slug: val.trim(),
              };
            }}
          >
            <Paragraph
              editable={
                title || currentPosts?.title
                  ? {
                      onChange: (value) => {
                        setSlug(value);
                        formRef.setFieldsValue({
                          slug: value,
                        });
                      },
                    }
                  : undefined
              }

              // style={{ padding: "0 8px", width: "100%" }}
            >
              {slug || currentPosts?.slug}
            </Paragraph>
            {!title && !currentPosts?.title && (
              <Alert
                message="Slug của bài viết sẽ tự động sinh theo tiêu đề bài viết"
                type="success"
              />
            )}
          </ProForm.Item>

          <ProFormTextArea
            label="Mô tả ngắn"
            name="description"
            placeholder="Nhập mô tả ngắn"
            fieldProps={{
              autoSize: {
                maxRows: 5,
                minRows: 3,
              },
            }}
            rules={[
              {
                max: 500,
                message: "Mô tả ngắn không vượt quá 500 ký tự",
              },
            ]}
            transform={(e: string) => {
              const value = e.trim();
              return { description: value };
            }}
          />
          <ProForm.Item
            name="content"
            label="Nội dung"
            required
            rules={[
              { required: true, message: "Vui lòng không bỏ trống" },
              {
                max: 50000,
                message: "Mô tả ngắn không vượt quá 50000 ký tự",
              },
            ]}
            style={{ padding: "0 8px" }}
          >
            <Editor
              initiateData={contentEditor}
              onChange={(event, editor) => {
                formRef.setFieldsValue({
                  content: editor.getData(),
                });
              }}
            />
          </ProForm.Item>
        </Col>
        <Col sm={24} lg={6}>
          <Card size="small" style={{ background: "#f4f7fa" }}>
            <Row gutter={16}>
              <ProFormSwitch
                colProps={{ span: 12 }}
                name="state"
                label={
                  <>
                    <GlobalOutlined style={{ marginRight: 4 }} /> Công khai
                  </>
                }
                convertValue={(value: string): any => {
                  const state = value === "ACTIVE" ? true : false;
                  return state;
                }}
                initialValue={currentPosts?.state || "ACTIVE"}
                // transform={(value: boolean) => {
                //   // console.log("value:: ", value);
                //   const state = value ? "ACTIVE" : "DRAFT";
                //   return {
                //     state: state,
                //   };
                // }}
                fieldProps={{
                  onChange: (value: boolean) => {
                    console.log("value:: ", value);
                    const state = value ? "ACTIVE" : "DRAFT";
                    formRef.setFieldsValue({ state });
                    return value;
                  },
                }}
              />
              {/* <ProFormSelect
                colProps={{ span: 12 }}
                name="state"
                label={
                  <>
                    <GlobalOutlined style={{ marginRight: 4 }} /> Trạng thái
                  </>
                }
                options={[
                  { value: "ACTIVE", label: "ACTIVE" },
                  { value: "DRAFT", label: "DRAFT" },
                ]}
              /> */}
              {/* <ProFormSwitch
                colProps={{ span: 12 }}
                name="state"
                label={
                  <>
                    <GlobalOutlined style={{ marginRight: 4 }} /> Trạng thái
                  </>
                }
              /> */}

              <ProFormSwitch
                colProps={{ span: 12 }}
                fieldProps={{}}
                name="stick"
                label={
                  <>
                    <FireOutlined style={{ marginRight: 4 }} />
                    Nổi bật
                  </>
                }
                initialValue={currentPosts?.state || true}
              />
            </Row>
            <Row gutter={16}>
              {/* <ProFormSwitch
                colProps={{ span: 12 }}
                fieldProps={{}}
                name="feature"
                label={
                  <>
                    <HomeOutlined style={{ marginRight: 4 }} />
                    Home Slides
                  </>
                }
              /> */}
            </Row>
            {/* <ProFormSelect label="Chuyên mục" /> */}
            <Row gutter={16}>
              <ProFormSelect
                colProps={{ span: 24 }}
                name="categories"
                label="Mã danh mục"
                mode="multiple"
                convertValue={(value: CategoriesProps[]) => {
                  if (value?.at(0)?.title) {
                    const list = value.map((val) => {
                      return {
                        value: val?.id,
                        label: val?.title,
                      };
                    });

                    return list;
                  } else {
                    return value;
                  }
                }}
                request={async () =>
                  await getListCategory({ start: 0, limit: 50 })
                }
                transform={(value: CategoriesProps[]) => {
                  console.log("value:: ", value);

                  if (value?.at(0)?.title) {
                    console.log("true");
                    const list = value.map((val) => val?.id);

                    return {
                      categories: list,
                    };
                  } else {
                    return { categories: value };
                  }
                }}
              />
              {/* <ProFormSelect
                colProps={{ span: 24 }}
                name="tags"
                label="Thẻ Tags"
                mode="tags"
                transform={(value) => {
                  console.log("e:: ", value);
                  return {
                    postTags: value,
                  };
                }}
              /> */}
            </Row>
            <Row gutter={16}>
              {/* <ProFormDigit 
                colProps={{ span: 24 }}
                hidden={formRef.getFieldValue(["feature"]) == false}
                // dependencies={["feature"]}
                shouldUpdate
                // colProps={{ span: 12 }}
                name="featureOrdering"
                label="Thứ tự banner"
              /> */}
              {/* <ProFormDigit
                colProps={{ span: 24 }}
                hidden={formRef.getFieldValue(["feature"]) == false}
                // dependencies={["feature"]}
                shouldUpdate
                // colProps={{ span: 12 }}
                name="ordering"
                label="Giá trị sắp xếp"
              /> */}
            </Row>

            <Row gutter={16}>
              {/* <UpLoadFile
                nameUploadFile={"thumbImage"}
                labelUploadFile={"Ảnh đại diện"}
                accept={"image/*"}
              /> */}

              <UpLoadFile
                nameUploadFile={"thumbImage"}
                iconUploadFile={"iconUrl"}
                labelUploadFile={"Ảnh đại diện"}
                accept={"image/*"}
                dataFile={currentPosts?.thumbImage}
                iconFile={currentPosts?.iconUrl}
              />
            </Row>

            <Divider />
            <ProFormText label="" name="id" placeholder="Id" required hidden />
          </Card>
        </Col>
      </Row>
    </ProForm>
  );
};

export default PostsForm;
