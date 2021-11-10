import { KEYS } from "@constant/reactQuery";
import { ResumePreview } from "@type/response";
import { GET } from "@utils/axios";
import { useQuery } from "react-query";

const getResumePreviews = async (
  errandId: string
): Promise<ResumePreview[]> => {
  const { data } = await GET(`/errand/${errandId}/helpers`);
  return data;
};
export const useResumePreviews = (errandId: string) => {
  return useQuery([KEYS.APPLIERS], () => getResumePreviews(errandId));
};

export default useResumePreviews;
