import express from "express";
import cors from "cors";
import { PORT } from "./utils/constants.js";
import { indexRouter, todoRouter, authRouter } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // so as to recieve formdata

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/todos", todoRouter);

app.listen(PORT, () => {
    console.log(`\nListening on http://localhost:${PORT}\n`)
});
