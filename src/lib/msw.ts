export const initMSW = () => {
  if (process.env.NODE_ENV === "development") {
    if (typeof window !== "undefined") {
      const { worker } = require("../mocks/browser");
      worker.start();
    }
  }
};
