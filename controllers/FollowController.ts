/**
* @file Controller RESTful Web service API for follows resource
*/
import FollowDao from "../daos/FollowDao";
import Follow from "../models/follows/Follow";
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
* @class FollowController Implements RESTful Web service API for follows resource.
* Defines the following HTTP endpoints:
* <ul>
*     <li>POST /api/users/:followerUid/follows/:followingUid to create a new follow
*      by making a user follow another user</li>
*     <li>GET /api/users/:uid/followers/ to retrieve all the users following a user</li>
*     <li>GET /api/users/:uid/following/ to retrieve all the users being followed by a user</li>
*     <li>DELETE /api/users/:followerUid/unfollows/:followingUid to remove a follow by
*      making a user unfollow another user</li>
* </ul>
* @property {FollowDao} followDao Singleton DAO implementing follow CRUD operations
* @property {FollowController} followController Singleton controller implementing
* RESTful Web service API
*/
export default class FollowController implements FollowControllerI {
private static followDao: FollowDao = FollowDao.getInstance();
private static followController: FollowController | null = null;

/**
* Creates singleton controller instance
* @param {Express} app Express instance to declare the RESTful Web service
* API
* @return FollowController
*/
public static getInstance = (app: Express): FollowController => {
    if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:followerUid/follows/:followingUid", FollowController.followController.followUser);
            app.delete("/api/users/:followerUid/unfollows/:followingUid", FollowController.followController.unfollowUser);
            app.get("/api/users/:uid/followers/", FollowController.followController.findAllFollowers);
            app.get("/api/users/:uid/following/", FollowController.followController.findAllFollowing);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * Retrieves all users from the database that follow a user and returns
     * an array of users.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllFollowers = (req: Request, res: Response) =>
            FollowController.followDao.findAllFollowers(req.params.uid)
                .then(follows => res.json(follows));

    /**
     * Retrieves all users from the database that are being followed by a
     * user and returns an array of users.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllFollowing = (req: Request, res: Response) =>
            FollowController.followDao.findAllFollowing(req.params.uid)
                .then(follows => res.json(follows));

    /**
      * @param {Request} req Represents request from client, including the
      * path parameters followerUid and followingUid representing one user
      * following another user, and another user being followed
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new follows that was inserted in the
      * database
      */
    followUser = (req: Request, res: Response) =>
            FollowController.followDao.followUser(req.params.followerUid, req.params.followingUid)
                .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters followerUid and followingUid representing one user
     * unfollowing another user, and another user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    unfollowUser = (req: Request, res: Response) =>
            FollowController.followDao.unfollowUser(req.params.followerUid, req.params.followingUid)
                .then(status => res.send(status));
};