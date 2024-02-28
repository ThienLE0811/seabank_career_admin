import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import ResponsesiveTextTable from "#/components/ResponsiveTextTable";
import {
  ActionType,
  ProColumns,
  TableDropdown,
} from "@ant-design/pro-components";
import { Button, message, Popconfirm, Select, Space, Tag, Tooltip } from "antd";
import { showModalPostsDetail, showModalPostsForm } from "#/redux/slices/posts";
import {
  GetDetailPostResponse,
  Post,
  RecruitmentTemplate,
} from "#/lib/openapi";
import moment from "moment";
import { getDetailRecruitmentTemplate } from "#/redux/slices/recruitmentTemplate/action";
import { showDrawerRecruitmentTemplateDetail } from "#/redux/slices/recruitmentTemplate";

export const columns = (): ProColumns<RecruitmentTemplate>[] => {
  const dispatch = useAppDispatch();
  return [
    // {
    //   title: "STT",
    //   dataIndex: "id",
    //   // hideInSearch: true,
    // },
    {
      title: "Mã",
      dataIndex: "code",
    },
    {
      title: "Chức danh",
      dataIndex: "jobTitle",
    },
    {
      title: "Khu vực",
      dataIndex: "jobLocations",

      ellipsis: true,
      render: (text, entity) => {
        const value = entity?.jobLocations?.join(", ");
        return <>{value}</>;
      },
    },

    {
      title: "Mô tả kinh nghiệm",
      //   ellipsis: true,
      dataIndex: "experienceRequirementDescriptions",
    },
    { title: "Ngành nghề", dataIndex: "industry" },
    {
      title: "Loại lương",
      dataIndex: "salaryType",
    },
    {
      title: "Mức lương",
      dataIndex: "salaryCurrency",
    },
    {
      title: "Mức lương tối thiểu",
      dataIndex: "salaryMinValue",
    },
    {
      title: "Mức lương tối đa",
      dataIndex: "salaryMaxValue",
    },
    {
      title: "Hình thức công việc",
      dataIndex: "employmentTypes",
      render: (text, entity) => {
        const value = entity?.employmentTypes?.join(", ");
        return <>{value}</>;
      },
    },
    {
      title: "Thời gian hết hạn nộp hồ sơ",
      dataIndex: "validThrough",
      render: (text: any) => {
        console.log("text:: ", text);
        const value = moment(text).format("DD-MM-YYYY");
        return <>{value}</>;
      },
    },
    {
      title: "Phúc lợi",
      dataIndex: "jobBenefits",
      render: (text, entity) => {
        const value = entity?.jobBenefits?.join(", ");
        return <>{value}</>;
      },
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
    },
    {
      title: "Độ tuổi tối thiểu",
      dataIndex: "ageFrom",
    },
    {
      title: "Độ tuổi tối đa",
      dataIndex: "ageTo",
    },
    {
      title: "Kinh nghiệm yêu cầu",
      dataIndex: "experienceRequirementsType",
    },

    {
      title: "Kinh nghiệm",
      dataIndex: "monthsOfExperienceTo",
      render: (text, entity) => {
        return `Kinh nghiệm từ ${entity?.monthsOfExperienceFrom} đến ${entity?.monthsOfExperienceTo} tháng`;
      },
    },
    {
      title: "Cấp bậc",
      dataIndex: "occupationalCategory",
    },
    {
      title: "Bằng cấp",
      dataIndex: "qualifications",
      render: (text, entity) => {
        const value = entity?.qualifications?.join(", ");
        return <>{value}</>;
      },
    },
    {
      title: "Kỹ năng",
      dataIndex: "skills",
    },
    {
      title: "Người tạo",

      dataIndex: "createdBy",
      render: (text) => (
        <ResponsesiveTextTable maxWidth={100} minWidth={50} text={text} />
      ),
    },

    {
      title: "Ngày cập nhật",
      dataIndex: "modifiedBy",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdTime",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "modifiedTime",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      ellipsis: true,
    },
    {
      title: "Lý do đăng tuyển",
      dataIndex: "reasonJobPostings",
      //   valueType: "textarea",
      ellipsis: true,
    },
    {
      title: "Phòng ban",
      dataIndex: "departments",
      render: (text, entity) => {
        const value = entity?.departments?.join(", ");
        return <>{value}</>;
      },
    },
  ];
};
