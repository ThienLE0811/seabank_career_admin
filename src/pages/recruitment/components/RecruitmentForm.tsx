import {
  showModalRecruitmentsDetail,
  showModalRecruitmentsForm,
} from "#/redux/slices/recruitment";
import {
  FooterToolbar,
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Button, Card, Col, Divider, Row } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

type RecruitmentFormProps = {
  onCancel?: () => void;
};

export default ({ onCancel }: RecruitmentFormProps) => {
  const dispatch = useDispatch();

  const handleFinish = async (values: any) => {
    console.log("submit");
  };

  return (
    <Card>
      <ProForm
        submitter={{
          // render: (_, dom) => (
          //   <div
          //     style={{
          //       display: "flex",
          //       justifyContent: "flex-end",
          //       marginTop: "12px",
          //       gap: "8px",
          //     }}
          //   >
          //     <Button
          //       danger
          //       type="dashed"
          //       onClick={() => dispatch(setShowDrawerRecruitmentForm(false))}
          //     >
          //       Thoát
          //     </Button>
          //     {dom}
          //     <Button danger type="dashed">
          //       Lưu nháp
          //     </Button>
          //   </div>
          // ),
          resetButtonProps: false,
          searchConfig: {
            submitText: "Lưu và tiếp tục",
          },
          render: (_, dom) => {
            return (
              <FooterToolbar portalDom={false} style={{ width: "100%" }}>
                <Row justify="end" gutter={[12, 12]}>
                  <Col>
                    <Button onClick={onCancel}>Hủy</Button>
                  </Col>
                  <Col>{dom}</Col>
                </Row>
              </FooterToolbar>
            );
          },
        }}
        onFinish={handleFinish}
      >
        {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ fontWeight: 500 }}>Đăng tin tuyển dụng</h2>

          <Button
            type="primary"
            style={{ backgroundColor: "#009933" }}
            onClick={() => dispatch(showModalRecruitmentsForm())}
          >
            Chọn từ việc làm mẫu
          </Button>
        </div>

        <Divider></Divider> */}
        <Row gutter={16}>
          <Col span={6}>
            <ProFormText
              name="name"
              label="Người tạo"
              tooltip=""
              placeholder="Nhập tên người tạo"
            />
          </Col>
          <Col span={6}>
            <ProFormSelect
              options={[
                {
                  value: "chapter1",
                  label: "1",
                },
                {
                  value: "chapter2",
                  label: "2",
                },
                {
                  value: "chapter3",
                  label: "3",
                },
              ]}
              name="chapter"
              label="Mã công việc"
              placeholder="Vui lòng chọn"
            />
          </Col>
          <Col span={6}>
            <ProFormSelect
              options={[
                {
                  value: "chapter1",
                  label: "1",
                },
                {
                  value: "chapter2",
                  label: "2",
                },
                {
                  value: "chapter3",
                  label: "3",
                },
              ]}
              name="chapter"
              label="Cấp bậc"
              placeholder="Vui lòng chọn"
            />
          </Col>
          <Col span={6}>
            <ProFormSelect
              options={[
                {
                  value: "chapter1",
                  label: "1",
                },
                {
                  value: "chapter2",
                  label: "2",
                },
                {
                  value: "chapter3",
                  label: "3",
                },
              ]}
              name="chapter"
              label="Hình thức"
              placeholder="Vui lòng chọn"
            />
          </Col>

          <Col span={6}>
            <ProFormDigit
              name="price"
              label="Mức lương"
              placeholder="Nhập thông tin"
            />
          </Col>
          <Col span={6}>
            <ProFormSelect
              options={[
                {
                  value: "chapter1",
                  label: "1",
                },
                {
                  value: "chapter2",
                  label: "2",
                },
                {
                  value: "chapter3",
                  label: "3",
                },
              ]}
              name="chapter"
              label="Phòng ban"
              placeholder="Vui lòng chọn"
            />
          </Col>
          <Col span={6}>
            <ProFormSelect
              options={[
                {
                  value: "chapter1",
                  label: "1",
                },
                {
                  value: "chapter2",
                  label: "2",
                },
                {
                  value: "chapter3",
                  label: "3",
                },
              ]}
              name="chapter"
              label="Ngành nghề"
              placeholder="Vui lòng chọn"
            />
          </Col>
          <Col span={6}>
            <ProFormSelect
              options={[
                {
                  value: "chapter1",
                  label: "1",
                },
                {
                  value: "chapter2",
                  label: "2",
                },
                {
                  value: "chapter3",
                  label: "3",
                },
              ]}
              name="chapter"
              label="Nơi làm việc"
              placeholder="Vui lòng chọn"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <ProFormTextArea label="Mô tả công việc" name="remark" />
          </Col>
          <Col span={24}>
            <ProFormTextArea
              label="Yêu cầu công việc công việc"
              name="remark"
            />
          </Col>
          <Col span={6}>
            <ProFormDigit label="Số lượng tuyển" name="remark" />
          </Col>
          <Col span={6}>
            <ProFormSelect
              label="Lý do tuyển"
              name="remark"
              options={[
                {
                  value: "chapter1",
                  label: "1",
                },
                {
                  value: "chapter2",
                  label: "2",
                },
                {
                  value: "chapter3",
                  label: "3",
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormDateRangePicker
              name={["contract", "createTime"]}
              label="Thời hạn cần nhân sự"
            />
          </Col>
          <Col span={24}>
            <ProFormTextArea label="Ghi chú" name="remark" />
          </Col>
        </Row>
      </ProForm>
    </Card>
  );
};
