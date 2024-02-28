// import { UploadOutlined } from "@ant-design/icons";
// import { UploadFile } from "antd/lib/upload/interface";
// import { ProFormUploadButton } from "@ant-design/pro-form";
// import { useState } from "react";
// import { CMS_UPLOAD } from "#/config/constant";
// import { BASE_URL_PORTAL } from "#/config/api";
// import { postsApi, uploadApi } from "#/services/api";
// import { message, notification } from "antd";
// import { getDataApi, getErrorApi, isApiSuccess } from "#/utils";
// import { UploadFileResponse } from "#/lib/openapi";
// import { ProForm, ProFormUploadDragger } from "@ant-design/pro-components";

// interface nameUploadFile {
//   nameUploadFile: string;
//   labelUploadFile?: string;
//   accept?: string;
// }

// const handleUpload = async (options: RcCustomRequestOptions) => {
//   // npm i rc-upload
//   try {
//     const res = await uploadApi.adminUploadServiceV1CmsUploadPost(options.file);
//     // const uploadFileData: UploadFileResponse = getDataApi(res);
//     // uploadApi.adminUploadCmsPost(options.file);
//     if (isApiSuccess(res)) {
//       notification.success({
//         message: "Upload file thành công",
//       });

//       console.log("Promise.resolve::: ", Promise.resolve());
//       return Promise.resolve();
//     } else {
//       message.error(getErrorApi(res).message || "Thao tác không thành công");
//       return Promise.reject();
//     }
//   } catch (e) {
//     message.error("Upload file không thành công");
//   }
// };

// const UpLoadFile: React.FC<nameUploadFile> = ({
//   nameUploadFile,
//   labelUploadFile,
// }) => {
//   //   const [bannerFileList, setBannerFileList] = useState<UploadFile<any>[]>([]);
//   const [bannerFile, setBannerFile] = useState<UploadFile<any> | null>(null);
//   const [formRef] = ProForm.useForm();

//   return (
//     <ProFormUploadButton
//       fieldProps={{
//         listType: "picture-card",
//         multiple: false,

//         name: "file",
//         maxCount: 1,
//         fileList: bannerFile ? [bannerFile] : [],
//         onRemove: () => setBannerFile(null),
//         customRequest: handleUpload,
//       }}
//       title="Chọn tệp"
//       accept="image/*"
//       name={nameUploadFile}
//       label={labelUploadFile}
//       icon={<UploadOutlined />}
//     />
//   );
// };

// export default UpLoadFile;

import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import { ProFormUploadButton } from "@ant-design/pro-form";
import { useEffect, useState } from "react";
import _ from "lodash";
import {
  CMS_UPLOAD,
  MAX_FILE_SIZE_UPLOAD_FILESTORE,
  TYPE_FILE_UPLOAD_BANNER,
} from "#/config/constant";
import { BASE_URL_PORTAL } from "#/config/api";
import { postsApi, uploadApi } from "#/services/api";
import { message, notification, Upload, Image, Modal, Spin } from "antd";
import {
  getBase64,
  getDataApi,
  getErrorApi,
  isApiSuccess,
  readFileToUnit8Array,
} from "#/utils";
import { Banners, UploadFileResponse } from "#/lib/openapi";
import { ProForm, ProFormUploadDragger } from "@ant-design/pro-components";
import Cookies from "js-cookie";
import { isArray } from "util";
import { useAppDispatch } from "#/hooks/redux";
import { setMimeTypeBanner, setNameBanner } from "#/redux/slices/banner";

interface UploadFileStoreProps {
  nameUploadFile: string;
  iconUploadFile: string;
  labelUploadFile: string;
  accept?: string;
  dataFile?: string;
  iconFile?: string;
  requiredFile?: boolean;
}

const UpLoadFile: React.FC<UploadFileStoreProps> = ({
  nameUploadFile,
  iconUploadFile,
  labelUploadFile,
  accept,
  dataFile,
  iconFile,
  requiredFile,
}) => {
  const bannerFileItem = {
    url: dataFile,
  };
  const [bannerFile, setBannerFile] = useState<[] | any>(
    dataFile ? [bannerFileItem] : []
  );
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const [originFileObj, setOriginFileObj] = useState<File | any>(undefined);
  const [formRef] = ProForm.useForm();
  const maxFileSize = MAX_FILE_SIZE_UPLOAD_FILESTORE;
  const [filePreview, setFilePreview] = useState<any>(undefined);
  const [visibleImage, setVisibleImage] = useState<boolean>(false);
  const [visiblePdf, setVisiblePdf] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const accessToken = Cookies.get("access_token");
  const headers = new Headers();
  const authorization = `Bearer ${accessToken}`;

  useEffect(() => {
    if (dataFile) {
      setOriginFileObj({
        uid: "rc",
        type: "image",
        name: "1",
        originFileObj: "",
        thumbUrl: dataFile,
      });
    }
  }, []);

  const handlePreview = async (file: UploadFile) => {
    console.log("file type", file);
    try {
      switch (true) {
        case _.includes(file?.type, "image"):
          const fileBase64 = await getBase64(file as any);
          setFilePreview(fileBase64);
          setVisibleImage(true);
          return;
        case _.includes(file?.type, "video"):
          const fileBase642 = await getBase64(file.originFileObj as File);
          setFilePreview(fileBase642);
          setVisibleImage(true);
          return;

        case _.includes(file?.type, "pdf"):
          const fileUint8Array = await readFileToUnit8Array(
            file.originFileObj as File
          );
          setFilePreview(fileUint8Array);
          setVisiblePdf(true);
          return;
      }
    } catch (error: any) {
      message.error(error?.toString());
    }
  };

  const handleUpload = async (options: any) => {
    // npm i rc-upload
    try {
      setLoadingUpload(true);
      console.log("options:: ", options);
      const res = await uploadApi.adminUploadServiceV1CmsUploadPost(
        options.file as any
      );

      if (isApiSuccess(res)) {
        setLoadingUpload(false);
        message.success("Tải file lên thành công");

        const mimeType = options?.file.type
          .slice(0, options?.file.type.indexOf("/"))
          .toUpperCase();
        const nameBanner = options?.file?.name;
        dispatch(setNameBanner(nameBanner));
        dispatch(setMimeTypeBanner(mimeType));
        setOriginFileObj(options.file);
        setBannerFile([getDataApi(res)]);
        return Promise.resolve();
      } else {
        message.error(
          getErrorApi(res).message || "Tải file lên không thành công"
        );
        setLoadingUpload(false);
        return Promise.reject();
      }
    } catch (e) {
      setLoadingUpload(false);
      message.error("Tải file lên không thành công");
    }
  };

  return (
    <>
      <ProFormUploadButton
        title={!loadingUpload ? "Chọn tệp" : false}
        disabled={!loadingUpload ? false : true}
        accept={accept}
        required={requiredFile}
        max={1}
        name={nameUploadFile}
        label={labelUploadFile}
        transform={(e) => {
          const getValue = Array.isArray(e)
            ? bannerFile?.map((val: any) => {
                return {
                  thumbImage: val?.url,
                  iconUrl: val?.iconUrl,
                };
              })
            : e;

          const value = Array.isArray(e) ? getValue?.at(0) : getValue;
          return {
            [nameUploadFile]: value?.thumbImage || value,
            [iconUploadFile]: value?.iconUrl || iconFile,
          };
        }}
        icon={!loadingUpload ? <UploadOutlined /> : <Spin />}
        extra={`Tối đa ${maxFileSize}MB/tệp. Định dạng Ảnh/Video.`}
        fileList={bannerFile}
        fieldProps={{
          listType: "picture-card",
          multiple: false,
          headers: {
            Authorization: authorization,
          },
          method: "POST",
          onPreview: () => handlePreview(originFileObj),
          maxCount: 1,
          name: "file",
          onRemove: () => setBannerFile([]),

          customRequest: handleUpload,
          beforeUpload(file) {
            console.log("file", file);
            const isAllowUpload =
              TYPE_FILE_UPLOAD_BANNER.indexOf(file.type) >= 0;

            if (file.size / 1000 / 1000 > maxFileSize || !isAllowUpload) {
              !isAllowUpload
                ? message.error("File không đúng định dạng")
                : message.error(`Tệp không được vượt quá ${maxFileSize}MB`);
              return Upload.LIST_IGNORE;
            } else {
              return file;
            }
          },
          onChange: (info) => {
            console.log("info", info);

            if (_.includes(["done", "error"], info.file.status)) {
              // onChange?.(info);
              if (
                info.file?.response?.success === true &&
                info.file.status !== "error"
              ) {
                setBannerFile(info.file);
                message.success("Tải tệp lên thành công!");
              } else {
                setBannerFile([]);
                notification.error({
                  message: "Có lỗi xảy ra khi tải lên tệp đính kèm!",
                  description: info.file?.response?.error?.message,
                });
              }
            }
          },
          openFileDialogOnClick: true,
        }}
        action="https://sb-career-gw.onbank.vn/admin/upload-service/v1/cms-upload"
      />
      <Image
        preview={{
          visible: visibleImage,
          onVisibleChange: (value) => {
            setVisibleImage(value);
            if (value == false) {
              setFilePreview(undefined);
            }
          },
          src: filePreview,
        }}
        hidden
      />
      {/* <Modal
        title="Xem video"
        open={visibleImage}
        onCancel={() => setVisibleImage(false)}
        footer={null}
      >
        <video controls width="100%" height="auto">
          <source src={filePreview} type={filePreview?.type} />
          Your browser does not support the video tag.
        </video>
      </Modal> */}
    </>
  );
};

export default UpLoadFile;
