import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import {
  hideModalSocialForm,
  showModalSocialForm,
} from "#/redux/slices/social";
import { fetchSocialTableData } from "#/redux/slices/social/action";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, PageContainer } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Drawer, Modal, Space, Tooltip } from "antd";
import { useRef } from "react";
import { columns } from "./components/columnsTableRecruitmentTemplate";
import {
  fetchRecruitmentsTemplateTableData,
  getDetailRecruitmentTemplate,
} from "#/redux/slices/recruitmentTemplate/action";
import DetailRecruitmentTemplate from "./components/DetailRecruitmentTemplate";
import {
  hideDrawerRecruitmentTemplateDetail,
  hideModalRecruitmentsTemplateForm,
  setCurrentRecruitmentTemplate,
  showModalRecruitmentsTemplateForm,
} from "#/redux/slices/recruitmentTemplate";

import {
  showModalRecruitmentsForm,
  hideModalRecruitmentsForm,
} from "#/redux/slices/recruitment";
import RecruitmentForm from "../recruitment/components/RecruitmentForm";
import RecruitmentTemplateForm from "#/components/RecruitmentTemplateForm";
import { requestPayloadRecruitmentTemplate } from "#/utils";
import DetailRecruitmentTemplates from "#/components/detailRecruitmentTemplate/DetailRecruitmentTemplate";
import RecruitmentModalForm from "../recruitmentManager/components/RecruitmentModalForm";
import RecruitmentTemplateForm1 from "#/components/RecruitmentTemplateForm1";

const RecruitmentTemplate = () => {
  const actionRef = useRef<ActionType>();
  const dispatch = useAppDispatch();
  const {
    recruitmentsListData,
    loadingTable,
    drawerRecruitmentTemplateDetail,
    currentRecruitmentTemplateDetail,
    modalRecruitmentsTemplateFormOpen,
    currentRecruitmentTemplate,
    checkCreateRecruitmentTemplate,
  } = useAppSelector((state) => state.recruitmentsTemplate);

  const { modalRecruitmentFormOpen, checkMapData } = useAppSelector(
    (state) => state.recruitments
  );

  console.log("=========================================");
  console.log("modalRecruitmentFormOpen:: ", modalRecruitmentFormOpen);

  return (
    <PageContainer
      childrenContentStyle={{
        padding: 12,
      }}
      // breadcrumbRender={false}
      title={false}
      footer={[]}
    >
      <ProTable<any>
        columns={columns()}
        actionRef={actionRef}
        cardBordered
        loading={loadingTable}
        scroll={{ x: "max-content", y: "max-content" }}
        bordered
        debounceTime={800}
        headerTitle="Danh sách việc làm"
        size="small"
        tableLayout="auto"
        dataSource={recruitmentsListData?.data || []}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} việc làm`,
        }}
        request={async (params = {}, sort, filter) => {
          dispatch(
            fetchRecruitmentsTemplateTableData(
              requestPayloadRecruitmentTemplate({ params, sort, filter })
            )
          );
          return [];
        }}
        rowKey="id"
        // search={{
        //   filterType: "light",
        // }}
        search={{
          labelWidth: "auto",
          style: { padding: 12 },
          span: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6 },
        }}
        // search={false}
        cardProps={{
          bodyStyle: {
            paddingBottom: 4,
            paddingTop: 0,
            paddingInline: 12,
          },
        }}
        options={{
          search: {
            placeholder: "Nhập từ khóa để tìm kiếm...",
            style: {
              width: 250,
            },
          },
          setting: false,
          density: false,
        }}
        form={{
          syncToUrl: (values, type) => {
            if (type === "get") {
              return {
                ...values,
                categorys: values.categorys,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            onClick={async () => {
              dispatch(showModalRecruitmentsTemplateForm());
            }}
            icon={<PlusOutlined />}
            type="primary"
          >
            Tạo mới
          </Button>,
        ]}
      />
      <Drawer
        width={"90%"}
        open={drawerRecruitmentTemplateDetail}
        onClose={() => dispatch(hideDrawerRecruitmentTemplateDetail())}
        title={currentRecruitmentTemplateDetail?.jobTitle}
        bodyStyle={{ padding: 4, backgroundColor: "#F4F5F5" }}
        headerStyle={{ paddingInline: 8, paddingBlock: 4 }}
        extra={[
          <Space>
            <Tooltip title="Thay đổi thông tin">
              <Button
                icon={<EditOutlined />}
                onClick={async () => {
                  await dispatch(
                    getDetailRecruitmentTemplate(
                      Number(currentRecruitmentTemplateDetail?.id)
                    )
                  );
                  dispatch(showModalRecruitmentsTemplateForm());
                  // dispatch(setCurrentIdPosts(Number(currentPostDetail?.id)));
                }}
                key={2}
              ></Button>
            </Tooltip>
          </Space>,
        ]}
      >
        <DetailRecruitmentTemplates data={currentRecruitmentTemplateDetail} />

        {/* <DetailRecruitmentTemplate /> */}
      </Drawer>
      <Modal
        open={modalRecruitmentsTemplateFormOpen}
        title={
          currentRecruitmentTemplate?.id
            ? `Cập nhật việc làm: ${currentRecruitmentTemplate?.jobTitle}`
            : "Tạo mới việc làm"
        }
        onCancel={() => dispatch(hideModalRecruitmentsTemplateForm())}
        width={"80%"}
        style={{ top: 30 }}
        footer={false}
        bodyStyle={{ padding: 0 }}
        destroyOnClose
      >
        <div
          style={{
            marginTop: "-39px",
            marginBottom: "10px",
            marginRight: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="primary"
            style={{ backgroundColor: "#009933" }}
            onClick={() => {
              console.log("123");
              dispatch(showModalRecruitmentsForm());
            }}
          >
            Chọn từ việc làm mẫu
          </Button>
        </div>

        {/* <RecruitmentTemplateForm
          dataForm={currentRecruitmentTemplate}
          onCancel={() => dispatch(hideModalRecruitmentsForm())}
          name="RecruitmentTemplate"
        /> */}

        {!checkMapData ? (
          <RecruitmentTemplateForm
            name="RecruitmentTemplate"
            dataForm={currentRecruitmentTemplate}
            mapData={currentRecruitmentTemplate}
            onCancel={() => {
              dispatch(hideModalRecruitmentsForm());
              dispatch(setCurrentRecruitmentTemplate(undefined));
            }}
            checkMapData={checkMapData}
            checkCreateRecruitment={checkCreateRecruitmentTemplate}
            // id={dataTitleDrawerRecruitment?.id}
          />
        ) : (
          <RecruitmentTemplateForm1
            name="RecruitmentTemplate"
            dataForm={currentRecruitmentTemplate}
            mapData={currentRecruitmentTemplate}
            onCancel={() => {
              dispatch(hideModalRecruitmentsForm());
              dispatch(setCurrentRecruitmentTemplate(undefined));
            }}
            checkMapData={checkMapData}
            checkCreateRecruitment={checkCreateRecruitmentTemplate}
            // id={dataTitleDrawerRecruitment?.id}
          />
        )}
      </Modal>

      <RecruitmentModalForm
        modalProps={{
          open: modalRecruitmentFormOpen,
          destroyOnClose: true,
        }}
        onCancel={() => {
          dispatch(hideModalRecruitmentsForm());
        }}
      ></RecruitmentModalForm>
    </PageContainer>
  );
};

export default RecruitmentTemplate;
