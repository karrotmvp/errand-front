import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { MutationCallbacks } from "@type/react-query";
import { DELETE } from "@utils/axios";
import { useMutation, useQueryClient } from "react-query";

const deleteErrand = async (errandId: string) => {
  const { status } = await DELETE(`/errand/${errandId}`);
  return status;
};

const useDeleteErrand = ({ onSuccess, onError }: MutationCallbacks = {}) => {
  const queryClient = useQueryClient();
  const { push } = useNavigator();
  
  return useMutation(deleteErrand, {
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.ERRNDS);
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
      push("/404");
    },
  });
};

export default useDeleteErrand;
