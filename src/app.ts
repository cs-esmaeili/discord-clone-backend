
// app.ts
import express, { Application } from 'express';
import initRoutes from "@/routes/allRoutes";

let appInstance: Application | null = null;

export const getappInstance = (): Application | null => {
    return appInstance;
}

export const createApp = (): Application => {
    if (appInstance) {
        return appInstance;
    }

    appInstance = express();

    // Global middleware
    appInstance.use(express.json());
    appInstance.use(express.urlencoded({ extended: true }));

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