import envs from "@config/dotenv";
import { rest } from "msw";
import {
  applyList,
  errandDetail,
  errands,
  myErrands,
  myHelps,
  resume,
  user,
} from "./dummy";

const BASE_URL = envs.API_BASE_URL;
export const handlers = [
  // errand
  rest.get(`${BASE_URL}errands`, (req, res, ctx) => {
    // const lastId = req.url.searchParams.get("lastId");
    // const size = req.url.searchParams.get("size");
    return res(ctx.status(200), ctx.json(errands));
  }),

  rest.post(`${BASE_URL}errands`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),

  rest.get(`${BASE_URL}errands/:errandId`, (req, res, ctx) => {
    const my = errandDetail;
    my.errand.customerPhoneNumber = "01012345678";
    my.errand.detailAddress = "123-45 303호";
    my.isMine = true;
    my.didIApply = false;
    my.wasIChosen = false;

    const notApply = errandDetail;
    notApply.isMine = false;
    notApply.didIApply = false;
    notApply.wasIChosen = false;

    const rejected = errandDetail;
    rejected.isMine = false;
    rejected.didIApply = true;
    rejected.wasIChosen = false;

    const chosen = errandDetail;
    chosen.errand.customerPhoneNumber = "01012345678";
    chosen.errand.detailAddress = "123-45 303호";
    my.isMine = false;
    my.didIApply = true;
    my.wasIChosen = true;

    return res(ctx.status(200), ctx.json(my));
  }),

  rest.get(`${BASE_URL}errands/:errandId/helpers`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(applyList));
  }),

  rest.get(
    `${BASE_URL}errands/:errandId/helpers/:helperId"`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(resume));
    }
  ),

  rest.patch(`${BASE_URL}errands/:id/helper`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "성공",
      })
    );
  }),

  rest.patch(`${BASE_URL}errands/:id/complete`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "성공",
      })
    );
  }),

  rest.get(`${BASE_URL}errands/:id/helper-count`, (req, res, ctx) => {
    const can = {
      canApply: true,
      helperCtn: 3,
    };
    // const cant = {
    //   canApply: false,
    //   helperCtn: 5,
    // };
    return res(ctx.status(200), ctx.json(can));
  }),

  // my
  rest.get(`${BASE_URL}my/errands`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(myErrands));
  }),

  rest.get(`${BASE_URL}my/helps`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(myHelps));
  }),

  // help
  rest.post(`${BASE_URL}help`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "성공",
      })
    );
  }),

  //users
  rest.get(`${BASE_URL}users/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.patch(`${BASE_URL}users/category`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.get(`${BASE_URL}users/my`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ ...user, daangnId: "8a190fa9bb5d4d89b3944dc8c5b3a102" })
    );
  }),

  // ETC
  rest.get(`${BASE_URL}region`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "역삼1동",
        name1: "서울특별시",
        name2: "강남구",
        name3: "역삼1동",
      })
    );
  }),

  rest.post(`${BASE_URL}login`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];
