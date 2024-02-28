import React from "react";
import { Button, Result } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import Cookies from "js-cookie";
import { HOME_PATH, LOGIN_PATH } from "#/config/constant";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const refreshToken = Cookies.get("refreshToken");
  const navigate = useNavigate();
  const goTo = () => {
    if (refreshToken) {
      navigate(HOME_PATH);
    } else {
      navigate(LOGIN_PATH);
    }
  };
  return (
    <PageContainer>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi. Trang mà bạn truy cập không tồn tại"
        extra={
          <Button type="primary" onClick={goTo}>
            {refreshToken ? "Trang chủ" : "Đăng nhập"}
          </Button>
        }
      />
    </PageContainer>
  );
};

export default NotFound;
