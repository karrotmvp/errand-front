import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const SectionWrapper = styled.div<{ isError?: boolean }>`
  margin-bottom: 3.8rem;

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
    span {
      color: ${({ theme }) => theme.color.primary};
    }
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

  input:not(.price),
  select {
    border: 0.12rem solid
      ${({ theme, isError }) =>
        isError ? theme.color.fail : theme.color.grey6};
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

  select {
    -webkit-appearance: none;
    appearance: none;
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
      & > svg {
        fill: ${({ theme }) => theme.color.grey8};
        stroke: ${({ theme }) => theme.color.grey6};
        stroke-width: 0.05rem;
      }
    }
    &:checked + label {
      & > svg {
        fill: ${({ theme }) => theme.color.primary};
        stroke: white;
      }
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

    & > p {
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
      padding: 1rem 2rem;
    `}
  background: white;
  border-top: 0.075rem solid ${({ theme }) => theme.color.grey7};
`;

export const Container = styled.div`
  ${({ theme }) => theme.container}
`;

export const PriceInput = styled.div<{ isError?: boolean }>`
  border: 0.12rem solid
    ${({ theme, isError }) => (isError ? theme.color.fail : theme.color.grey6)};

  ${({ theme }) => css`
    ${theme.font("large", "regular")}
    border-radius: 1rem;
  `}

  padding: 1.3rem 1.8rem;

  position: relative;
  display: flex;

  &::before {
    color: ${({ theme }) => theme.color.grey4};
    content: "₩";
    margin-right: 0.6rem;
  }

  &:focus {
    border: 2px solid black;
  }

  input {
    flex: 1;
    padding-right: 1rem;
    &::placeholder {
      ${({ theme }) => theme.font("large", "regular")}
      color: ${({ theme }) => theme.color.grey4};
    }
  }
`;

export const TextAreaWrapper = styled.div<{
  isError: boolean;
  textLength: number;
}>`
  border: 0.12rem solid
    ${({ theme, isError }) => (isError ? theme.color.fail : theme.color.grey6)};
  ${({ theme }) => theme.font("medium")}
  border-radius: 1rem;
  padding: 0.8rem;
  & > textarea {
    padding: 0 0.8rem;
    width: 100%;

    &::placeholder {
      color: ${({ theme }) => theme.color.grey4};
    }
  }

  & > .textarea__counter {
    padding: 0rem 0.8rem 0.8rem 0;
    text-align: right;
    color: ${({ theme, textLength }) =>
      textLength === 500 ? theme.color.primary : theme.color.grey4};
    ${({ theme }) => theme.font("medium", "regular")}
  }
`;

export const InputTooltip = styled.div`
  background: ${({ theme }) => theme.color.grey8};
  ${({ theme }) => theme.font("small", "regular")}
  padding: 1rem 1.4rem;
  border-radius: 0.8rem;
  margin-bottom: 1rem;

  & > span {
    ${({ theme }) => css`
      ${theme.font("small", "medium")}
      color : ${theme.color.primary}
    `}
`;
