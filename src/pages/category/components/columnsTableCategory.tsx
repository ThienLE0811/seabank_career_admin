import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import {
  DashOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  ActionType,
  ProColumns,
  TableDropdown,
} from "@ant-design/pro-components";
import {
  Avatar,
  Button,
  message,
  Popconfirm,
  Select,
  Space,
  Tag,
  Tooltip,
  Image,
} from "antd";
import { showModalPostsDetail, showModalPostsForm } from "#/redux/slices/posts";
import { Category, GetDetailPostResponse, Post } from "#/lib/openapi";
import { postsApi } from "#/services/api";
import {
  getDataApi,
  getErrorApi,
  isApiSuccess,
  fieldPropsFilter,
} from "#/utils";
import { useRef } from "react";
import {
  deletePostsTableData,
  getPostsById,
} from "#/redux/slices/posts/action";
import Link from "antd/es/typography/Link";
import moment from "moment";
import {
  showModalCategoryDetail,
  showModalCategoryForm,
} from "#/redux/slices/category";
import {
  deleteCategoryTableData,
  getCategoryById,
} from "#/redux/slices/category/action";
import ResponsesiveTextTable from "#/components/ResponsiveTextTable";

type ActionButtonProps = {
  record: Category;
};

const ActionButton: React.FC<ActionButtonProps> = ({ record }) => {
  const dispatch = useAppDispatch();
  // const { selectedRows } = useAppSelector((state) => state.posts);
  const actionRef = useRef<ActionType>();
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Tooltip title="Sửa thông tin">
        <Button
          key={2}
          onClick={async () => {
            await dispatch(getCategoryById(Number(record?.id)));
            dispatch(showModalCategoryForm());
          }}
          style={{ marginRight: 4 }}
          size="small"
        >
          <EditOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="">
        <Popconfirm
          key="2"
          title="Bạn chắc chắn muốn xoá bài viết này?"
          onConfirm={async () => {
            const ids = [record?.id];
            const data: any = { ids: ids };
            dispatch(deleteCategoryTableData(data));
          }}
        >
          <Button key={3} danger size="small">
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </Tooltip>
    </div>
  );
};

export const columns = (): ProColumns<Category>[] => {
  const dispatch = useAppDispatch();
  return [
    // {
    //   title: "Keyword",
    //   dataIndex: "keywords",
    //   hideInTable: true,
    // },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      hideInSearch: true,

      render(dom, entity, index, action, schema) {
        return (
          <div>
            <Link
              onClick={async () => {
                await dispatch(getCategoryById(Number(entity?.id)));
                dispatch(showModalCategoryDetail());
                // dispatch(setCurrentPosts(entity));

                // const data = await postsApi.getDetailPost(entity?.id);
                // if (isApiSuccess(data)) {
                //   const detailPostsData: GetDetailPostResponse =
                //     getDataApi(data);

                //   dispatch(setCurrentPosts(detailPostsData));
                // } else {
                //   message.error(getErrorApi(data).message);
                // }
              }}
              style={{ paddingLeft: "10px" }}
            >
              {dom}
            </Link>
          </div>
        );
      },
    },
    {
      title: "Đường dẫn",
      dataIndex: "slug",
      hideInSearch: true,
      render: (dom, entity, index, action, schema) => (
        <ResponsesiveTextTable maxWidth={400} minWidth={100} text={dom} />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      hideInSearch: true,
    },

    {
      title: "Ngày tạo",
      hideInSearch: true,
      dataIndex: "createdTime",
    },
    {
      title: "Ngày tạo",

      dataIndex: "createdTime",
      valueType: "dateTimeRange",
      hideInTable: true,
      // hideInSearch: true,
      fieldProps: fieldPropsFilter(),
      formItemProps: {
        // initialValue: [moment().subtract(3, "days"), moment()],
        label: "Ngày Tạo",
      },
    },
    {
      title: "Ngày cập nhật",
      hideInSearch: true,
      dataIndex: "createdTime",
      valueType: "dateTime",
    },
    {
      title: "Người tạo",
      dataIndex: "createdBy",
      hideInSearch: true,
      width: 100,
    },

    {
      title: "Hành động",
      key: "option",
      hideInSearch: true,
      fixed: "right",
      width: 100,
      //   render: (text, record, _, action) => [
      //     <TableDropdown
      //       key="actionGroup"
      //       menus={[
      //         {
      //           key: "edit",
      //           name: <ActionButton type="edit" record={record} />,
      //         },
      //         {
      //           key: "delete",
      //           name: <ActionButton type="delete" record={record} />,
      //         },
      //       ]}
      //     >
      //       <Tag color="processing" icon={<DashOutlined />}></Tag>
      //     </TableDropdown>,
      //   ],
      render: (text, record, action) => (
        <ActionButton record={record}></ActionButton>
      ),
    },
  ];
};
