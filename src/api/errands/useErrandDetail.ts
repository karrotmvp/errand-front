import { KEYS } from "@constant/reactQuery";
import { ErrandDetailResponseBody } from "@type/response";
import { GET } from "@utils/axios";
import { useQuery } from "react-query";

const getErrandDetail = async (
  errandId: string
): Promise<ErrandDetailResponseBody> => {
  const { data } = await GET(`/errand/${errandId}`);
  return data;
};

const useErrandDetail = (errandId: string) => {
  return useQuery([KEYS.ERRND_DETAIL], () => getErrandDetail(errandId));
};

export default useErrandDetail;
