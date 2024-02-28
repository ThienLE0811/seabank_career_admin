import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { Category, GetDetailPostResponse, Post } from "#/lib/openapi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faBullseye,
  faEyeLowVision,
  faFaceRollingEyes,
  faMehRollingEyes,
  faArrowsToEye,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import {
  deletePostsTableData,
  fetchPostsTableData,
  getPostsById,
} from "#/redux/slices/posts/action";
import { postsApi } from "#/services/api";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ActionType, PageContainer, ProList } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import {
  Avatar,
  Button,
  Drawer,
  Modal,
  Popconfirm,
  Progress,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/columnsTableCategory";
// import DrawerDetailPosts from "./components/DrawerPosts";
// import ModalPostsForm from "./components/ModalPostsForm";
// import PostsForm from "./components/PostsForm";
import {
  getDataApi,
  getErrorApi,
  isApiSuccess,
  requestPayloadCategory,
} from "#/utils";
import Link from "antd/es/typography/Link";
import SwitchStatePosts from "#/components/SwitchStatePosts";
import {
  deleteCategoryTableData,
  fetchCategoryTableData,
  getCategoryById,
} from "#/redux/slices/category/action";
import CategoryForm from "./components/CategoryForm";
import {
  clearStateCategory,
  hideModalCategoryDetail,
  hideModalCategoryForm,
  setSelectedRows,
  showModalCategoryForm,
} from "#/redux/slices/category";
import DetailCategory from "./components/DetailCategory";
import DetailRecruitmentTemplate from "#/components/detailRecruitmentTemplate/DetailRecruitmentTemplate";

const Categories: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const dispatch = useAppDispatch();
  const {
    categoryListData,
    drawerCategoryDetailOpen,
    modalCategoryFormOpen,
    currentCategory,
    currentCategoryDetail,
    selectedRows,
  } = useAppSelector((state) => state.category);
  const [showTableAlert, setShowTableAlert] = useState(true);

  console.log("postsListData:: ", categoryListData);

  useEffect(() => {
    return () => {
      dispatch(clearStateCategory());
    };
  }, []);

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
      <ProTable<Category>
        columns={columns()}
        actionRef={actionRef}
        rowSelection={{
          onSelect: (record, selected, selectedRows) => {
            dispatch(setSelectedRows(selectedRows));
            setShowTableAlert(true);
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
            const res = await dispatch(deleteCategoryTableData(data));
            console.log("res:: ", res);
            if (res?.meta?.requestStatus === "fulfilled") {
              setShowTableAlert(false);
              console.log("Xóa ok");
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
                  key={1}
                  title="Bạn chắc chắn muốn xóa không?"
                  onConfirm={hanleDelete}
                >
                  <Button
                    key={2}
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
        headerTitle="Quản lý danh mục"
        size="small"
        tableLayout="auto"
        dataSource={categoryListData?.items}
        request={async (params, sort, filter) =>
          await dispatch(
            fetchCategoryTableData(
              requestPayloadCategory({ params, sort, filter })
            )
          )
        }
        rowKey="id"
        search={false}
        cardProps={{
          bodyStyle: { padding: 4 },
        }}
        options={{
          // search: {
          //   placeholder: "Tìm kiếm bài viết...",
          // },
          search: false,
          setting: false,
          density: false,
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          total: categoryListData?.total,
          showTotal: (total, range) => {
            return `${range[0]}-${range[1]} trên ${total} danh mục`;
          },
        }}
        scroll={{ x: "max-content", y: "calc(100vh-245px)" }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            onClick={() => dispatch(showModalCategoryForm())}
            icon={<PlusOutlined />}
            type="primary"
          >
            Tạo mới
          </Button>,
        ]}
      />

      <Modal
        open={modalCategoryFormOpen}
        onCancel={() => dispatch(hideModalCategoryForm())}
        footer={false}
        destroyOnClose
        title={
          currentCategory?.id
            ? `Cập nhật danh mục: ${currentCategory?.title}`
            : "Thêm mới danh mục"
        }
        width={"40%"}
      >
        <CategoryForm />
      </Modal>

      <Drawer
        width={"40%"}
        open={drawerCategoryDetailOpen}
        destroyOnClose
        headerStyle={{
          padding: "6px 10px",
        }}
        bodyStyle={{
          padding: 10,
        }}
        onClose={() => {
          dispatch(hideModalCategoryDetail());
        }}
        title={`Chi tiết danh mục: ${currentCategoryDetail?.title}`}
        extra={[
          <Space>
            <Tooltip title="Thay đổi thông tin">
              <Button
                icon={<EditOutlined />}
                onClick={async () => {
                  await dispatch(
                    getCategoryById(Number(currentCategoryDetail?.id))
                  );
                  dispatch(showModalCategoryForm());
                }}
              ></Button>
            </Tooltip>
          </Space>,
        ]}
      >
        {/* <DetailRecruitmentTemplate /> */}
        <DetailCategory />
      </Drawer>
    </PageContainer>
  );
};

export default Categories;
