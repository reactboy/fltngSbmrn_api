import { Collection, ObjectId } from "mongodb";

export interface User {
    _id: ObjectId;
    name: string;
}

export interface Feed {
    _id: ObjectId;
    xhr: string;
}

export interface Bookmark {
    _id: ObjectId;
    url: string;
}

export interface Database {
    users: Collection<User>;
    feeds: Collection<Feed>;
    bookmarks: Collection<Bookmark>;
}
