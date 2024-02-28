import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { hideModalCategoryForm } from "#/redux/slices/category";
import ProForm, {
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { Alert, Button, Spin, Typography } from "antd";
import "#/index.css";
import { CategoryRequestBody, CategoryRequestUpdateBody } from "#/lib/openapi";
import {
  createCategoryTableData,
  updateCategoryTableData,
} from "#/redux/slices/category/action";
import { useEffect, useState } from "react";
import slugify from "slugify";

const CategoryForm = () => {
  const dispatch = useAppDispatch();
  const { currentCategory, loadingForm } = useAppSelector(
    (state) => state.category
  );

  const { Paragraph } = Typography;
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [formRef] = ProForm.useForm();

  useEffect(() => {
    setSlug(
      slugify(title, {
        lower: true,
        strict: true,
        trim: true,
      })
    );
  }, [title]);

  const handleFinish = async (
    values: CategoryRequestBody | CategoryRequestUpdateBody
  ) => {
    const transformValues = {
      ...values,
      slug: values?.slug || slug,
    };

    const res = currentCategory?.id
      ? await dispatch(
          updateCategoryTableData(transformValues as CategoryRequestUpdateBody)
        )
      : await dispatch(createCategoryTableData(transformValues));
    console.log("res:: ", res);
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(hideModalCategoryForm());
    }
  };

  console.log("currentCategory:: ", currentCategory);
  return !loadingForm ? (
    <ProForm
      form={formRef}
      grid
      initialValues={currentCategory}
      submitter={{
        resetButtonProps: false,
        searchConfig: {
          submitText: "Xác nhận",
        },
        render({ form }, dom) {
          return (
            <div className="submitFootbar">
              <Button danger onClick={() => dispatch(hideModalCategoryForm())}>
                Đóng
              </Button>
              {dom}
            </div>
          );
        },
      }}
      onFinish={handleFinish}
    >
      <ProFormText
        label="Tiêu đề"
        name={"title"}
        initialValue={currentCategory?.title}
        required
        colProps={{ span: 24 }}
        rules={[
          { required: true, message: "Vui lòng không bỏ trống" },
          {
            max: 200,
            message: "Đường dẫn không vượt quá 200 ký tự",
          },
        ]}
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
          const val = slug ? slug : value;
          return {
            slug: val.trim(),
          };
        }}
      >
        <Paragraph
          editable={
            title || currentCategory?.title
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
          {slug || currentCategory?.slug}
        </Paragraph>
        {!title && !currentCategory?.title && (
          <Alert
            message="Slug của bài viết sẽ tự động sinh theo tiêu đề bài viết"
            type="success"
          />
        )}
      </ProForm.Item>

      {/* <ProFormText
        label="Đường dẫn"
        name={"slug"}
        colProps={{ span: 24 }}
        initialValue={currentCategory?.slug}
      /> */}
      <ProFormTextArea
        label="Mô tả"
        initialValue={currentCategory?.description}
        name={"description"}
        colProps={{ span: 24 }}
        rules={[
          { required: true, message: "Vui lòng không bỏ trống" },
          {
            max: 500,
            message: "Đường dẫn không vượt quá 200 ký tự",
          },
        ]}
        required
        transform={(e: string) => {
          const value = e.trim();
          return { description: value };
        }}
      />
      <ProFormDigit name={"id"} hidden />
    </ProForm>
  ) : (
    <Spin />
  );
};

export default CategoryForm;
