import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import { connectDatabase } from "./db";

const mount = async (app: Application) => {
    const db = await connectDatabase();
    app.get("/", async (_req, res) => {
        const users = await db.users.find({}).toArray();
        res.send(users);
    });
    app.listen(process.env.PORT);

    console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());
