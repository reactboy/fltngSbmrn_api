import { IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";
import { Database, Bookmark } from "../../../lib/types";

export const userResolvers: IResolvers = {
    Query: {
        bookmarks: async (
            _root: undefined,
            _args: undefined,
            ctx: { db: Database }
        ): Promise<Bookmark[]> => {
            const { db } = ctx;
            return await db.bookmarks.find({}).toArray();
        },
    },
    Mutation: {
        deleteBookmark: async (
            _root: undefined,
            args: { id: string },
            ctx: { db: Database }
        ): Promise<Bookmark> => {
            const { id } = args;
            const { db } = ctx;
            const res = await db.bookmarks.findOneAndDelete({
                _id: new ObjectId(id),
            });
            if (!res.value) {
                throw new Error("failed to delete user");
            }
            return res.value;
        },
        createBookmark: async (
            _root: undefined,
            args: { url: string },
            ctx: { db: Database }
        ): Promise<Bookmark> => {
            const { url } = args;
            const { db } = ctx;
            const res = await db.bookmarks.insertOne({ url });
            if (!res.ops) {
                throw new Error("failed to create user");
            }
            return res.ops[0];
        },
    },
    Bookmark: {
        id: (bookmark: Bookmark): string => bookmark._id.toString(),
    },
};
