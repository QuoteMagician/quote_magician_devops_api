import { Quote } from "../../entities/quote_entity";
import { QuoteRepository } from "../../interfaces/repositories/quote_repository";
import { GetDailyQuoteUseCase } from "../../interfaces/usecases/quote/get_daily_quote";
import crypto from "crypto";

export class GetDailyQuote implements GetDailyQuoteUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(): Promise<Quote> {
    const allQuotes: Quote[] = await this.quoteRepository.getAll();
    const randomNumber: number = this.getDailyRandomNumber(allQuotes.length);

    return allQuotes[randomNumber];
  }

  private getDailyRandomNumber(maxId: number): number {
    // Get the current date in the 'YYYY-MM-DD' format
    const currentDate = new Date().toISOString().split("T")[0];

    const secretKey = "lucasDanny";
    const seed = crypto.createHmac("sha256", secretKey).update(currentDate).digest("hex");

    const randomNumber: number = parseInt(seed, 16) % maxId;
    return randomNumber;
  }
}
