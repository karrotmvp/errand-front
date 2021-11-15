import React, { HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { Theme, css } from "@emotion/react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  buttonType: "outline" | "contained";
  color: "primary" | "grey";
  fullWidth?: boolean;
  children: React.ReactNode;
  form?: string;
  width?: string;
  rounded?: boolean;
  size?: "small" | "medium";
  disabled?: boolean;
  padding?: string;
}

export default function Button({ children, ...props }: ButtonProps) {
  return <ButtonWrapper {...props}>{children}</ButtonWrapper>;
}

const ButtonWrapper = styled.button<ButtonProps>`
  ${({ padding }) =>
    padding
      ? css`
          padding: ${padding};
        `
      : css`
          padding: 1.2rem 1.8rem 1.4rem 1.8rem;
        `}
  ${({ rounded }) =>
    rounded &&
    css`
      border-radius: 0.8rem;
    `}

  ${({ theme, size }) =>
    size === "small"
      ? theme.font("large", "medium")
      : theme.font("xlarge", "medium")}

  color: ${({ theme, color }) => {
    return color === "primary"
      ? theme.color.primary
      : color === "grey"
      ? theme.color.grey5
      : "black";
  }};

  width: ${({ fullWidth, width }) => {
    return fullWidth ? "100%" : width ?? "auto";
  }};

  ${({ buttonType, color, theme, disabled }) =>
    buttonType === "contained" &&
    css`
      color: ${color === "primary" ? "white" : "black"};
      background: ${disabled ? theme.color.grey6 : getColor(color, theme)};
    `}
  ${({ buttonType, color, theme }) =>
    buttonType === "outline" &&
    css`
      border: 1px solid ${getColor(color, theme)};
    `}
`;

const getColor = (color: string, theme: Theme) => {
  return color === "primary"
    ? theme.color.primary
    : color === "grey"
    ? theme.color.grey5
    : "white";
};
