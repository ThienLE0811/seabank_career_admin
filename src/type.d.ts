// import Event from "@ckeditor/ckeditor5-utils/src/eventinfo";
// import ClassicEditor from "@types/ckeditor__ckeditor5-editor-classic/src/classiceditor";
// import { EditorConfig } from "@types/ckeditor__ckeditor5-core/src/editor/editorconfig";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Event from "@ckeditor/ckeditor5-utils/src/eventinfo";
import { EditorConfig } from "@ckeditor/ckeditor5-core/src/editor/editorconfig";
import * as React from "react";
import { EventEmitter } from "ahooks/lib/useEventEmitter";
// declare interface CKEditorProps {
//   disabled?: boolean;
//   editor: ClassicEditor;
//   data?: string;
//   id?: string;
//   config?: EditorConfig;
//   onReady?: (editor: ClassicEditor) => void;
//   onChange?: (event: Event, editor: ClassicEditor) => void;
//   onBlur?: (event: Event, editor: ClassicEditor) => void;
//   onFocus?: (event: Event, editor: ClassicEditor) => void;
//   onError?: (event: Event, editor: ClassicEditor) => void;
// }

// declare module "@ckeditor/ckeditor5-react" {
//   const CKEditor: React.FC<CKEditorProps>;
//   export { CKEditor };
// }

declare module "#/lib/ckeditor5/build/ckeditor" {
  const Editor: ClassicEditor;

  export { Editor };
}
declare global {
  interface Window {
    event$: EventEmitter<any>;
  }
}

declare module "@ckeditor/ckeditor5-react" {
  const CKEditor: React.FunctionComponent<{
    disabled?: boolean;
    editor: typeof ClassicEditor;
    data?: string;
    id?: string;
    config?: EditorConfig;
    onReady?: (editor: ClassicEditor) => void;
    onChange?: (event: Event, editor: ClassicEditor) => void;
    onBlur?: (event: Event, editor: ClassicEditor) => void;
    onFocus?: (event: Event, editor: ClassicEditor) => void;
    onError?: (event: Event, editor: ClassicEditor) => void;
  }>;
  export { CKEditor };
}
