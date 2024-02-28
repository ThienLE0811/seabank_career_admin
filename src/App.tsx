import { App } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { routes } from "./config/router";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { Provider } from "react-redux";
import store from "#/redux/store";
import NotFound from "./pages/404";
import EventBus from "#/lib/eventBus";
import { PRIMARY_COLOR } from "./config/constant";

dayjs.locale("vi");

function MyApp() {
  const router = createBrowserRouter(routes);
  const eventBus = new EventBus();
  eventBus.init();
  return (
    <Provider store={store}>
      <div className="">
        <ConfigProvider
          locale={viVN}
          theme={{
            token: { colorPrimary: PRIMARY_COLOR, colorLink: PRIMARY_COLOR },
          }}
        >
          <App>
            <RouterProvider router={router} fallbackElement={<NotFound />} />
          </App>
        </ConfigProvider>
      </div>
    </Provider>
  );
}

export default MyApp;
