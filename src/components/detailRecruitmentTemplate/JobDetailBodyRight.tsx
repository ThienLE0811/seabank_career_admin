import { RecruitmentTemplate } from "#/lib/openapi";
import {
  faClock,
  faCommentsDollar,
  faHourglassHalf,
  faLocationDot,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "antd";

const { Title } = Typography;
type JobDetailSectionProps = {
  data?: RecruitmentTemplate | Recruitment;
  jobLocationsTitle?: string;
  occupationalCategory?: string;
  employmentTypes?: string;
  departments?: string;
  gender?: string;
  experienceRequirementsType?: string;
};

const JobDetailBodyRight = ({
  data,
  jobLocationsTitle,
  occupationalCategory,
  employmentTypes,
  departments,
  gender,
  experienceRequirementsType,
}: JobDetailSectionProps) => {
  return (
    <div className="job-detail__body__right">
      <h2 className={"job-detail__body__right-title"}>Thông tin chung</h2>
      <div className="job-detail__body__right-box">
        <div className="job-detail__body__right-group">
          <div className="job-detail__body__right-group-icon">
            <FontAwesomeIcon
              icon={faCommentsDollar}
              color="#FFFFFF"
              width={"24px"}
              height={"24px"}
            />
          </div>
          <div className="job-detail__body__right-group-content">
            <div className="job-detail__body__right-group-content-title">
              Cấp bậc
            </div>
            <div className="job-detail__body__right-group-content-value">
              {occupationalCategory}
            </div>
          </div>
        </div>

        {data?.jobAmount && (
          <div className="job-detail__body__right-group">
            <div className="job-detail__body__right-group-icon">
              <FontAwesomeIcon
                icon={faUsers}
                color="#FFFFFF"
                width={"24px"}
                height={"24px"}
              />
            </div>
            <div className="job-detail__body__right-group-content">
              <div className="job-detail__body__right-group-content-title">
                Số lượng tuyển
              </div>
              <div className="job-detail__body__right-group-content-value">
                {data?.jobAmount}
              </div>
            </div>
          </div>
        )}

        <div className="job-detail__body__right-group">
          <div className="job-detail__body__right-group-icon">
            <FontAwesomeIcon
              icon={faHourglassHalf}
              color="#FFFFFF"
              width={"24px"}
              height={"24px"}
            />
          </div>
          <div className="job-detail__body__right-group-content">
            <div className="job-detail__body__right-group-content-title">
              Hình thức làm việc
            </div>
            <div className="job-detail__body__right-group-content-value">
              {employmentTypes}
            </div>
          </div>
        </div>
        <div className="job-detail__body__right-group">
          <div className="job-detail__body__right-group-icon">
            <FontAwesomeIcon
              icon={faLocationDot}
              color="#FFFFFF"
              width={"24px"}
              height={"24px"}
            />
          </div>
          <div className="job-detail__body__right-group-content">
            <div className="job-detail__body__right-group-content-title">
              Tuổi
            </div>
            <div className="job-detail__body__right-group-content-value">
              {data?.ageFrom} - {data?.ageTo}
            </div>
          </div>
        </div>
        <div className="job-detail__body__right-group">
          <div className="job-detail__body__right-group-icon">
            <FontAwesomeIcon
              icon={faLocationDot}
              color="#FFFFFF"
              width={"24px"}
              height={"24px"}
            />
          </div>
          <div className="job-detail__body__right-group-content">
            <div className="job-detail__body__right-group-content-title">
              Phòng ban
            </div>
            <div className="job-detail__body__right-group-content-value">
              {departments}
            </div>
          </div>
        </div>
        <div className="job-detail__body__right-group">
          <div className="job-detail__body__right-group-icon">
            <FontAwesomeIcon
              icon={faUser}
              color="#FFFFFF"
              width={"24px"}
              height={"24px"}
            />
          </div>
          <div className="job-detail__body__right-group-content">
            <div className="job-detail__body__right-group-content-title">
              Giới tính
            </div>
            <div className="job-detail__body__right-group-content-value">
              {gender}
            </div>
          </div>
        </div>

        <div className="job-detail__body__right-group">
          <div className="job-detail__body__right-group-icon">
            <FontAwesomeIcon
              icon={faUser}
              color="#FFFFFF"
              width={"24px"}
              height={"24px"}
            />
          </div>
          <div className="job-detail__body__right-group-content">
            <div className="job-detail__body__right-group-content-title">
              Yêu cầu kinh nghiệm
            </div>
            <div className="job-detail__body__right-group-content-value">
              {experienceRequirementsType}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailBodyRight;
