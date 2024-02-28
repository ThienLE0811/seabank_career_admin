// import { UPLOAD_SERVICE } from "#/config/constant";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// // import type DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
// // import type { DowncastWriter } from "@ckeditor/ckeditor5-engine";
// // import "@ckeditor/ckeditor5-build-decoupled-document/build/translations/vi";
// // import * as ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
// //@ts-ignore
// import { CKEditor, CKEditorProps } from "@ckeditor/ckeditor5-react";
// // import { SimpleUploadAdapter } from "@ckeditor/ckeditor5-upload";
// import Cookies from "js-cookie";
// // import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
// import message from "#/hooks/message";
// import { notification } from "antd";
// import { useEffect, useRef } from "react";

// type EditorProps = {
//   minHeight?: string;
//   maxHeight?: string;
//   initiateData?: string;
//   onReady?: (editor: any) => void;
//   onChange?: (event: any, editor: ClassicEditor) => void;
//   onBlur?: () => void;
//   onFocus?: () => void;
// };

// const Editor: React.FC<EditorProps> = (props) => {
//   const {
//     initiateData,
//     onBlur,
//     onFocus,
//     onChange,
//     onReady,
//     minHeight,
//     maxHeight,
//   } = props;
//   const accessToken = Cookies.get("access_token");
//   // console.log("accessToken:: ", accessToken);
//   const headers = new Headers();
//   if (accessToken) {
//     headers.append("Authorization", `Bearer ${accessToken}`);
//   }

//   let editorInstance: React.MutableRefObject<undefined | any> = useRef();

//   const editorConfiguration = {
//     toolbar: ["bold", "italic"],
//   };

//   // fetch(UPLOAD_SERVICE, {
//   //   method: "post",
//   //   body: body,
//   //   // headers: {
//   //   //   Authorization: Cookies.get("access_token"),
//   //   // },
//   //   headers: headers,
//   // })
//   //   .then((res) => res.json())
//   //   .then((data) => {
//   //     console.log("res:: ", data);
//   //     resolve({ default: data?.data?.url });
//   //   })
//   //   .catch((err) => {
//   //     reject(err);
//   //   });

//   // const [ready, setReady] = useState<boolean>(false)
//   function uploadAdapter(loader: any) {
//     return {
//       upload: () => {
//         return new Promise((resolve, reject) => {
//           const body = new FormData();
//           loader.file.then(async (file: File) => {
//             body.append("file", file);

//             try {
//               const response = await fetch(UPLOAD_SERVICE, {
//                 method: "post",
//                 body: body,
//                 headers: headers,
//               });
//               console.log("response:: ", response);
//               if (!response.ok) {
//                 throw new Error("Lỗi khi tải lên ảnh.");
//               }

//               const data = await response.json();
//               if (data.success) {
//                 console.log("res:: ", data);
//                 resolve({ default: data?.data?.url });
//               } else {
//                 notification.error({
//                   message:
//                     data?.error?.message || "Tải ảnh lên không thành công!",
//                 });
//                 reject();
//               }
//             } catch (error) {
//               reject(error);
//             }
//           });
//         });
//       },
//     };
//   }

//   // function uploadPlugin(editor: DecoupledEditor) {
//   //   // editor.execute( 'insertImage', { source: 'http://url.to.the/image' } );
//   //   editor.plugins?.get?.("FileRepository")?.createUploadAdapter = (
//   //     loader: any
//   //   ) => {
//   //     return uploadAdapter(loader);
//   //   };
//   // }

//   // function processEmbedUrl(url: string): string | null {
//   //   if (url.includes("youtube.com")) {
//   //     const videoId = url.split("v=")[1];
//   //     if (videoId) {
//   //       return `https://www.youtube.com/embed/${videoId}`;
//   //     }
//   //   }
//   //   return null;
//   // }

//   // function mediaAdapter(loader: any) {
//   //   return {
//   //     embed: (url: string) => {
//   //       return new Promise((resolve, reject) => {
//   //         // Xử lý logic của bạn để nhúng video từ URL vào đây
//   //         // Ví dụ: Gửi yêu cầu đến máy chủ để nhúng video và trả về URL nhúng
//   //         const embedUrl = processEmbedUrl(url);

//   //         if (embedUrl) {
//   //           resolve({ embed: embedUrl });
//   //         } else {
//   //           reject(new Error("Không thể nhúng video từ URL."));
//   //         }
//   //       });
//   //     },
//   //   };
//   // }

//   // function mediaPlugin(editor: any) {
//   //   editor.plugins.get("MediaEmbed").createMediaEmbed = (url: string) => {
//   //     return mediaAdapter(url);
//   //   };
//   // }

//   function setStyleEditor(write: any, editor: any) {
//     minHeight &&
//       write.setStyle(
//         "min-height",
//         minHeight,
//         editor.editing.view.document.getRoot() as any
//       );

//     maxHeight &&
//       write.setStyle(
//         "max-height",
//         maxHeight,
//         editor.editing.view.document.getRoot() as any
//       );
//   }

//   // useEffect(() => {
//   //   return () => {
//   //     editorInstance.current?.destroy();
//   //   };
//   // }, []);

//   return (
//     <>
//       <CKEditor
//         editor={ClassicEditor}
//         // config={editorConfiguration}
//         data={initiateData || ""}
//         onError={(error, { willEditorRestart }) => {
//           // If the editor is restarted, the toolbar element will be created once again.
//           // The `onReady` callback will be called again and the new toolbar will be added.
//           // This is why you need to remove the older toolbar.
//           if (willEditorRestart) {
//             editorInstance.current.ui.view.toolbar.element.remove();
//           }
//         }}
//         onReady={(editor: ClassicEditor) => {
//           onReady?.(editor);
//           console.log("editor:: ", editor);
//           editorInstance.current = editor;
//           // You can store the "editor" and use when it is needed.
//           editor.editing.view.change((write) => {
//             const rootElement = editor.editing.view.document.getRoot() as any;
//             write.setStyle("min-height", "300px", rootElement);
//           });
//           // @ts-ignore
//           editor.ui
//             .getEditableElement()
//             .parentElement.insertBefore(
//               editor.ui.view.toolbar.element as Node,
//               editor.ui.getEditableElement() as HTMLElement
//             );
//         }}
//         onChange={onChange}
//         onBlur={onBlur}
//         onFocus={onFocus}
//       />
//     </>
//   );
// };

// export default Editor;

import { UPLOAD_SERVICE } from "#/config/constant";
// import ConfigEditor from "@/lib/ckeditor5";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ClassicEditor from "#/lib/ckeditor5";
//@ts-ignore
import { CKEditor, CKEditorProps } from "@ckeditor/ckeditor5-react";
import { SimpleUploadAdapter } from "@ckeditor/ckeditor5-upload";
import Cookies from "js-cookie";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import message from "#/hooks/message";
import { notification } from "antd";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";

type EditorProps = {
  initiateData?: string;
  onReady?: (editor: ClassicEditor) => void;
  onChange?: (event: any, editor: ClassicEditor) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

const Editor: React.FC<EditorProps> = (props) => {
  const { initiateData, onBlur, onFocus, onChange, onReady } = props;
  const accessToken = Cookies.get("access_token");
  console.log("accessToken:: ", accessToken);
  const headers = new Headers();
  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }
  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then(async (file: File) => {
            body.append("file", file);

            try {
              const response = await fetch(UPLOAD_SERVICE, {
                method: "post",
                body: body,
                headers: headers,
              });
              console.log("response:: ", response);
              if (!response.ok) {
                throw new Error("Lỗi khi tải lên ảnh.");
              }

              const data = await response.json();
              if (data.success) {
                console.log("res:: ", data);
                resolve({ default: data?.data?.url });
              } else {
                notification.error({
                  message:
                    data?.error?.message || "Tải ảnh lên không thành công!",
                });
                reject();
              }
            } catch (error) {
              reject(error);
            }
          });
        });
      },
    };
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  }

  console.log("initialdata:: ", initiateData);

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        extraPlugins: [uploadPlugin],
        // plugins: [ImageResize],
        mediaEmbed: { previewsInData: true },
      }}
      data={initiateData || ""}
      onReady={(editor: ClassicEditor) => {
        onReady?.(editor);
        console.log("editor:: ", editor);
        // You can store the "editor" and use when it is needed.

        // editor.ui.view.editable.editableElement?.style.height = '300px';
        //@ts-ignore

        editor?.ui?.getEditableElement().parentElement.insertBefore(
          //@ts-ignore
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
      }}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

export default Editor;
