import ResponsesiveTextTable from "#/components/ResponsiveTextTable";
import { Post } from "#/lib/openapi";
import { ProColumns } from "@ant-design/pro-components";
import { Dropdown, Select, Space, Tag, Image, Typography } from "antd";

const { Paragraph } = Typography;

export const columns: ProColumns<Post | any>[] = [
  {
    title: "Tiêu đề",
    dataIndex: "title",
    // hideInSearch: true,
  },
  {
    title: "Đường dẫn",
    dataIndex: "slug",
    // hideInTable: true,
  },
  // {
  //   title: "Mô tả",
  //   dataIndex: "description",
  // },
  {
    title: "Mô tả",
    dataIndex: "description",
    ellipsis: true,
    render: (dom, entity, index, action, schema) => (
      <ResponsesiveTextTable
        maxWidth={500}
        minWidth={50}
        text={
          <Paragraph
            copyable={{
              text: String(entity?.description),
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
  //   title: "Nội dung",
  //   dataIndex: "content",
  //   ellipsis: true,
  // },
  {
    disable: true,
    title: "Trạng thái",
    dataIndex: "state",
    render: (_, record) => (
      <Space>
        <Tag
          color={
            record?.state === "ACTIVE"
              ? "green"
              : record?.state === "DELETED"
              ? "red"
              : "orange"
          }
        >
          {record?.state}
        </Tag>
      </Space>
    ),
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
    title: "Thời gian chỉnh sửa",
    dataIndex: "modifiedTime",
  },
  {
    title: "Người chỉnh sửa",
    dataIndex: "modifiedBy",
  },
  {
    title: "Ghim",
    dataIndex: "stick",
    render: (_, record) => (
      <Space>
        <Tag color={record?.stick === true ? "green" : "red"}>
          {record?.state}
        </Tag>
      </Space>
    ),
  },
  {
    title: "Thời gian ghim",
    dataIndex: "stickTime",
  },
  {
    title: "Thứ tự trên trang chủ",
    dataIndex: "ordering",
  },

  // {
  //   disable: true,
  //   title: "Nổi bật",
  //   hideInTable: true,
  //   dataIndex: "feature",
  //   filters: true,
  //   onFilter: true,
  //   ellipsis: true,
  //   valueType: "select",
  //   valueEnum: {
  //     all: { text: "s".repeat(50) },
  //     open: {
  //       text: "Trang chủ",
  //       status: "Error",
  //     },
  //     closed: {
  //       text: "Ẩn",
  //       status: "Success",
  //       disabled: true,
  //     },
  //     processing: {
  //       text: "-",
  //       status: "Processing",
  //     },
  //   },
  // },
  // {
  //   disable: true,
  //   title: "Xuất bản",
  //   dataIndex: "state",
  //   render: (_, record) => (
  //     <Space>
  //       <Tag
  //         color={
  //           record?.state === "ACTIVE"
  //             ? "green"
  //             : record?.state === "DELETED"
  //             ? "red"
  //             : "orange"
  //         }
  //       >
  //         {record?.state}
  //       </Tag>
  //     </Space>
  //   ),
  // },
  {
    title: "Mục",
    dataIndex: "categories",
    render: (text, record) => {
      console.log("log:: ", record);
      const value = record?.categories
        ?.map((value: any) => value?.title)
        .join(", ");
      return <>{value}</>;
    },
  },
  {
    title: "Đường dẫn ảnh đại diện",
    dataIndex: "thumbImage",
    ellipsis: true,
    render: (dom, entity, index, action, schema) => (
      <ResponsesiveTextTable
        maxWidth={500}
        minWidth={50}
        text={
          <Paragraph
            copyable={{
              text: String(entity?.thumbImage),
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
  //   title: "Tags",
  //   width: 120,
  //   key: "type",
  //   dataIndex: "postTags",
  //   hideInTable: true,
  //   render: (text, record, _, action) => [
  //     <Select
  //       // defaultValue="follow"
  //       // mode="multiple"
  //       style={{ width: 100 }}
  //       placeholder="Tag"
  //       options={record?.postTags?.map((value) => ({
  //         value: value,
  //         label: `Tag: ${value}`,
  //       }))}
  //     ></Select>,
  //   ],
  // },

  // {
  //   title: "Đánh dấu hiển thị",
  //   dataIndex: "feature",
  // },
  // {
  //   title: "Sắp xếp hiển thị",
  //   dataIndex: "featureOrdering",
  // },
  //   {
  //     title: "Hành động",
  //     key: "option",
  //     hideInSearch: true,
  //     fixed: "right",
  //     width: 100,
  //     // render: (text, record, _, action) => [
  //     //   <TableDropdown
  //     //     key="actionGroup"
  //     //     menus={[
  //     //       {
  //     //         key: "edit",
  //     //         name: <ActionButton type="edit" />,
  //     //       },
  //     //       {
  //     //         key: "delete",
  //     //         name: <ActionButton type="delete" />,
  //     //       },
  //     //     ]}
  //     //   >
  //     //     <Tag color="processing">Mở rộng</Tag>
  //     //   </TableDropdown>,
  //     // ],
  //     render: (text, record, action) => (
  //       <ActionButton record={record}></ActionButton>
  //     ),
  //   },
];
