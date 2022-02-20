/**
* @file Declares User data type for the Tuiter application
*/

import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
* @typedef User Represents a user profile on Tuiter application
* @property {mongoose.Schema.Types.ObjectId} _id Unique ID of the user
* @property {string} username Username of the user
* @property {string} password Password of the user
* @property {string} firstName First Name of the user
* @property {string} lastName Last Name of the user
* @property {string} email Email Id of the user
* @property {string} profilePhoto Profile Image of the user
* @property {string} headerImage Header Image of the user
* @property {string} biography Biography of the user
* @property {Date} dateOfBirth Birth Date of the user
* @property {AccountType} accountType Type of account of the user
* @property {MaritalStatus} maritalStatus Marital status of the user
* @property {Location} location Location of the user
*/
export default interface User {
   _id?: mongoose.Schema.Types.ObjectId,
   username: string,
   password: string,
   firstName?: string,
   lastName?: string,
   email: string,
   profilePhoto?: string,
   headerImage?: string,
   biography?: string,
   dateOfBirth?: Date,
   accountType?: AccountType,
   maritalStatus?: MaritalStatus,
   location?: Location,
};