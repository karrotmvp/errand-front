export type ListFilterType = "main" | "request" | "support";
export type PostFilter = "wait" | "selecting" | "done";

export type SupporterType = {
  id: string;
  name: string;
};

export type PostType = {
  id: string;
  imgSrc: string;
  title: string;
  price: number;
  status: PostFilter;
  supporters?: SupporterType[];
};
