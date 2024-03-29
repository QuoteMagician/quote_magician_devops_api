import { Quote } from "../../entities/quote_entity";
import { QuoteRepository } from "../../interfaces/repositories/quote_repository";
import { GetAllQuotesUseCase } from "../../interfaces/usecases/quote/get_all_quotes";

export class GetAllQuotes implements GetAllQuotesUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(): Promise<Quote[]> {
    return await this.quoteRepository.getAll();
  }
}
