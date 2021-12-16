import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { MutationCallbacks } from "@type/react-query";
import { PATCH } from "@utils/axios";
import { useMutation, useQueryClient } from "react-query";

const completeErrand = async (errandId: string) => {
  const { status } = await PATCH(`/errand/${errandId}/complete`);
  return status;
};
const useCompleteErrand = ({ onSuccess, onError }: MutationCallbacks = {}) => {
  const queryClient = useQueryClient();
  const { push, replace } = useNavigator();

  return useMutation(completeErrand, {
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.ERRNDS);
      queryClient.invalidateQueries(KEYS.ERRND_DETAIL);
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

export default useCompleteErrand;
