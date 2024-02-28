import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { FileUpload } from "#/lib/openapi";
import {
  setCurrentMediaFile,
  setShowDetailMeidaFile,
  setShowModalUploadMedia,
} from "#/redux/slices/media";
import {
  deleteMediaFiles,
  fetchMediaListData,
} from "#/redux/slices/media/action";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { FooterToolbar } from "@ant-design/pro-layout";
import ProList from "@ant-design/pro-list";
import { ActionType } from "@ant-design/pro-table/es/typing";
import { Button, Checkbox, Modal, Popconfirm } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox/Checkbox";
import { useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DetailMedia from "./DetailMeidaFile";
import UpLoadFile from "#/components/UpLoadFile";

const MediaFileList = () => {
  const dispatch = useAppDispatch();
  const actionRef = useRef<ActionType>();
  const {
    mediaListData,
    showDetailMediaFile,
    currentMediaFile,
    showModalUploadMedia,
  } = useAppSelector((state) => state.media);
  const [selectedItems, setSelectedItems] = useState<Number[] | any>([]);
  const [resetSelect, setResetSelect] = useState<boolean>(false);

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

  const ButtonUpload = (
    <Button
      key="1"
      icon={<UploadOutlined />}
      onClick={() => dispatch(setShowModalUploadMedia(true))}
    ></Button>
  );

  return (
    <>
      <ProList<FileUpload>
        onItem={(record) => {
          return {
            onClick: () => {
              dispatch(setCurrentMediaFile(record));
              dispatch(setShowDetailMeidaFile(true));
            },
          };
        }}
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
                start: 0,
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
          defaultPageSize: 20,
          pageSizeOptions: [10, 20, 50, 100, 200, 1000],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} file`,
        }}
        grid={{ gutter: 16, xxl: 5, xl: 4, lg: 3, md: 2, sm: 1, xs: 1 }}
        headerTitle="Quản lý media"
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
        toolBarRender={() => {
          return [ButtonUpload];
        }}
        metas={{
          title: {
            dataIndex: "kbTitle",

            render: (dom, entity) => (
              <div
                className="title"
                onClick={() => {
                  dispatch(setCurrentMediaFile(entity));
                  // dispatch(setShowDetailMeidaFile(true));
                }}
                style={{ maxWidth: "200px" }}
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
                    <video
                      src={entity.url}
                      style={{ maxHeight: "325px", maxWidth: "233px" }}
                      controls
                    >
                      Your browser does not support the video tag.
                    </video>
                  );
                } else if (mediaType === "image") {
                  return (
                    <LazyLoadImage
                      src={entity?.url}
                      width={"100%"}
                      style={{ maxHeight: "200px", maxWidth: "200px" }}
                      placeholderSrc={entity?.url}
                    />
                  );
                } else {
                  return (
                    <LazyLoadImage
                      src={entity?.url}
                      width={"100%"}
                      style={{ maxHeight: "200px", maxWidth: "200px" }}
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
                resetSelect ? (
                  <Checkbox
                    checked={false}
                    onChange={onChange}
                    value={entity?.id}
                    onMouseEnter={(value) => {
                      setResetSelect(false);
                    }}
                  />
                ) : (
                  <Checkbox onChange={onChange} value={entity?.id} />
                ),
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
        // title={`Thông tin chi tiết file: ${currentMediaFile?.fileName}`}
        destroyOnClose
        // closable={false}
        bodyStyle={{
          padding: 0,
        }}
        width={"50%"}
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
      >
        <DetailMedia />
      </Modal>

      {selectedItems.length > 0 && (
        <FooterToolbar>
          {`Đã chọn ${selectedItems.length}`}

          <Button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setSelectedItems([]);
              setResetSelect(true);
            }}
            danger
          >
            Bỏ chọn tất cả
          </Button>

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
      )}

      <Modal
        open={showModalUploadMedia}
        onCancel={() => dispatch(setShowModalUploadMedia(false))}
        title="Thêm mới media"
        destroyOnClose
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
      >
        <UpLoadFile
          nameUploadFile={""}
          iconUploadFile={""}
          labelUploadFile={""}
          accept={"image/*, video/*"}
          dataFile={""}
          iconFile={""}
        />
      </Modal>
    </>
  );
};

export default MediaFileList;
