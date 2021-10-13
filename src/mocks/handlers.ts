import { rest } from "msw";
import { list } from "./dummy";

export const handlers = [
  rest.get("/posts", (req, res, ctx) => {
    const filter = req.url.searchParams.get("filter");

    switch (filter) {
      case "main":
        return res(ctx.json(list));
      case "request":
        return res(
          ctx.json(list.filter((item) => item.status === "selecting"))
        );
      case "support":
        return res(ctx.json(list.filter((item) => item.status === "done")));
      default:
    }
    return res(ctx.json(list.filter((item) => item.status !== filter)));
  }),
];
