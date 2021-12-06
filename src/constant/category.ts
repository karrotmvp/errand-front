import { Category1, Category2, Category3, Category4 } from "@assets/images";
import { Category } from "@type/response";

export const CATEGORYS: Category[] = [
  {
    id: 1,
    name: "벌레잡기",
    imageUrl: Category1,
  },
  {
    id: 2,
    name: "반려동물 산책하기",
    imageUrl: Category2,
  },
  {
    id: 3,
    name: "사다주기",
    subscribe: "필요한 물건 사다주세요!",
    imageUrl: Category3,
  },
  {
    id: 4,
    name: "기타",
    subscribe: "다른 심부름 부탁할래요!",
    imageUrl: Category4,
  },
];
