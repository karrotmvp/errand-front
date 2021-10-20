import { useQuery } from "react-query";
import { GET } from "@utils/axios";

const getMyErrands = () => {
  return GET("/my/errands");
};
export const useMyErrands = () => {
  return useQuery(["myErrands"], () => getMyErrands());
};

const getMyHelps = () => {
  return GET("my/helps");
};
export const useMyHelps = () => {
  return useQuery(["myHelps"], () => getMyHelps());
};
