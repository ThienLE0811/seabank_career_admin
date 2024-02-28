import { RecruitmentTemplate } from "#/lib/openapi";
import * as Fa from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Typography } from "antd";
import DOMPurify from "dompurify";
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

const JobDetailContent = ({ data, jobBenefits }: JobDetailSectionProps) => {
  return (
    <div className="job-detail__body__info">
      <h2 className="job-detail__body__info-title">Chi tiết công việc</h2>
      <div className="job-detail__body__info-content">
        <div className="job-descriptions">
          <div className="job-descriptions-item">
            <h3 className="job-descriptions-item-title">Mô tả công việc</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data?.description || ""),
              }}
              className="job-descriptions-item-content"
            />
          </div>
          <div className="job-descriptions-item">
            <h3 className="job-descriptions-item-title">Yêu cầu công việc</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  data?.experienceRequirementDescriptions || ""
                ),
              }}
              className="job-descriptions-item-content"
            />
          </div>

          <div className="job-descriptions-item">
            <h3 className="job-descriptions-item-title">Kỹ năng</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data?.skills || ""),
              }}
              className="job-descriptions-item-content"
            />
          </div>

          <div className="job-descriptions-item">
            <h3 className="job-descriptions-item-title">Lý do đăng tuyển</h3>
            <div className="job-descriptions-item-content">
              {data?.reasonJobPostings || "-"}
            </div>
          </div>

          <div className="job-descriptions-item">
            <h3 className="job-descriptions-item-title">Ghi chú</h3>
            <div className="job-descriptions-item-content">
              {data?.note || "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailContent;
