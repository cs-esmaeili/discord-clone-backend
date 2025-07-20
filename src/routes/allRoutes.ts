import { Application } from "express";
import testRoute from '@/routes/authRoutes';


const initRoutes = (app: Application) => {
    app.use("/auth", testRoute);

}
export default initRoutes;