import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "antd";
import * as Fa from "@fortawesome/free-solid-svg-icons";

type CheckBoxFormProps = {
  dataForm: any;
  value: any;
  index: any;
  handleChangeJobBenes: any;
  viewCheck: string;
};

const CheckBoxForm = ({
  dataForm,
  value,
  index,
  handleChangeJobBenes,
  viewCheck,
}: CheckBoxFormProps) => {
  return viewCheck === "normal" ? (
    <Checkbox
      onChange={(e) => handleChangeJobBenes(e)}
      defaultChecked={!dataForm ? true : value?.defaultChecked}
      value={value?.id}
      name={value?.name}
      key={index}
    >
      <>
        <FontAwesomeIcon
          icon={Fa[value?.icon as keyof typeof Fa] as any}
          style={{ marginRight: 8 }}
          size="1x"
        />
        {value?.name}
      </>
    </Checkbox>
  ) : viewCheck === "checkAll" ? (
    <Checkbox
      onChange={(e) => handleChangeJobBenes(e)}
      defaultChecked={true}
      value={value?.id}
      name={value?.name}
      key={index}
    >
      <>
        <FontAwesomeIcon
          icon={Fa[value?.icon as keyof typeof Fa] as any}
          style={{ marginRight: 8 }}
          size="1x"
        />
        {value?.name}
      </>
    </Checkbox>
  ) : (
    <Checkbox
      onChange={(e) => handleChangeJobBenes(e)}
      defaultChecked={false}
      value={value?.id}
      name={value?.name}
      key={index}
    >
      <>
        <FontAwesomeIcon
          icon={Fa[value?.icon as keyof typeof Fa] as any}
          style={{ marginRight: 8 }}
          size="1x"
        />
        {value?.name}
      </>
    </Checkbox>
  );
};

export default CheckBoxForm;
