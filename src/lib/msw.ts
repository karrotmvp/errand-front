export const initMSW = () => {
  console.log(1, process.env.NODE_ENV);
  console.log(2, window);
  if (process.env.NODE_ENV === "development") {
    if (typeof window !== "undefined") {
      const { worker } = require("../mocks/browser");
      worker.start();
    }
  }
};
