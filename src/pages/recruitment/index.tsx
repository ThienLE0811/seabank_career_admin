import { useAppDispatch, useAppSelector } from "#/hooks/redux";
import { hideModalRecruitmentsForm } from "#/redux/slices/recruitment";
import { PageContainer } from "@ant-design/pro-components";
import { useState } from "react";
import RecruitmentForm from "./components/RecruitmentForm";
import RecruitmentModalForm from "../recruitmentManager/components/RecruitmentModalForm";

export default () => {
  const dispatch = useAppDispatch();
  const { modalRecruitmentFormOpen } = useAppSelector(
    (state) => state.recruitments
  );

  return (
    <PageContainer
      childrenContentStyle={{
        padding: 12,
      }}
      breadcrumbRender={false}
      title={false}
      footer={[]}
    >
      <RecruitmentForm></RecruitmentForm>
      <RecruitmentModalForm
        modalProps={{
          open: modalRecruitmentFormOpen,
          destroyOnClose: true,
        }}
        onCancel={() => {
          dispatch(hideModalRecruitmentsForm());
        }}
      ></RecruitmentModalForm>
    </PageContainer>
  );
};
