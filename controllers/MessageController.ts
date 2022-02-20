/**
* @file Controller RESTful Web service API for messages resource
*/
import MessageDao from "../daos/MessageDao";
import Message from "../models/messages/Message";
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
* @class MessageController Implements RESTful Web service API for messages resource.
* Defines the following HTTP endpoints:
* <ul>
*       <li>POST /api/users/:senderUid/messages/:receiverUid to create a new message
*       by making a user sending a message to another user</li>
*       <li>GET /api/users/:uid/messages/sent to retrieve all the messages sent by
*       a user</li>
*       <li>GET /api/users/:uid/messages/received to retrieve all the messages received
*       by a user</li>
*       <li>DELETE /api/users/:senderUid/unsend/:receiverUid to remove a message by
*       making a user delete a message that was sent to another user</li>
* </ul>
* @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
* @property {MessageController} messageController Singleton controller implementing
* RESTful Web service API
*/
export default class MessageController implements MessageControllerI {
private static messageDao: MessageDao = MessageDao.getInstance();
private static messageController: MessageController | null = null;

/**
* Creates singleton controller instance
* @param {Express} app Express instance to declare the RESTful Web service
* API
* @return MessageController
*/
public static getInstance = (app: Express): MessageController => {
    if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:senderUid/messages/:receiverUid", MessageController.messageController.sendMessage);
            app.get("/api/users/:uid/messages/sent", MessageController.messageController.findAllMessagesSent);
            app.get("/api/users/:uid/messages/received", MessageController.messageController.findAllMessagesReceived);
            app.delete("/api/users/:senderUid/unsend/:receiverUid", MessageController.messageController.deleteMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Retrieves all messages that are sent to other users, from the database
     * and returns an array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
    */
    findAllMessagesSent = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSent(req.params.uid)
            .then((messages: Message[]) => res.json(messages));

    /**
     * Retrieves all messages that are received from other users, from the
     * database and returns an array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
    */
    findAllMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesReceived(req.params.uid)
            .then((messages: Message[]) => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including body
     * and path parameters senderUid and receiverUid representing one user
     * seding message to another user, and another user receiving a message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted
     * in the database
     */
    sendMessage = (req: Request, res: Response) =>
        MessageController.messageDao.sendMessage(req.params.senderUid, req.params.receiverUid, req.body)
            .then((message: Message) => res.json(message));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter senderUid and receiverUid representing one user deleting
     * a message sent to another user
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
    */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.senderUid, req.params.receiverUid)
            .then((status) => res.send(status));
};