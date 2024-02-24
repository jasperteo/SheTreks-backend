import { Hono } from "hono";
import { cors } from "hono/cors";

const PORT = process.env.PORT;

const app = new Hono();

app.use(cors());
app.get("/", (c) => c.json("Hello World!"));

export default { port: PORT, fetch: app.fetch };
