import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  ActionType,
  ProColumns,
  TableDropdown,
} from "@ant-design/pro-components";
import {
  Badge,
  Button,
  message,
  notification,
  Popconfirm,
  Select,
  Space,
  Tag,
  Tooltip,
} from "antd";
import { showModalPostsDetail, showModalPostsForm } from "#/redux/slices/posts";
import {
  GetDetailPostResponse,
  Post,
  RecruitmentData,
  RecruitmentList,
} from "#/lib/openapi";
import { postsApi } from "#/services/api";
import {
  getDataApi,
  getErrorApi,
  getMasterDataByTypeUtil,
  isApiSuccess,
} from "#/utils";
import { useRef } from "react";
// import { setShowDrawerRecruitmentForm } from "#/redux/slices/recruitment";
import ResponsesiveTextTable from "#/components/ResponsiveTextTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { getDetailRecruitment } from "#/redux/slices/recruitment/action";
import {
  setDataTitleDrawerRecruitment,
  showDrawerRecruitmentForms,
  showDrawerRecruitmentsDetail,
} from "#/redux/slices/recruitment";
import Link from "antd/es/typography/Link";
const ActionButton: React.FC<{ type: string; record: RecruitmentData }> = ({
  type,
  record,
}) => {
  const dispatch = useAppDispatch();
  return (
    <>
      {type === "edit" && (
        <div
          onClick={async () => {
            await dispatch(getDetailRecruitment(Number(record?.id)));
            dispatch(showDrawerRecruitmentForms());
            dispatch(setDataTitleDrawerRecruitment(record));
          }}
        >
          <EditOutlined /> Sửa
        </div>
      )}
      {type === "delete" && (
        <>
          <DeleteOutlined /> Xoá
        </>
      )}
      {type === "INACTIVE" && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 20 15"
            fill="none"
          >
            <path
              d="M3.88183 5.73266C3.66969 5.90944 3.64103 6.22472 3.81781 6.43686C3.99459 6.649 4.30987 6.67766 4.52201 6.50088L3.88183 5.73266ZM6.50003 4.20167L6.82012 3.81756C6.6347 3.66304 6.36536 3.66304 6.17994 3.81756L6.50003 4.20167ZM8.47805 6.50088C8.69019 6.67766 9.00547 6.649 9.18226 6.43686C9.35904 6.22472 9.33038 5.90944 9.11824 5.73266L8.47805 6.50088ZM6.00003 8.7979C6.00003 9.07404 6.22389 9.2979 6.50003 9.2979C6.77617 9.2979 7.00003 9.07404 7.00003 8.7979H6.00003ZM4.52201 6.50088L6.82012 4.58579L6.17994 3.81756L3.88183 5.73266L4.52201 6.50088ZM6.17994 4.58579L8.47805 6.50088L9.11824 5.73266L6.82012 3.81756L6.17994 4.58579ZM6.00003 4.20167V8.7979H7.00003V4.20167H6.00003ZM9.82345 3.1764C11.6589 5.01187 11.6589 7.98774 9.82345 9.8232L10.5306 10.5303C12.7565 8.30432 12.7565 4.69528 10.5306 2.4693L9.82345 3.1764ZM9.82345 9.8232C7.98799 11.6587 5.01211 11.6587 3.17665 9.8232L2.46954 10.5303C4.69553 12.7563 8.30457 12.7563 10.5306 10.5303L9.82345 9.8232ZM3.17665 9.8232C1.34118 7.98774 1.34118 5.01187 3.17665 3.1764L2.46954 2.4693C0.243552 4.69528 0.243552 8.30432 2.46954 10.5303L3.17665 9.8232ZM3.17665 3.1764C5.01211 1.34094 7.98799 1.34094 9.82345 3.1764L10.5306 2.4693C8.30457 0.243308 4.69553 0.243308 2.46954 2.4693L3.17665 3.1764Z"
              fill="#4DC813"
            />
          </svg>
          {"Đăng tuyển"}
        </>
      )}
      {type === "ACTIVE" && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 20 15"
            fill="none"
          >
            <path
              d="M12.8556 9.9734C13.0678 9.79661 13.0964 9.48133 12.9196 9.26919C12.7429 9.05705 12.4276 9.02839 12.2154 9.20517L12.8556 9.9734ZM8.99997 12.5356L8.67988 12.9197C8.86531 13.0742 9.13464 13.0742 9.32007 12.9197L8.99997 12.5356ZM5.78451 9.20517C5.57237 9.02839 5.25709 9.05705 5.08031 9.26919C4.90352 9.48133 4.93219 9.79661 5.14432 9.9734L5.78451 9.20517ZM9.49998 5.46447C9.49998 5.18832 9.27612 4.96447 8.99998 4.96447C8.72383 4.96447 8.49998 5.18832 8.49998 5.46447L9.49998 5.46447ZM12.2154 9.20517L8.67988 12.1515L9.32007 12.9197L12.8556 9.9734L12.2154 9.20517ZM9.32007 12.1515L5.78451 9.20517L5.14432 9.9734L8.67988 12.9197L9.32007 12.1515ZM9.49998 12.5356V5.46447L8.49998 5.46447L8.49997 12.5356H9.49998ZM14.3033 14.3033C11.3744 17.2322 6.62563 17.2322 3.6967 14.3033L2.98959 15.0104C6.30905 18.3299 11.6909 18.3299 15.0104 15.0104L14.3033 14.3033ZM3.6967 14.3033C0.767767 11.3744 0.767767 6.62563 3.6967 3.6967L2.98959 2.98959C-0.329864 6.30905 -0.329864 11.6909 2.98959 15.0104L3.6967 14.3033ZM3.6967 3.6967C6.62563 0.767767 11.3744 0.767767 14.3033 3.6967L15.0104 2.98959C11.6909 -0.329864 6.30905 -0.329864 2.98959 2.98959L3.6967 3.6967ZM14.3033 3.6967C17.2322 6.62563 17.2322 11.3744 14.3033 14.3033L15.0104 15.0104C18.3299 11.6909 18.3299 6.30905 15.0104 2.98959L14.3033 3.6967Z"
              fill="#CE1126"
            />
          </svg>
          {"Ngừng đăng tuyển"}
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
//       {/* <Tooltip title="Xem thông tin">
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
//       </Tooltip> */}
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
//           key={3}
//           title="Bạn chắc chắn muốn xoá bài viết này?"
//           //   onConfirm={async () => {
//           //     const ids = [record?.id];
//           //     const data = { id: ids };
//           //     const res = await postsApi.adminCmsPostsDeleteCompletelyDelete(
//           //       data
//           //     );
//           //     if (isApiSuccess(res)) {
//           //       message.success("Xóa thành công bài viết");
//           //       actionRef.current?.reload();
//           //     } else {
//           //       message.error(getErrorApi(res).message);
//           //     }
//           //   }}
//         >
//           <Button key={3} danger size="small">
//             <DeleteOutlined />
//           </Button>
//         </Popconfirm>
//       </Tooltip>
//     </div>
//   );
// };

export const columns = (): ProColumns<RecruitmentList>[] => {
  const dispatch = useAppDispatch();
  return [
    {
      title: "STT",
      dataIndex: "id",
      hideInSearch: true,
      width: 50,
    },
    {
      title: "Vị trí tuyển dụng",
      dataIndex: "jobTitle",
      render: (dom, entity) => (
        <Link
          onClick={() => {
            dispatch(getDetailRecruitment(Number(entity?.id)));
            dispatch(showDrawerRecruitmentsDetail());
          }}
        >
          {dom}
        </Link>
      ),
    },
    {
      title: "Nơi làm việc",
      dataIndex: "jobLocations",
      valueType: "select",
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
      title: "Mã số",
      dataIndex: "code",
    },

    {
      title: "Ngày đăng",
      key: "publishUpDate",
      dataIndex: "publishUpDate",
      render: (text) => (
        <ResponsesiveTextTable maxWidth={200} minWidth={100} text={text} />
      ),
    },
    {
      title: "Ngày hạn",
      key: "validThrough",
      dataIndex: "validThrough",
      render(dom, entity, index, action, schema) {
        //
        return (
          <Space>
            <Button
              style={{
                border: "none",
                display: "flex",
                height: "100%",
                padding: 0,
                borderRadius: "50%",
                width: "100%",
                alignItems: "center",
              }}
              icon={
                entity?.state === "ACTIVE" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.14432 9.0266C5.93219 9.20339 5.90352 9.51867 6.08031 9.73081C6.25709 9.94295 6.57237 9.97161 6.78451 9.79483L6.14432 9.0266ZM9.99998 6.46442L10.3201 6.08031C10.1346 5.92579 9.86531 5.92579 9.67988 6.08031L9.99998 6.46442ZM13.2154 9.79483C13.4276 9.97161 13.7429 9.94295 13.9196 9.73081C14.0964 9.51867 14.0678 9.20339 13.8556 9.0266L13.2154 9.79483ZM9.49998 13.5355C9.49998 13.8117 9.72383 14.0355 9.99998 14.0355C10.2761 14.0355 10.5 13.8117 10.5 13.5355H9.49998ZM6.78451 9.79483L10.3201 6.84853L9.67988 6.08031L6.14432 9.0266L6.78451 9.79483ZM9.67988 6.84853L13.2154 9.79483L13.8556 9.0266L10.3201 6.08031L9.67988 6.84853ZM9.49998 6.46442V13.5355H10.5V6.46442H9.49998ZM15.3033 4.6967C18.2322 7.62563 18.2322 12.3744 15.3033 15.3033L16.0104 16.0104C19.3299 12.6909 19.3299 7.30905 16.0104 3.98959L15.3033 4.6967ZM15.3033 15.3033C12.3744 18.2322 7.62563 18.2322 4.6967 15.3033L3.98959 16.0104C7.30905 19.3299 12.6909 19.3299 16.0104 16.0104L15.3033 15.3033ZM4.6967 15.3033C1.76777 12.3744 1.76777 7.62563 4.6967 4.6967L3.98959 3.98959C0.670136 7.30905 0.670136 12.6909 3.98959 16.0104L4.6967 15.3033ZM4.6967 4.6967C7.62563 1.76777 12.3744 1.76777 15.3033 4.6967L16.0104 3.98959C12.6909 0.670136 7.30905 0.670136 3.98959 3.98959L4.6967 4.6967Z"
                      fill={"#4DC813"}
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M12.8556 9.9734C13.0678 9.79661 13.0964 9.48133 12.9196 9.26919C12.7429 9.05705 12.4276 9.02839 12.2154 9.20517L12.8556 9.9734ZM8.99997 12.5356L8.67988 12.9197C8.86531 13.0742 9.13464 13.0742 9.32007 12.9197L8.99997 12.5356ZM5.78451 9.20517C5.57237 9.02839 5.25709 9.05705 5.08031 9.26919C4.90352 9.48133 4.93219 9.79661 5.14432 9.9734L5.78451 9.20517ZM9.49998 5.46447C9.49998 5.18832 9.27612 4.96447 8.99998 4.96447C8.72383 4.96447 8.49998 5.18832 8.49998 5.46447L9.49998 5.46447ZM12.2154 9.20517L8.67988 12.1515L9.32007 12.9197L12.8556 9.9734L12.2154 9.20517ZM9.32007 12.1515L5.78451 9.20517L5.14432 9.9734L8.67988 12.9197L9.32007 12.1515ZM9.49998 12.5356V5.46447L8.49998 5.46447L8.49997 12.5356H9.49998ZM14.3033 14.3033C11.3744 17.2322 6.62563 17.2322 3.6967 14.3033L2.98959 15.0104C6.30905 18.3299 11.6909 18.3299 15.0104 15.0104L14.3033 14.3033ZM3.6967 14.3033C0.767767 11.3744 0.767767 6.62563 3.6967 3.6967L2.98959 2.98959C-0.329864 6.30905 -0.329864 11.6909 2.98959 15.0104L3.6967 14.3033ZM3.6967 3.6967C6.62563 0.767767 11.3744 0.767767 14.3033 3.6967L15.0104 2.98959C11.6909 -0.329864 6.30905 -0.329864 2.98959 2.98959L3.6967 3.6967ZM14.3033 3.6967C17.2322 6.62563 17.2322 11.3744 14.3033 14.3033L15.0104 15.0104C18.3299 11.6909 18.3299 6.30905 15.0104 2.98959L14.3033 3.6967Z"
                      fill="#CE1126"
                    />
                  </svg>
                )
              }
              // onClick={
              //   index % 2 === 0
              //     ? () =>
              //         notification.success({
              //           message: "Tăng ngày hạn thành công",
              //         })
              //     : () =>
              //         notification.success({
              //           message: "Giảm ngày hạn thành công",
              //         })
              // }
            ></Button>
            {dom}
          </Space>
        );
      },
    },
    {
      title: "Lượt xem",
      dataIndex: "viewCounting",
      render: (text) => (
        <ResponsesiveTextTable maxWidth={100} minWidth={50} text={text} />
      ),
    },
    {
      title: "Đơn nộp",
      dataIndex: "applicationCounting",
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
      render: (text, record, _, action) => {
        return [
          <TableDropdown
            key="actionGroup"
            menus={[
              {
                key: "edit",
                name: <ActionButton type="edit" record={record} />,
              },
              {
                key: "delete",
                name: <ActionButton type="delete" record={record} />,
              },
              {
                key: "jobPosting",
                name: (
                  <ActionButton type={String(record?.state)} record={record} />
                ),
              },
            ]}
          >
            <Tag
              // style={{
              //   display: "flex",
              //   alignItems: "center",
              //   width: "50px",
              // }}
              // icon={[
              //   <svg
              //     xmlns="http://www.w3.org/2000/svg"
              //     width="25"
              //     height="25"
              //     viewBox="0 0 25 25"
              //     fill="none"
              //   >
              //     <path
              //       d="M9.95551 22.456H4.9555C3.57478 22.456 2.4555 21.3367 2.45551 19.956L2.4556 4.95604C2.45561 3.57534 3.5749 2.45605 4.9556 2.45605H16.2059C17.5866 2.45605 18.7059 3.57534 18.7059 4.95605V9.95605M6.8309 7.45605H14.3309M6.8309 11.2061H14.3309M6.8309 14.9561H10.5809M13.7057 19.0092L19.009 13.7059L22.5445 17.2414L17.2412 22.5447H13.7057V19.0092Z"
              //       stroke="#3763FF"
              //       stroke-width="1.5"
              //       stroke-linecap="round"
              //       stroke-linejoin="round"
              //     />
              //   </svg>,
              //   <svg
              //     xmlns="http://www.w3.org/2000/svg"
              //     width="10"
              //     height="8"
              //     viewBox="0 0 10 8"
              //     fill="none"
              //   >
              //     <path d="M5 8L0.669872 0.5L9.33013 0.5L5 8Z" fill="black" />
              //   </svg>,
              // ]}
              icon={<MoreOutlined />}
            ></Tag>

            {/* <FontAwesomeIcon icon={faCaretDown} /> */}
          </TableDropdown>,
        ];
      },

      // render: (text, record, action) => (
      //   <ActionButton record={record}></ActionButton>
      // ),
    },
  ];
};
