import { Collection, ObjectId } from "mongodb";

export interface User {
    _id: ObjectId;
    name: string;
}

export interface Database {
    users: Collection<User>;
}
