import { Application } from "express";
import testRoute from '@/routes/testRoute';


const initRoutes = (app: Application) => {
    app.use("/category", testRoute);

}
export default initRoutes;