import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    followUser (followerUid: string, followingUid: string): Promise<Follow>;
    unfollowUser (followerUid: string, followingUid: string): Promise<any>;
    findAllFollowers (uid: string): Promise<Follow[]>;
    findAllFollowing (uid: string): Promise<Follow[]>;
};