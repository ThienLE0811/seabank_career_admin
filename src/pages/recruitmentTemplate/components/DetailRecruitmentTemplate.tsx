import { Banners } from "#/lib/openapi";

import ProCard from "@ant-design/pro-card";
import { Image, Tabs, TabsProps } from "antd";
import ProDescriptions, {
  ProDescriptionsItemProps,
} from "@ant-design/pro-descriptions";

import React from "react";
import { columns } from "./columnsDetailRecruitmentTemplate";
import { useAppSelector } from "#/hooks/redux";
import DetailRecruitmentTemplates from "#/components/detailRecruitmentTemplate/DetailRecruitmentTemplate";

type DetailBannerProps = {
  // visible: boolean;
  bannerId?: number;
  initialValues?: Banners | any;
  // onClose?: () => void;
};

const DetailRecruitmentTemplate: React.FC<DetailBannerProps> = () => {
  const { currentRecruitmentTemplateDetail } = useAppSelector(
    (state) => state.recruitmentsTemplate
  );

  const tabItems: TabsProps["items"] = [
    {
      key: "content",
      label: "Nội dung",
      children: (
        <DetailRecruitmentTemplates data={currentRecruitmentTemplateDetail} />
      ),
    },
    {
      key: "info",
      label: "Thông tin",
      children: <>123</>,
    },
  ];

  return (
    <>
      <ProCard bordered bodyStyle={{ margin: 0, padding: 0 }}>
        <Tabs defaultActiveKey="content" items={tabItems} />
      </ProCard>
    </>
  );
};

export default DetailRecruitmentTemplate;
