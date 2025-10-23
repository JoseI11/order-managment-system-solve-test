import express from "express";
import cors from "cors";
import ordersRouter from "./routes/orders.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/orders", ordersRouter);

export default app;
