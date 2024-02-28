import { useAppDispatch } from "#/hooks/redux";
import { PostRequestUpdateBody } from "#/lib/openapi";
import { hideModalPostsDetail } from "#/redux/slices/posts";
import { updatePostsTableData } from "#/redux/slices/posts/action";

import { Switch, Tooltip } from "antd";

type SwitchStateProps = {
  checked?: string;
  id?: number;
  onChange?: () => void;
};
<Switch />;
const SwitchStateBanner = (props: SwitchStateProps) => {
  const { id, checked, onChange } = props;
  const dispatch = useAppDispatch();

  return (
    <Tooltip title="Thay đổi trạng thái">
      <Switch
        checked={checked === "ACTIVE"}
        onChange={async (checked, event) => {
          const data: PostRequestUpdateBody | any = {
            id,
            state: checked ? "ACTIVE" : "DRAFT",
          };

          const res = await dispatch(updatePostsTableData(data));
          if (res?.meta?.requestStatus === "fulfilled") {
            dispatch(hideModalPostsDetail());
          }
        }}
      />
    </Tooltip>
  );
};

export default SwitchStateBanner;
