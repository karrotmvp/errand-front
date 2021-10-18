import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { ErrandStatus } from "@type/client";
import { SimpleUser } from "@type/response";

type ItemFooterProps = {
  status: ErrandStatus;
  helper?: SimpleUser;
};

export default function ItemFooter({ status, helper }: ItemFooterProps) {
  const path = status === "wait" ? "/applier-list" : `/users/${helper?.id}`;
  const moveTo = usePush(path);

  if (status === "complete") {
    return <></>;
  }

  return (
    <ItemFooterWrapper>
      <div className="item-footer__button" onClick={moveTo}>
        <div>
          {status === "wait" ? (
            <div>지원자를 선택해주세요.</div>
          ) : (
            <>
              <div>지원자 보기</div>
              <div>{helper?.nickname}</div>
            </>
          )}
        </div>
        <div>{">"}</div>
      </div>
    </ItemFooterWrapper>
  );
}

const ItemFooterWrapper = styled.div`
  margin-top: 1.4rem;
  .item-footer__title {
    ${({ theme }) => theme.font("small", "medium")}

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
    ${({ theme }) => theme.font("medium")}

    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1.6rem;
    border-radius: 1rem;
  }
`;
