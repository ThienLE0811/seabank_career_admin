import { LOGIN_PATH } from "#/config/constant";
import {
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu, MenuProps, message } from "antd";
import { useNavigate } from "react-router-dom";

// import { doLogout } from '#/hooks/keycloak';
// import { BiLogOut, BiSupport } from 'react-icons/bi';
// import { AiOutlineLogout } from 'react-icons/ai';
// import { BsPersonFillExclamation } from 'react-icons/bs';
function ProfileAccount({ defaultDom }: any) {
  const navigate = useNavigate();
  function logout() {
    navigate(LOGIN_PATH);
  }
  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: "Thông tin tài khoản",
      // icon: <BsPersonFillExclamation />,
    },
    {
      key: "support",
      label: "Trợ giúp",
      // icon: <BiSupport />,
    },
    {
      key: "divider",
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      // icon: <AiOutlineLogout />,
      danger: true,
      onClick: logout,
    },
  ];

  return <Dropdown menu={{ items }}>{defaultDom}</Dropdown>;
}

export default ProfileAccount;
