/**
* @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
* to integrate with MongoDB
*/
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";
import MessageDaoI from "../interfaces/MessageDaoI";

/**
* @class MessageDao Implements Data Access Object managing data storage
* of Messages
* @property {MessageDao} messageDao Private single instance of MessageDao
*/
export default class MessageDao implements MessageDaoI{
private static messageDao: MessageDao | null = null;

/**
* Creates singleton DAO instance
* @returns MessageDao
*/
public static getInstance = (): MessageDao => {
    if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * Uses MessageModel to retrieve all messages documents of sent messages
     * from messages collection for a particular user
     * @param {string} uid User's primary key
     * @returns Promise to be notified when the messages are retrieved from
     * database
    */
    findAllMessagesSent = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({sender: uid})
            .populate("receiver")
            .exec();

    /**
     * Uses MessageModel to retrieve all messages documents of received messages
     * from messages collection for a particular user
     * @param {string} uid User's primary key
     * @returns Promise to be notified when the messages are retrieved from
     * database
    */
    findAllMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({receiver: uid})
            .populate("sender")
            .exec();

    /**
     * Inserts message instance of a particular user sending a message to
     * another user into the database
     * @param {string} senderUid Primary key of the user sending the message
     * @param {string} receiverUid Primary key of the user receiving the message
     * @param {Message} message Instance to be inserted into the database
     * @returns Promise To be notified when message is inserted into the database
    */
    sendMessage = async (senderUid: string, receiverUid:string, message: Message): Promise<Message> =>
        MessageModel.create({...message, sender: senderUid, receiver: receiverUid});

    /**
     * Removes message instance of a particular user that has sent a message to another
     * user from the database.
     * @param {string} senderUid Primary key of the user sending the message
     * @param {string} receiverUid Primary key of the user receiving the message
     * @returns Promise To be notified when message is removed from the database
    */
    deleteMessage = async (senderUid: string, receiverUid: string): Promise<any> =>
        MessageModel.deleteOne({sender: senderUid, receiver: receiverUid});
}