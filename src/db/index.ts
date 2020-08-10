import { MongoClient } from "mongodb";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.ln6ep.mongodb.net`;

export const connectDatabase = async () => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("main");
    return {
        users: db.collection("users"),
    };
};
