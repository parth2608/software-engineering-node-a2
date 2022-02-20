import {Request, Response} from "express";

export default interface FollowControllerI {
    followUser (req: Request, res: Response): void;
    unfollowUser (req: Request, res: Response): void;
    findAllFollowers (req: Request, res: Response): void;
    findAllFollowing (req: Request, res: Response): void;
};