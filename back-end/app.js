import express from "express";
import cors from "cors";
import { PORT } from "./utils/constants.js";
import { indexRouter, todoRouter } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // so as to recieve formdata

app.use("/", indexRouter);
app.use("/todos", todoRouter);

app.listen(PORT, () => {
    console.log(`\nListening on port ${PORT}\n`)
});
