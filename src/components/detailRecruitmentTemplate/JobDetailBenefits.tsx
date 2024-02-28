import { RecruitmentTemplate } from "#/lib/openapi";
import * as Fa from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

type MetaDataBenefitsProps = {
  icon?: string;
  id?: string;
  name?: string;
};
type JobDetailSectionProps = {
  data?: RecruitmentTemplate;
  jobLocationsTitle?: string;
  occupationalCategory?: string;
  employmentTypes?: string;
  departments?: string;
  gender?: string;
  experienceRequirementsType?: string;
  jobBenefits: MetaDataBenefitsProps[];
};

const JobDetailBenefits = ({ data, jobBenefits }: JobDetailSectionProps) => {
  return (
    <div className="job-detail__body__right-box">
      <div className="job-detail__body__right-box-benefits">
        <div className="box-category-title">Phúc lợi</div>
        <div className="">
          <Row gutter={[16, 16]}>
            {jobBenefits.length > 0 &&
              jobBenefits.map((val: MetaDataBenefitsProps, index: number) => (
                <Col sm={24} md={8} lg={6} xl={6} xxl={6}>
                  <span key={index} className="box-category-tag-benefits">
                    <FontAwesomeIcon
                      icon={Fa[val?.icon as keyof typeof Fa] as any}
                      color="#212f3f"
                      width={"24px"}
                      height={"24px"}
                    />
                    {val?.name}
                  </span>
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default JobDetailBenefits;
