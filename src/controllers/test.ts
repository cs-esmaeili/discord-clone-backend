import { Request, Response, NextFunction } from 'express';

// Route handler
export const test = (req: Request, res: Response, next: NextFunction) => {
    res.send('Test route working!');
};