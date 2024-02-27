import { Hono } from "hono";
import { cors } from "hono/cors";
// import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
// import { clerkClient, ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const db = require("./db/models/index");

const PORT = process.env.PORT;

const app = new Hono();

app.use(cors());
app.get("/", (c) => c.json("Hello World!"));

export default { port: PORT, fetch: app.fetch };
