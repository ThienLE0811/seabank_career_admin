import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { RecruitmentTemplate } from "#/lib/openapi";
import { fetchRecruitmentsTemplateTableData } from "#/redux/slices/recruitmentTemplate/action";
import { PlusOutlined } from "@ant-design/icons";
import {
  FooterToolbar,
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProList,
  ProTable,
} from "@ant-design/pro-components";
import { Button, Card, Col, Divider, Modal, Popconfirm, Row } from "antd";
import { useDispatch } from "react-redux";
import { columns } from "./columnsTableRecuirmentTemplate";
import { useRef } from "react";
import { requestPayloadRecruitmentTemplate } from "#/utils";

interface ModalPostsFormProps {
  modalProps?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const RecruitmentModalForm: React.FC<ModalPostsFormProps> = ({
  modalProps,
  onCancel,
}) => {
  //   const title = "Danh sách việc làm mẫu";
  const dispatch = useAppDispatch();
  const actionRef = useRef();
  const { recruitmentsListData, loadingTable } = useAppSelector(
    (state) => state.recruitmentsTemplate
  );

  return (
    <Modal
      width={"80%"}
      title="Danh sách việc làm mẫu"
      footer={false}
      {...modalProps}
      onCancel={onCancel}
      destroyOnClose
    >
      <ProTable<any>
        columns={columns}
        actionRef={actionRef}
        loading={loadingTable}
        cardBordered
        scroll={{ x: "max-content", y: "max-content" }}
        bordered
        debounceTime={800}
        headerTitle={false}
        // headerTitle="Danh sách việc làm"
        size="small"
        tableLayout="auto"
        dataSource={recruitmentsListData.data}
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
        // search={{
        //   labelWidth: 120,
        //   style: { padding: 12 },
        //   span: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6 },
        // }}
        search={false}
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
        // dateFormatter="string"
        // toolBarRender={() => [
        //   <Button
        //     key="button"
        //     // onClick={() => dispatch(())}
        //     icon={<PlusOutlined />}
        //     type="primary"
        //   >
        //     Tạo mới
        //   </Button>,
        // ]}
      />
    </Modal>
  );
};

export default RecruitmentModalForm;
