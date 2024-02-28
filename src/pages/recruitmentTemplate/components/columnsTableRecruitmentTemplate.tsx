import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import ResponsesiveTextTable from "#/components/ResponsiveTextTable";
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
  RecruitmentTemplate,
} from "#/lib/openapi";
import { postsApi, recruitmentTemplateApi } from "#/services/api";
import {
  getDataApi,
  getErrorApi,
  getMasterDataByTypeUtil,
  isApiSuccess,
} from "#/utils";
import { useRef } from "react";
import Link from "antd/es/typography/Link";
import {
  deleteRecruitmentTemplates,
  getDetailRecruitmentTemplate,
} from "#/redux/slices/recruitmentTemplate/action";
import {
  setCurrentRecruitmentTemplate,
  showDrawerRecruitmentTemplateDetail,
  showModalRecruitmentsTemplateForm,
} from "#/redux/slices/recruitmentTemplate";
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
  record: Post;
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
      {/* <Tooltip title="Xem thông tin">
        <Button
          key={1}
          onClick={async () => {
            dispatch(showModalPostsDetail());
            dispatch(setCurrentPosts(record));

            const data = await postsApi.getDetailPost(record?.id);
            if (isApiSuccess(data)) {
              const detailPostsData: GetDetailPostResponse = getDataApi(data);

              dispatch(setCurrentPosts(detailPostsData));
            } else {
              message.error(getErrorApi(data).message);
            }
          }}
          style={{ marginRight: 4 }}
          size="small"
        >
          <EyeOutlined />
        </Button>
      </Tooltip> */}
      <Tooltip title="Sửa thông tin">
        <Button
          key={2}
          onClick={async () => {
            await dispatch(getDetailRecruitmentTemplate(Number(record?.id)));
            // dispatch(setCurrentRecruitmentTemplate(record));
            dispatch(showModalRecruitmentsTemplateForm());
          }}
          style={{ marginRight: 4 }}
          size="small"
        >
          <EditOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="">
        <Popconfirm
          key={3}
          title="Bạn chắc chắn muốn xoá bài viết này?"
          onConfirm={async () => {
            const ids = [record?.id];
            const data: any = { ids: ids };
            dispatch(deleteRecruitmentTemplates(data));
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

export const columns = (): ProColumns<RecruitmentTemplate>[] => {
  const dispatch = useAppDispatch();
  return [
    // {
    //   title: "STT",
    //   dataIndex: "id",
    //   // hideInSearch: true,
    // },
    {
      title: "Mã",
      dataIndex: "code",
      render: (dom, entity) => (
        <Link
          onClick={() => {
            dispatch(getDetailRecruitmentTemplate(Number(entity?.id)));
            dispatch(showDrawerRecruitmentTemplateDetail());
          }}
        >
          {dom}
        </Link>
      ),
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
      render: (text) => (
        <ResponsesiveTextTable maxWidth={100} minWidth={50} text={text} />
      ),
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
};
