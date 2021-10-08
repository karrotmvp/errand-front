import { rest } from "msw";

export const handlers = [
  rest.get("/test", (req, res, ctx) => {
    console.log("test request!!");

    return res(ctx.json({ message: "Hello World!" }));
  }),

  rest.post("/test", (req, res, ctx) => {
    return res(ctx.json({ message: "success" }));
  }),
];
