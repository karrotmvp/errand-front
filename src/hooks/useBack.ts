import { useEffect } from "react";
import { useHistory } from "react-router";

const useBack = (callback: any, isBlock?: false) => {
  const history = useHistory();
  useEffect(() => {
    return history.block((location, action) => {
      if (action === "POP") {
        callback();
        return isBlock;
      }
      return undefined;
    });
  }, [history, callback, isBlock]);
};

export default useBack;
