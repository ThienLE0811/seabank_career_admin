import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
  ActionType,
  ProColumns,
  TableDropdown,
} from "@ant-design/pro-components";
import { Button, message, Popconfirm, Select, Space, Tag, Tooltip } from "antd";
import { showModalPostsDetail, showModalPostsForm } from "#/redux/slices/posts";
import {
  GetDetailPostResponse,
  Post,
  RecruitmentData,
  RecruitmentTemplateData,
} from "#/lib/openapi";
import { postsApi } from "#/services/api";
import {
  getDataApi,
  getErrorApi,
  getMasterDataByTypeUtil,
  isApiSuccess,
} from "#/utils";
import { useRef } from "react";
import ResponsesiveTextTable from "#/components/ResponsiveTextTable";
import { getDetailRecruitmentTemplate } from "#/redux/slices/recruitmentTemplate/action";
import {
  activeCheckMapData,
  inActiveCheckMapData,
} from "#/redux/slices/recruitment";
// const ActionButton: React.FC<{ type: "edit" | "delete" }> = ({ type }) => {
//   const dispatch = useAppDispatch();
//   return (
//     <>
//       {type === "edit" && (
//         <div onClick={() => dispatch(showModalPostsForm())}>
//           <EditOutlined /> Sửa
//         </div>
//       )}
//       {type === "delete" && (
//         <>
//           <DeleteOutlined /> Xoá
//         </>
//       )}
//     </>
//   );
// };
interface ActionButtonProps {
  record: RecruitmentTemplateData;
}

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
      <Button
        onClick={async () => {
          dispatch(inActiveCheckMapData());

          await dispatch(getDetailRecruitmentTemplate(Number(record?.id)));

          dispatch(activeCheckMapData());
        }}
      >
        Chọn
      </Button>
    </div>
  );
};

export const columns: ProColumns<Post>[] = [
  {
    title: "STT",
    dataIndex: "id",
    // hideInSearch: true,
  },
  {
    title: "Mã",
    dataIndex: "code",
  },
  {
    title: "Chức danh",
    dataIndex: "jobTitle",
    render: (text) => (
      <ResponsesiveTextTable maxWidth={200} minWidth={100} text={text} />
    ),
  },
  {
    title: "Khu vực",
    dataIndex: "jobLocations",
    valueType: "select",
    ellipsis: true,
    request: async () =>
      await getMasterDataByTypeUtil("mdm_job_locations", true, true),
    render: (text) => (
      <ResponsesiveTextTable
        maxWidth={200}
        minWidth={100}
        text={<Tag color={"processing"}>{text}</Tag>}
      />
    ),
  },
  {
    title: "Ngày tạo",
    key: "createdTime",
    dataIndex: "createdTime",
  },
  {
    title: "Người tạo",
    key: "createdBy",
    dataIndex: "createdBy",
  },
  {
    title: "Hành động",
    key: "option",
    hideInSearch: true,
    fixed: "right",
    width: 100,
    // render: (text, record, _, action) => [
    //   <TableDropdown
    //     key="actionGroup"
    //     menus={[
    //       {
    //         key: "edit",
    //         name: <ActionButton type="edit" />,
    //       },
    //       {
    //         key: "delete",
    //         name: <ActionButton type="delete" />,
    //       },
    //     ]}
    //   >
    //     <Tag color="processing">Mở rộng</Tag>
    //   </TableDropdown>,
    // ],
    render: (text, record, action) => (
      <ActionButton record={record}></ActionButton>
    ),
  },
];
