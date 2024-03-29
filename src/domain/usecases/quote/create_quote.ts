import { Quote } from "../../entities/quote_entity";
import { QuoteRepository } from "../../interfaces/repositories/quote_repository";
import { CreateQuoteUseCase } from "../../interfaces/usecases/quote/create_quote";

export class CreateQuote implements CreateQuoteUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(quote: Quote): Promise<Quote> {
    return await this.quoteRepository.create(quote);
  }
}
