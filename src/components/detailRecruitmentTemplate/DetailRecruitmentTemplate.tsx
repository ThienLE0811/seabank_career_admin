import { RecruitmentTemplate } from "#/lib/openapi";
import { StarOutlined } from "@ant-design/icons";
import {
  faCommentsDollar,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Divider, Row, Spin, Typography } from "antd";
import "./index.css";
import { getMasterDataByTypeUtil } from "#/utils";
import { useEffect, useState } from "react";
import JobDetailSection from "./JobDetailSection";
import JobDetailBodyRight from "./JobDetailBodyRight";
import JobDetailBodyRightInit from "./JobDetailBodyRightInit";
import JobDetailBodyRightCategory from "./JobDetailBodyRightCategory";
import JobDetailBenefits from "./JobDetailBenefits";
import JobDetailContent from "./JobDetailContent";

const { Title } = Typography;

type DetailRecruitmentTemplatesProps = {
  data: RecruitmentTemplate;
};

type MetaDataProps = {
  label?: string;
  value?: string;
};

type MetaDataBenefitsProps = {
  icon?: string;
  id?: string;
  name?: string;
};

const DetailRecruitmentTemplates = ({
  data,
}: DetailRecruitmentTemplatesProps) => {
  const [jobLocationsTitle, setJobLocationsTitle] = useState<MetaDataProps>();
  const [salaryCurrency, setSalaryCurrency] = useState<MetaDataProps>();
  const [occupationalCategory, setOccupationalCategory] =
    useState<MetaDataProps>();
  const [employmentTypes, setEmploymentTypes] = useState<MetaDataProps>();
  const [departments, setDepartments] = useState<MetaDataProps>();
  const [gender, setGender] = useState<MetaDataProps>();
  const [experienceRequirementsType, setExperienceRequirementsType] =
    useState<MetaDataProps>();
  const [industry, setIndustry] = useState<MetaDataProps[]>([]);
  const [qualifications, setQualifications] = useState<MetaDataProps[]>([]);
  const [jobBenefits, setJobBenefits] = useState<MetaDataBenefitsProps[]>([]);
  console.log("data:: ", data);

  useEffect(() => {
    const getJobLocations = async () => {
      await getMasterDataByTypeUtil("mdm_job_locations", true, true).then(
        (e) => {
          const value = e.filter(
            (val) => val?.value === data?.jobLocations?.at(0)
          );
          setJobLocationsTitle(value.at(0));
        }
      );
    };
    const getSalaryCurrency = async () => {
      await getMasterDataByTypeUtil("mdm_currency", true, true).then((e) => {
        const value = e.filter((val) => val?.value === data?.salaryCurrency);
        setSalaryCurrency(value.at(0));
      });
    };

    const getOccupationalCategory = async () => {
      await getMasterDataByTypeUtil(
        "mdm_occupational_category",
        true,
        true
      ).then((e) => {
        const value = e.filter(
          (val) => val?.value === data?.occupationalCategory
        );
        setOccupationalCategory(value.at(0));
      });
    };
    const getEmploymentTypes = async () => {
      await getMasterDataByTypeUtil("mdm_employment_type", true, true).then(
        (e) => {
          const value = e.filter(
            (val) => val?.value === data?.employmentTypes?.at(0)
          );
          setEmploymentTypes(value.at(0));
        }
      );
    };

    const getDepartments = async () => {
      await getMasterDataByTypeUtil("mdm_departments", true, true).then((e) => {
        const value = e.filter(
          (val) => val?.value === data?.departments?.at(0)
        );
        setDepartments(value.at(0));
      });
    };

    const getGender = async () => {
      await getMasterDataByTypeUtil("mdm_gender", true, true).then((e) => {
        const value = e.filter((val) => val?.value === data?.gender);
        setGender(value.at(0));
      });
    };

    const getExperienceRequirementsType = async () => {
      await getMasterDataByTypeUtil(
        "mdm_experience_requirement_type",
        true,
        true
      ).then((e) => {
        const value = e.filter(
          (val) => val?.value === data?.experienceRequirementsType
        );
        setExperienceRequirementsType(value.at(0));
      });
    };
    const getIndustry = async () => {
      await getMasterDataByTypeUtil("mdm_industry", true, true).then((e) => {
        const value: MetaDataProps[] = e.filter((val) =>
          data?.industry?.includes(val?.value)
        );
        setIndustry(value);
      });
    };

    const getQualifications = async () => {
      await getMasterDataByTypeUtil("mdm_qualifications", true, true).then(
        (e) => {
          const value: MetaDataProps[] = e.filter((val) =>
            data?.qualifications?.includes(val?.value)
          );
          setQualifications(value);
        }
      );
    };

    const getJobBenefits = async () => {
      await getMasterDataByTypeUtil("mdm_job_benefits", false, true).then(
        (e) => {
          console.log("e:: ", e);
          const value: MetaDataBenefitsProps[] = e.filter((val) =>
            data?.jobBenefits?.includes(val?.id)
          );
          setJobBenefits(value);
        }
      );
    };

    getJobLocations();
    getSalaryCurrency();
    getOccupationalCategory();
    getEmploymentTypes();
    getDepartments();
    getGender();
    getExperienceRequirementsType();
    getIndustry();
    getQualifications();
    getJobBenefits();
  }, [data]);

  return (
    <Row style={{ flex: 1, margin: 0 }} gutter={16}>
      <Col sm={24} lg={16}>
        <Card style={{ marginBottom: "15px" }}>
          <JobDetailSection
            data={data}
            jobLocationsTitle={jobLocationsTitle?.label}
            salaryCurrency={salaryCurrency?.value}
          />
        </Card>
        <Card style={{ marginBottom: "15px" }}>
          <JobDetailBenefits data={data} jobBenefits={jobBenefits} />
        </Card>
        <Card style={{ marginBottom: "15px" }}>
          <JobDetailContent data={data} jobBenefits={jobBenefits} />
        </Card>
      </Col>
      <Col sm={24} lg={8} style={{ gap: "20px" }}>
        <Card size="small" style={{ marginBottom: "15px" }}>
          <JobDetailBodyRightInit
            data={data}
            jobLocationsTitle={jobLocationsTitle?.label}
            occupationalCategory={occupationalCategory?.label}
            employmentTypes={employmentTypes?.label}
            departments={departments?.label}
            gender={gender?.label}
            experienceRequirementsType={experienceRequirementsType?.label}
          />
        </Card>
        <Card size="small" style={{ marginBottom: "15px" }}>
          <JobDetailBodyRight
            data={data}
            jobLocationsTitle={jobLocationsTitle?.label}
            occupationalCategory={occupationalCategory?.label}
            employmentTypes={employmentTypes?.label}
            departments={departments?.label}
            gender={gender?.label}
            experienceRequirementsType={experienceRequirementsType?.label}
          />
        </Card>
        <Card size="small" style={{ marginBottom: "15px" }}>
          <JobDetailBodyRightCategory
            data={data}
            industry={industry}
            qualifications={qualifications}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DetailRecruitmentTemplates;
