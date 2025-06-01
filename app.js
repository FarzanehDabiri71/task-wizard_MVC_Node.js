import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import "dotenv/config";

import getRoutes from "./routes/get-routes.js";
import postRoutes from "./routes/post-routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.set("view engine", "ejs");

app.use("/", getRoutes);
app.use("/", postRoutes);
app.listen(3000);

export { __dirname as rootPath };
