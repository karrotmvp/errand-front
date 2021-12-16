import { ErrandStatus } from "./client";

export type ErrandPreview = {
  id: number;
  detail: string;
  reward: number;
  thumbnailUrl: string;
  status: ErrandStatus;
  category: Category;
  helpCount: number;
  regionName: string;
  createdAt: string;
  updatedAt: string;
};

export type ErrandDetail = {
  id: number;
  customer: Customer;
  customerPhoneNumber?: string;
  images: Image[];
  category: Category;
  reward: number;
  detail: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  region: Region;
  helpCount: number;
  status: ErrandStatus;
};

export type ErrandPreviewResponseBody = {
  errand: ErrandPreview;
  isMine: boolean;
  didIApply: boolean;
  wasIChosen: boolean;
};

export type CurrentData = {
  matchedRate: number;
  userAlarmOnCnt: number;
  userCnt: number;
};

export type ErrandDetailResponseBody = {
  errand: ErrandDetail;
  helpId: number;
  isMine: boolean;
  didIApply: boolean;
  wasIChosen: boolean;
};

export type ErrendCreateResponseBody = {
  id: number;
};

type Customer = {
  id: number;
  daangnId: string;
  nickname: string;
  profileImageUrl: string;
  mannerTemp: number;
};

export type Category = {
  id: number;
  name: string;
  subscribe?: string;
  imageUrl?: string;
};

export type Resume = {
  errandId: number;
  isMatched: boolean;
  isCustomer: boolean;
  appeal: string;
  phoneNumber?: string;
  helper: User;
  createdAt: string;
};

export type User = SimpleUser & {
  profileImageUrl?: string;
  regionName: string;
  mannerTemp: number;
};

export type SimpleUser = {
  id: number;
  nickname: string;
};

export type Region = {
  id: string;
  nodeId: string;
  name: string;
  name1: string;
  name2: string;
  name3: string;
};

export type Image = {
  id: number;
  url: string;
};

export type AlarmResponseBody = {
  categoryStatusList: Alarm[];
  newHelpAlarm: boolean;
};

export type Alarm = {
  categoryId: number;
  name: string;
  status: boolean;
};

export type ResumePreview = {
  helpId: number;
  helper: User;
  appeal: string;
  createdAt: string;
};
