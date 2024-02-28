import { useAppSelector } from "#/hooks/redux";
import { FileUpload } from "#/lib/openapi";
import ProDescriptions, {
  ProDescriptionsItemProps,
} from "@ant-design/pro-descriptions";
import { columns } from "./columnsDetailMediaFile";
import ProCard from "@ant-design/pro-card";

const DetailMedia = () => {
  const { currentMediaFile } = useAppSelector((state) => state.media);

  return (
    <ProDescriptions<FileUpload & any>
      column={{ xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      // loading={loadingUserInfo}
      // title={`${currentMediaFile?.fileName}`}
      dataSource={currentMediaFile}
      //   params={{
      //     postId,
      //   }}
      labelStyle={{ color: "#a0a0a0", fontWeight: 500 }}
      contentStyle={{
        padding: 0,
      }}
      columns={columns() as ProDescriptionsItemProps<FileUpload>[]}
      style={{
        padding: 0,
        margin: 0,
      }}
    />
  );
};

export default DetailMedia;
