import { QuoteRepository } from "../../interfaces/repositories/quote_repository";
import { DeleteQuoteUseCase } from "../../interfaces/usecases/quote/delete_quote";

export class DeleteQuote implements DeleteQuoteUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.quoteRepository.delete(id);
  }
}
