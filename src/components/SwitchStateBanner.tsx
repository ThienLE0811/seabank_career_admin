import { useAppDispatch } from "#/hooks/redux";
import { updateBanners } from "#/redux/slices/banner/action";
import { Switch, Tooltip } from "antd";

type SwitchStateProps = {
  checked?: boolean;
  id?: number;
  onClose?: () => void;
};
<Switch />;
const SwitchStateBanner = (props: SwitchStateProps) => {
  const { id, checked, onClose } = props;
  const dispatch = useAppDispatch();

  return (
    <Tooltip title="Thay đổi trạng thái">
      <Switch
        checked={checked}
        onChange={async (checked, event) => {
          console.log("check:: ", checked);
          const data = {
            id,
            publicBanner: checked,
          };

          const res = await dispatch(updateBanners(data));
          console.log("res:: ", res);
          if (res?.meta.requestStatus === "fulfilled") {
            onClose?.();
          }
        }}
      />
    </Tooltip>
  );
};

export default SwitchStateBanner;
