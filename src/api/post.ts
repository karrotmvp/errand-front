import { useQuery } from "react-query";
import { GET, POST } from "../utils/axios";
import { PostType, ListFilterType } from "../types/dataType";

const getPosts = (filter?: ListFilterType): Promise<PostType[]> => {
  console.log(`/posts${filter !== "main" ? `?filter=${filter}` : ""}`);
  return GET(`/posts${filter !== "main" ? `?filter=${filter}` : ""}`);
};
export const usePosts = (filter?: ListFilterType) =>
  useQuery(["userInfo", filter], () => getPosts(filter));
