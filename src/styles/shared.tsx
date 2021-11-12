import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const SectionWrapper = styled.div`
  & + & {
    margin-top: 3.8rem;
  }

  .section__title {
    display: flex;
    align-items: center;

    & > h3,
    & > label {
      ${({ theme }) => theme.font("medium", "bold")}

      & + span {
        ${({ theme }) => theme.font("medium", "regular")}

        margin-left: 0.5rem;
      }
    }
  }
  .section__subscribe {
    ${({ theme }) => theme.font("medium", "regular")}
  }

  .section__content {
    margin-top: 1.1rem;
    ${({ theme }) => theme.font("medium")}
  }

  .section__disabled {
    background: ${({ theme }) => theme.color.grey6};
  }

  .color-grey {
    color: ${({ theme }) => theme.color.grey3};
  }

  input,
  select {
    border: 0.15rem solid ${({ theme }) => theme.color.grey6};
    ${({ theme }) => css`
      ${theme.font("large", "regular")}
      border-radius: 1rem;
    `}
    width: 100%;
    padding: 1.3rem 1.8rem;
    &::placeholder {
      ${({ theme }) => theme.font("large", "regular")}
      color: ${({ theme }) => theme.color.grey4};
    }
  }

  input + input {
    margin-top: 0.5rem;
  }

  input[type="checkbox"] {
    display: none;
    & + label {
      display: inline-block;
      min-width: 3.6rem;
      min-height: 3.6rem;
      border-radius: 1.8rem;
      border: 1px solid ${({ theme }) => theme.color.grey6};
    }
    &:checked + label {
      background: ${({ theme }) => theme.color.primary};
      border: none;
    }
  }

  input:disabled {
    background: ${({ theme }) => theme.color.grey8};
  }

  textarea {
    ${({ theme }) => theme.font("large", "regular")}
    height: 16rem;
    &::placeholder {
      ${({ theme }) => theme.font("large", "regular")}
      color: ${({ theme }) => theme.color.grey4};
    }
  }
`;

export const ErrorText = styled.p`
  margin-left: 2rem;
  color: ${({ theme }) => theme.color.fail};
  ${({ theme }) => theme.font("small")}
`;

export const SectionTerms = styled.div`
  display: flex;
  flex-direction: column;
  .section__terms-item {
    display: flex;
    align-items: center;

    p {
      margin-left: 1.4rem;
      ${({ theme }) => theme.font("medium")}
      span {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }
  .section__terms-item + .section__terms-item {
    margin-top: 1.5rem;
  }
`;
export const StickyPageWrpper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > *:first-child {
    flex: 1;
  }
`;

export const StickyFooter = styled.div<{ fullArea?: boolean }>`
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 99;
  ${({ fullArea }) =>
    fullArea ||
    css`
      padding: 0 2rem;
      padding-top: 1.2rem;
      padding-bottom: 3.2rem;
    `}
  background: white;
`;

export const Container = styled.div`
  ${({ theme }) => theme.container}
`;

export const TextAreaWrapper = styled.div`
  border: 0.15rem solid ${({ theme }) => theme.color.grey6};
  ${({ theme }) => theme.font("medium")}
  border-radius: 1rem;
  padding: 1.5rem 1.8rem;
  & > textarea {
    width: 100%;
    &::placeholder {
      color: ${({ theme }) => theme.color.grey4};
    }
  }

  & > div {
    text-align: right;
    color: ${({ theme }) => theme.color.grey4};
    ${({ theme }) => theme.font("medium", "regular")}
  }
`;
