import { ErrandStatus } from "./client";

export type Errand = {
  id: string;
  thumbnailUrl: string;
  title: string;
  reward: number;
  status: ErrandStatus;
  selectedHelper?: SimpleUser;
};

export type ErrendCreateResponseBody = {
  id: number;
};

export type ErrandDetail = {
  id: number;
  title: string;
  category: Category;
  detail: string;
  reward: number;
  isCompleted: boolean;
  isMine: boolean;
  region: Region;
  detailAddress?: string;
  phoneNumber?: string;
  didISupport?: boolean;
};

export type Category = {
  id: number;
  name: string;
};

export type Resume = {
  isMatched: boolean;
  appeal: string;
  helper: User;
};

export type User = SimpleUser & {
  profileImgUrl?: string;
  regionName: string;
  mannerPoint: number;
};

export type SimpleUser = {
  id?: number;
  nickname: string;
};

export type Region = {
  id: string;
  name: string;
  name1: string;
  name2: string;
  name3: string;
};
