/**
 * @file implements the database schema
 * to represent follows in the database
 */

import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    follower: {type: Schema.Types.ObjectId, ref: "UserModel"},
    following: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;