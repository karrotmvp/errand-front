import { Errand } from "@type/response";

export const list: Errand[] = [
  {
    id: "1",
    thumbnail:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    title: "저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    status: "wait",
    helpers: [
      { id: 1, name: "지원자_1" },
      { id: 2, name: "지원자_2" },
      { id: 3, name: "지원자_3" },
    ],
  },
  {
    id: "2",
    thumbnail:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    title: "저희 집 전등좀 교체해주세요.",
    reward: 10000,
    status: "proceed",
    helper: {
      id: 1,
      name: "테스트 헬퍼",
    },
    helpers: [
      { id: 1, name: "지원자_1" },
      { id: 2, name: "지원자_2" },
      { id: 3, name: "지원자_3" },
    ],
  },
  {
    id: "3",
    thumbnail:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    title: "집 창문을 열고 왔어요ㅠㅠ",
    reward: 12000,
    status: "complete",
  },
  {
    id: "4",
    thumbnail:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    title: "이 잼 뚜껑 열어주실 분...",
    reward: 4000,
    status: "complete",
  },
  {
    id: "5",
    thumbnail:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    title: "깜빡하고 에어컨을 안 끄고 나왔어요.",
    reward: 12000,
    status: "proceed",
  },
  {
    id: "6",
    thumbnail:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    title: "깜빡하고 에어컨을 안 끄고 나왔어요.",
    reward: 12000,
    status: "complete",
  },
  {
    id: "7",
    thumbnail:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    title: "깜빡하고 에어컨을 안 끄고 나왔어요.",
    reward: 12000,
    status: "complete",
  },
  {
    id: "8",
    thumbnail:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    title: "깜빡하고 에어컨을 안 끄고 나왔어요.",
    reward: 12000,
    status: "complete",
  },
];
