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
  Badge,
  notification,
} from "antd";
import {
  showModalPostsDetail,
  showModalPostsForm,
  setCurrentIdPosts,
} from "#/redux/slices/posts";
import { GetDetailPostResponse, Post } from "#/lib/openapi";
import { postsApi } from "#/services/api";
import {
  getDataApi,
  getErrorApi,
  isApiSuccess,
  fieldPropsFilter,
  getListCategory,
} from "#/utils";
import { useRef } from "react";
import {
  deletePostsTableData,
  getPostsById,
} from "#/redux/slices/posts/action";
import Link from "antd/es/typography/Link";
import moment from "moment";
import SwitchStatePosts from "#/components/SwitchStatePosts";
const ActionButton: React.FC<{
  type: "edit" | "delete" | "view";
  record: Post;
}> = ({ type, record }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      {type === "view" && (
        <div
          onClick={async () => {
            notification.info({ message: "Tính năng đang được phát triển" });
          }}
        >
          <EyeOutlined /> Xem trước
        </div>
      )}
      {type === "edit" && (
        <div
          onClick={async () => {
            await dispatch(getPostsById(Number(record?.id)));
            dispatch(showModalPostsForm());
            dispatch(setCurrentIdPosts(record?.id));
          }}
        >
          <EditOutlined /> Sửa
        </div>
      )}
      {type === "delete" && (
        <>
          {/* <DeleteOutlined /> Xoá */}

          <Popconfirm
            key="1"
            title="Bạn chắc chắn muốn xoá bài viết này?"
            onConfirm={async () => {
              const ids = [record?.id];
              const data: any = { ids: ids };

              dispatch(deletePostsTableData(data));
            }}
            // icon={<DeleteOutlined />}
          >
            <DeleteOutlined /> Xóa
          </Popconfirm>
        </>
      )}
    </>
  );
};
interface ActionButtonProps {
  record: Post;
}

// const ActionButton: React.FC<ActionButtonProps> = ({ record }) => {
//   const dispatch = useAppDispatch();
//   // const { selectedRows } = useAppSelector((state) => state.posts);
//   const actionRef = useRef<ActionType>();
//   return (
//     <div
//       style={{
//         display: "flex",
//       }}
//     >
//       <Tooltip title="Xem thông tin">
//         <Button
//           key={1}
//           onClick={async () => {
//             dispatch(showModalPostsDetail());
//             dispatch(setCurrentPosts(record));

//             const data = await postsApi.getDetailPost(record?.id);
//             if (isApiSuccess(data)) {
//               const detailPostsData: GetDetailPostResponse = getDataApi(data);

//               dispatch(setCurrentPosts(detailPostsData));
//             } else {
//               message.error(getErrorApi(data).message);
//             }
//           }}
//           style={{ marginRight: 4 }}
//           size="small"
//         >
//           <EyeOutlined />
//         </Button>
//       </Tooltip>
//       <Tooltip title="Sửa thông tin">
//         <Button
//           key={2}
//           onClick={async () => {
//             dispatch(showModalPostsForm());
//             dispatch(setCurrentPosts(record));
//           }}
//           style={{ marginRight: 4 }}
//           size="small"
//         >
//           <EditOutlined />
//         </Button>
//       </Tooltip>
//       <Tooltip title="">
//         <Popconfirm
//           key="2"
//           title="Bạn chắc chắn muốn xoá bài viết này?"
//           onConfirm={async () => {
//             const ids = [record?.id];
//             const data = { id: ids };
//             dispatch(deletePostsTableData(data));
//           }}
//         >
//           <Button key={3} danger size="small">
//             <DeleteOutlined />
//           </Button>
//         </Popconfirm>
//       </Tooltip>
//     </div>
//   );
// };

export const columns = (): ProColumns<Post>[] => {
  const dispatch = useAppDispatch();
  return [
    // {
    //   title: "Từ khoá",
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
            <Image
              width={50}
              // src="https://cdn.tgdd.vn/Files/2017/02/16/950437/anhthunho1_800x450.jpg"
              src={entity?.iconUrl || "/images/logo-seabank-black.png"}
              preview={{
                mask: <EyeOutlined />,
                src: entity?.thumbImage,
              }}
            />
            <Link
              onClick={async () => {
                dispatch(getPostsById(Number(entity?.id)));
                dispatch(showModalPostsDetail());
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
      title: "Chuyên mục",
      key: "categories",
      hideInTable: true,
      // ellipsis: true,
      debounceTime: 800,
      valueType: "treeSelect",
      fieldProps: {
        showSearch: true,
        multiple: true,
      },
      formItemProps: {},
      request: async () => await getListCategory({ start: 0, limit: 50 }),
      dataIndex: "categories",
    },
    {
      title: "Người tạo",
      dataIndex: "createdBy",
      // hideInSearch: true,
      width: 100,
    },

    {
      title: "Ngày tạo",
      hideInSearch: true,
      dataIndex: "createdTime",
      render(dom, entity, index, action, schema) {
        const dateTimeString = entity?.createdTime || " ";
        const [datePart, timePart] = dateTimeString.split(" ");
        return <>{datePart}</>;
      },
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
      title: "Nổi bật",
      dataIndex: "stick",
      valueType: "select",
      // initialValue: "",
      valueEnum: {
        true: { text: <Badge status="success" text="ACTIVE" /> },
        false: { text: <Badge status="error" text="INACTIVE" /> },
      },

      render: (_, record) => (
        <Space>
          <Tag color={record?.stick === true ? "green" : "red"}>
            {record?.stick ? "ACTIVE" : "INACTIVE"}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return (
          <SwitchStatePosts
            checked={entity?.state}
            id={entity?.id}
            // onChange={()=>handleChangeStateBanner()}
          />
        );
      },
    },
    {
      title: "Hành động",
      key: "option",
      hideInSearch: true,
      fixed: "right",
      width: 100,
      render: (text, record, _, action) => [
        <TableDropdown
          key="actionGroup"
          menus={[
            {
              key: "view",
              name: <ActionButton type="view" record={record} />,
            },
            {
              key: "edit",
              name: <ActionButton type="edit" record={record} />,
            },
            {
              key: "delete",
              name: <ActionButton type="delete" record={record} />,
            },
          ]}
        >
          <Tag color="processing" icon={<DashOutlined />}></Tag>
        </TableDropdown>,
      ],
      // render: (text, record, action) => (
      //   <ActionButton record={record}></ActionButton>
      // ),
    },
  ];
};
