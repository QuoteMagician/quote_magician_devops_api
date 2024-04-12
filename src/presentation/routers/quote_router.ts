import express from "express";
import { Request, Response } from "express";
import { CreateQuoteUseCase } from "../../domain/interfaces/usecases/quote/create_quote";
import { DeleteQuoteUseCase } from "../../domain/interfaces/usecases/quote/delete_quote";
import { GetAllQuotesUseCase } from "../../domain/interfaces/usecases/quote/get_all_quotes";
import { GetQuoteByIdUseCase } from "../../domain/interfaces/usecases/quote/get_quote_by_id";
import { UpdateQuoteUseCase } from "../../domain/interfaces/usecases/quote/update_quote";
import { GetDailyQuoteUseCase } from "../../domain/interfaces/usecases/quote/get_daily_quote";

export default function QuoteRouter(
  createQuoteUseCase: CreateQuoteUseCase,
  getQuoteByIdUseCase: GetQuoteByIdUseCase,
  getDailyQuoteUsecase: GetDailyQuoteUseCase,
  getAllQuotesUseCase: GetAllQuotesUseCase,
  updateQuoteUseCase: UpdateQuoteUseCase,
  deleteQuoteUseCase: DeleteQuoteUseCase
) {
  const router = express.Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const quote = await createQuoteUseCase.execute(req.body);
      res.status(201).send(quote);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const quote = await getQuoteByIdUseCase.execute(req.params.id);
      res.status(200).send(quote);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  });

  router.get("/daily", async (req: Request, res: Response) => {
    try {
      const quote = await getDailyQuoteUsecase.execute();
      res.status(200).send(quote);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    try {
      const quotes = await getAllQuotesUseCase.execute();
      res.status(200).send(quotes);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  });

  router.put("/:id", async (req: Request, res: Response) => {
    try {
      const quote = await updateQuoteUseCase.execute(req.params.id, req.body);
      res.status(200).send(quote);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      await deleteQuoteUseCase.execute(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  });

  return router;
}
