import { rest } from "msw";
import { applyList, errandDetail, errandList, resume, user } from "./dummy";

export const handlers = [
  // errand
  rest.get("/errands", (req, res, ctx) => {
    const lastId = req.url.searchParams.get("lastId");
    const size = req.url.searchParams.get("size");

    return res(ctx.json(errandList));
  }),

  rest.post("/errands", (req, res, ctx) => {
    return res(ctx.json({ id: 1 }));
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
    notApply.isMine = false;
    notApply.didIApply = true;
    notApply.wasIChosen = false;

    const chosen = errandDetail;
    chosen.errand.customerPhoneNumber = "01012345678";
    chosen.errand.detailAddress = "123-45 303호";
    my.isMine = false;
    my.didIApply = true;
    my.wasIChosen = true;

    return res(ctx.json(my));
  }),

  rest.get("/errands/:errandId/helpers", (req, res, ctx) => {
    return res(ctx.json(applyList));
  }),

  rest.get("/errands/:errandId/helpers/:helperId", (req, res, ctx) => {
    return res(ctx.json(resume));
  }),

  rest.patch("/", (req, res, ctx) => {
    return;
  }),

  // help
  rest.post("/help", (req, res, ctx) => {
    return;
  }),

  //user
  rest.get("/my", (req, res, ctx) => {
    return res(ctx.json(user));
  }),

  rest.get("/users/:id", (req, res, ctx) => {
    return res(ctx.json(user));
  }),

  // ETC
  rest.get("/region", (req, res, ctx) => {
    const regionId = req.url.searchParams.get("regionId");

    return;
  }),

  rest.post("/login", (req, res, ctx) => {
    return;
  }),
];
