import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { MutationCallbacks } from "@type/react-query";
import { PATCH } from "@utils/axios";
import { useMutation, useQueryClient } from "react-query";

const selectHelper = async ({
  errandId,
  helperId,
}: {
  errandId: string;
  helperId: number;
}) => {
  const { status } = await PATCH(`/errand/${errandId}/helper`, { helperId });
  return status;
};

export const useSelectHelper = ({
  onSuccess,
  onError,
}: MutationCallbacks = {}) => {
  const queryClient = useQueryClient();
  const { push , replace } = useNavigator();

  return useMutation(selectHelper, {
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

export default useSelectHelper;
