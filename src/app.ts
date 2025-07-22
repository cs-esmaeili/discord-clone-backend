
// app.ts
import express, { Application } from 'express';
import "@/auth/googleStrategy";
import initRoutes from "@/routes/allRoutes";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from 'cors';


let appInstance: Application | null = null;

export const getappInstance = (): Application | null => {
    return appInstance;
}

export const createApp = (): Application => {
    if (appInstance) {
        return appInstance;
    }

    appInstance = express();

    appInstance.use(cors({
        origin: 'http://localhost:3001',
        credentials: true,
    }));

    appInstance.use(cookieParser());

    // Global middleware
    appInstance.use(express.json());
    appInstance.use(express.urlencoded({ extended: true }));

    //passport
    appInstance.use(passport.initialize());

    // Health check
    appInstance.get('/health', (req, res) => {
        res.status(200).json({
            status: 'OK',
            timestamp: new Date().toISOString()
        });
    });

    // Initialize routes
    initRoutes(appInstance);

    return appInstance;
};