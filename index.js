import express from "express";
import { Hono } from "hono";

const PORT = 8080;
// const app = express();

// app.get("/", (req, res) => res.json("Hello World!"));

// app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

const app = new Hono();

app.get("/", (c) => c.json("Hello World!"));

export default { port: PORT, fetch: app.fetch };
