import { RecruitmentTemplate } from "#/lib/openapi";
import {
  faCircleDot,
  faClock,
  faCommentsDollar,
  faHourglassHalf,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "antd";

const { Title } = Typography;

type MetaDataProps = {
  label?: string;
  value?: string;
};
type JobDetailSectionProps = {
  data?: RecruitmentTemplate;
  jobLocationsTitle?: string;
  occupationalCategory?: string;
  employmentTypes?: string;
  departments?: string;
  gender?: string;
  experienceRequirementsType?: string;
  industry: MetaDataProps[];
  qualifications: MetaDataProps[];
};

const JobDetailBodyRightCategory = ({
  data,
  industry,
  qualifications,
}: JobDetailSectionProps) => {
  return (
    <div className="job-detail__body__right-box">
      <div className="job-detail__body__right-box-category">
        <div className="box-category-title">Ngành nghề</div>
        <div className="box-category-tags">
          {industry.length > 0 &&
            industry.map((val: MetaDataProps, index: number) => (
              <span className="box-category-tag">{val?.label}</span>
            ))}
        </div>
      </div>
      <div className="job-detail__body__right-box-category">
        <div className="box-category-title">Bằng cấp</div>
        <div className="box-category-tags">
          {qualifications.length > 0 &&
            qualifications.map((val: MetaDataProps, index: number) => (
              <span key={index} className="box-category-tag">
                {val?.label}
              </span>
            ))}
        </div>
      </div>
      <div className="job-detail__body__right-box-category">
        <div className="box-category-title">Địa chỉ</div>
        <div className="box-category-tag-address">
          {data?.jobAddress || "-"}
        </div>
      </div>
    </div>
  );
};

export default JobDetailBodyRightCategory;
