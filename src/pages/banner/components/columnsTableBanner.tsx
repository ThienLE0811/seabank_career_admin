import { ProColumns, TableDropdown } from "@ant-design/pro-components";

import Link from "antd/es/typography/Link";
import { Avatar, Image, Popconfirm, Switch, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  PlayCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "#/hooks/redux";
import {
  setCurrentBanner,
  setCurrentIdBanner,
  showDrawerBannerDetail,
  showModalBannerForm,
  showModalVideo,
} from "#/redux/slices/banner";
import { Banners } from "#/lib/openapi";
import { deleteBanners, getBannerById } from "#/redux/slices/banner/action";
import { deletePostsTableData } from "#/redux/slices/posts/action";
import ResponsesiveTextTable from "#/components/ResponsiveTextTable";
import SwitchState from "#/components/SwitchStateBanner";
import SwitchStateBanner from "#/components/SwitchStateBanner";
import ModalVideo from "#/components/ModalVideo";

export const columns = (): ProColumns<Banners | any>[] => {
  const dispatch = useAppDispatch();

  const ActionButton: React.FC<{
    type: "edit" | "delete" | "view";
    record: Banners;
  }> = ({ type, record }) => {
    return (
      <>
        {type === "view" && (
          <div
            onClick={() => {
              dispatch(getBannerById(Number(record?.id)));
              // dispatch(setCurrentBanner(record));
              dispatch(showDrawerBannerDetail());
            }}
          >
            <EyeOutlined /> Xem
          </div>
        )}

        {type === "edit" && (
          <div
            onClick={async () => {
              await dispatch(getBannerById(Number(record?.id)));
              dispatch(showModalBannerForm());
              dispatch(setCurrentIdBanner(Number(record?.id)));
            }}
          >
            <EditOutlined /> Sửa
          </div>
        )}
        {type === "delete" && (
          <Popconfirm
            key="delete"
            title="Bạn chắc chắn muốn xoá bài viết này?"
            onConfirm={async (e) => {
              e?.stopPropagation();
              const ids = [record?.id];
              const data: any = { ids: [String(ids)] };
              dispatch(deleteBanners(data));
            }}
            icon={<DeleteOutlined />}
          >
            <DeleteOutlined /> Xóa
          </Popconfirm>
        )}
      </>
    );
  };

  // const handleClickVideo = ()=>{
  //   dis
  // }

  return [
    {
      title: "",
      dataIndex: "id",
      // valueType: "indexBorder",
      hideInTable: true,
    },
    // {
    //   title: "STT",
    //   dataIndex: "id",
    // },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Ảnh/video",
      dataIndex: "imageUrl",
      width: 120,
      className: "drag-visible",
      render(dom, entity, index, action, schema) {
        if (entity?.fileUrl) {
          if (entity?.mimeType === "VIDEO") {
            return (
              <>
                <Image
                  onClick={() => dispatch(showModalVideo())}
                  width={50}
                  // height={80}

                  style={{
                    maxHeight: 80,
                    maxWidth: 80,
                    cursor: "pointer",
                  }}
                  src={"/images/play-button.png"}
                  preview={false}
                />

                <ModalVideo src={entity?.fileUrl || ""} />
              </>
            );
          } else {
            return (
              <Image
                width={80}
                style={{ maxHeight: 80, maxWidth: 80 }}
                src={entity?.iconUrl || entity?.fileUrl}
                preview={{
                  mask: <EyeOutlined />,
                  src: entity?.fileUrl,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            );
          }
        }

        return null;

        // return (
        //   <div>
        //     <Image
        //       width={80}
        //       style={{ maxHeight: 80, maxWidth: 80 }}
        //       src={entity?.fileUrl}
        //       preview={{
        //         mask: <EyeOutlined />,
        //       }}
        //       onClick={(e) => {
        //         e.stopPropagation();
        //       }}
        //     />
        //   </div>
        // );
      },
    },

    {
      title: "Thời gian chạy",
      dataIndex: "duration",
      width: 120,
      render: (text, entity) => (
        <ResponsesiveTextTable
          maxWidth={200}
          minWidth={100}
          text={
            <Tag color={"green"}>
              {entity?.duration ? entity?.duration : 0} giây
            </Tag>
          }
        />
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      ellipsis: true,
      render: (text) => (
        <ResponsesiveTextTable maxWidth={200} minWidth={100} text={text} />
      ),
    },
    {
      title: "Đường dẫn",
      dataIndex: "targetUrl",
      ellipsis: true,
      render: (text) => (
        <ResponsesiveTextTable maxWidth={200} minWidth={100} text={text} />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "publicBanner",
      render(dom, entity, index, action, schema) {
        return (
          <SwitchStateBanner
            checked={entity?.publicBanner}
            id={entity?.id}
            // onChange={()=>handleChangeStateBanner()}
          />
        );
      },
    },
    {
      title: "Hành động",
      key: "option",
      hideInSearch: true,
      fixed: "right",
      width: 100,

      render: (text, record, _, action) => [
        <TableDropdown
          key="actionGroup"
          menus={[
            {
              key: "view",
              name: <ActionButton type="view" record={record} />,
            },
            {
              key: "edit",
              name: <ActionButton type="edit" record={record} />,
            },
            {
              key: "delete",
              name: <ActionButton type="delete" record={record} />,
            },
          ]}
          style={{ backgroundColor: "transparent !important" }}
        >
          <Tag color="processing" icon={<MoreOutlined />}></Tag>
        </TableDropdown>,
      ],
      // render: (text, record, action) => (
      //   <ActionButton record={record}></ActionButton>
      // ),
    },
  ];
};
