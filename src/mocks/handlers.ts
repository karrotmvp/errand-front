import envs from "@config/dotenv";
import { rest } from "msw";
import {
  applyList,
  errandDetail,
  isMyErrand as q,
  isApplier as e,
  isHelper as r,
  isUnRelated as w,
  myErrands,
  myHelps,
  resume,
  user,
} from "./dummy";

const BASE_URL = envs.API_BASE_URL;

export const handlers = [
  // login
  // rest.post(`${BASE_URL}auth`, (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({ data: { token: "12345678sdfgtwer" }, status: "OK" })
  //   );
  // }),
  // errand
  rest.get(`${BASE_URL}errands`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: [...q, ...w, ...e, ...r] }));
    // return res(ctx.status(200), ctx.json({ data: q }));
  }),

  rest.post(`${BASE_URL}errands`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),

  rest.get(`${BASE_URL}errand/:errandId`, (req, res, ctx) => {
    const id = req.url.pathname.split("/")[2];
    if (!id) {
      return res(ctx.status(200), ctx.json({}));
    }
    const detail = errandDetail[Number(id)];
    return res(ctx.status(200), ctx.json({ data: detail }));
  }),

  rest.get(`${BASE_URL}errands/:errandId/helpers`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(applyList));
  }),

  rest.get(
    `${BASE_URL}errands/:errandId/helpers/:applierId`,
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
  // rest.get(`${BASE_URL}region`, (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       name: "역삼1동",
  //       name1: "서울특별시",
  //       name2: "강남구",
  //       name3: "역삼1동",
  //     })
  //   );
  // }),
];
