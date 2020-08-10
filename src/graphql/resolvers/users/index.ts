import { IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";
import { Database, User } from "../../../lib/types";

export const userResolvers: IResolvers = {
    Query: {
        users: async (
            _root: undefined,
            _args: undefined,
            ctx: { db: Database }
        ): Promise<User[]> => {
            const { db } = ctx;
            return await db.users.find({}).toArray();
        },
    },
    Mutation: {
        deleteUser: async (
            _root: undefined,
            args: { id: string },
            ctx: { db: Database }
        ): Promise<User> => {
            const { id } = args;
            const { db } = ctx;
            const res = await db.users.findOneAndDelete({
                _id: new ObjectId(id),
            });
            if (!res.value) {
                throw new Error("failed to delete user");
            }
            return res.value;
        },
        createUser: async (
            _root: undefined,
            args: { name: string },
            ctx: { db: Database }
        ): Promise<User> => {
            const { name } = args;
            const { db } = ctx;
            const res = await db.users.insertOne({ name });
            if (!res.ops) {
                throw new Error("failed to create user");
            }
            return res.ops[0];
        },
    },
    User: {
        id: (user: User): string => user._id.toString(),
    },
};
