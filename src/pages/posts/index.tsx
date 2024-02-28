import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { Post } from "#/lib/openapi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  hideModalPostsDetail,
  hideModalPostsForm,
  setCurrentIdPosts,
  setSelectedRows,
  showModalPostsForm,
} from "#/redux/slices/posts";
import {
  deletePostsTableData,
  fetchPostsTableData,
  getPostsById,
} from "#/redux/slices/posts/action";
import {
  EditOutlined,
  PlusOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { ActionType, PageContainer } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import {
  Button,
  Drawer,
  Popconfirm,
  Space,
  Tag,
  Tooltip,
  notification,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/columnsTablePost";
import DrawerDetailPosts from "./components/DrawerPosts";
import ModalPostsForm from "./components/ModalPostsForm";
import { hanldeReloadTablePosts, requestPayloadPosts } from "#/utils";
import SwitchStatePosts from "#/components/SwitchStatePosts";

const Posts: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const dispatch = useAppDispatch();
  const {
    selectedRows,
    postsListData,
    modalPostsDetailOpen,
    modalPostsFormOpen,
    currentPosts,
    currentPostDetail,
    currentIdPosts,
  } = useAppSelector((state) => state.posts);
  const [showTableAlert, setShowTableAlert] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("ACTIVE");
  console.log("postsListData:: ", postsListData);

  useEffect(() => {
    const listTable = postsListData?.data;
    hanldeReloadTablePosts({ listTable, activeTab, actionRef });
  }, [postsListData.data]);

  return (
    <PageContainer
      childrenContentStyle={{
        paddingInline: 12,
        paddingBlock: 4,
      }}
      // breadcrumbRender={false}
      title={false}
      footer={[]}
    >
      <ProTable<Post>
        columns={columns()}
        actionRef={actionRef}
        rowSelection={{
          onSelect: (record, selected, selectedRows) => {
            dispatch(setSelectedRows(selectedRows));
            setShowTableAlert(true);
            console.log("data:: ", selectedRows);
          },
        }}
        tableAlertRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => {
          return (
            showTableAlert && (
              <Space size={24}>
                <span>Đã chọn {selectedRows.length} mục</span>
              </Space>
            )
          );
        }}
        tableAlertOptionRender={({ onCleanSelected }) => {
          const hanleDelete = async () => {
            const ids = selectedRows.map((value: any) => value.id);
            const data = { ids: ids };
            const res = await dispatch(deletePostsTableData(data));
            if (res?.meta?.requestStatus === "fulfilled") {
              setShowTableAlert(false);
            }
          };

          const hanldeRemoveSelect = () => {
            dispatch(setSelectedRows([]));
            setShowTableAlert(false);
            onCleanSelected();
          };

          return (
            showTableAlert && (
              <>
                <Button
                  key={1}
                  ghost
                  danger
                  size="small"
                  onClick={hanldeRemoveSelect}
                >
                  Bỏ chọn
                </Button>
                <Popconfirm
                  key={2}
                  title="Bạn chắc chắn muốn xóa không?"
                  onConfirm={hanleDelete}
                >
                  <Button
                    key={3}
                    ghost
                    danger
                    size="small"
                    style={{ marginLeft: 8 }}
                  >
                    Xóa
                  </Button>
                </Popconfirm>
              </>
            )
          );
        }}
        cardBordered
        // bordered
        // debounceTime={800}
        headerTitle="Danh sách bài viết"
        size="small"
        tableLayout="auto"
        dataSource={postsListData.data}
        request={async (params, sort, filter) =>
          await dispatch(
            fetchPostsTableData(
              requestPayloadPosts({ params, sort, filter, activeTab })
            )
          )
        }
        rowKey="id"
        search={{
          labelWidth: "auto",
          style: {
            paddingBlock: 12,
          },
        }}
        cardProps={{
          bodyStyle: { padding: 4 },
        }}
        options={{
          search: {
            placeholder: "Tìm kiếm bài viết...",
          },
          setting: false,
          density: false,
        }}
        toolbar={{
          menu: {
            type: "tab",
            onChange: (activeKey: any) => {
              actionRef.current?.clearSelected?.();
              actionRef.current?.reload?.();
              // setSelectedRows([]);
              setActiveTab(activeKey);
            },
            items: [
              {
                label: (
                  <>
                    <FontAwesomeIcon icon={faEye} /> Hiển thị
                  </>
                ),
                key: "ACTIVE",
              },
              // {
              //   label: <><FontAwesomeIcon icon={faHourglass} /> Chờ duyệt</>,
              //   key: 'pending',
              // },
              {
                label: (
                  <>
                    <FontAwesomeIcon icon={faEyeSlash} />
                    {/* <FontAwesomeIcon icon="fa-brands fa-twitter" /> */}
                    Không hiển thị
                  </>
                ),
                key: "DRAFT",
              },
            ],
          },
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          total: postsListData?.total,
          showTotal: (total, range) => {
            return `${range[0]}-${range[1]} trên ${total} bài viết`;
          },
        }}
        scroll={{ x: "max-content", y: "calc(100vh-245px)" }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            onClick={() => dispatch(showModalPostsForm())}
            // onClick={() => window.event$.emit("hello")}
            icon={<PlusOutlined />}
            type="primary"
          >
            Tạo mới
          </Button>,
        ]}
      />

      <ModalPostsForm
        modalProps={{
          open: modalPostsFormOpen,
          destroyOnClose: true,
          style: { maxWidth: 1440 },
        }}
        postId={currentIdPosts}
        onCancel={() => {
          dispatch(hideModalPostsForm());
        }}
        onSuccess={() => {
          dispatch(hideModalPostsForm());
        }}
      />

      <Drawer
        width={"85%"}
        open={modalPostsDetailOpen}
        destroyOnClose
        headerStyle={{
          padding: "6px 10px",
        }}
        bodyStyle={{
          padding: 10,
        }}
        onClose={() => {
          dispatch(hideModalPostsDetail());
        }}
        title={`Chi tiết bài viết: ${currentPostDetail?.title}`}
        extra={[
          <Space>
            <Tooltip title="Chia sẻ bài viết">
              <Button
                type="link"
                icon={<ShareAltOutlined />}
                onClick={async () => {
                  notification.info({
                    message: "Tính năng đang được phát triển",
                  });
                }}
                key={1}
              ></Button>
            </Tooltip>
            <Tooltip title="Thay đổi thông tin">
              <Button
                icon={<EditOutlined />}
                onClick={async () => {
                  await dispatch(getPostsById(Number(currentPostDetail?.id)));
                  dispatch(showModalPostsForm());
                  dispatch(setCurrentIdPosts(Number(currentPostDetail?.id)));
                }}
                key={2}
              ></Button>
            </Tooltip>

            <SwitchStatePosts
              checked={currentPostDetail?.state}
              id={currentPostDetail?.id}
              // onChange={()=>handleChangeStateBanner()}
            />
          </Space>,
        ]}
      >
        <DrawerDetailPosts />
      </Drawer>
    </PageContainer>
  );
};

export default Posts;
