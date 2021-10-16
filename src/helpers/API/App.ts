import express from "express";
import fetch from "node-fetch";

export const App = () => {
  const app = express();
  const port = process.env.PORT;

  app.get("/", function (_req: Request, res: any) {
    res.send("Hello World!");
  });

  app.get("/dogs", async function (_req: Request, res: any) {
    const { message } = await (
      await fetch("https://dog.ceo/api/breeds/image/random")
    ).json();

    res.set("Content-Type", "application/json");
    res.send({ message: message });
  });

  app.listen(port);
};
