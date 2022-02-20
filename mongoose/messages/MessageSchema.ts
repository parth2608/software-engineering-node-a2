/**
 * @file implements the database schema
 * to represent messages in the database
 */

import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    sender: {type: Schema.Types.ObjectId, ref: "UserModel"},
    receiver: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema;