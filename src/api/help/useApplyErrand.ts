import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { MutationCallbacks } from "@type/react-query";
import { ApplyHelperRequestBody } from "@type/request";
import { POST } from "@utils/axios";
import { useMutation, useQueryClient } from "react-query";

const applyErrand = async (requestBody: ApplyHelperRequestBody) => {
  const { data } = await POST(`/help`, requestBody);
  return data;
};

const useApplyToErrand = ({ onSuccess, onError }: MutationCallbacks = {}) => {
  const queryClient = useQueryClient();
  const { push } = useNavigator();

  return useMutation(applyErrand, {
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries(KEYS.ERRNDS);
      queryClient.invalidateQueries(KEYS.ERRND_DETAIL);
      queryClient.invalidateQueries(KEYS.APPLIERS);
      queryClient.invalidateQueries(KEYS.RESUME);
      onSuccess && onSuccess(id);
    },
    onError: () => {
      onError && onError();
      push("/404");
    },
  });
};

export default useApplyToErrand;
