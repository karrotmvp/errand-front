import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { MutationCallbacks } from "@type/react-query";
import { PATCH } from "@utils/axios";
import { useMutation, useQueryClient } from "react-query";

const patchCategoryAlarm = (body: { categoryId: number; on: boolean }) => {
  return PATCH("/user/category", body);
};

export const usePatchCategoryAlarm = ({
  onSuccess,
  onError,
}: MutationCallbacks = {}) => {
  const queryClient = useQueryClient();
  const { push } = useNavigator();

  return useMutation(patchCategoryAlarm, {
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

export default usePatchCategoryAlarm;
