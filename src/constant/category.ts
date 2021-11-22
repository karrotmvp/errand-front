import Categorty1 from "@assets/images/category_1.png";
import Categorty2 from "@assets/images/category_2.png";
import Categorty3 from "@assets/images/category_3.png";
import Categorty4 from "@assets/images/category_4.png";
import { Category } from "@type/response";

export const CATEGORYS: Category[] = [
  {
    id: 1,
    name: "벌레잡기",
    imageUrl: Categorty1,
  },
  {
    id: 2,
    name: "반려동물 산책하기",
    imageUrl: Categorty2,
  },
  {
    id: 3,
    name: "사다주기",
    subscribe: "필요한 물건 사다주세요!",
    imageUrl: Categorty3,
  },
  {
    id: 4,
    name: "기타",
    subscribe: "다른 심부름 부탁할래요!",
    imageUrl: Categorty4,
  },
];
