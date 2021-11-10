import { KEYS } from "@constant/reactQuery";
import { Resume } from "@type/response";
import { GET } from "@utils/axios";
import { useQuery } from "react-query";

const getResume = async (helpId: string): Promise<Resume> => {
  const { data } = await GET(`/help/${helpId}`);
  return data;
};
const useResume = (helpId: string) => {
  return useQuery([KEYS.RESUME, helpId], () => getResume(helpId));
};

export default useResume;
