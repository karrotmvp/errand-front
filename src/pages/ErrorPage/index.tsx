import React from "react";
import styled from "@emotion/styled";
import Button from "@components/Button";
import { useNavigator } from "@karrotframe/navigator";
import CustomScreenHelmet from "@components/CustomScreenHelmet";

type ErrorPageProps = {
  status?: string;
};
export default function ErrorPage({ status }: ErrorPageProps) {
  const { pop } = useNavigator();

  return (
    <>
      <CustomScreenHelmet title="" />
      <ErrorPageWrapper>
        <h2>오류 발생!</h2>
        <p>
          찾고 계신 페이지에 오류가 생겼어요. <br />
          잠시 후 다시 시도해 주세요.
        </p>
        <Button
          buttonType="outline"
          size="small"
          color="primary"
          minWidth="21rem"
          onClick={() => {
            const current = localStorage.getItem("depth");
            pop(Number(current));
          }}
          rounded
        >
          메인 페이지로 돌아가기
        </Button>
      </ErrorPageWrapper>
    </>
  );
}

const ErrorPageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;

  & > h2 {
    ${({ theme }) => theme.font("large", "bold")}
  }
  & > p {
    ${({ theme }) => theme.font("large", "regular")}
    text-align: center;
    margin-top: 0.9rem;
    margin-bottom: 4rem;
  }
`;
