import express from "express";
import { Request, Response } from "express";
import { Db } from "mongodb";

export default function HealthRouter(mongodbQuotesDB: Db) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      await mongodbQuotesDB.command({ ping: 1 });
      res.status(200).send("Still connected to MongoDBAtlas! Server is healthy.");
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  });

  return router;
}
