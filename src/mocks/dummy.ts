import { DEFAULT_THUMBNAIL, DEFAULT_IMAGE } from "@constant/default";
import {
  ErrandPreview,
  ErrandDetailResponseBody,
  Resume,
  User,
} from "@type/response";

export const errands: ErrandPreview[] = [
  {
    id: 1,
    detail:
      "main 저희집 갱얼쥐 산책 부탁드려요ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅁㅁㅁㅇㄴㄹㅁㄴㄷㄱㅈㄱㅁㅈㄹㅇㄹㅁㄷㄱㅁㅈㄷ",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 1,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 2,
    detail: "main 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 0,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 3,
    detail: "main 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "PROCEED",
    helpCount: 3,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 4,
    detail: "main 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "COMPLETE",
    helpCount: 4,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 5,
    detail: "main 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 0,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 6,
    detail: "main 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 0,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 7,
    detail: "main 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 0,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
];

export const myErrands: ErrandPreview[] = [
  {
    id: 1,
    detail: "myErrands 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 0,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 2,
    detail: "myErrands 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 2,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 3,
    detail: "myErrands 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "PROCEED",
    helpCount: 3,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 4,
    detail: "myErrands 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "COMPLETE",
    helpCount: 2,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 5,
    detail: "myErrands 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 0,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 6,
    detail: "myErrands 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 0,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 7,
    detail: "myErrands 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 0,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
];

export const myHelps: ErrandPreview[] = [
  {
    id: 1,
    detail: "myHelps 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "COMPLETE",
    helpCount: 3,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 2,
    detail: "myHelps 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "FAIL",
    helpCount: 2,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 3,
    detail: "myHelps 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "PROCEED",
    helpCount: 2,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 4,
    detail: "myHelps 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 2,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 5,
    detail: "myHelps 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 0,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 6,
    detail: "myHelps 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 0,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
  {
    id: 7,
    detail: "myHelps 저희집 갱얼쥐 산책 부탁드려요",
    reward: 7000,
    thumbnailUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
    status: "WAIT",
    helpCount: 0,
    category: {
      id: 1,
      name: "벌레잡기",
    },
    regionName: "반포1동",
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
  },
];

export const errandDetail: ErrandDetailResponseBody = {
  errand: {
    status: "WAIT",
    id: 1,
    customer: {
      id: 1,
      daangnId: "8a190fa9bb5d4d89b3944dc8c5b3a102",
    },
    images: [
      { id: 1, url: DEFAULT_IMAGE },
      { id: 1, url: DEFAULT_IMAGE },
      { id: 1, url: DEFAULT_IMAGE },
      { id: 1, url: DEFAULT_IMAGE },
    ],
    category: {
      id: 1,
      name: "반려동물 산책하기",
    },
    reward: 10000,
    detail:
      "상세페이지에서는 이 네모가 그냥 없어질게요 만약에 글줄이 길어지면 뒤에 배경 있는게 너무 답답하고 부담스럽더라구욤. 만약에 500자가 적어지면 어떻게 보이는지 최대 글자로 써보면 이렇게 보일 것 같아여ㅕ~~ 글자수는 공백을 포함하여 최대 500자까지 작성이 가능하고 일단 한 글자라도 적으면 유효성검사는 통과하는 걸로 하는건 어떨까요? 깔깔 500자까지 적을 사람이 있으려는지 모르겠지만 이렇게 많이 써야 500자가 넘는다고요! 힘드네여.. 아 맞다 저희집 갱얼쥐는요 점심시간만 되면 똥꼬깨발랄이 되서 꼭 산책을 하고싶어해요. 근데 저는 일을 가야되서 대신 누가 산책해주시면 정말 좋을 것 같아요. 주말에 한번 뵙고 강아지랑 친해지신 다음에 평일에 제가 부재중일 때 시간 맞춰서 저희 집 갱얼쥐 미니를 산책시켜주시면 정말 감사할 것 같습니다. 다른 강아지랑 보통 친하게 지내는 편이고 산책할 때는 다른 길로 잘 안가고 옆에 붙어서 가려고 합니다. 목줄은 필수지만 너무 답답해한다면 빼주셔도 어디",
    isCompleted: false,
    createdAt: [2021, 11, 2, 10, 24, 14, 68080000],
    updatedAt: [2021, 11, 2, 10, 24, 14, 68080000],
    helpCount: 0,
    region: {
      id: "1234",
      nodeId: "UmVnaW9uOjY1MzA0NTlkMTg5Yg==",
      name: "반포1동",
      name1: "서울특별시",
      name2: "서초구",
      name3: "반포1동",
    },
  },
  isMine: true,
  didIApply: false,
  wasIChosen: false,
};

export const user: User = {
  id: 1,
  nickname: "테스트맨",
  regionName: "논현동",
  mannerTemp: 37.5,
  profileImgUrl:
    "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
};

export const applyList: User[] = [
  {
    id: 1,
    nickname: "DD",
    regionName: "반포1동",
    mannerTemp: 39.5,
    profileImgUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
  },
  {
    id: 2,
    nickname: "Rosie",
    regionName: "혜화동",
    mannerTemp: 100,
  },
  {
    id: 3,
    nickname: "Christine",
    regionName: "연남동",
    mannerTemp: 40,
  },
  {
    id: 4,
    nickname: "Noah",
    regionName: "청담동",
    mannerTemp: 52.5,
  },
];

export const resume: Resume = {
  isMatched: false,
  appeal:
    "저 강아지를 진짜 좋아해요 ㅎㅎ 지금 집에서 한마리 키우고 있는데 같이 산책하면 좋을 것 같아요 ㅎㅎ 상세페이지에서는 이 네모가 그냥 없어질게요 만약에 글줄이 길어지면 뒤에 배경 있는게 너무 답답하고 부담스럽더라구욤. 만약에 500자가 적어지면 어떻게 보이는지 최대 글자로 써보면 이렇게 보일 것 같아여ㅕ~~ 글자수는 공백을 포함하여 최대 500자까지 작성이 가능하고 일단 한 글자라도 적으면 유효성검사는 통과하는 걸로 하는건 어떨까요? 깔깔 500자까지 적을 사람이 있으려는지 모르겠지만 이렇게 많이 써야 500자가 넘는다고요! 힘드네여.. 아 맞다 저희집 갱얼쥐는요 점심시간만 되면 똥꼬깨발랄이 되서 꼭 산책을 하고싶어해요. 근데 저는 일을 가야되서 대신 누가 산책해주시면 정말 좋을 것 같아요. 주말에 한번 뵙고 강아지랑 친해지신 다음에 평일에 제가 부재중일 때 시간 맞춰서 저희 집 갱얼쥐 미니를 산책시켜주시면 정말 감사할 것 같습니다. 다른 강아지랑 보통 친하게 지내는 편이고 산책할 ",
  helper: {
    id: 3,
    nickname: "Christine",
    regionName: "연남동",
    mannerTemp: 40,
    profileImgUrl: DEFAULT_THUMBNAIL,
  },
};

export const region = {
  name: "역삼1동",
  name1: "서울특별시",
  name2: "강남구",
  name3: "역삼1동",
};
