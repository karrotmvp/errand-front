import { ErrandStatus } from "./client";

export type Errand = {
  id: number;
  detail: string;
  reward: number;
  thumbnailUrl: string;
  status: ErrandStatus;
  helpCount: number;
  category: Category;
  regionName: string;
  chosenHelper?: SimpleUser;
  createdAt: [number, number, number, number, number, number, number];
  updatedAt: [number, number, number, number, number, number, number];
};

export type ErrendCreateResponseBody = {
  id: number;
};

export type ErrandDetailResponseBody = {
  errand: ErrandDetail;
  isMine: boolean;
  didIApply: boolean;
  wasIChosen: boolean;
};

export type ErrandDetail = {
  id: number;
  title: string;
  customer: Customer;
  region: Region;
  category: Category;
  imageUrls: Image[];
  detail: string;
  reward: number;
  detailAddress?: string;
  customerPhoneNumber?: string;
  isCompleted: boolean;
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
