import express, { Request, Response } from "express";

const app = express();
const port = 5000; // TODO: move to env

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
