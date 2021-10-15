import styled from "@emotion/styled";
import { ErrandStatus } from "@type/client";
import { PushType } from "@type/lib";
import { SimpleUser } from "@type/response";

interface ItemFooterProps {
  status: ErrandStatus;
  push: PushType;
  helper?: SimpleUser;
}

export default function ItemFooter({ status, helper, push }: ItemFooterProps) {
  if (status === "complete") {
    return <></>;
  }

  const moveToHelperList = () => {
    push("/helperlist");
  };
  const moveToUserDetail = (userId: number) => () => {
    push(`/users/${userId}`);
  };

  return (
    <ItemFooterWrapper>
      {status === "wait" ? (
        <>
          <p className="item-footer__title wait">도움받을 분을 선택해주세요.</p>
          <div className="item-footer__button" onClick={moveToHelperList}>
            <span>선택하기</span>
            <span>{">"}</span>
          </div>
        </>
      ) : (
        <>
          <p className="item-footer__title proceed">
            매칭되어 현재 심부름이 진행중이에요.
          </p>
          <div
            className="item-footer__button"
            onClick={moveToUserDetail(helper?.id ?? -1)}
          >
            <span>{helper?.nickname}님 정보보기</span>
            <span>{">"}</span>
          </div>
        </>
      )}
    </ItemFooterWrapper>
  );
}

const ItemFooterWrapper = styled.div`
  margin-top: 1.4rem;
  .item-footer__title {
    ${({ theme }) => theme.font.size.small};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    margin-bottom: 0.5rem;

    &.wait {
      color: ${({ theme }) => theme.color.fail};
    }
    &.proceed {
      color: ${({ theme }) => theme.color.primary};
    }
  }
  .item-footer__button {
    background: ${({ theme }) => theme.color.grey1};
    ${({ theme }) => theme.font.size.medium};
    font-weight: ${({ theme }) => theme.font.weight.medium};

    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1.6rem;
    border-radius: 1rem;
  }
`;
