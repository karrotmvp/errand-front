import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { MutationCallbacks } from "@type/react-query";
import { PATCH } from "@utils/axios";
import { useMutation, useQueryClient } from "react-query";

export const patchNewApplierAlarm = (body: { on: boolean }) => {
  return PATCH("/user/alarm", body);
};

export const usePatchNewApplierAlarm = ({
  onSuccess,
  onError,
}: MutationCallbacks = {}) => {
  const queryClient = useQueryClient();
  const { push } = useNavigator();

  return useMutation(patchNewApplierAlarm, {
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.USER_ALRAMS);
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
      push("/404");
    },
  });
};

export default usePatchNewApplierAlarm;
