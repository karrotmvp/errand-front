import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { ErrandDetailResponseBody } from "@type/response";
import { CustomError, GET } from "@utils/axios";
import { useQuery } from "react-query";

const getErrandDetail = async (
  errandId: string
): Promise<ErrandDetailResponseBody> => {
  const { data } = await GET(`/errand/${errandId}`);

  return data;
};

const useErrandDetail = (errandId: string) => {
  const { push } = useNavigator();
  return useQuery([KEYS.ERRND_DETAIL], () => getErrandDetail(errandId), {
    cacheTime: 0,
    onError: (e: CustomError) => {
      push(`/error?status=${e.status}`);
    },
  });
};

export default useErrandDetail;
