import { useAppDispatch } from "#/hooks/redux";
import { LoginRequest, LoginResponseSuccessAllOfData } from "#/lib/openapi";
import { setAccountInfo } from "#/redux/slices/account";
import { authApi } from "#/services/api";
import {
  getDataApi,
  getErrorApi,
  isApiSuccess,
  saveCredentialCookie,
} from "#/utils";
// import login from "#/services/auth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  LoginFormPage,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { App, Button, Col, Row, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const onFinish = async (values: LoginRequest) => {
    try {
      const response = await authApi.login(values);
      if (isApiSuccess(response)) {
        const loginData: LoginResponseSuccessAllOfData = getDataApi(response);
        saveCredentialCookie(loginData);
        dispatch(setAccountInfo(loginData));
        navigate("/cms/posts", { replace: true });
      } else {
        message.error(getErrorApi(response).message || "Đăng nhập thất bại");
      }
    } catch (error) {
      message.error("Đăng nhập thất bại");
      console.log(error);
    }
  };

  return (
    <ProConfigProvider hashed={false}>
      <Row
      // style={{
      //   backgroundColor: "white",
      //   // height: "calc(100vh - 48px)",
      //   height: "100vh",
      //   //  margin: -24,
      //   color: "rgba(0, 0, 0, 0.65)",
      //   overflow: "hidden",
      // }}
      >
        <Col xs={0} md={17}>
          <div
            style={{
              backgroundImage: "url(/images/bg-login2.jpg)",
              height: "100vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </Col>
        <Col xs={24} md={7}>
          <LoginForm<LoginRequest>
            // backgroundImageUrl="/images/bg-login.jpg"
            logo="/icon-seabank.svg"
            subTitle="Hệ thống Quản lý Tuyển dụng SeABank"
            onFinish={onFinish}
          >
            <Tabs
              centered
              activeKey={"loginType"}
              // onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            >
              <Tabs.TabPane key={"account"} tab={"Đăng nhập tài khoản"} />
            </Tabs>
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"Tài khoản:"}
              rules={[
                {
                  required: true,
                  message: "Trường thông tin bắt buộc!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"Mật khẩu:"}
              rules={[
                {
                  required: true,
                  message: "Trường thông tin bắt buộc!",
                },
              ]}
            />
          </LoginForm>
        </Col>
      </Row>
    </ProConfigProvider>
  );
};
