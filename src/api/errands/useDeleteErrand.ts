import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { MutationCallbacks } from "@type/react-query";
import { CustomError, DELETE } from "@utils/axios";
import { useMutation, useQueryClient } from "react-query";

const deleteErrand = async (errandId: string) => {
  const { status } = await DELETE(`/errand/${errandId}`);
  return status;
};

const useDeleteErrand = ({ onSuccess, onError }: MutationCallbacks = {}) => {
  const queryClient = useQueryClient();
  const { push, replace } = useNavigator();

  return useMutation(deleteErrand, {
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.ERRNDS);
      onSuccess && onSuccess();
    },
    onError: (e: CustomError) => {
      onError && onError();
      const current = localStorage.getItem("depth");
      if (current === "0") {
        replace(`/error?status=${e.status}`);
      } else {
        push(`/error?status=${e.status}`);
      }
    },
  });
};

export default useDeleteErrand;
