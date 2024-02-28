import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { hideModalVideo } from "#/redux/slices/banner";
import { Modal } from "antd";

type ModalVideoProps = {
  src?: string;
};

const ModalVideo = ({ src }: ModalVideoProps) => {
  const dispatch = useAppDispatch();
  const { modalVideo } = useAppSelector((state) => state.banner);
  console.log("src:: ", src);

  return (
    <Modal
      open={modalVideo}
      onCancel={() => dispatch(hideModalVideo())}
      okButtonProps={undefined}
      cancelButtonProps={undefined}
      //   closeIcon={false}
      style={{ top: 50 }}
      bodyStyle={{
        padding: 8,
      }}
      destroyOnClose
      footer={false}
    >
      <video
        src={src}
        width={"100%"}
        height={"100%"}
        style={{ maxHeight: 500, maxWidth: 500 }}
        controls
      >
        Your browser does not support the video tag.
      </video>
    </Modal>
  );
};

export default ModalVideo;
