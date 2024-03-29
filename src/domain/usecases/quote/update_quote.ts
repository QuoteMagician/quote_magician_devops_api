import { Quote } from "../../entities/quote_entity";
import { QuoteRepository } from "../../interfaces/repositories/quote_repository";
import { UpdateQuoteUseCase } from "../../interfaces/usecases/quote/update_quote";

export class UpdateQuote implements UpdateQuoteUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(id: string, quote: Quote): Promise<Quote> {
    return await this.quoteRepository.update(id, quote);
  }
}
