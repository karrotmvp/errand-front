import { useQuery } from "react-query";
import { GET, POST } from "@utils/axios";
import { Region, User } from "@type/response";

const getUserProfile = (): Promise<User> => {
  return GET(`/users/:id`);
};
export const useUserProfile = () => {
  return useQuery(["userProfile"], () => getUserProfile());
};

const getMyInfo = (): Promise<User> => {
  return GET(`/my`);
};
export const useMyInfo = () => {
  return useQuery(["myInfo"], () => getMyInfo());
};

const getRegionName = (regionId: string): Promise<Region> => {
  return GET(`/region?regionId=${regionId}`);
};
export const useRegionName = (regionId: string) => {
  return useQuery(["regionName"], () => getRegionName(regionId));
};

export const login = () => {
  return POST("/login");
};
