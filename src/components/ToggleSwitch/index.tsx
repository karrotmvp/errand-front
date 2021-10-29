import { useEffect, useState } from "react";
import styled from "@emotion/styled";

type ToggleSwitchProps = {
  callback: (result: boolean) => void;
  defaultValue?: boolean;
  height?: number;
};

export default function ToggleSwitch({
  callback,
  defaultValue = false,
  height = 2.8,
}: ToggleSwitchProps) {
  const [toggle, setToggle] = useState(defaultValue);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    callback(toggle);
  }, [toggle, callback]);

  return (
    <ToggleSwitchWrapper onClick={handleToggle} height={height} toggle={toggle}>
      <div className="toggle__circle" />
    </ToggleSwitchWrapper>
  );
}

const ToggleSwitchWrapper = styled.div<{ height: number; toggle: boolean }>`
  background: ${({ theme }) => theme.color.grey7};

  width: ${({ height }) => `${2 * height}rem`};
  border-radius: ${({ height }) => `${height}rem`};

  padding: 0.2rem;

  .toggle__circle {
    background: ${({ toggle, theme }) =>
      toggle ? theme.color.primary : theme.color.grey4};
    width: ${({ height }) => `${height}rem`};
    height: ${({ height }) => `${height}rem`};
    border-radius: ${({ height }) => `${height}rem`};
    transition: all 0.3s;
    transform: translateX(${({ toggle }) => (toggle ? `2.4rem` : "0")});
  }
`;
