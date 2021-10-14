import { HelperType, ErrandStatus } from "./client";

export type Errand = {
  id: string;
  thumbnail: string;
  title: string;
  reward: number;
  status: ErrandStatus;
  helper?: HelperType;
  helpers?: HelperType[];
};

export type ErrendCreateResponseBody = {
  id: number;
};

export type ErrandDetail = {
  id: number;
  title: string;
  category: string;
  detailAddress?: string;
  phoneNumber?: string;
  isCompleted: boolean;
  isMine: boolean;
  didISupport?: boolean;
  region: Region;
};

export type Resume = {
  isMatched: boolean;
  appeal: string;
  helper: User;
};

type User = {
  id: number;
  nickname: string;
  profileImgUrl?: string;
  regionName: string;
  mannerPoiont: number;
};

type Region = {
  id: string;
  name: string;
  name1: string;
  name2: string;
  name3: string;
};
