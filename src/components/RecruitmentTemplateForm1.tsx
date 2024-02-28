import { RecruitmentTemplate } from "#/lib/openapi";
import {
  hideDrawerRecruitmentForm,
  inActiveCheckMapData,
  showModalRecruitmentsDetail,
  showModalRecruitmentsForm,
} from "#/redux/slices/recruitment";
import {
  FooterToolbar,
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import {
  Button,
  Card,
  Col,
  Collapse,
  CollapseProps,
  Divider,
  Row,
  Space,
  Checkbox,
  Radio,
  RadioChangeEvent,
  notification,
  Spin,
} from "antd";
import {
  CSSProperties,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import "#/index.css";
import Editor from "./Editor";
import {
  createRecruitmentTemplate,
  getDetailRecruitmentTemplate,
  updateRecruitmentTemplate,
} from "#/redux/slices/recruitmentTemplate/action";
import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { CarOutlined, LineChartOutlined } from "@ant-design/icons";
import {
  fieldPropsDataDisableStart,
  fieldPropsFilter,
  getMasterDataByTypeUtil,
} from "#/utils";
import moment from "moment";
import * as Fa from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  createRecruitment,
  getDetailRecruitment,
  updateRecruitment,
} from "#/redux/slices/recruitment/action";
import { hideModalRecruitmentsTemplateForm } from "#/redux/slices/recruitmentTemplate";
import CheckBoxForm from "./CheckBoxForm";

type RecruitmentFormProps = {
  dataForm?: Recruitment | RecruitmentTemplate;
  onCancel?: () => void;
  name?: string;
  checkMapData?: boolean;
  mapData?: RecruitmentTemplate;
  checkCreateRecruitment?: boolean;
  id?: number;
};

type MasterDataProps = {
  id?: string;
  name?: string;
  icon?: string;
  defaultChecked?: boolean;
};

const RecruitmentTemplateForm = ({
  onCancel,
  dataForm,
  name,
  checkMapData,
  mapData,
  checkCreateRecruitment,
  id,
}: RecruitmentFormProps) => {
  const dispatch = useAppDispatch();
  // const [formRef] = ProForm.useForm();
  const formRef = useRef<ProFormInstance>();
  const [formData, setFormData] = useState<
    Recruitment | RecruitmentTemplate | any
  >([]);

  const [description, setDecription] = useState<string>("");
  const [
    experienceRequirementDescriptions,
    setExperienceRequirementDescriptions,
  ] = useState<string>("");
  const [employmentTypes, setEmploymentTypes] = useState<Record<string, any>>(
    []
  );
  const [skillsValue, setSkillsValue] = useState<string>("");
  const [gender, setGender] = useState<Record<string, any>>([]);
  const [jobBeneFits, setJobBeneFits] = useState<Record<string, any>>([]);
  const [checkboxJobBeneFits, setCheckboxJobBeneFits] = useState<string[]>([]);
  const [changeChecked, setChangeChecked] = useState<boolean>(false);
  const [changeCheckedAll, setChangeCheckedAll] = useState<string>("normal");
  const [viewCheck, setViewCheck] = useState<string>("normal");
  const [removeChecked, setRemoveChecked] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const defaultValue = jobBeneFits.map((value: MasterDataProps) => value?.id);
  const defaultVal = dataForm ? dataForm?.jobBenefits : defaultValue;
  // const [defaultJobBeneFits, setDefaultJobBeneFits] = useState<
  //   Record<string, any>
  // >([]);s

  // console.log("data:: ", dataForm);
  const [employmentTypesRadio, setEmploymentTypesRadio] = useState("1");
  const [genderRadio, setGenderRadio] = useState("1");

  const handleFinish = async (values: any) => {
    console.log("values: ", values);
    const timestamp = moment(values?.validThrough, "DD/MM/YYYY").valueOf();
    const transValue = {
      ...values,
      jobBenefits: values?.jobBenefits ? values?.jobBenefits : defaultVal,
      validThrough: timestamp,
      // description: "test",
      // skills: "s",
      // experienceRequirementDescriptions: "test",
      employmentTypes: Array.isArray(values?.employmentTypes)
        ? values?.employmentTypes
        : [values?.employmentTypes],
    };

    switch (name) {
      case "RecruitmentTemplate":
        const res = dataForm?.id
          ? await dispatch(updateRecruitmentTemplate(transValue))
          : await dispatch(createRecruitmentTemplate(transValue));
        console.log("res: ", res);
        if (res?.meta.requestStatus === "fulfilled") {
          dispatch(hideModalRecruitmentsTemplateForm());
        }
        break;

      case "RecruitmentManager":
        const response =
          id && !checkCreateRecruitment
            ? await dispatch(updateRecruitment(transValue))
            : await dispatch(createRecruitment(transValue));
        console.log("res2: ", response);
        if (response?.meta.requestStatus === "fulfilled") {
          dispatch(hideDrawerRecruitmentForm());
        }
        break;

      default:
        console.log("name:: ", name);
    }

    console.log("submit", transValue);
  };

  console.log("data change:: ", mapData);

  useEffect(() => {
    const getMasterDataDepartments = async () =>
      await getMasterDataByTypeUtil("mdm_employment_type", false, true).then(
        (e) => setEmploymentTypes(e)
      );

    const getMasterDataGender = async () =>
      await getMasterDataByTypeUtil("mdm_gender", false, true).then((e) =>
        setGender(e)
      );

    const getMasterJobBeneFits = async () =>
      await getMasterDataByTypeUtil("mdm_job_benefits", false, true).then(
        (e) => {
          const defaultJobBeneFits = mapData
            ? mapData?.jobBenefits
            : dataForm?.jobBenefits;
          console.log("defaultJobBeneFits:", defaultJobBeneFits);
          const transformed = e.map((value: any) => ({
            ...value,
            defaultChecked: defaultJobBeneFits?.includes(value.id),
          }));
          console.log("transformed:", transformed);
          setJobBeneFits(transformed);
        }
      );

    getMasterDataDepartments();
    getMasterDataGender();
    getMasterJobBeneFits();
  }, [mapData]);

  console.log("job:: ", jobBeneFits);
  const handleChangeJobBenes = (e: CheckboxChangeEvent) => {
    const transDefaultVal =
      viewCheck === "normal"
        ? defaultVal
        : viewCheck === "checkAll"
        ? defaultValue
        : [];

    const concatArr =
      checkboxJobBeneFits.length < 1 && !removeChecked
        ? [...new Set([...transDefaultVal, ...checkboxJobBeneFits])]
        : checkboxJobBeneFits;
    if (e.target.checked) {
      const check = checkboxJobBeneFits.includes(e.target.value);
      if (!check) {
        // const concatArr = [...new Set([...value, ...checkboxJobBeneFits])];
        concatArr?.push(e.target.value);

        setCheckboxJobBeneFits(concatArr);
        // setCheckboxJobBeneFits(checkboxJobBeneFits);
      }
    } else {
      const check = concatArr.filter((value) => value !== e.target.value);

      setCheckboxJobBeneFits(check);
      setRemoveChecked(true);
    }
    setChangeChecked(true);
  };

  const handleChangeCheckAll = (e: CheckboxChangeEvent | any) => {
    console.log("value:: ", e?.target?.checked);
    e.stopPropagation();
    if (e?.target?.checked) {
      setChangeCheckedAll("checkAll");
      setViewCheck("checkAll");
    } else {
      setChangeCheckedAll("none");
      setViewCheck("none");
    }
  };

  console.log("============re-render=============");
  console.log("viewCheck:: ", viewCheck);
  console.log("changeCheckedAll:: ", changeCheckedAll);

  return (
    // <Card>
    <ProForm
      request={async () => {
        if (!dataForm?.id && !mapData?.id) {
          console.log("không call");
          return {};
        }
        try {
          const res = checkMapData
            ? await dispatch(getDetailRecruitmentTemplate(Number(mapData?.id)))
            : name === "RecruitmentTemplate"
            ? await dispatch(getDetailRecruitmentTemplate(Number(dataForm?.id)))
            : // : formData.length !== 0 && !mapData?.id
            // ? await dispatch(getDetailRecruitmentTemplate(Number(mapData?.id)))
            dataForm?.id
            ? await dispatch(getDetailRecruitment(Number(dataForm?.id)))
            : undefined;
          console.log("Res:: ", res);
          const data: any = res?.payload;
          if (res?.meta?.requestStatus === "fulfilled") {
            setDecription(data?.description);
            setExperienceRequirementDescriptions(
              data?.experienceRequirementDescriptions
            );
            setSkillsValue(data?.skills);
            // setDefaultJobBeneFits(data?.jobBenefits);
            setFormData(data);
            // dispatch(inActiveCheckMapData());
            // console.log("data:: ", data);
            return data;
          } else {
            return {};
          }
        } catch (error) {}
      }}
      formRef={formRef}
      submitter={{
        resetButtonProps: false,
        searchConfig: {
          submitText: "Lưu",
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
      // onReset={}
      // onInit={(values, form) => console.log("init values:: ", form)}
      // initialValues={dataForm}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Collapse
          //   collapsible="header"
          size="small"
          defaultActiveKey={["1"]}
          style={{ width: "100%" }}
          items={[
            {
              key: "1",
              label: "Thông tin tuyển dụng",
              headerClass: "header-collapsible",
              children: (
                <Row gutter={16}>
                  {name === "RecruitmentTemplate" ? (
                    <ProFormText name={"id"} hidden />
                  ) : id && !checkCreateRecruitment ? (
                    <ProFormText
                      name={"id"}
                      hidden
                      transform={() => {
                        return {
                          id: id,
                        };
                      }}
                    />
                  ) : undefined}
                  <Col span={6}>
                    <ProFormText
                      name="code"
                      label="Mã công việc"
                      tooltip=""
                      placeholder="Nhập mã công việc"
                      required
                      rules={[
                        {
                          message: "Vui lòng không để trống",
                          required: true,
                        },
                      ]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      name="jobTitle"
                      label="Chức danh"
                      placeholder="Nhập chức danh/Vị trí tuyển dụng"
                      required
                      rules={[
                        {
                          message: "Vui lòng không để trống",
                          required: true,
                        },
                      ]}
                    />
                  </Col>

                  <Col span={6}>
                    <ProFormSelect
                      name="occupationalCategory"
                      label="Cấp bậc"
                      placeholder="Vui lòng chọn"
                      required
                      request={async () =>
                        await getMasterDataByTypeUtil(
                          "mdm_occupational_category",
                          true,
                          true
                        )
                      }
                    />
                  </Col>

                  <Col span={6}>
                    <ProFormSelect
                      name="industry"
                      label="Ngành nghề"
                      placeholder="Vui lòng chọn"
                      required
                      mode="multiple"
                      request={async () =>
                        await getMasterDataByTypeUtil(
                          "mdm_industry",
                          true,
                          true
                        )
                      }
                    />
                  </Col>

                  <Col span={6}>
                    <ProFormSelect
                      name="departments"
                      label="Phòng ban"
                      placeholder="Vui lòng chọn"
                      mode="multiple"
                      request={async () =>
                        await getMasterDataByTypeUtil(
                          "mdm_departments",
                          true,
                          true
                        )
                      }
                    />
                  </Col>

                  <Col span={6}>
                    <ProFormSelect
                      name="jobLocations"
                      label="Nơi làm việc"
                      mode="multiple"
                      placeholder="Vui lòng chọn"
                      request={async () =>
                        await getMasterDataByTypeUtil(
                          "mdm_job_locations",
                          true,
                          true
                        )
                      }
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormText name="jobAddress" label="Địa chỉ làm việc" />
                  </Col>

                  <Col span={6}>
                    <ProFormSelect
                      name="salaryCurrency"
                      label="Đơn vị tiền tệ"
                      placeholder="Vui lòng chọn"
                      request={async () =>
                        await getMasterDataByTypeUtil(
                          "mdm_currency",
                          true,
                          true
                        )
                      }
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormSelect
                      name="salaryType"
                      label="Loại lương"
                      placeholder="Vui lòng chọn"
                      request={async () =>
                        await getMasterDataByTypeUtil(
                          "mdm_salary_type",
                          true,
                          true
                        )
                      }
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormDigit
                      name="salaryMinValue"
                      label="Mức lương tối thiểu"
                      placeholder="Nhập dữ liệu"
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormDigit
                      name="salaryMaxValue"
                      label="Mức lương tối đa"
                      placeholder="Nhập dữ liệu"
                      onMetaChange={(meta) => console.log("meta:: ", meta)}
                    />
                  </Col>

                  <Col span={24}>
                    <ProForm.Item
                      name="description"
                      label="Mô tả công việc"
                      required
                      // rules={[
                      //   { required: true, message: "Vui lòng không bỏ trống" },
                      // ]}
                    >
                      <>
                        <Editor
                          initiateData={description}
                          onChange={(event, editor) => {
                            formRef?.current?.setFieldsValue({
                              description: editor.getData(),
                            });
                          }}
                        />
                      </>
                    </ProForm.Item>
                  </Col>
                  <Col span={24}>
                    <ProForm.Item
                      name="experienceRequirementDescriptions"
                      label="Yêu cầu công việc"
                      required
                      // rules={[
                      //   { required: true, message: "Vui lòng không bỏ trống" },
                      // ]}
                    >
                      <>
                        <Editor
                          initiateData={experienceRequirementDescriptions}
                          onChange={(event, editor) => {
                            formRef?.current?.setFieldsValue({
                              experienceRequirementDescriptions:
                                editor.getData(),
                            });
                          }}
                        />
                      </>
                    </ProForm.Item>
                  </Col>
                  <Col span={24}>
                    <ProFormTextArea label="Ghi chú" name={"note"} />
                  </Col>
                  <Col span={24}>
                    <ProFormTextArea
                      label="Lý do đăng tuyển"
                      name={"reasonJobPostings"}
                      initialValue={dataForm?.reasonJobPostings}
                    />
                  </Col>
                  <Col span={12}>
                    <ProForm.Item
                      label={"Hình thức làm việc"}
                      name="employmentTypes"
                      initialValue={!dataForm && "2"}
                      required
                    >
                      <Card bodyStyle={{ padding: 8 }}>
                        <Radio.Group
                          onChange={(e: RadioChangeEvent) => {
                            console.log("radio checked", e.target.value);
                            if (e.target.checked) {
                              formRef?.current?.setFieldsValue({
                                employmentTypes: [e.target.value],
                              });
                            }
                            setEmploymentTypesRadio(e.target.value);
                          }}
                          value={employmentTypesRadio}
                        >
                          {employmentTypes.map((value: MasterDataProps) => (
                            <Radio value={value?.id} style={{ padding: 12 }}>
                              {value?.name}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </Card>
                    </ProForm.Item>
                  </Col>

                  <Col span={12}>
                    <ProFormDatePicker
                      label="Hạn nộp hồ sơ"
                      name={"validThrough"}
                      required
                      width={"lg"}
                      fieldProps={fieldPropsDataDisableStart()}
                    />
                  </Col>

                  {name === "RecruitmentManager" && (
                    <Col span={12}>
                      <ProFormText
                        label="Trạng thái"
                        name={"state"}
                        required
                        rules={[
                          {
                            message: "Vui lòng không để trống",
                            required: true,
                          },
                        ]}
                      />
                    </Col>
                  )}

                  {name === "RecruitmentManager" && (
                    <Col span={12}>
                      <ProFormDigit
                        label="Số lượng cần tuyển"
                        name={"jobAmount"}
                        required
                      />
                    </Col>
                  )}
                </Row>
              ),
            },
          ]}
        />
        <Collapse
          size="small"
          defaultActiveKey={["1"]}
          items={[
            {
              key: "1",
              label: "Phúc lợi",
              extra: (
                <Checkbox
                  onClick={(e) => handleChangeCheckAll(e)}
                  defaultChecked={!dataForm ? true : false}
                ></Checkbox>
              ),
              headerClass: "header-collapsible",
              children: (
                <Row gutter={16}>
                  <Col span={24}>
                    <ProForm.Item
                      name="jobBenefits"
                      required
                      transform={(value) => {
                        const concatArr =
                          // !changeChecked
                          //   ? [
                          //       ...new Set([
                          //         ...defaultVal,
                          //         ...checkboxJobBeneFits,
                          //       ]),
                          //     ]
                          //   : checkboxJobBeneFits;

                          viewCheck === "normal"
                            ? !changeChecked
                              ? [
                                  ...new Set([
                                    ...defaultVal,
                                    ...checkboxJobBeneFits,
                                  ]),
                                ]
                              : checkboxJobBeneFits
                            : viewCheck === "checkAll"
                            ? changeChecked
                              ? checkboxJobBeneFits
                              : defaultValue
                            : changeChecked
                            ? checkboxJobBeneFits
                            : [];

                        return {
                          jobBenefits: concatArr.sort(),
                        };
                      }}
                    >
                      <Row gutter={[16, 16]}>
                        {jobBeneFits.map(
                          (value: MasterDataProps, index: number) => {
                            return (
                              <Col
                                sm={24}
                                md={8}
                                lg={6}
                                xl={6}
                                xxl={6}
                                key={index}
                              >
                                {changeCheckedAll === "normal" ? (
                                  <CheckBoxForm
                                    dataForm={dataForm}
                                    value={value}
                                    index={index}
                                    handleChangeJobBenes={handleChangeJobBenes}
                                    viewCheck={viewCheck}
                                  />
                                ) : changeCheckedAll === "checkAll" ? (
                                  <Checkbox
                                    checked={true}
                                    defaultChecked={true}
                                    onChange={(e) => handleChangeJobBenes(e)}
                                    value={value?.id}
                                    name={value?.name}
                                    key={index}
                                    onMouseEnter={(value) => {
                                      console.log("value:: ", value);
                                      setChangeCheckedAll("normal");
                                    }}
                                  >
                                    <>
                                      <FontAwesomeIcon
                                        icon={
                                          Fa[
                                            value?.icon as keyof typeof Fa
                                          ] as any
                                        }
                                        style={{ marginRight: 8 }}
                                        size="1x"
                                      />
                                      {value?.name}
                                    </>
                                  </Checkbox>
                                ) : (
                                  <Checkbox
                                    checked={false}
                                    onChange={(e) => handleChangeJobBenes(e)}
                                    value={value?.id}
                                    name={value?.name}
                                    key={index}
                                    onMouseEnter={(value) => {
                                      console.log("value:: ", value);
                                      setChangeCheckedAll("normal");
                                    }}
                                    // onClick={(value) => {
                                    //   setChangeCheckedAll("normal");
                                    // }}
                                  >
                                    <>
                                      <FontAwesomeIcon
                                        icon={
                                          Fa[
                                            value?.icon as keyof typeof Fa
                                          ] as any
                                        }
                                        style={{ marginRight: 8 }}
                                        size="1x"
                                      />
                                      {value?.name}
                                    </>
                                  </Checkbox>
                                )}
                              </Col>
                            );
                          }
                        )}
                      </Row>
                    </ProForm.Item>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
        <Collapse
          size="small"
          defaultActiveKey={["1"]}
          items={[
            {
              key: "1",
              label: "Yêu cầu chung",
              headerClass: "header-collapsible",
              children: (
                <Row gutter={16}>
                  <Col span={8}>
                    <ProForm.Item
                      label={"Giới tính"}
                      name="gender"
                      initialValue={!dataForm && genderRadio}
                      required
                    >
                      <Card bodyStyle={{ padding: 8 }}>
                        <Radio.Group
                          onChange={(e: RadioChangeEvent) => {
                            if (e.target.checked) {
                              formRef?.current?.setFieldsValue({
                                gender: [e.target.value],
                              });
                            }
                            setGenderRadio(e.target.value);
                          }}
                          value={genderRadio}
                        >
                          {gender.map((value: MasterDataProps) => (
                            <Radio value={value?.id} style={{ padding: 12 }}>
                              {value?.name}
                            </Radio>
                          ))}
                          {console.log("render lại")}
                        </Radio.Group>
                      </Card>
                    </ProForm.Item>
                  </Col>
                  <Col span={8}>
                    <ProFormSelect
                      name={"qualifications"}
                      label="Bằng cấp"
                      required
                      mode="multiple"
                      request={async () =>
                        await getMasterDataByTypeUtil(
                          "mdm_qualifications",
                          true,
                          true
                        )
                      }
                    />
                  </Col>

                  <Col span={8}>
                    <ProFormSelect
                      name={"experienceRequirementsType"}
                      label="Kinh nghiệm yêu cầu"
                      request={async () =>
                        await getMasterDataByTypeUtil(
                          "mdm_experience_requirement_type",
                          true,
                          true
                        )
                      }
                    />
                  </Col>

                  {/* <Col span={12}>
                    <ProFormTextArea name={"skills"} label="Kỹ năng" />
                  </Col> */}

                  <Col span={12}>
                    <Card
                      bodyStyle={{ padding: 8, backgroundColor: "#f4f4f4" }}
                    >
                      <ProForm.Item label="Tuổi">
                        <Row gutter={16}>
                          <Col span={12}>
                            <ProFormDigit label="Từ" name={"ageFrom"} />
                          </Col>
                          <Col span={12}>
                            <ProFormDigit label="Đến" name={"ageTo"} />
                          </Col>
                        </Row>
                      </ProForm.Item>
                    </Card>
                  </Col>

                  <Col span={12}>
                    <Card
                      bodyStyle={{ padding: 8, backgroundColor: "#f4f4f4" }}
                    >
                      <ProForm.Item label="Kinh nghiệm (tháng)" required>
                        <Row gutter={16}>
                          <Col span={12}>
                            <ProFormDigit
                              label="Từ"
                              name={"monthsOfExperienceFrom"}
                            />
                          </Col>
                          <Col span={12}>
                            <ProFormDigit
                              label="Đến"
                              name={"monthsOfExperienceTo"}
                            />
                          </Col>
                        </Row>
                      </ProForm.Item>
                    </Card>
                  </Col>

                  <Col span={24}>
                    <ProForm.Item name="skills" label="Kỹ năng" required>
                      <>
                        <Editor
                          initiateData={skillsValue}
                          onChange={(event, editor) => {
                            formRef?.current?.setFieldsValue({
                              skills: editor.getData(),
                            });
                          }}
                        />
                      </>
                    </ProForm.Item>
                  </Col>

                  {/* <Card style={{ width: "100%" }} bodyStyle={{ padding: 8 }}>
                    <Row gutter={32}>
                      <Col span={12}>
                        <ProForm.Item label="Tuổi">
                          <Row gutter={16}>
                            <Col span={12}>
                              <ProFormDigit label="Từ" name={"ageFrom"} />
                            </Col>
                            <Col span={12}>
                              <ProFormDigit label="Đến" name={"ageTo"} />
                            </Col>
                          </Row>
                        </ProForm.Item>
                      </Col>
                      <Col span={12}>
                        <ProForm.Item label="Kinh nghiệm (tháng)" required>
                          <Row gutter={16}>
                            <Col span={12}>
                              <ProFormDigit
                                label="Từ"
                                name={"monthsOfExperienceFrom"}
                                style={{ fontWeight: "bold" }}
                              />
                            </Col>
                            <Col span={12}>
                              <ProFormDigit
                                label="Đến"
                                name={"monthsOfExperienceTo"}
                              />
                            </Col>
                          </Row>
                        </ProForm.Item>
                      </Col>
                    </Row>
                  </Card> */}
                </Row>
              ),
            },
          ]}
        />
      </Space>
    </ProForm>
    // </Card>
  );
};

export default memo(RecruitmentTemplateForm);
