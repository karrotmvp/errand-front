import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

type ToggleSwitchProps = {
  callback: (result: boolean) => void;
  defaultValue?: boolean;
};

export default function ToggleSwitch({
  callback,
  defaultValue = false,
}: ToggleSwitchProps) {
  const [toggle, setToggle] = useState(defaultValue);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    callback(toggle);
  }, [toggle, callback]);

  return (
    <ToggleSwitchWrapper onClick={handleToggle}>
      <div>{toggle ? "온" : "오푸"}</div>
    </ToggleSwitchWrapper>
  );
}

const ToggleSwitchWrapper = styled.div`
  display: flex;
`;
