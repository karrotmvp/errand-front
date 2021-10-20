import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const InputWrapper = styled.div`
  & + & {
    margin-top: 4rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 0.6rem;

    label {
      ${({ theme }) => theme.font("small", "bold")}
    }
  }

  .section-terms {
    display: flex;
    flex-direction: column;
    &__item {
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
  }

  .section-terms__item + .section-terms__item {
    margin-top: 1.5rem;
  }

  .section-disabled {
    background: ${({ theme }) => theme.color.grey6};
  }

  .color-grey {
    color: ${({ theme }) => theme.color.grey3};
  }

  input,
  select,
  textarea {
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
