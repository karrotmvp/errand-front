import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { ResumePreview } from "@type/response";
import { CustomError, GET } from "@utils/axios";
import { useQuery } from "react-query";

const getResumePreviews = async (
  errandId: string
): Promise<ResumePreview[]> => {
  const { data } = await GET(`/errand/${errandId}/helpers`);
  return data;
};

export const useResumePreviews = (errandId: string) => {
  const { push } = useNavigator();

  return useQuery([KEYS.APPLIERS], () => getResumePreviews(errandId), {
    onError: (e: CustomError) => {
      push(`/error?status=${e.status}`);
    },
  });
};

export default useResumePreviews;
