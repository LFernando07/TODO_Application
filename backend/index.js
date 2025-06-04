import express from "express";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./middlewares/originsCors.js";
import { userRoute } from "./routes/userRoute.js";
import dotenv from 'dotenv';
import { taskRoute } from "./routes/taskRoute.js";
import { authRoute } from "./routes/authRoute.js";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 1234;

app.set('json spaces', 2);
app.use(cookieParser())
app.use(corsMiddleware())

app.use(express.json())
app.disable('x-powered-by')

app.get("/", (req, res) => {
  res.send("Hello, TODO API!");
});
app.use("/api/users", userRoute())
app.use("/api/task", taskRoute())
app.use("/api/auth", authRoute())

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});