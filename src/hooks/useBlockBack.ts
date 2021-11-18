import { useEffect } from "react";
import { useHistory } from "react-router";

const useBlockBack = (callback: any) => {
  const history = useHistory();
  useEffect(() => {
    return history.block((location, action) => {
      if (action === "POP") {
        callback();
        return false;
      }
      return undefined;
    });
  }, [history, callback]);
};

export default useBlockBack;
