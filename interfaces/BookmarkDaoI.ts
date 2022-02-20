import Like from "../models/bookmarks/Bookmark";

export default interface BookmarkDaoI {
    findAllUsersThatBookmarkedTuit (tid: string): Promise<Like[]>;
    findAllTuitsBookmarkedByUser (uid: string): Promise<Like[]>;
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;
    userBookmarksTuit (tid: string, uid: string): Promise<Like>;
};