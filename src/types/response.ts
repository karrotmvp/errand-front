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
  createdAt: [number, number, number, number, number, number, number];
  updatedAt: [number, number, number, number, number, number, number];
};

export type ErrandDetail = {
  id: number;
  customer: Customer;
  customerPhoneNumber?: string;
  images: Image[];
  category: Category;
  detailAddress?: string;
  reward: number;
  detail: string;
  isCompleted: boolean;
  createdAt: [number, number, number, number, number, number, number];
  updatedAt: [number, number, number, number, number, number, number];
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

export type ErrandDetailResponseBody = {
  errand: ErrandDetail;
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
};

export type Category = {
  id: number;
  name: string;
};

export type Resume = {
  isMatched: boolean;
  appeal: string;
  phoneNumber?: string;
  helper: User;
};

export type User = SimpleUser & {
  profileImgUrl?: string;
  regionName: string;
  mannerTemp: number;
};

export type SimpleUser = {
  id?: number;
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

type Image = {
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
};
