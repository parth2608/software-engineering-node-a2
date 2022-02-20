/**
* @file Declares Message data type representing relationship between
* users and messages, as in user messages another user
*/

import User from "../users/User";

/**
* @typedef Message Represents a messages relationship between two users,
* as in a user messages another user
* @property {string} message Message content
* @property {User} sender User sending the message
* @property {User} receiver User receiving the message
* @property {Date} sentOn Date on which the message was sent
*/
export default interface Message {
    message: string,
    sender: User,
    receiver: User,
    sentOn?: Date,
};