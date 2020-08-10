import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.ln6ep.mongodb.net`;

export const connectDatabase = async (): Promise<Database> => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("main");
    return {
        users: db.collection("users"),
        bookmarks: db.collection("bookmarks"),
        feeds: db.collection("feeds"),
    };
};
