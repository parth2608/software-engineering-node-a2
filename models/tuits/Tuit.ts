/**
* @file Declares Tuit data type representing relationship between
* users and tuits, as in user tuits a tuit
*/

import User from "../users/User";

/**
* @typedef Tuit Represents a tuits relationship between a user and a tuit,
* as in a user tuits a tuit
* @property {string} tuit Tuit content
* @property {User} postedBy User tuiting the tuit
* @property {Date} postedOn Date on which the user tuited the tuit
*/
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};