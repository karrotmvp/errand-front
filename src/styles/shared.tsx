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
      ${({ theme }) => theme.font("small", "bold")}
      & + span {
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
  select,
  textarea {
    margin-top: 1.1rem;
    border: 0.1rem solid ${({ theme }) => theme.color.grey6};
    ${({ theme }) => css`
      ${theme.font("medium")}
      border-radius: 1rem;
    `}
    width: 100%;
    padding: 1rem 1.8rem;
    &::placeholder {
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
    height: 16rem;
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
export const StickyFooter = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 1.2rem 2rem;
  background: white;

  button {
    ${({ theme }) => theme.font("medium")}
    color: white;
    padding: 1.4rem 0;
    border-radius: 0.8rem;
    width: 100%;
    background: ${({ theme }) => theme.color.primary};
  }
`;

export const Container = styled.div`
  ${({ theme }) => theme.container}
`;
