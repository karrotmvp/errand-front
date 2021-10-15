import { Errand, ErrandDetail, Resume, User } from "@type/response";

export const errandList: Errand[] = [
  {
    id: "1",
    thumbnail:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    title: "저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    status: "wait",
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
      nickname: "DD",
    },
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
    status: "wait",
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
    status: "fail",
  },
];

export const errandDetail: ErrandDetail = {
  id: 1,
  title: "벌레잡아주세요!! ㅠㅠㅠ",
  category: {
    id: 1,
    name: "벌레잡기 ",
  },
  detail: "엄청 커다란 모기가 내 발을 물었어, 간지러웠어! 그래서 긁었어!",
  reward: 10000,
  isCompleted: false,
  isMine: true,
  region: {
    id: "1234",
    name: "반포1동",
    name1: "서울특별시",
    name2: "서초구",
    name3: "반포1동",
  },
  detailAddress: "123-45 303호",
  phoneNumber: "01012345678",
  didISupport: false,
};

export const applyList: User[] = [
  {
    id: 1,
    nickname: "DD",
    regionName: "반포1동",
    mannerPoint: 39.5,
  },
  {
    id: 2,
    nickname: "Rosie",
    regionName: "혜화동",
    mannerPoint: 100,
  },
  {
    id: 3,
    nickname: "Christine",
    regionName: "연남동",
    mannerPoint: 40,
  },
  {
    id: 4,
    nickname: "Noah",
    regionName: "청담동",
    mannerPoint: 52.5,
  },
];

export const resume: Resume = {
  isMatched: false,
  appeal:
    "안녕하세요. 1층에 사는 주민이에요. 제가 진짜 벌레를 잘 잡아요. 평소에 무서워하는 성격이 아니라 쉽게 잡아드릴 수 있을 것 같아요. 맡겨주시면 깔끔하게 처리해드릴 수 있습니다 ㅎㅎ",
  helper: {
    id: 3,
    nickname: "Christine",
    regionName: "연남동",
    mannerPoint: 40,
  },
};
const a = "반려 사다주세 기타";
