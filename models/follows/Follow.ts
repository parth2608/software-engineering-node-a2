/**
* @file Declares Follow data type representing relationship between
* users and follows, as in user follows another user
*/
import User from "../users/User";

/**
* @typedef Follow Represents a follows relationship between two users,
* as in a user follows another user
* @property {User} follower User following another user
* @property {User} following User being followed by another user
*/
export default interface Follow {
    follower: User,
    following: User,
};