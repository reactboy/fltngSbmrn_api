import { IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";
import { Database, Feed } from "../../../lib/types";

export const userResolvers: IResolvers = {
    Query: {
        feeds: async (
            _root: undefined,
            _args: undefined,
            ctx: { db: Database }
        ): Promise<Feed[]> => {
            const { db } = ctx;
            return await db.feeds.find({}).toArray();
        },
    },
    Mutation: {
        deleteBookmark: async (
            _root: undefined,
            args: { id: string },
            ctx: { db: Database }
        ): Promise<Feed> => {
            const { id } = args;
            const { db } = ctx;
            const res = await db.feeds.findOneAndDelete({
                _id: new ObjectId(id),
            });
            if (!res.value) {
                throw new Error("failed to delete user");
            }
            return res.value;
        },
        createBookmark: async (
            _root: undefined,
            args: { xhr: string },
            ctx: { db: Database }
        ): Promise<Feed> => {
            const { xhr } = args;
            const { db } = ctx;
            const res = await db.feeds.insertOne({ xhr });
            if (!res.ops) {
                throw new Error("failed to create user");
            }
            return res.ops[0];
        },
    },
    Feed: {
        id: (feed: Feed): string => feed._id.toString(),
    },
};
