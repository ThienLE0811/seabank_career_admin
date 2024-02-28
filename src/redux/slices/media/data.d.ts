import { FileUpload } from "#/lib/openapi";

export interface MediaState {
  mediaListData: {
    data: any[];
    total: number;
  };
  showDetailMediaFile: boolean;
  currentMediaFile?: FileUpload;
  showModalUploadMedia: boolean;
}
