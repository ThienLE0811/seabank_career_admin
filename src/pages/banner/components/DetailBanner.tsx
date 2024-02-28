import { Banners } from "#/lib/openapi";

import ProCard from "@ant-design/pro-card";
import { Image, Spin } from "antd";
import ProDescriptions, {
  ProDescriptionsItemProps,
} from "@ant-design/pro-descriptions";

import React from "react";
import { columns } from "./columnsDetailBanner";
import { useAppSelector } from "#/hooks/redux";

type DetailBannerProps = {
  // visible: boolean;
  bannerId?: number;
  initialValues?: Banners | any;
  // onClose?: () => void;
};

const DetailBanner: React.FC<DetailBannerProps> = () => {
  const { currentBannerDetail, loadingFormBanner } = useAppSelector(
    (state) => state.banner
  );

  return loadingFormBanner && !currentBannerDetail ? (
    <Spin />
  ) : (
    <>
      <ProDescriptions<Banners & any>
        column={{ xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
        // loading={loadingUserInfo}
        // title={`${currentBannerDetail?.name}`}
        dataSource={currentBannerDetail}
        columns={columns as ProDescriptionsItemProps<Banners>[]}
      />

      {currentBannerDetail?.mimeType === "IMAGE" ? (
        <Image src={currentBannerDetail?.fileUrl} />
      ) : (
        <video
          src={currentBannerDetail?.fileUrl}
          width={"100%"}
          height={"100%"}
          style={{ maxHeight: 500, maxWidth: 500 }}
          controls
        >
          Your browser does not support the video tag.
        </video>
      )}
    </>
  );
};

export default DetailBanner;
