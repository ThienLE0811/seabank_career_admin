import ResponsesiveTextTable from "#/components/ResponsiveTextTable";
import { Banners, Post } from "#/lib/openapi";
import { ProColumns } from "@ant-design/pro-components";
import { Dropdown, Select, Space, Tag, Typography } from "antd";

const { Paragraph } = Typography;

export const columns: ProColumns<Banners>[] = [
  {
    title: "ID",
    dataIndex: "id",
    // hideInTable: true,
  },

  {
    title: "Thời gian chạy",
    dataIndex: "duration",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdTime",
  },
  {
    title: "Người tạo",
    dataIndex: "createdBy",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "modifiedTime",
  },
  {
    title: "Người cập nhật",
    dataIndex: "modifiedBy",
  },
  {
    title: "Thứ tự trên trang chủ",
    dataIndex: "ordering",
  },
  {
    title: "Kiểu",
    dataIndex: "mimeType",
  },
  {
    title: "Nội dung",
    dataIndex: "content",
    ellipsis: true,
    render: (dom, entity, index, action, schema) => (
      <ResponsesiveTextTable
        maxWidth={500}
        minWidth={50}
        text={
          <Paragraph
            copyable={{
              text: String(entity?.content),
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
    title: "Đường dẫn bài viết",
    dataIndex: "targetUrl",
    ellipsis: true,
    render: (dom, entity, index, action, schema) => (
      <ResponsesiveTextTable
        maxWidth={500}
        minWidth={50}
        text={
          <Paragraph
            copyable={{
              text: String(entity?.targetUrl),
            }}
            style={{ display: "flex" }}
          >
            {dom}
          </Paragraph>
        }
      />
    ),
  },
  // {
  //   title: "Đường dẫn ảnh banner",
  //   dataIndex: "fileUrl",
  //   ellipsis: true,
  // },
];
