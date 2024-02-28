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
type JobDetailSectionProps = {
  data?: RecruitmentTemplate;
  jobLocationsTitle?: string;
  occupationalCategory?: string;
  employmentTypes?: string;
  departments?: string;
  gender?: string;
  experienceRequirementsType?: string;
};

const JobDetailBodyRightInit = ({
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
      <h2 className={"job-detail__body__right-title"}>Thông tin khởi tạo</h2>
      <div className={"job-detail__info-inittial"}>
        <li className={"job-detail__info-inittial-item"}>
          <FontAwesomeIcon icon={faCircleDot} />
          id: {data?.id}
        </li>
        <li className={"job-detail__info-inittial-item"}>
          <FontAwesomeIcon icon={faCircleDot} />
          Mã code: {data?.code}
        </li>
        <li className={"job-detail__info-inittial-item"}>
          <FontAwesomeIcon icon={faCircleDot} />
          Người tạo: {data?.createdBy}
        </li>
        <li className={"job-detail__info-inittial-item"}>
          <FontAwesomeIcon icon={faCircleDot} />
          Ngày tạo: {data?.createdTime}
        </li>
        <li className={"job-detail__info-inittial-item"}>
          <FontAwesomeIcon icon={faCircleDot} />
          Người cập nhật: {data?.createdTime}
        </li>
        <li className={"job-detail__info-inittial-item"}>
          <FontAwesomeIcon icon={faCircleDot} />
          Ngày cập nhật: {data?.createdTime}
        </li>
      </div>
    </div>
  );
};

export default JobDetailBodyRightInit;
