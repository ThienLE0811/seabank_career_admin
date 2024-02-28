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
  Button,
  Card,
  Col,
  Divider,
  message,
  notification,
  Row,
  Space,
  Spin,
  UploadFile,
} from "antd";
import classes from "#/pages/posts/posts.module.css";
import {
  Banners,
  GetDetailPostResponse,
  Post,
  PostRequestBody,
} from "#/lib/openapi";
import { useRef, useState } from "react";
import { postsApi } from "#/services/api";
import { getDataApi, getErrorApi, isApiSuccess } from "#/utils";
import UpLoadFile from "#/components/UpLoadFile";
import { transform } from "framer-motion";
import {
  createPostsTableData,
  updatePostsTableData,
} from "#/redux/slices/posts/action";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { createBanners, updateBanners } from "#/redux/slices/banner/action";
import {
  hideDrawerBannerDetail,
  hideModalBannerForm,
  setCurrentBanner,
} from "#/redux/slices/banner";

interface PostsFormProps {
  bannerId: number;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const BannerForm: React.FC = () => {
  const [formRef] = ProForm.useForm();
  const dispatch = useAppDispatch();
  const [contentEditor, setContentEditor] = useState<string>("");
  const {
    currentBanner,
    currentBannerDetail,
    loadingFormBanner,
    currentIdBanner,
    mimeTypeBanner,
    nameBanner,
  } = useAppSelector((state) => state.banner);
  const transformValues = (formValues: any) => {
    const bannerName =
      Array.isArray(formValues?.fileUrl) && formValues?.fileUrl.length > 0
        ? formValues.fileUrl.map((val: any) => val.name).toString()
        : formValues?.fileUrl;

    // const nameThumb =
    //   Array.isArray(formValues?.thumbImage) && formValues?.thumbImage.length > 0
    //     ? formValues.thumbImage.map((val: any) => val.name).toString()
    //     : formValues?.thumbImage;

    return {
      ...formValues,
      fileUrl: currentBanner?.id ? formValues?.fileUrl : bannerName,
      mimeType: formValues?.mimeType || mimeTypeBanner,
      name: formValues?.name || nameBanner,
      // thumbImage: nameThumb,
    };
  };

  const handleSubmit = async (formValues: any) => {
    const transformedValues = transformValues(formValues);
    console.log("log:: ", transformedValues);
    try {
      const res = currentBanner?.id
        ? await dispatch(updateBanners(transformedValues))
        : await dispatch(createBanners(transformedValues));
      // đang dùng chung 1 interface cho cả tạo và sửa posts
      console.log("res:: ", res);
      if (res?.meta.requestStatus === "fulfilled") {
        dispatch(hideModalBannerForm());
      }
    } catch (error) {
      message.error(String(error));
    }
  };

  if (!(currentIdBanner && currentBanner)) {
    dispatch(setCurrentBanner(undefined));
  }
  return loadingFormBanner ? (
    <Spin />
  ) : (
    <ProForm<Banners>
      form={formRef}
      initialValues={currentBanner}
      grid
      onFinish={handleSubmit}
      submitter={{
        searchConfig: {
          submitText: "Xác nhận",
        },
        resetButtonProps: false,
        // render({ form }, dom) {
        //   return (
        //     <div className={classes.submitFootbar}>
        //       <Button danger onClick={() => dispatch(hideModalBannerForm())}>
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
                  <Button onClick={() => dispatch(hideModalBannerForm())}>
                    Hủy
                  </Button>
                </Col>
                <Col>{dom}</Col>
              </Row>
            </FooterToolbar>
          );
        },
      }}
    >
      <Row style={{ flex: 1 }} gutter={16}>
        {/* <ProFormDigit label="Vị trí" name="ordering" colProps={{ span: 8 }} /> */}
        <ProFormDigit
          label="Thời gian chạy"
          name="duration"
          colProps={{ span: 8 }}
          initialValue={currentBanner?.duration}
          required
          rules={[
            {
              message: "Vui lòng không bỏ trống",
              required: true,
            },
            // {
            //   max: 11,
            //   message: "Thời gian chạy không được vượt quá 10 giây",
            // },
            {
              validator: async (_, value) => {
                if (value <= 10) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Thời gian chạy không được vượt quá 10 giây"
                );
              },
            },
          ]}
        />
        <ProFormText
          label="Kiểu"
          name="mimeType"
          colProps={{ span: 8 }}
          initialValue={currentBanner?.mimeType}
          placeholder={"Kiểu banner"}
          disabled
          fieldProps={{
            value: mimeTypeBanner,
          }}
          transform={(value) => {
            return {
              mimeType: mimeTypeBanner || value,
            };
          }}
        />

        <ProFormSwitch
          label="Trạng thái"
          name="publicBanner"
          colProps={{ span: 8 }}
          initialValue={currentBanner?.publicBanner || true}
          // hidden={!currentBanner?.id ? true : false}
          // initialValue={currentBanner?.publicBanner || true}
          // transform={(e) => {
          //   return {
          //     state: e ? "ACTIVE" : "DRAFT",
          //   };
          // }}
          // options={[
          //   { value: "ACTIVE", label: "ACTIVE" },
          //   { value: "DRAFT", label: "DRAFT" },
          // ]}
        />

        <ProFormText
          label="Tên"
          name="name"
          hidden
          initialValue={currentBanner?.name}
          placeholder="Nhập tên banner"
          rules={[
            {
              max: 200,
              message: "Nội dung không vượt quá 200 ký tự",
            },
          ]}
          transform={(value) => {
            return {
              name: nameBanner || value,
            };
          }}
        />

        <ProFormText
          label="Link bài viết"
          name="targetUrl"
          initialValue={currentBanner?.targetUrl}
          colProps={{ span: 24 }}
          required
          placeholder="Nhập nội dung banner"
          rules={[
            {
              max: 500,
              message: "Nội dung không vượt quá 500 ký tự",
            },
          ]}
          transform={(e: string) => {
            const value = e.trim();
            return { targetUrl: value };
          }}
        />
        <ProFormTextArea
          label="Nội dung banner"
          name="content"
          // colProps={{ xl: 10 }}
          placeholder="Nhập nội dung banner"
          required
          rules={[
            {
              required: true,
              message: "Nội dung không được bỏ trống",
            },
            {
              max: 500,
              message: "Nội dung không vượt quá 500 ký tự",
            },
          ]}
          // fieldProps={{
          //   autoSize: {
          //     maxRows: 3,
          //     minRows: 1,
          //   },
          // }}
        />

        <UpLoadFile
          nameUploadFile={"fileUrl"}
          labelUploadFile={"Ảnh/Video"}
          accept={"image/*, video/*"}
          dataFile={currentBanner?.fileUrl}
          iconUploadFile={"iconUrl"}
          iconFile={currentBanner?.iconUrl}
          requiredFile={true}
        />

        <Divider />
        <ProFormText
          label=""
          name="id"
          placeholder="Id"
          required
          // extra={<Button>s</Button>}
          hidden
        />
      </Row>
    </ProForm>
  );
};

export default BannerForm;
