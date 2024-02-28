import { ProConfigProvider, ProLayout } from "@ant-design/pro-components";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { defaultRouter, workplace } from "#/config/router";
import layoutConfig from "#/config/layout";
import MenuFooter from "#/components/MenuFooter";
import { motion, AnimatePresence } from "framer-motion";
import { variants, transition } from "#/config/pageTransition";
import ProfileAccount from "#/components/ProfileAccount";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goTo = (pathName: string) => {
    const pathRouter = defaultRouter?.[pathName] || pathName;
    navigate(pathRouter);
  };

  return (
    <ProConfigProvider hashed={false}>
      <ProLayout
        {...layoutConfig}
        title=""
        route={{
          routes: workplace.children,
        }}
        location={{
          pathname,
        }}
        avatarProps={{
          render(props, defaultDom) {
            return <ProfileAccount defaultDom={defaultDom} />;
          },
          size: "large",
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return <MenuFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              goTo(item.path || "/");
            }}
          >
            {dom}
          </div>
        )}
      >
        {/* <AnimatePresence mode="wait"> */}
        <motion.div
          key={pathname}
          initial={{ scale: 0.95 }} // Trạng thái ban đầu
          animate={{ scale: 1 }} // Trạng thái khi biến mất mờ dần
          transition={{ duration: 0.98, ease: "backOut" }} // Thời gian chuyển tiếp
        >
          <Outlet />
        </motion.div>
        {/* </AnimatePresence> */}
      </ProLayout>
    </ProConfigProvider>
  );
};

export default Layout;
