import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { MutationCallbacks } from "@type/react-query";
import { DELETE } from "@utils/axios";
import { useMutation, useQueryClient } from "react-query";

const cancelApply = async (helpId: string) => {
  const { status } = await DELETE(`/help/${helpId}`);
  return status;
};

const useCancelApply = ({ onSuccess, onError }: MutationCallbacks = {}) => {
  const queryClient = useQueryClient();
  const { push, replace  } = useNavigator();

  return useMutation(cancelApply, {
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.ERRNDS);
      queryClient.invalidateQueries(KEYS.ERRND_DETAIL);
      queryClient.invalidateQueries(KEYS.APPLIERS);
      queryClient.invalidateQueries(KEYS.RESUME);
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
      const current = localStorage.getItem("depth");
      if (current === "0") {
        replace("/404");
      } else {
        push("/404");
      }
    },
  });
};

export default useCancelApply;
