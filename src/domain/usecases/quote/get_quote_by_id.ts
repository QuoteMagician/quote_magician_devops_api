import { Quote } from "../../entities/quote_entity";
import { QuoteRepository } from "../../interfaces/repositories/quote_repository";
import { GetQuoteByIdUseCase } from "../../interfaces/usecases/quote/get_quote_by_id";

export class GetQuoteById implements GetQuoteByIdUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(id: string): Promise<Quote> {
    return await this.quoteRepository.getById(id);
  }
}
