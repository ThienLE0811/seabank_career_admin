import {
  EditOutlined,
  MenuOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { DragSortTable, PageContainer } from "@ant-design/pro-components";
import { Button, Modal, Tooltip, message, Drawer, Switch, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { columns } from "./components/columnsTableBanner";
import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import {
  fetchBannerTableData,
  getBannerById,
} from "#/redux/slices/banner/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowUpLong,
  faLongArrowUp,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faArrowDownLong,
} from "@fortawesome/free-solid-svg-icons";
import BannerForm from "./components/BannerForm";
import {
  hideDrawerBannerDetail,
  hideModalBannerForm,
  setCurrentIdBanner,
  showModalBannerForm,
} from "#/redux/slices/banner";

import DetailBanner from "./components/DetailBanner";
import {
  isApiSuccess,
  requestPayloadBanner,
  hanldeReloadTableBanner,
} from "#/utils";
import { bannerApi } from "#/services/api";
import SwitchStateBanner from "#/components/SwitchStateBanner";
import ModalVideo from "#/components/ModalVideo";

const BannerPage = () => {
  const actionRef = useRef<ActionType>();
  const {
    bannerListData,
    modalBannerFormOpen,
    drawerBannerDetailOpen,
    currentBanner,
    currentBannerDetail,
    currentIdBanner,
  } = useAppSelector((state) => state.banner);
  const [dataSource, setDatasource] = useState(bannerListData.data);
  const [activeTab, setActiveTab] = useState<string>("true");
  const [dragItem, setDragItem] = useState<boolean>(false);
  const [clickedIndex, setClickedIndex] = useState<number | any>(-1);
  const [rowData, setRowData] = useState(undefined);
  const dispatch = useAppDispatch();
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [dataSourceChange, setDatasourceChange] = useState<boolean>(false);
  const tableRef = useRef<any>(null);
  const handleDragSortEnd = (newDataSource: any) => {
    console.log("Dữ liệu:: ", newDataSource);
    setDatasource(newDataSource);
    setDatasourceChange(true);
    // message.success("Thay đổi vị trí thành công");
  };
  // console.log("dataSource:: ", dataSource);
  const dragHandleRender = (rowData: any, idx: any) => {
    return (
      <div style={{ cursor: "pointer" }} onClick={() => console.log("123")}>
        <MenuOutlined style={{ cursor: "grab", color: "gold" }} />
        &nbsp;{idx + 1} - {rowData.name}
      </div>
    );
  };

  useEffect(() => {
    const listTable = bannerListData?.data;
    setDatasource(bannerListData.data);

    hanldeReloadTableBanner({ listTable, activeTab, actionRef });
  }, [bannerListData.data]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      console.log("click");
      if (!tableRef.current?.contains(e.target)) {
        setClickedIndex(-1);
        setDragItem(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    if (isChanged) {
      setClickedIndex(-1);
      setDragItem(false);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      setIsChanged(false);
    };
  }, [isChanged]);

  function moveElementToStart(array: any, index: number) {
    if (index < 0 || index >= array.length) {
      return array;
    }

    const element = array[index];
    const newArray = [
      element,
      ...array.slice(0, index),
      ...array.slice(index + 1),
    ];

    return newArray;
  }

  function moveElementToEnd(array: any, index: number) {
    if (index < 0 || index >= array.length) {
      return array; // Nếu index không hợp lệ, trả về mảng không thay đổi
    }

    const element = array[index];
    const newArray = [
      ...array.slice(0, index),
      ...array.slice(index + 1),
      element,
    ];

    return newArray;
  }

  function handleChangePositionUpwards(array: any, index: number) {
    if (index < 0 || index >= array.length || index === 0) {
      return array;
    }

    const element = array[index];
    const newArray = [
      ...array.slice(0, index),
      ...array.slice(index + 1),
      element,
    ];

    return newArray;
  }

  function handleChangePositionDown(array: any, index: number) {
    if (index < 0 || index >= array.length) {
      return array;
    }
    const newIndex = index === array.length - 1 ? index : index + 1;

    const element = array[index];
    const newArray = [...array.slice(0, index), ...array.slice(index + 1)];

    newArray.splice(newIndex, 0, element);

    return newArray;
  }

  console.log("bannerListData.data:: ", bannerListData);
  console.log("currentId:: ", currentIdBanner);

  return (
    <PageContainer
      title={false}
      // breadcrumbRender={false}
      // title="Quản lý banner"
      childrenContentStyle={{
        paddingInline: 12,
        paddingBlock: 0,
        marginBlock: 12,
      }}
    >
      <div ref={tableRef} className={"banner-table"}>
        <DragSortTable
          headerTitle="Quản lý banner"
          size="small"
          columns={columns()}
          scroll={{ x: "auto", y: "calc(100vh - 315px)" }}
          request={async (params, sort, filter) =>
            await dispatch(
              fetchBannerTableData(
                requestPayloadBanner({ params, sort, filter, activeTab })
              )
            )
          }
          actionRef={actionRef}
          rowKey="id"
          search={false}
          footer={() => (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: 4,
              }}
            >
              Tổng {bannerListData?.total} banner
            </div>
          )}
          // pagination={{
          //   // showTotal: (total, range) =>
          //   //   `${range[0]}-${range[1]} trên ${total} banner`,
          //   showTotal: (total, range) => ` ${total} banner`,

          // }}
          pagination={false}
          // dataSource={bannerListData.data || []}
          className={"banner-table"}
          onRow={(record, index) => {
            return {
              onClick: (e) => {
                // e.preventDefault();
                // e.stopPropagation();
                setDragItem(true);
                setClickedIndex(index);
                setRowData(record);
              },
              style: {
                background: clickedIndex === index ? "#e8e8e8" : "transparent",
                zIndex: -100,
                cursor: clickedIndex === index ? "move" : "default",
              },
            };
          }}
          dataSource={dataSource}
          dragSortKey="name"
          dragSortHandlerRender={dragHandleRender}
          onDragSortEnd={handleDragSortEnd}
          onDataSourceChange={(data) => console.log("data: ", data)}
          cardBordered
          // bordered
          options={{
            search: {
              placeholder: "Nhập nội dung tìm kiếm...",
              style: {
                width: 200,
              },
              size: "small",
            },
            setting: false,
            density: false,
          }}
          toolbar={{
            menu: {
              type: "tab",
              onChange: (activeKey: any) => {
                actionRef.current?.clearSelected?.();
                actionRef.current?.reload?.();
                // setSelectedRows([]);
                console.log("activeKey", activeKey);
                setActiveTab(activeKey);
              },
              items: [
                {
                  label: (
                    <>
                      <FontAwesomeIcon icon={faEye} /> Hiển thị
                    </>
                  ),
                  key: "true",
                },
                {
                  label: (
                    <>
                      <FontAwesomeIcon icon={faEyeSlash} /> Không hiển thị
                    </>
                  ),
                  key: "false",
                },
              ],
            },
          }}
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => dispatch(showModalBannerForm())}
              size="small"
            >
              Tạo mới
            </Button>,
            <Button
              key="button2"
              icon={<SaveOutlined />}
              // type="primary"
              // style={{ background: "#07800C", borderColor: "#07800C" }}
              onClick={async () => {
                const ids = dataSource.map((value: any) => value.id);
                console.log("ids:: ", ids);
                const res = await bannerApi.rearrangePositionBanners({ ids });
                console.log("res:: ", res);
                setDatasourceChange(false);
                if (isApiSuccess(res)) {
                  message?.success("Sắp xếp lại vị trí thành công");
                } else {
                  message?.error(res?.data?.error?.message);
                }
              }}
              disabled={!dataSourceChange}
              size="small"
            >
              Lưu vị trí
            </Button>,
            <Tooltip title="Di chuyển lên">
              <Button
                key={2}
                disabled={!dragItem || clickedIndex === 0}
                size="small"
                onClick={() => {
                  const newArray = handleChangePositionUpwards(
                    dataSource,
                    clickedIndex
                  );
                  handleDragSortEnd(newArray);
                  dragHandleRender(rowData, clickedIndex);
                  setIsChanged(true);
                }}
              >
                <FontAwesomeIcon icon={faArrowUpLong} />
              </Button>
            </Tooltip>,
            <Tooltip title="Di chuyển xuống">
              <Button
                key={3}
                size="small"
                disabled={!dragItem || clickedIndex === dataSource.length - 1}
                onClick={() => {
                  const newArray = handleChangePositionDown(
                    dataSource,
                    clickedIndex
                  );
                  handleDragSortEnd(newArray);
                  dragHandleRender(rowData, clickedIndex);
                  setIsChanged(true);
                }}
              >
                <FontAwesomeIcon icon={faArrowDownLong} />
              </Button>
            </Tooltip>,
            <Tooltip title="Vị trí trên cùng">
              <Button
                key={4}
                size="small"
                disabled={!dragItem || clickedIndex === 0}
                onClick={() => {
                  const newArray = moveElementToStart(dataSource, clickedIndex);
                  handleDragSortEnd(newArray);

                  dragHandleRender(rowData, clickedIndex);
                  setIsChanged(true);
                }}
              >
                <FontAwesomeIcon icon={faAngleDoubleUp} />
              </Button>
            </Tooltip>,
            <Tooltip title="Vị trí dưới cùng">
              <Button
                key={5}
                size="small"
                disabled={!dragItem || clickedIndex === dataSource.length - 1}
                onClick={() => {
                  const newArray = moveElementToEnd(dataSource, clickedIndex);
                  handleDragSortEnd(newArray);

                  dragHandleRender(rowData, clickedIndex);
                  setIsChanged(true);
                }}
              >
                <FontAwesomeIcon icon={faAngleDoubleDown} />
              </Button>
            </Tooltip>,
          ]}
        />
      </div>
      <Modal
        open={modalBannerFormOpen}
        style={{ top: 30 }}
        footer={false}
        title={
          currentIdBanner
            ? `Cập nhật banner: ${currentBanner?.name}`
            : "Thêm mới banner"
        }
        width={"50%"}
        onCancel={() => dispatch(hideModalBannerForm())}
        destroyOnClose
      >
        <BannerForm />
      </Modal>

      <Drawer
        open={drawerBannerDetailOpen}
        onClose={() => dispatch(hideDrawerBannerDetail())}
        destroyOnClose
        width={"50%"}
        title={currentBannerDetail?.name}
        extra={[
          <Space>
            <Tooltip title="Thay đổi thông tin">
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  dispatch(getBannerById(Number(currentBannerDetail?.id)));
                  dispatch(showModalBannerForm());
                  dispatch(setCurrentIdBanner(Number(currentBannerDetail?.id)));
                }}
              ></Button>
            </Tooltip>

            <SwitchStateBanner
              checked={currentBannerDetail?.publicBanner}
              id={currentBannerDetail?.id}
              onClose={() => dispatch(hideDrawerBannerDetail())}
              // onChange={()=>handleChangeStateBanner()}
            />
          </Space>,
        ]}
        headerStyle={{
          paddingInline: 12,
          paddingBlock: 4,
        }}
        bodyStyle={{
          paddingInline: 12,
          paddingBlock: 4,
        }}
      >
        <DetailBanner />
      </Drawer>
    </PageContainer>
  );
};

export default BannerPage;
