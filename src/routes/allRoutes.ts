import { Application } from "express";
import authRoute from '@/routes/authRoutes';
import testRoute from '@/routes/testRoute';


const initRoutes = (app: Application) => {
    app.use("/auth", authRoute);
    app.use("/test", testRoute);

}
export default initRoutes;