import { rest } from "msw";
import { applyList, errandDetail, errandList, resume } from "./dummy";

export const handlers = [
  // errand
  rest.get("/errands", (req, res, ctx) => {
    const filter = req.url.searchParams.get("filter");

    switch (filter) {
      case "main":
        return res(ctx.json(errandList));
      case "request":
        return res(ctx.json(errandList.slice(0, 5)));
      case "help":
        return res(ctx.json(errandList.slice(4)));
      default:
    }
    return res(ctx.json(errandList.filter((item) => item.status !== filter)));
  }),

  rest.get("/errands/:errandId", (req, res, ctx) => {
    return res(ctx.json(errandDetail));
  }),

  rest.get("/errands/:errandId/helpers", (req, res, ctx) => {
    return res(ctx.json(applyList));
  }),

  rest.get("/errands/:errandId/helpers/:helperId", (req, res, ctx) => {
    return res(ctx.json(resume));
  }),

  rest.post("/", (req, res, ctx) => {
    return;
  }),

  rest.patch("/", (req, res, ctx) => {
    return;
  }),

  // help
  rest.post("/help", (req, res, ctx) => {
    return;
  }),

  //user
  rest.get("/users/:id", (req, res, ctx) => {
    return;
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
