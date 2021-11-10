import { KEYS } from "@constant/reactQuery";
import { MutationCallbacks } from "@type/react-query";
import { POST } from "@utils/axios";
import { useMutation, useQueryClient } from "react-query";

const registerErrand = async (requestBody: FormData) => {
  const { data } = await POST(`/errand`, requestBody);
  return data;
};
const useRegisterErrand = ({ onSuccess, onError }: MutationCallbacks = {}) => {
  const queryClient = useQueryClient();

  return useMutation(registerErrand, {
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries(KEYS.ERRNDS);
      onSuccess && onSuccess(id);
    },
    onError: () => {
      onError && onError();
    },
  });
};

export default useRegisterErrand;
