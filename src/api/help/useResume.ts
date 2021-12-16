import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { Resume } from "@type/response";
import { CustomError, GET } from "@utils/axios";
import { useQuery } from "react-query";

const getResume = async (helpId: string): Promise<Resume> => {
  const { data } = await GET(`/help/${helpId}`);
  return data;
};
const useResume = (helpId: string) => {
  const { push } = useNavigator();

  return useQuery([KEYS.RESUME, helpId], () => getResume(helpId), {
    onError: (e: CustomError) => {
      push(`/error?status=${e.status}`);
    },
  });
};

export default useResume;
