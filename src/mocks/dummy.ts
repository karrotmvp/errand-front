import { PostType } from "../types/dataType";

export const list: PostType[] = [
  {
    id: "1",
    imgSrc: "",
    title: "저희집 갱얼쥐 산책 부탁드려요",
    price: 7000,
    status: "selecting",
    supporters: [
      { id: "1", name: "지원자_1" },
      { id: "2", name: "지원자_2" },
      { id: "3", name: "지원자_3" },
    ],
  },
  {
    id: "2",
    imgSrc: "",
    title: "저희 집 전등좀 교체해주세요.",
    price: 10000,
    status: "wait",
  },
  {
    id: "3",
    imgSrc: "",
    title: "집 창문을 열고 왔어요ㅠㅠ",
    price: 12000,
    status: "done",
  },
  {
    id: "4",
    imgSrc: "",
    title: "이 잼 뚜껑 열어주실 분...",
    price: 4000,
    status: "done",
  },
  {
    id: "5",
    imgSrc: "",
    title: "깜빡하고 에어컨을 안 끄고 나왔어요.",
    price: 12000,
    status: "done",
  },
];
