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
  const { push, replace  } = useNavigator();

  return useMutation(patchCategoryAlarm, {
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.USER_ALRAMS);
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

export default usePatchCategoryAlarm;
