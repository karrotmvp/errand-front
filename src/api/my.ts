import { useQuery } from "react-query";
import { GET } from "@utils/axios";

const getMyErrands = async () => {
  const { data } = await GET("/my/errands");
  return data;
};
export const useMyErrands = () => {
  return useQuery(["myErrands"], () => getMyErrands());
};

const getMyHelps = async () => {
  const { data } = await GET("my/helps");
  return data;
};
export const useMyHelps = () => {
  return useQuery(["myHelps"], () => getMyHelps());
};
