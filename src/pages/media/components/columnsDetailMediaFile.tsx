import ResponsesiveTextTable from "#/components/ResponsiveTextTable";
import { FileUpload } from "#/lib/openapi";
import { ProColumns } from "@ant-design/pro-table";
import { Image, Typography } from "antd";

export const columns = (): ProColumns<FileUpload>[] => {
  const { Paragraph } = Typography;

  return [
    {
      title: "Tên file",
      dataIndex: "fileName",
      render(dom, entity, index, action, schema) {
        return <b>{dom}</b>;
      },
    },
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Kiểu",
      dataIndex: "mime",
    },
    {
      title: "Kích thước",
      dataIndex: "fileSize",
      render(dom, entity, index, action, schema) {
        const fileSizeInMB = (entity?.fileSize || 0) / (1024 * 1024);
        const roundedFileSizeInMB = fileSizeInMB.toFixed(2);

        return <>{roundedFileSizeInMB} MB</>;
      },
    },
    {
      title: "Đường dẫn",
      dataIndex: "url",
      valueType: "textarea",
      ellipsis: true,
      render: (dom, entity, index, action, schema) => (
        <ResponsesiveTextTable
          maxWidth={500}
          minWidth={50}
          text={
            <Paragraph
              copyable={{
                text: String(entity?.url),
              }}
              style={{ display: "flex" }}
            >
              {dom}
            </Paragraph>
          }
        />
      ),
    },
    {
      title: "Ảnh/Video",
      render: (dom, entity) => {
        const text = String(entity?.mime);

        const mediaType = text.slice(0, text.indexOf("/"));

        if (entity?.url) {
          if (mediaType === "video") {
            return (
              <video src={entity.url} width={325} height={233} controls>
                Your browser does not support the video tag.
              </video>
            );
          } else if (mediaType === "image") {
            return (
              <Image
                src={entity.url}
                width={"auto"}
                // width={325}
                style={{ maxHeight: "300px" }}
              />
            );
          } else {
            return (
              <Image
                src={entity.url}
                width={"auto"}
                style={{ maxHeight: "300px" }}
              />
            );
          }
        }

        return null;
      },
    },
  ];
};
