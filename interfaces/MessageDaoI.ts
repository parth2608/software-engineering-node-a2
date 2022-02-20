import Message from "../models/messages/Message";

export default interface MessageDaoI {
    sendMessage (senderUid: string, receiverUid:string, message: Message): Promise<Message>;
    findAllMessagesSent (uid: string): Promise<Message[]>;
    findAllMessagesReceived(uid: string): Promise<Message[]>;
    deleteMessage (senderUid: string, receiverUid: string): Promise<any>;
};