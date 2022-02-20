import {Request, Response} from "express";

export default interface MessageControllerI {
    sendMessage (req: Request, res: Response): void;
    findAllMessagesSent (req: Request, res: Response): void;
    findAllMessagesReceived(req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
};