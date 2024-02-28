import { Post, Banners } from "#/lib/openapi";
import { SortOrder } from "antd/es/table/interface";
export interface BannerState {
  bannerListData:
    | {
        data: any[];
        total: number;
      }
    | any;
  modalBannerFormOpen: boolean;
  drawerBannerDetailOpen: boolean;
  currentBanner?: Banners | any;
  currentBannerDetail?: Banners | any;
  selectedRows: [];
  loadingFormBanner: boolean;
  modalVideo: boolean;
  currentIdBanner?: number;
  mimeTypeBanner?: string;
  nameBanner?: string;
}
