import { ProLayoutProps } from "@ant-design/pro-components";
import { ProSettings } from "@ant-design/pro-layout";
import { BG_LAYOUT_IMG_1, BG_LAYOUT_IMG_2, BG_LAYOUT_IMG_3 } from "./constant";

export default {
  prefixCls: "my-prefix",
  logo: "/images/logo-seabank.png",
  token: {
    colorPrimary: "#CE1126",
    header: { heightLayoutHeader: 40 },
    sider: {

      colorMenuBackground: "#CE1126",
      colorBgCollapsedButton: "#455a64",
      colorTextCollapsedButton: "#fff",
      colorTextMenuSelected: "#fff",
      colorTextMenuSecondary: "#fff",
      colorMenuItemDivider: "#ffffff5e",
      // colorTextMenuItemHover: "#fff",
      colorBgMenuItemSelected: "#ffffff5e",
    },
  },

  bgLayoutImgList: [
    {
      src: BG_LAYOUT_IMG_1,
      left: 85,
      bottom: 100,
      height: "303px",
    },
    {
      src: BG_LAYOUT_IMG_2,
      bottom: -68,
      right: -45,
      height: "303px",
    },
    {
      src: BG_LAYOUT_IMG_3,
      bottom: 0,
      left: 0,
      width: "331px",
    },
  ],
  // siderMenuType: "group",
  menu: {
    collapsedShowGroupTitle: true,
  },
  fixSiderbar: true,
  // layout: "side",
  // splitMenus: true,
} as ProLayoutProps;
