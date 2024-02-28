import ResponsesiveTextTable from "#/components/ResponsiveTextTable";
import { useAppSelector } from "#/hooks/redux";
import ProDescriptions from "@ant-design/pro-descriptions";
import { Card, Typography } from "antd";

const DetailCategory = () => {
  const { currentCategoryDetail } = useAppSelector((state) => state.category);
  const { Paragraph } = Typography;
  return (
    <ProDescriptions
      dataSource={currentCategoryDetail}
      column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
      columns={[
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "Tên danh mục",
          dataIndex: "title",
        },
        {
          title: "Người tạo",
          dataIndex: "createdBy",
        },
        {
          title: "Ngày tạo",
          dataIndex: "createdTime",
        },
        {
          title: "Người cập nhật",
          dataIndex: "modifiedBy",
        },
        {
          title: "Ngày cập nhật",
          dataIndex: "modifiedTime",
        },
        {
          title: "Đường dẫn danh mục",
          dataIndex: "slug",
          render: (dom, entity, index, action, schema) => (
            <ResponsesiveTextTable
              maxWidth={500}
              minWidth={50}
              text={
                <Paragraph
                  copyable={{
                    text: String(entity?.slug),
                  }}
                  style={{ display: "flex" }}
                >
                  {dom}
                </Paragraph>
              }
            />
          ),
        },
        {
          title: "Mô tả",
          dataIndex: "description",
          ellipsis: true,
          render: (dom, entity, index, action, schema) => (
            <ResponsesiveTextTable maxWidth={400} minWidth={100} text={dom} />
          ),
        },
      ]}
    ></ProDescriptions>
  );
};

export default DetailCategory;
