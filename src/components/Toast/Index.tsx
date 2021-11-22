import Portal from "@components/Portal";
import styled from "@emotion/styled";
import { alertState } from "@store/state";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const ALERT_TIME = 1500;

interface AlertEvent extends Event {
  detail: {
    message: string;
  };
}

const Alert = () => {
  const [alert, setAlert] = useRecoilState(alertState);

  const hideAlert = () => {
    setAlert({
      isOpened: false,
      message: alert.message,
    });
  };

  const showAlert = (message: string) => {
    setAlert({
      isOpened: true,
      message,
    });
  };

  const handleAlert = (e: AlertEvent) => {
    showAlert(e.detail.message);
  };

  const setEvent = () => {
    // TODO generic에 뭘 넣어야하지?
    window.addEventListener<any>("alert", handleAlert);
  };

  useEffect(() => {
    setEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    alert.isOpened && setTimeout(hideAlert, ALERT_TIME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert.isOpened]);

  return (
    <Portal target="toast-root">
      <AlertWrapper>
        <div className={`alert__message ${!alert.isOpened && "hide-alert"}`}>
          {alert.message}
        </div>
      </AlertWrapper>
    </Portal>
  );
};

export const toast = (message: string) => {
  const alertEvent = new CustomEvent("alert", {
    detail: {
      message,
    },
  });
  window.dispatchEvent(alertEvent);
};

const AlertWrapper = styled.div`
  position: fixed;
  width: 100%;
  pointer-events: none;
  left: 0;
  bottom: 9rem;
  ${({ theme }) => theme.container}

  .alert__message {
    padding: 1.5rem;
    width: 100%;
    text-align: center;
    margin: auto;
    background-color: #333333;
    ${({ theme }) => theme.font("medium", "regular")}
    font-size: 1.8rem;
    color: white;
    border-radius: 0.8rem;
    opacity: 0.8;
    transition: 0.5s;
    transform: none;
  }

  .hide-alert {
    transition: 0.5s;
    opacity: 0;
    transform: translateY(100%);
  }
`;

export default Alert;
