import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import {
  hideModalSocialForm,
  showModalSocialForm,
} from "#/redux/slices/social";
import { fetchSocialTableData } from "#/redux/slices/social/action";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ActionType,
  FooterToolbar,
  PageContainer,
} from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Drawer, Space, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/columnsTableRecruitmentManager";
import {
  getDetailRecruitment,
  getListRecruitment,
} from "#/redux/slices/recruitment/action";
import RecruitmentForm from "../recruitment/components/RecruitmentForm";
import RecruitmentModalForm from "./components/RecruitmentModalForm";
import {
  hideDrawerRecruitmentForm,
  hideDrawerRecruitmentsDetail,
  hideModalRecruitmentsForm,
  setDataTitleDrawerRecruitment,
  showDrawerRecruitmentForms,
  showModalRecruitmentsForm,
} from "#/redux/slices/recruitment";
import { requestPayloadRecruitmentManager } from "#/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Fa from "@fortawesome/free-solid-svg-icons";
import { STATE_LIST_RECRUITMENT } from "#/config/constant";
import RecruitmentTemplateForm from "#/components/RecruitmentTemplateForm";
import RecruitmentTemplateForm1 from "#/components/RecruitmentTemplateForm1";
import { setCurrentRecruitmentTemplate } from "#/redux/slices/recruitmentTemplate";
import DetailRecruitmentTemplates from "#/components/detailRecruitmentTemplate/DetailRecruitmentTemplate";

export default () => {
  const actionRef = useRef<ActionType>();
  const dispatch = useAppDispatch();
  const {
    loadingTable,
    recruitmentsListData,
    showDrawerRecruitmentForm,
    modalRecruitmentFormOpen,
    currentRecruitment,
    checkMapData,
    checkCreateRecruitment,
    dataTitleDrawerRecruitment,
    drawerRecruitmentDetail,
    currentRecruitmentDetail,
  } = useAppSelector((state) => state.recruitments);

  const { currentRecruitmentTemplate } = useAppSelector(
    (state) => state.recruitmentsTemplate
  );

  const [activeTab, setActiveTab] = useState<string>("ACTIVE");
  const stateList = STATE_LIST_RECRUITMENT;

  console.log("checkMapData:: ", checkMapData);

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
        loading={loadingTable}
        actionRef={actionRef}
        cardBordered
        scroll={{ x: "max-content", y: "max-content" }}
        bordered
        debounceTime={800}
        size="small"
        tableLayout="auto"
        dataSource={recruitmentsListData?.items}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} bài đăng`,
        }}
        request={async (params = {}, sort, filter) => {
          dispatch(
            getListRecruitment(
              requestPayloadRecruitmentManager({
                params,
                sort,
                filter,
                activeTab,
              })
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
        cardProps={{
          bodyStyle: {
            paddingBottom: 4,
            paddingTop: 0,
            paddingInline: 12,
          },
        }}
        options={{
          search: {
            placeholder: "Nhập thông tin tìm kiếm...",
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
            // items: [
            //   {
            //     label: (
            //       <>
            //         <FontAwesomeIcon icon={faEye}/> Hiển thị
            //       </>
            //     ),
            //     key: "ACTIVE",
            //   },
            //   // {
            //   //   label: <><FontAwesomeIcon icon={faHourglass} /> Chờ duyệt</>,
            //   //   key: 'pending',
            //   // },
            //   {
            //     label: (
            //       <>
            //         <FontAwesomeIcon icon={faEyeSlash} />
            //         {/* <FontAwesomeIcon icon="fa-brands fa-twitter" /> */}
            //         Không hiển thị
            //       </>
            //     ),
            //     key: "DRAFT",
            //   },
            // ],
            items: stateList.map((value) => {
              return {
                label: (
                  <>
                    <FontAwesomeIcon
                      // icon={Fa[`${value?.icon}`]}

                      icon={Fa[value?.icon as keyof typeof Fa] as any}
                      style={{ marginRight: 4 }}
                    />
                    {value?.text}
                  </>
                ),
                key: value?.key,
              };
            }),
          },
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
            onClick={() => dispatch(showDrawerRecruitmentForms())}
            icon={<PlusOutlined />}
            type="primary"
          >
            Tạo mới
          </Button>,
        ]}
      />
      <Drawer
        open={showDrawerRecruitmentForm}
        width={"90%"}
        onClose={() => {
          dispatch(hideDrawerRecruitmentForm());
          dispatch(setCurrentRecruitmentTemplate(undefined));
        }}
        title={
          dataTitleDrawerRecruitment?.id
            ? `Cập nhật bài tuyển dụng: ${dataTitleDrawerRecruitment?.jobTitle}`
            : "Thêm mới bài đăng tuyển dụng"
        }
        bodyStyle={{ paddingInline: 6, paddingBlock: 6 }}
        headerStyle={{ padding: "8px 12px" }}
        extra={[
          <Button
            type="primary"
            style={{ backgroundColor: "#009933" }}
            onClick={() => dispatch(showModalRecruitmentsForm())}
          >
            Chọn từ việc làm mẫu
          </Button>,
        ]}
        destroyOnClose
      >
        {!checkMapData ? (
          <RecruitmentTemplateForm
            name="RecruitmentManager"
            dataForm={currentRecruitment}
            mapData={currentRecruitmentTemplate}
            onCancel={() => {
              dispatch(hideDrawerRecruitmentForm());
              dispatch(setCurrentRecruitmentTemplate(undefined));
            }}
            checkMapData={checkMapData}
            checkCreateRecruitment={checkCreateRecruitment}
            id={dataTitleDrawerRecruitment?.id}
          />
        ) : (
          <RecruitmentTemplateForm1
            name="RecruitmentManager"
            dataForm={currentRecruitment}
            mapData={currentRecruitmentTemplate}
            onCancel={() => {
              dispatch(hideDrawerRecruitmentForm());
              dispatch(setCurrentRecruitmentTemplate(undefined));
            }}
            checkMapData={checkMapData}
            checkCreateRecruitment={checkCreateRecruitment}
            id={dataTitleDrawerRecruitment?.id}
          />
        )}
      </Drawer>

      <Drawer
        width={"90%"}
        open={drawerRecruitmentDetail}
        onClose={() => dispatch(hideDrawerRecruitmentsDetail())}
        title={currentRecruitmentDetail?.jobTitle}
        bodyStyle={{ padding: 4, backgroundColor: "#F4F5F5" }}
        headerStyle={{ paddingInline: 8, paddingBlock: 4 }}
        extra={[
          <Space>
            <Tooltip title="Thay đổi thông tin">
              <Button
                icon={<EditOutlined />}
                onClick={async () => {
                  await dispatch(
                    getDetailRecruitment(Number(currentRecruitmentDetail?.id))
                  );
                  dispatch(showDrawerRecruitmentForms());
                  dispatch(
                    setDataTitleDrawerRecruitment(currentRecruitmentDetail)
                  );
                  // dispatch(setCurrentIdPosts(Number(currentPostDetail?.id)));
                }}
                key={2}
              ></Button>
            </Tooltip>
          </Space>,
        ]}
      >
        <DetailRecruitmentTemplates data={currentRecruitmentDetail} />

        {/* <DetailRecruitmentTemplate /> */}
      </Drawer>

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
