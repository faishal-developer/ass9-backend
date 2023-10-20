import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import { globalErrorHandler } from "./middleWares/globalErrorHandler";
import { ServiceRoutes } from "./modules/services/services.route";
import { UserRoutes } from "./modules/user/user.route";
import { AuthRoutes } from "./modules/Auth/auth.route";
import { FaqRoutes } from "./modules/FAquestion/faq.route";
import { BlogRoutes } from "./modules/blogs/blogs.route";
import { BookingRoutes } from "./modules/bookingOrders/booking.route";
import config from "./config/config";

const app: Application = express();
app.use(cors({ origin: config.client_link, credentials: true }));
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Everything is working" });
});
app.use("/api/v1", ServiceRoutes);
app.use("/api/v1", UserRoutes);
app.use("/api/v1", AuthRoutes);
app.use("/api/v1", BookingRoutes);
app.use("/api/v1", FaqRoutes);
app.use("/api/v1", BlogRoutes);

//globalErrorhandler
app.use(globalErrorHandler);

//unknown route handler
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Api Not Found",
      },
    ],
  });
});

export default app;
