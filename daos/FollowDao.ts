/**
* @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
* to integrate with MongoDB
*/
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
import FollowDaoI from "../interfaces/FollowDaoI";

/**
* @class FollowDao Implements Data Access Object managing data storage
* of Follows
* @property {FollowDao} followDao Private single instance of FollowDao
*/
export default class FollowDao implements FollowDaoI{
private static followDao: FollowDao | null = null;

/**
* Creates singleton DAO instance
* @returns FollowDao
*/
public static getInstance = (): FollowDao => {
    if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Uses FollowModel to retrieve all follows documents of followers
     * from follows collection for a particular user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the followers are retrieved from
     * database
    */
    findAllFollowers = async (uid: string): Promise<Follow[]> =>
            FollowModel
                .find({following: uid})
                .populate("follower")
                .exec();

    /**
     * Uses FollowModel to retrieve all follows documents of following users
     * from follows collection for a particular user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the following users are retrieved from
     * database
    */
    findAllFollowing = async (uid: string): Promise<Follow[]> =>
            FollowModel
                .find({follower: uid})
                .populate("following")
                .exec();

    /**
     * Inserts follow instance of a particular user following another user
     * into the database
     * @param {string} followerUid Primary key of the user following another user
     * @param {string} followingUid Primary key of the user being followed by another user
     * @returns Promise To be notified when follow is inserted into the database
     */
    followUser = async (followerUid: string, followingUid: string): Promise<Follow> =>
        FollowModel.create({follower: followerUid, following: followingUid});

    /**
     * Removes follow instance of a particular user following another user
     * from the database.
     * @param {string} followerUid Primary key of the user following another user
     * @param {string} followingUid Primary key of the user being followed by another user
     * @returns Promise To be notified when follow is removed from the database
    */
    unfollowUser = async (followerUid: string, followingUid: string): Promise<any> =>
            FollowModel.deleteOne({follower: followerUid, following: followingUid});
}