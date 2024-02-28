import { RecruitmentTemplate } from "#/lib/openapi";
import {
  faClock,
  faCommentsDollar,
  faHourglassHalf,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "antd";

const { Title } = Typography;
type JobDetailSectionProps = {
  data?: RecruitmentTemplate;
  jobLocationsTitle?: string;
  salaryCurrency?: string;
};

const JobDetailSection = ({
  data,
  jobLocationsTitle,
  salaryCurrency,
}: JobDetailSectionProps) => {
  const partString = data?.validThrough?.split(" ") || [];
  const validThrough = partString[0];

  return (
    <div className="job-detail__info">
      <h2 className={"job-detail__info-title"}>{data?.jobTitle}</h2>
      <div className="job-detail__info-sections">
        <div className="job-detail__info-section">
          <div className="job-detail__info-section-icon">
            <FontAwesomeIcon
              icon={faCommentsDollar}
              color="#FFFFFF"
              width={"24px"}
              height={"24px"}
            />
          </div>
          <div className="job-detail__info-section-content">
            <div className="job-detail__info-section-content-title">
              Mức lương
            </div>
            <div className="job-detail__info-section-content-value">
              {data?.salaryMinValue} - {data?.salaryMaxValue}{" "}
              {salaryCurrency === "1" ? `triệu` : "$"}
            </div>
          </div>
        </div>
        <div className="job-detail__info-section">
          <div className="job-detail__info-section-icon">
            <FontAwesomeIcon
              icon={faLocationDot}
              color="#FFFFFF"
              width={"24px"}
              height={"24px"}
            />
          </div>
          <div className="job-detail__info-section-content">
            <div className="job-detail__info-section-content-title">
              Địa điểm
            </div>
            <div className="job-detail__info-section-content-value">
              {jobLocationsTitle}
            </div>
          </div>
        </div>
        <div className="job-detail__info-section">
          <div className="job-detail__info-section-icon">
            <FontAwesomeIcon
              icon={faHourglassHalf}
              color="#FFFFFF"
              width={"24px"}
              height={"24px"}
            />
          </div>
          <div className="job-detail__info-section-content">
            <div className="job-detail__info-section-content-title">
              Kinh nghiệm
            </div>
            <div className="job-detail__info-section-content-value">
              {data?.monthsOfExperienceFrom} - {data?.monthsOfExperienceTo}{" "}
              tháng
            </div>
          </div>
        </div>
      </div>
      <div className={"job-detail__info-dealine"}>
        <FontAwesomeIcon icon={faClock} />
        Hạn nộp hồ sơ: {validThrough}
      </div>
    </div>
  );
};

export default JobDetailSection;
