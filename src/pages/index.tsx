import type { ProSettings } from "@ant-design/pro-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: "mix",
    splitMenus: true,
  });
  const navigate = useNavigate();

  const [pathname, setPathname] = useState("/list/sub-page/sub-sub-page1");
  const [num, setNum] = useState(40);
  return (
    <div
      // id="test-pro-layout"
      style={{
        height: "100vh",
      }}
    ></div>
  );
};
