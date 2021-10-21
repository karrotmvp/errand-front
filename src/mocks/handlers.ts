import { rest } from "msw";
import { applyList, errandDetail, errandList, resume, user } from "./dummy";

export const handlers = [
  // errand
  rest.get("/errands", (req, res, ctx) => {
    // const lastId = req.url.searchParams.get("lastId");
    // const size = req.url.searchParams.get("size");
    return res(ctx.status(200), ctx.json(errandList));
  }),

  rest.post("/errands", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),

  rest.get("/errands/:errandId", (req, res, ctx) => {
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

  rest.get("/errands/:errandId/helpers", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(applyList));
  }),

  rest.get("/errands/:errandId/helpers/:helperId", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(resume));
  }),

  rest.patch("/errands/:id/helper", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "성공",
      })
    );
  }),

  rest.patch("/errands/:id/complete", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "성공",
      })
    );
  }),

  rest.get("/errands/:id/helper-count", (req, res, ctx) => {
    const can = {
      canApply: true,
      helperCtn: 3,
    };
    // const cant = {
    //   canApply: false,
    //   helperCtn: 5,
    // };
    return res(
      ctx.status(200),
      ctx.json({
        can,
      })
    );
  }),
  
  // my
  rest.get("/my/errands", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),

  rest.get("/my/helps", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),

  // help
  rest.post("/help", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "성공",
      })
    );
  }),

  //users
  rest.get("/users/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.patch("/users/category", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.get("/users/my", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ ...user, daangnId: "8a190fa9bb5d4d89b3944dc8c5b3a102" })
    );
  }),

  // ETC
  rest.get("/region", (req, res, ctx) => {
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

  rest.post("/login", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];
