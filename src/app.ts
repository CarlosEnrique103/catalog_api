import express, { Request, Response } from "express";
import cors from "cors";
import { development } from "./environments/development";
import "./config/dbConnect";

import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/users", userRouter);

// Error handler
app.use(globalErrorHandler);

// Error not found
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "failed",
    message: `${req.originalUrl} - Route Not found`,
  });
});

const port = development.appPort || 3000;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
