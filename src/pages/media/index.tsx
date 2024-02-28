import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { FileUpload, Post } from "#/lib/openapi";
import {
  setCurrentMediaFile,
  setShowDetailMeidaFile,
} from "#/redux/slices/media";
import {
  deleteMediaFiles,
  fetchMediaListData,
} from "#/redux/slices/media/action";
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProList,
} from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import {
  Button,
  Modal,
  Popconfirm,
  Radio,
  Space,
  Table,
  Tooltip,
  Typography,
  Image,
  Checkbox,
} from "antd";
import { ReactText, useRef, useState } from "react";
import DetailMedia from "./components/DetailMeidaFile";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { CheckboxChangeEvent } from "rc-checkbox";
import { DeleteOutlined } from "@ant-design/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MediaFileList from "./components/MediaFileList";

const MediaPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const dispatch = useAppDispatch();
  const { mediaListData, showDetailMediaFile, currentMediaFile } =
    useAppSelector((state) => state.media);
  console.log("mediaListData:: ", mediaListData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [selectedItems, setSelectedItems] = useState<Number[] | any>([]);
  const [checked, setChecked] = useState(false);
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
  // };

  const onChange = (checkedValues: CheckboxChangeEvent) => {
    console.log("value:: ", checkedValues.target.value);
    console.log("checked = ", checkedValues.target.checked);
    const checkedStatus = checkedValues?.target?.checked;
    const checkedValue = checkedValues.target.value;

    if (checkedStatus) {
      setSelectedItems([...selectedItems, checkedValue]);
    } else {
      const newSelectedItems = selectedItems.filter(
        (value: number) => value !== checkedValue
      );
      setSelectedItems(newSelectedItems);
    }
  };

  console.log("selectedItems:: ", selectedItems);

  return (
    <PageContainer
      childrenContentStyle={{
        paddingInline: 12,
        paddingBlock: 12,
      }}
      // breadcrumbRender={false}
      title={false}
      footer={[]}
    >
      {/* <ProList<FileUpload>
        // onItem={(record) => {
        //   return {
        //     onClick: () => {
        //       console.log("123");
        //       alert("123");
        //     },
        //   };
        // }}
        // rowSelection={rowSelection}
        actionRef={actionRef}
        // formRef={formRef}
        itemLayout="vertical"
        dataSource={mediaListData?.data}
        rowKey="id"
        request={
          async (params, sort, filter) =>
            await dispatch(
              fetchMediaListData({
                limit: params?.pageSize,
              })
            )
          // await dispatch(fetchMediaListData())
        }
        scroll={{ x: "max-content", y: "calc(100vh - 245px)" }}
        options={{
          reload: true,
          setting: false,
          density: false,
        }}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: [10, 20, 50, 100, 200, 1000],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} file`,
        }}
        grid={{ gutter: 16, xxl: 4, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
        headerTitle="Quản lý ảnh"
        showActions="hover"
        // toolBarRender={() => {
        //   return [
        //     <Popconfirm
        //       key="2"
        //       title="Bạn chắc chắn muốn xoá file này?"
        //       onConfirm={async () => {
        //         return dispatch(deleteMediaFiles({ ids: selectedItems }));
        //       }}
        //     >
        //       <Button key="3" icon={<DeleteOutlined />} danger />
        //     </Popconfirm>,
        //   ];
        // }}
        metas={{
          title: {
            dataIndex: "kbTitle",

            render: (dom, entity) => (
              <div
                className="title"
                onClick={() => {
                  dispatch(setCurrentMediaFile(entity));
                  dispatch(setShowDetailMeidaFile(true));
                }}
              >
                {entity?.fileName}
              </div>
            ),
          },

          content: {
            render: (dom, entity) => {
              const text = String(entity?.mime);

              const mediaType = text.slice(0, text.indexOf("/"));

              // if (entity?.icon) {
              //   if (mediaType === "video") {
              //     return (
              //       <video src={entity.url} width={325} height={233} controls>
              //         Your browser does not support the video tag.
              //       </video>
              //     );
              //   } else if (mediaType === "image") {
              //     return (
              //       <Image
              //         src={entity.icon}
              //         width={"auto"}
              //         // width={325}
              //         style={{ maxHeight: "300px" }}
              //       />
              //     );
              //   } else {
              //     return (
              //       <Image
              //         src={entity.icon}
              //         width={"auto"}
              //         style={{ maxHeight: "300px" }}
              //       />
              //     );
              //   }
              // }

              if (entity?.url) {
                if (mediaType === "video") {
                  return (
                    <video src={entity.url} width={325} height={233} controls>
                      Your browser does not support the video tag.
                    </video>
                  );
                } else if (mediaType === "image") {
                  return (
                    <LazyLoadImage
                      src={entity?.url}
                      // width={"auto"}
                      style={{ maxHeight: "300px", maxWidth: "300px" }}
                      placeholderSrc={entity?.url}
                    />
                  );
                } else {
                  return (
                    <LazyLoadImage
                      src={entity?.url}
                      width={"auto"}
                      style={{ maxHeight: "300px" }}
                    />
                  );
                }
              }

              return null;
            },
          },
          actions: {
            render: (dom, entity) => {
              return [
                // <Popconfirm
                //   key="2"
                //   title="Bạn chắc chắn muốn xoá file này?"
                //   onConfirm={async () => {
                //     return dispatch(
                //       deleteMediaFiles({ ids: [Number(entity?.id)] })
                //     );
                //   }}
                // >
                //   <Button key="3" icon={<DeleteOutlined />} danger />
                // </Popconfirm>,
                <Checkbox
                  // checked={checked}
                  style={{ cursor: "" }}
                  onChange={onChange}
                  value={entity?.id}
                />,
              ];
            },
          },
        }}
      />
      <Modal
        open={showDetailMediaFile}
        onCancel={() => {
          dispatch(setCurrentMediaFile(undefined));
          dispatch(setShowDetailMeidaFile(false));
        }}
        title={`Thông tin chi tiết file: ${currentMediaFile?.fileName}`}
        destroyOnClose
        bodyStyle={{
          padding: 10,
        }}
        width={"60%"}
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
      >
        <DetailMedia />
      </Modal>

      {selectedItems.length > 0 && (
        <FooterToolbar>
          {`Đã chọn ${selectedItems.length}`}
          <Popconfirm
            key="2"
            title="Bạn chắc chắn muốn xoá file này?"
            onConfirm={async () => {
              const res = await dispatch(
                deleteMediaFiles({ ids: selectedItems })
              );
              console.log("res:: ", res);
              if (res?.meta?.requestStatus === "fulfilled") {
                setSelectedItems([]);
              }
            }}
          >
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              key={1}
              style={{ marginLeft: "10px" }}
            />
          </Popconfirm>
        </FooterToolbar>
      )} */}

      <MediaFileList />
    </PageContainer>
  );
};

export default MediaPage;
